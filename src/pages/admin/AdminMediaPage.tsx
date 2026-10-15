import React, { useState } from 'react';
import { Image as ImageIcon, UploadCloud, Copy, Check, Trash2, Search } from 'lucide-react';

export const AdminMediaPage: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const mediaAssets = [
    {
      title: 'Kotoka Apron Turnaround Wide',
      path: '/src/assets/images/hero_aviance_turnaround_1791329957957.jpg',
      category: 'Ramp',
      dimensions: '1920x1080',
      size: '420 KB',
      alt: 'Commercial aircraft pushback turnaround at Kotoka International Airport Accra',
    },
    {
      title: 'Air Cargo Logistics & Pallet High-Loader',
      path: '/src/assets/images/cargo_freight_terminal_1791329968738.jpg',
      category: 'Cargo',
      dimensions: '1600x1200',
      size: '380 KB',
      alt: 'Aviance Cargo Village air freight pallet high-loader staging',
    },
    {
      title: 'Adinkra Executive Lounge Interior',
      path: '/src/assets/images/adinkra_vip_lounge_1791329977934.jpg',
      category: 'Lounge & VIP',
      dimensions: '1600x1200',
      size: '340 KB',
      alt: 'Adinkra Lounge Terminal 3 luxury seating and runway views',
    },
    {
      title: 'Ramp Operations Crew & GPU Unit',
      path: '/src/assets/images/ramp_ground_operations_1791329987253.jpg',
      category: 'Ramp & GSE',
      dimensions: '1600x1200',
      size: '390 KB',
      alt: 'Ground handling ramp crew and Ground Power Unit equipment',
    },
  ];

  const handleCopy = (path: string, idx: number) => {
    navigator.clipboard.writeText(path);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Media Library & Storage Bucket Assets
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Supabase Storage bucket (`storage.buckets/media`) assets with accessibility alt-text metadata
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mediaAssets.map((asset, idx) => (
          <div key={asset.path} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-4 space-y-3">
            <div className="h-48 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={asset.path}
                alt={asset.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#58C1EB] uppercase">{asset.category}</span>
                <span className="text-[11px] text-slate-500 font-mono">{asset.dimensions} · {asset.size}</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-0.5">{asset.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-1 mt-1">Alt: {asset.alt}</p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <span className="text-[11px] font-mono text-slate-500 truncate max-w-[200px]">{asset.path}</span>
              <button
                onClick={() => handleCopy(asset.path, idx)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded flex items-center gap-1.5 transition-colors"
              >
                {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copiedIndex === idx ? 'Copied' : 'Copy Path'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
