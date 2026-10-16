import React, { useState, useEffect } from 'react';
import { useCartWishlist } from '../context/CartWishlistContext';
import {
  PackageCheck,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  ShieldCheck,
  Search,
  ExternalLink,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface TimelineStep {
  title: string;
  description: string;
  location: string;
  time: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface OrderTrackerProps {
  initialOrderId?: string;
  onClose?: () => void;
  isModal?: boolean;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  initialOrderId = '',
  onClose,
  isModal = false,
}) => {
  const { orders } = useCartWishlist();
  const [trackingId, setTrackingId] = useState(initialOrderId);
  const [searchedId, setSearchedId] = useState(initialOrderId);
  const [errorMsg, setErrorMsg] = useState('');

  // Default demo tracking IDs if none placed yet
  const defaultSampleId = orders.length > 0 ? orders[0].orderId : 'NEEK-2026-482910';

  useEffect(() => {
    if (initialOrderId) {
      setTrackingId(initialOrderId);
      setSearchedId(initialOrderId);
    } else if (!searchedId) {
      setTrackingId(defaultSampleId);
      setSearchedId(defaultSampleId);
    }
  }, [initialOrderId, defaultSampleId]);

  // Find placed order if matched
  const matchedOrder = orders.find(
    (o) => o.orderId.toLowerCase() === searchedId.trim().toLowerCase()
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      setErrorMsg('Please enter an Order or Tracking ID.');
      return;
    }
    setErrorMsg('');
    setSearchedId(trackingId.trim().toUpperCase());
  };

  // Generate realistic chronological timestamps relative to the order or today
  const orderDate = matchedOrder?.date || 'Today, 10:15 AM';
  const customerCity = matchedOrder?.customerDetails.city || 'New Delhi';

  const timelineSteps: TimelineStep[] = [
    {
      title: 'Order Verified & Certified',
      description: 'Horological certificate generated & payment recorded.',
      location: 'Neek Central Atelier, New Delhi',
      time: orderDate,
      status: 'completed',
    },
    {
      title: 'Atelier Inspection & Calibration',
      description: 'Precision timing variance checked to ±2 sec/day standards.',
      location: 'Quality Inspection Wing, Hub 01',
      time: 'Same Day, 2:40 PM',
      status: 'completed',
    },
    {
      title: 'Velvet Packaging & Tamper Seal',
      description: 'Enclosed in luxury wooden presentation box with warranty card.',
      location: 'Secure Dispatch Vault',
      time: 'Same Day, 6:15 PM',
      status: 'completed',
    },
    {
      title: 'In Transit — Express Air Freight',
      description: 'Package sorted and boarded on BlueDart Horology Air Logistics.',
      location: 'Indira Gandhi International Cargo Hub',
      time: 'Yesterday, 11:30 PM',
      status: 'current',
    },
    {
      title: 'Out for Delivery',
      description: 'Assigned to white-glove security courier for delivery.',
      location: `${customerCity} Local Delivery Center`,
      time: matchedOrder?.estimatedDelivery ? `Expected: ${matchedOrder.estimatedDelivery}` : 'Expected Tomorrow, 11:00 AM',
      status: 'upcoming',
    },
    {
      title: 'Delivered',
      description: 'Recipient signature and physical inspection at doorstep.',
      location: `${customerCity}, India`,
      time: 'Pending Delivery',
      status: 'upcoming',
    },
  ];

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden ${isModal ? 'max-w-2xl w-full' : ''}`}>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a1128] via-[#001f54] to-[#0a1128] text-white p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Truck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="font-['Cinzel',serif] text-xl sm:text-2xl font-bold tracking-tight text-white">
                Track Your Timepiece
              </h2>
              <p className="text-xs text-amber-200/80 mt-0.5">
                Real-time White-Glove Dispatch & Courier Status
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg text-xs"
            >
              ✕ Close
            </button>
          )}
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => {
                setTrackingId(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Enter Tracking ID (e.g. NEEK-2026-482910)"
              className="w-full text-xs py-3 pl-9 pr-3 rounded-xl bg-slate-900/90 border border-amber-500/30 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 uppercase font-mono tracking-wider"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors shrink-0 cursor-pointer"
          >
            Track Status
          </button>
        </form>

        {errorMsg && <p className="text-xs text-rose-300 mt-2">{errorMsg}</p>}

        {/* Sample Orders Helper */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-300">
          <span className="text-slate-400 text-[11px]">Recent Orders:</span>
          {orders.map((ord) => (
            <button
              key={ord.orderId}
              type="button"
              onClick={() => {
                setTrackingId(ord.orderId);
                setSearchedId(ord.orderId);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-300 font-mono text-[11px] transition-colors cursor-pointer"
            >
              Order: {ord.orderId}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setTrackingId('NEEK-2026-482910');
              setSearchedId('NEEK-2026-482910');
            }}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
          >
            Example: NEEK-2026-482910
          </button>
        </div>
      </div>

      {/* Tracking Card Meta Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
            Active Tracking ID
          </span>
          <span className="font-mono font-bold text-slate-900 text-sm">{searchedId}</span>
        </div>

        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
            Carrier Partner
          </span>
          <span className="font-semibold text-slate-800">BlueDart Apex Horology Express</span>
        </div>

        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
            Current Status
          </span>
          <span className="font-bold text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full inline-block">
            ● In Transit — En Route to Hub
          </span>
        </div>

        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
            Expected Handover
          </span>
          <span className="font-bold text-emerald-800">
            {matchedOrder?.estimatedDelivery || 'Within 48–72 Hours'}
          </span>
        </div>
      </div>

      {/* Matched Order Items Snapshot if Available */}
      {matchedOrder && (
        <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PackageCheck className="w-5 h-5 text-amber-700 shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-slate-900">
                Order for {matchedOrder.customerDetails.fullName}
              </p>
              <p className="text-slate-600">
                {matchedOrder.items.length} timepiece(s) · Total: ₹{matchedOrder.total.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
          <div className="text-right text-xs">
            <span className="text-emerald-700 font-bold block">100% Insured</span>
            <span className="text-slate-500 text-[11px]">{matchedOrder.customerDetails.city}</span>
          </div>
        </div>
      )}

      {/* Timeline Steps */}
      <div className="p-6 sm:p-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
          Dispatch & Transit Milestone Timeline
        </h3>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {timelineSteps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            const isUpcoming = step.status === 'upcoming';

            return (
              <div key={idx} className="relative group">
                
                {/* Node Indicator Dot */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 ring-4 ring-white'
                      : isCurrent
                      ? 'bg-amber-500 text-slate-950 font-bold ring-4 ring-amber-100 shadow-md shadow-amber-500/30 animate-pulse'
                      : 'bg-slate-200 text-slate-400 ring-4 ring-white'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-slate-950" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  )}
                </div>

                {/* Content Box */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-amber-50/50 border-amber-300/80 shadow-sm'
                      : isCompleted
                      ? 'bg-white border-slate-200/80'
                      : 'bg-slate-50/50 border-slate-200/50 opacity-60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4
                      className={`text-sm font-bold ${
                        isCurrent ? 'text-amber-950' : 'text-slate-900'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <span
                      className={`text-xs font-medium tabular-nums ${
                        isCurrent ? 'text-amber-800 font-bold' : 'text-slate-500'
                      }`}
                    >
                      {step.time}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{step.location}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Security & Support Note */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Secure tamper-evident transit with Neek Holographic Seal</span>
          </div>
          <div className="text-slate-400">
            Helpline: <strong>1800-420-NEEK</strong> (9 AM – 8 PM)
          </div>
        </div>

      </div>

    </div>
  );
};
