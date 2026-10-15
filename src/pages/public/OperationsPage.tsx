import React from 'react';
import { Plane, ShieldCheck, MapPin, Clock, ArrowRight, Wrench, CheckCircle2 } from 'lucide-react';
import { GhanaMap } from '../../components/public/GhanaMap';
import { TurnaroundTimeline } from '../../components/public/TurnaroundTimeline';
import { LocationItem } from '../../types';

interface OperationsPageProps {
  locations: LocationItem[];
  onNavigate: (path: string) => void;
  onOpenCargoModal: () => void;
}

export const OperationsPage: React.FC<OperationsPageProps> = ({ locations, onNavigate, onOpenCargoModal }) => {
  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Header in Official Aviance Blue */}
      <div className="py-14 bg-gradient-to-b from-[#11244C] via-[#0C1933] to-[#08101E] border-b border-[#204696]/30 text-center relative overflow-hidden">
        {/* Subtle Ambient Backing Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-[#204696]/20 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#58C1EB]">
            <Plane className="w-4 h-4 -rotate-45" /> Nationwide Ground Handling Network
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Operational Footprint & Turnaround Engineering
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Delivering 24/7 ground operations across Ghana's core commercial hubs: Kotoka International Airport Accra (Terminal 3 & Cargo Village), Prempeh I International Kumasi, and Tamale International.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Interactive Map */}
        <GhanaMap locations={locations} />

        {/* Turnaround Choreography */}
        <TurnaroundTimeline />

        {/* Ground Support Fleet Specs */}
        <div className="bg-[#0C1933]/95 border border-[#204696]/35 rounded-2xl p-8 space-y-6 shadow-xl shadow-[#204696]/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#58C1EB]">
                GSE Fleet & Heavy Assets
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Airside Equipment Readiness
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/gse-fleet-maintenance')}
              className="text-xs font-semibold text-[#58C1EB] hover:text-[#58C1EB] flex items-center gap-1"
            >
              <span>GSE Workshop Engineering</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-300">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-bold text-[#58C1EB] text-sm block">Pushback Tractors</span>
              <p className="text-slate-400">Heavy wide-body towbarless and conventional diesel tractors capable of B777-300ER and A350-900 pushbacks.</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-bold text-[#58C1EB] text-sm block">Ground Power Units (GPU)</span>
              <p className="text-slate-400">Continuous 400Hz 90kVA & 180kVA mobile units supplying avionics and cabin power during gate staging.</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-bold text-[#58C1EB] text-sm block">Container High Loaders</span>
              <p className="text-slate-400">Main-deck and lower-deck pallet transporters for Boeing 747F/777F freighters and passenger wide-body belly holds.</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-bold text-[#58C1EB] text-sm block">PRM Ambulift Vehicles</span>
              <p className="text-slate-400">Specialized scissor-lift cabins providing comfortable, safe airside boarding for Persons with Reduced Mobility.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
