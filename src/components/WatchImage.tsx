import React, { useState } from 'react';
import { WatchProduct } from '../types';

interface WatchImageProps {
  product: WatchProduct;
  className?: string;
  imageClassName?: string;
  showZoom?: boolean;
}

export const WatchImage: React.FC<WatchImageProps> = ({
  product,
  className = '',
  imageClassName = '',
  showZoom = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Dedicated SVG Watch Artwork generator for each of the 15 distinct watch models
  const renderWatchArtwork = (type: WatchProduct['watchVisualType']) => {
    switch (type) {
      case 'golden-luxury':
      case 'gold-automatic':
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl" aria-label={product.name}>
            <defs>
              <linearGradient id="goldCase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="35%" stopColor="#d4af37" />
                <stop offset="70%" stopColor="#ca8a04" />
                <stop offset="100%" stopColor="#854d0e" />
              </linearGradient>
              <linearGradient id="goldDial" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="50%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#fde68a" />
              </linearGradient>
              <linearGradient id="goldStrap" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ca8a04" />
                <stop offset="50%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#a16207" />
              </linearGradient>
            </defs>
            {/* Straps */}
            <rect x="110" y="10" width="80" height="70" rx="6" fill="url(#goldStrap)" />
            <rect x="110" y="220" width="80" height="70" rx="6" fill="url(#goldStrap)" />
            {/* Horizontal link lines */}
            <line x1="110" y1="35" x2="190" y2="35" stroke="#78350f" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="110" y1="55" x2="190" y2="55" stroke="#78350f" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="110" y1="245" x2="190" y2="245" stroke="#78350f" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="110" y1="265" x2="190" y2="265" stroke="#78350f" strokeWidth="1.5" strokeOpacity="0.4" />
            {/* Bezel & Case */}
            <circle cx="150" cy="150" r="88" fill="url(#goldCase)" filter="drop-shadow(0px 8px 12px rgba(0,0,0,0.5))" />
            <circle cx="150" cy="150" r="76" fill="#ca8a04" stroke="#fef08a" strokeWidth="2" strokeDasharray="3 3" />
            {/* Dial */}
            <circle cx="150" cy="150" r="70" fill={type === 'gold-automatic' ? '#0f172a' : 'url(#goldDial)'} />
            {/* Skeleton gears for gold automatic */}
            {type === 'gold-automatic' && (
              <g opacity="0.85">
                <circle cx="150" cy="150" r="38" fill="none" stroke="url(#goldCase)" strokeWidth="3" strokeDasharray="5 4" />
                <circle cx="162" cy="142" r="20" fill="none" stroke="#fef08a" strokeWidth="2" />
                <circle cx="138" cy="160" r="16" fill="none" stroke="#d4af37" strokeWidth="2" strokeDasharray="3 2" />
                <circle cx="150" cy="150" r="8" fill="#e11d48" />
              </g>
            )}
            {/* Hour Markers */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <line
                key={i}
                x1="150"
                y1="88"
                x2="150"
                y2="97"
                stroke={type === 'gold-automatic' ? '#fef08a' : '#854d0e'}
                strokeWidth={i % 3 === 0 ? '3.5' : '1.8'}
                strokeLinecap="round"
                transform={`rotate(${deg} 150 150)`}
              />
            ))}
            {/* Brand Logo text */}
            <text x="150" y="125" textAnchor="middle" fill={type === 'gold-automatic' ? '#fef08a' : '#78350f'} fontSize="9" fontWeight="700" letterSpacing="2">
              NEEK
            </text>
            <text x="150" y="180" textAnchor="middle" fill={type === 'gold-automatic' ? '#d4af37' : '#92400e'} fontSize="6.5" letterSpacing="1">
              AUTOMATIC
            </text>
            {/* Watch Hands */}
            <line x1="150" y1="150" x2="150" y2="105" stroke={type === 'gold-automatic' ? '#ffffff' : '#451a03'} strokeWidth="3.5" strokeLinecap="round" />
            <line x1="150" y1="150" x2="190" y2="150" stroke={type === 'gold-automatic' ? '#ffffff' : '#451a03'} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="150" y1="158" x2="150" y2="92" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="150" cy="150" r="4.5" fill="#ca8a04" stroke="#ffffff" strokeWidth="1" />
            {/* Crown */}
            <rect x="238" y="142" width="10" height="16" rx="2" fill="url(#goldCase)" />
          </svg>
        );

      case 'rose-gold-women':
      case 'bracelet-women':
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-xl" aria-label={product.name}>
            <defs>
              <linearGradient id="roseCase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fecdd3" />
                <stop offset="50%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="pearlDial" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#fff1f2" />
                <stop offset="100%" stopColor="#ffe4e6" />
              </linearGradient>
            </defs>
            {/* Mesh / Bracelet Strap */}
            <rect x="122" y="15" width="56" height="75" rx="4" fill="url(#roseCase)" />
            <rect x="122" y="210" width="56" height="75" rx="4" fill="url(#roseCase)" />
            {/* Case */}
            <circle cx="150" cy="150" r="75" fill="url(#roseCase)" filter="drop-shadow(0px 8px 12px rgba(0,0,0,0.3))" />
            {/* Crystal bezel stones */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <circle key={i} cx="150" cy="82" r="2.8" fill="#ffffff" transform={`rotate(${deg} 150 150)`} />
            ))}
            {/* Dial */}
            <circle cx="150" cy="150" r="62" fill="url(#pearlDial)" />
            {/* Dainty markers */}
            {[0, 90, 180, 270].map((deg, i) => (
              <circle key={i} cx="150" cy="100" r="2.2" fill="#e11d48" transform={`rotate(${deg} 150 150)`} />
            ))}
            <text x="150" y="130" textAnchor="middle" fill="#9f1239" fontSize="9" fontWeight="600" letterSpacing="2">
              NEEK
            </text>
            <text x="150" y="172" textAnchor="middle" fill="#be123c" fontSize="6" letterSpacing="1">
              VOGUE
            </text>
            {/* Slender Hands */}
            <line x1="150" y1="150" x2="150" y2="110" stroke="#881337" strokeWidth="2" strokeLinecap="round" />
            <line x1="150" y1="150" x2="180" y2="150" stroke="#881337" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="150" cy="150" r="3.5" fill="#f43f5e" />
            <rect x="225" y="145" width="8" height="10" rx="2" fill="url(#roseCase)" />
          </svg>
        );

      case 'modern-smart':
      case 'fitness-smart':
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl" aria-label={product.name}>
            <defs>
              <linearGradient id="smartStrap" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="50%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="smartScreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#020617" />
                <stop offset="100%" stopColor="#090d16" />
              </linearGradient>
              <linearGradient id="ringAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            {/* Silicone Strap */}
            <rect x="108" y="10" width="84" height="75" rx="8" fill="url(#smartStrap)" />
            <rect x="108" y="215" width="84" height="75" rx="8" fill="url(#smartStrap)" />
            {/* Smart Watch Body */}
            <rect x="68" y="68" width="164" height="164" rx="42" fill="#1e293b" stroke="#334155" strokeWidth="3" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.6))" />
            {/* AMOLED Screen */}
            <rect x="76" y="76" width="148" height="148" rx="36" fill="url(#smartScreen)" />
            {/* Glow Ring */}
            <circle cx="150" cy="150" r="54" fill="none" stroke="#1e293b" strokeWidth="6" />
            <circle cx="150" cy="150" r="54" fill="none" stroke="url(#ringAccent)" strokeWidth="6" strokeDasharray="260" strokeDashoffset="70" strokeLinecap="round" />
            {/* Digital Watchface UI */}
            <text x="150" y="145" textAnchor="middle" fill="#ffffff" fontSize="28" fontWeight="700" letterSpacing="-0.5">
              10:42
            </text>
            <text x="150" y="165" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="500">
              {type === 'fitness-smart' ? '♥ 78 BPM · 8,420 STEPS' : 'NEEK SMART OS'}
            </text>
            <text x="150" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">
              MON 12 OCT · 24°C
            </text>
            {/* Side button */}
            <rect x="232" y="125" width="7" height="24" rx="2" fill="#475569" />
          </svg>
        );

      case 'blue-luxury':
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl" aria-label={product.name}>
            <defs>
              <linearGradient id="steelCase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <radialGradient id="deepBlueDial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="60%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#0b1e59" />
              </radialGradient>
            </defs>
            {/* Steel Bracelet */}
            <rect x="110" y="10" width="80" height="70" rx="4" fill="url(#steelCase)" />
            <rect x="110" y="220" width="80" height="70" rx="4" fill="url(#steelCase)" />
            {/* Case */}
            <circle cx="150" cy="150" r="88" fill="url(#steelCase)" filter="drop-shadow(0 8px 14px rgba(0,0,0,0.6))" />
            {/* Diver Ceramic Bezel */}
            <circle cx="150" cy="150" r="76" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <text
                key={i}
                x="150"
                y="85"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="6"
                fontWeight="700"
                transform={`rotate(${deg} 150 150)`}
              >
                {i * 5}
              </text>
            ))}
            {/* Blue Sunray Dial */}
            <circle cx="150" cy="150" r="66" fill="url(#deepBlueDial)" />
            {/* Luminescent Markers */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <circle key={i} cx="150" cy="95" r="3.2" fill="#ecfeff" stroke="#0284c7" strokeWidth="1" transform={`rotate(${deg} 150 150)`} />
            ))}
            <text x="150" y="128" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700" letterSpacing="2">
              NEEK
            </text>
            <text x="150" y="176" textAnchor="middle" fill="#38bdf8" fontSize="6.5" letterSpacing="1">
              300M / 1000FT
            </text>
            {/* Diver Hands */}
            <line x1="150" y1="150" x2="150" y2="108" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            <line x1="150" y1="150" x2="185" y2="150" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <line x1="150" y1="156" x2="150" y2="92" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="150" cy="150" r="5" fill="#ffffff" />
            {/* Crown Guard */}
            <rect x="238" y="140" width="10" height="20" rx="3" fill="url(#steelCase)" />
          </svg>
        );

      case 'chronograph-mens':
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl" aria-label={product.name}>
            <defs>
              <linearGradient id="chronoStrap" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="chronoCase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f1f5f9" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>
            {/* Leather / Rally Strap */}
            <rect x="110" y="10" width="80" height="70" rx="6" fill="url(#chronoStrap)" />
            <rect x="110" y="220" width="80" height="70" rx="6" fill="url(#chronoStrap)" />
            {/* Case */}
            <circle cx="150" cy="150" r="88" fill="url(#chronoCase)" filter="drop-shadow(0 8px 14px rgba(0,0,0,0.6))" />
            {/* Tachymeter Bezel */}
            <circle cx="150" cy="150" r="76" fill="#0f172a" stroke="#ef4444" strokeWidth="1" />
            {/* Panda White Dial */}
            <circle cx="150" cy="150" r="68" fill="#f8fafc" />
            {/* 3 Sub-dials */}
            <circle cx="130" cy="150" r="14" fill="#0f172a" />
            <circle cx="170" cy="150" r="14" fill="#0f172a" />
            <circle cx="150" cy="172" r="14" fill="#0f172a" />
            {/* Sub-dial hands */}
            <line x1="130" y1="150" x2="124" y2="144" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="170" y1="150" x2="175" y2="145" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="150" y1="172" x2="150" y2="164" stroke="#ef4444" strokeWidth="1.5" />
            <text x="150" y="125" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="800" letterSpacing="1.5">
              NEEK
            </text>
            <text x="150" y="135" textAnchor="middle" fill="#ef4444" fontSize="6" fontWeight="700">
              CHRONO
            </text>
            {/* Main Hands */}
            <line x1="150" y1="150" x2="150" y2="102" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            <line x1="150" y1="150" x2="190" y2="150" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="150" y1="158" x2="150" y2="92" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="150" cy="150" r="4" fill="#ef4444" />
            {/* Chrono Pushers & Crown */}
            <rect x="238" y="126" width="8" height="10" rx="2" fill="#475569" />
            <rect x="238" y="144" width="10" height="14" rx="2" fill="url(#chronoCase)" />
            <rect x="238" y="166" width="8" height="10" rx="2" fill="#475569" />
          </svg>
        );

      case 'black-leather':
      case 'vintage-brown':
        const isBrown = type === 'vintage-brown';
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl" aria-label={product.name}>
            <defs>
              <linearGradient id="leatherStrap" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isBrown ? '#451a03' : '#020617'} />
                <stop offset="50%" stopColor={isBrown ? '#78350f' : '#1e293b'} />
                <stop offset="100%" stopColor={isBrown ? '#3b1c0b' : '#020617'} />
              </linearGradient>
              <linearGradient id="vintageCase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isBrown ? '#fde68a' : '#cbd5e1'} />
                <stop offset="100%" stopColor={isBrown ? '#b45309' : '#334155'} />
              </linearGradient>
            </defs>
            {/* Stitched Leather Strap */}
            <rect x="110" y="10" width="80" height="70" rx="6" fill="url(#leatherStrap)" />
            <line x1="116" y1="10" x2="116" y2="80" stroke="#fef08a" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <line x1="184" y1="10" x2="184" y2="80" stroke="#fef08a" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <rect x="110" y="220" width="80" height="70" rx="6" fill="url(#leatherStrap)" />
            <line x1="116" y1="220" x2="116" y2="290" stroke="#fef08a" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <line x1="184" y1="220" x2="184" y2="290" stroke="#fef08a" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            {/* Case */}
            <circle cx="150" cy="150" r="84" fill="url(#vintageCase)" filter="drop-shadow(0 8px 12px rgba(0,0,0,0.5))" />
            {/* Dial */}
            <circle cx="150" cy="150" r="74" fill={isBrown ? '#fef3c7' : '#0f172a'} />
            {/* Hour Markers */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <line
                key={i}
                x1="150"
                y1="85"
                x2="150"
                y2="95"
                stroke={isBrown ? '#78350f' : '#f8fafc'}
                strokeWidth={i % 3 === 0 ? '3' : '1.5'}
                strokeLinecap="round"
                transform={`rotate(${deg} 150 150)`}
              />
            ))}
            <text x="150" y="128" textAnchor="middle" fill={isBrown ? '#451a03' : '#ffffff'} fontSize="9" fontWeight="700" letterSpacing="2">
              NEEK
            </text>
            <text x="150" y="174" textAnchor="middle" fill={isBrown ? '#92400e' : '#94a3b8'} fontSize="6.5" letterSpacing="1">
              {isBrown ? 'HERITAGE 1948' : 'SWISS RONDA'}
            </text>
            {/* Hands */}
            <line x1="150" y1="150" x2="150" y2="106" stroke={isBrown ? '#451a03' : '#ffffff'} strokeWidth="3" strokeLinecap="round" />
            <line x1="150" y1="150" x2="182" y2="150" stroke={isBrown ? '#451a03' : '#ffffff'} strokeWidth="2" strokeLinecap="round" />
            <circle cx="150" cy="150" r="3.5" fill={isBrown ? '#b45309' : '#38bdf8'} />
            <rect x="234" y="143" width="8" height="14" rx="2" fill="url(#vintageCase)" />
          </svg>
        );

      // Default classic / silver / steel analog
      default:
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl" aria-label={product.name}>
            <defs>
              <linearGradient id="silverBand" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
              <linearGradient id="silverBezel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>
            {/* Stainless Steel Links */}
            <rect x="110" y="10" width="80" height="70" rx="4" fill="url(#silverBand)" />
            <rect x="110" y="220" width="80" height="70" rx="4" fill="url(#silverBand)" />
            <line x1="110" y1="40" x2="190" y2="40" stroke="#334155" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="110" y1="250" x2="190" y2="250" stroke="#334155" strokeWidth="1" strokeOpacity="0.4" />
            {/* Case */}
            <circle cx="150" cy="150" r="86" fill="url(#silverBezel)" filter="drop-shadow(0 8px 14px rgba(0,0,0,0.5))" />
            {/* Dial */}
            <circle cx="150" cy="150" r="74" fill={product.watchVisualType === 'black-sports' ? '#0f172a' : '#f8fafc'} />
            {/* Indices */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <line
                key={i}
                x1="150"
                y1="86"
                x2="150"
                y2="96"
                stroke={product.watchVisualType === 'black-sports' ? '#38bdf8' : '#1e293b'}
                strokeWidth={i % 3 === 0 ? '3' : '1.5'}
                strokeLinecap="round"
                transform={`rotate(${deg} 150 150)`}
              />
            ))}
            {/* Date window */}
            <rect x="186" y="142" width="18" height="15" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
            <text x="195" y="153" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="700">
              12
            </text>
            <text x="150" y="128" textAnchor="middle" fill={product.watchVisualType === 'black-sports' ? '#ffffff' : '#0f172a'} fontSize="9" fontWeight="700" letterSpacing="2">
              NEEK
            </text>
            <text x="150" y="174" textAnchor="middle" fill={product.watchVisualType === 'black-sports' ? '#38bdf8' : '#64748b'} fontSize="6.5" letterSpacing="1">
              SAPPHIRE · 100M
            </text>
            {/* Hands */}
            <line x1="150" y1="150" x2="150" y2="105" stroke={product.watchVisualType === 'black-sports' ? '#ffffff' : '#0f172a'} strokeWidth="3" strokeLinecap="round" />
            <line x1="150" y1="150" x2="184" y2="150" stroke={product.watchVisualType === 'black-sports' ? '#ffffff' : '#0f172a'} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="150" y1="156" x2="150" y2="94" stroke="#c5a059" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="150" cy="150" r="3.5" fill="#c5a059" />
            <rect x="236" y="143" width="8" height="14" rx="2" fill="url(#silverBezel)" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center select-none bg-radial from-slate-800/80 via-slate-900 to-slate-950 ${className}`}
      onMouseEnter={() => showZoom && setIsZoomed(true)}
      onMouseLeave={() => showZoom && setIsZoomed(false)}
    >
      {/* Background ambient lighting vignette for luxury presentation */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${product.themeColor || '#c5a059'} 0%, transparent 70%)`,
        }}
      />

      {!hasError ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
            isZoomed ? 'scale-125' : 'hover:scale-105'
          } ${imageClassName}`}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full p-4 flex items-center justify-center transition-transform duration-500 ease-out hover:scale-105">
          {renderWatchArtwork(product.watchVisualType)}
        </div>
      )}

      {/* Subtle bottom glare reflection */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
    </div>
  );
};
