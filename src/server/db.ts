import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;
let connectionAttempted = false;
let connectionError: string | null = null;
let isReconnecting = false;

// Remove all default event listeners to avoid unhandled SSL error spew
mongoose.connection.removeAllListeners();

mongoose.connection.on('connected', () => {
  isConnected = true;
  connectionError = null;
  console.log('[MongoDB] Connection status: Connected successfully.');
});

// Gracefully handle driver/socket errors without throwing fatal errors to stderr
mongoose.connection.on('error', (err: any) => {
  isConnected = false;
  const msg = err?.message || String(err);
  
  if (msg.includes('SSL') || msg.includes('whitelist') || msg.includes('tlsv1 alert')) {
    connectionError = 'MongoDB Atlas requires IP whitelisting (0.0.0.0/0) in Atlas Network Access or SSL certificate validation failed.';
    // Silence driver noise and cleanly disconnect to prevent repeating SSL handshake retries
    mongoose.disconnect().catch(() => {});
  } else {
    connectionError = msg;
  }
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
});

export const connectToMongoDB = async (): Promise<boolean> => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('username:password@cluster0') || uri.trim() === '') {
    connectionError = 'MONGODB_URI not configured or using placeholder credentials. Operating in resilient standalone mode.';
    return false;
  }

  if (isConnected || isReconnecting) {
    return isConnected;
  }

  isReconnecting = true;
  connectionAttempted = true;

  try {
    console.log('[MongoDB] Initializing database connection...');

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
      socketTimeoutMS: 8000,
      autoIndex: false,
      retryWrites: true,
      w: 'majority',
    });

    isConnected = true;
    connectionError = null;
    isReconnecting = false;
    console.log('[MongoDB] Connected to database cluster.');
    return true;
  } catch (error: any) {
    isConnected = false;
    isReconnecting = false;
    
    // Safely tear down failed connection so Mongoose doesn't spam socket retry alerts
    try {
      await mongoose.disconnect();
    } catch {
      // Ignore disconnect errors
    }

    const errMessage = error?.message || 'Connection failed';
    if (errMessage.includes('whitelist') || errMessage.includes('Could not connect to any servers') || errMessage.includes('SSL') || errMessage.includes('tlsv1 alert')) {
      connectionError = 'IP whitelist required: Add 0.0.0.0/0 (allow all) in your MongoDB Atlas Network Access settings.';
      console.warn(`[MongoDB Standby] ${connectionError}`);
    } else {
      connectionError = errMessage;
      console.warn(`[MongoDB Standby] ${errMessage}`);
    }

    return false;
  }
};

export const getMongoStatus = () => {
  return {
    connected: isConnected,
    attempted: connectionAttempted,
    error: connectionError,
    readyState: mongoose.connection.readyState,
  };
};
