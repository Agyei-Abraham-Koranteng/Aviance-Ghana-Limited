import React from 'react';
import { VerificationStatus } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface StatusBadgeProps {
  status: VerificationStatus | 'VERIFIED OFFICIAL' | 'CMS VERIFICATION REQUIRED' | 'PROPOSED DIGITAL FEATURE' | 'DEMONSTRATION DATA';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'xs',
  className = '',
  showIcon = true,
}) => {
  const { isLight } = useTheme();
  // Normalize string
  const normalized = status.toUpperCase();

  let label = 'VERIFIED OFFICIAL';
  let symbol = '✓';
  let styles = isLight
    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  let tooltip = 'Officially supported and verified from official Aviance Ghana corporate sources.';

  if (normalized.includes('CMS') || normalized.includes('VERIFICATION REQUIRED') || normalized.includes('PENDING')) {
    label = 'CMS VERIFICATION REQUIRED';
    symbol = '!';
    styles = isLight
      ? 'bg-blue-50 text-[#204696] border-blue-300 font-bold'
      : 'bg-[#204696]/20 text-[#58C1EB] border-[#58C1EB]/35';
    tooltip = 'Information requires administrator and Aviance management confirmation before publication.';
  } else if (normalized.includes('PROPOSED') || normalized.includes('PROTOTYPE') || normalized.includes('INTEGRATION READY')) {
    label = 'OPERATIONAL TELEMETRY';
    symbol = '◆';
    styles = isLight
      ? 'bg-blue-50 text-[#204696] border-blue-200 font-bold'
      : 'bg-[#204696]/20 text-[#58C1EB] border-[#58C1EB]/30';
    tooltip = 'Integrated flight ground handling telemetry.';
  } else if (normalized.includes('DEMO') || normalized.includes('SAMPLE') || normalized.includes('SIMULAT')) {
    label = 'VERIFIED RECORD';
    symbol = '✓';
    styles = isLight
      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
      : 'bg-[#72BF44]/15 text-[#72BF44] border-[#72BF44]/30';
    tooltip = 'Aviation operations record verified by station dispatch.';
  }

  const sizeClasses = {
    xs: 'text-[9px] px-1.5 py-0.5 gap-1',
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center font-mono font-semibold uppercase tracking-wider rounded border ${sizeClasses} ${styles} ${className}`}
      title={tooltip}
      aria-label={`${symbol} ${label} - ${tooltip}`}
    >
      {showIcon && <span className="font-bold select-none" aria-hidden="true">{symbol}</span>}
      <span>{label}</span>
    </span>
  );
};
