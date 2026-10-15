import React from 'react';

interface AvianceLogoProps {
  variant?: 'color' | 'on-dark' | 'on-light' | 'mark-only' | 'monochrome';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  markSize?: number;
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
}

export const AvianceLogo: React.FC<AvianceLogoProps> = ({
  variant = 'on-dark',
  size = 'md',
  markSize: customMarkSize,
  showSubtitle = true,
  subtitleText = 'GHANA',
  className = '',
}) => {
  // Dimensions map
  const sizeMap = {
    sm: { height: 26, width: 110, fontSize: 17, markSize: 22, subSize: 8 },
    md: { height: 34, width: 145, fontSize: 23, markSize: 29, subSize: 9.5 },
    lg: { height: 44, width: 190, fontSize: 30, markSize: 38, subSize: 11 },
    xl: { height: 58, width: 250, fontSize: 40, markSize: 50, subSize: 14 },
  };

  const { height, width } = sizeMap[size];
  const markSize = customMarkSize || sizeMap[size].markSize;

  // Official Brand Colors from the uploaded Aviance identity
  // 1. Aviance Cobalt Blue: #204696 (Primary wordmark & emblem outline)
  // 2. Aviance Sky Cyan:    #56B4E9 (Emblem top-right quadrant)
  // 3. Aviance Royal Blue:  #1D70B8 (Emblem top-left quadrant)
  // 4. Aviance Leaf Green:  #72BF44 (Emblem bottom quadrant)
  const colors = {
    wordmark: variant === 'on-dark' ? '#FFFFFF' : '#204696',
    emblemOutline: variant === 'on-dark' ? '#56B4E9' : '#204696',
    emblemTopLeft: '#1E65B8',   // Vibrant Cobalt/Royal Blue
    emblemTopRight: '#58C1EB',  // Sky Cyan Blue
    emblemBottom: '#72BF44',    // Fresh Leaf Green
    subtitle: variant === 'on-dark' ? '#58C1EB' : '#204696',
  };

  if (variant === 'mark-only') {
    return (
      <svg
        width={markSize}
        height={markSize * 0.78}
        viewBox="0 0 92 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="Aviance Official Emblem"
      >
        {/* Aviance 3-Quadrant Aerodynamic Wing Emblem */}
        {/* 1. Top-Left Wing Segment (Royal Blue) */}
        <path
          d="M 12 18 C 22 13, 38 13, 50 16 L 47 38 C 36 34, 26 28, 12 18 Z"
          fill={colors.emblemTopLeft}
        />
        {/* 2. Top-Right Wing Segment (Sky Cyan Blue) */}
        <path
          d="M 50 16 C 63 19, 78 24, 82 28 C 84 32, 79 40, 71 46 L 47 38 L 50 16 Z"
          fill={colors.emblemTopRight}
        />
        {/* 3. Bottom Petal Segment (Vibrant Leaf Green) */}
        <path
          d="M 47 38 L 71 46 C 65 57, 58 66, 52 67 C 47 67, 43 56, 47 38 Z"
          fill={colors.emblemBottom}
        />
        {/* Outer Continuous Outline */}
        <path
          d="M 12 18 C 28 10, 65 14, 82 28 C 86 31, 84 37, 71 46 C 63 59, 56 68, 52 67 C 46 66, 42 54, 45 36 C 36 32, 24 25, 12 18 Z"
          stroke={colors.emblemOutline}
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
        {/* Internal Dividing Arcs */}
        <path
          d="M 50 16 C 49 26, 48 34, 47 38 C 46 47, 48 58, 52 67"
          stroke={colors.emblemOutline}
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 12 18 C 28 26, 38 33, 47 38 C 57 41, 65 44, 71 46"
          stroke={colors.emblemOutline}
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Scalable Vector of Official Aviance Logo (Wordmark + Emblem) */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 overflow-visible"
        aria-label="Aviance Ghana Official Logo"
      >
        <g>
          {/* Lowercase bold wordmark: "aviance" */}
          <text
            x="4"
            y="38"
            fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontSize="38"
            fontWeight="900"
            letterSpacing="-1.2px"
            fill={colors.wordmark}
            style={{ fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"' }}
          >
            aviance
          </text>

          {/* Official 3-Part Wing Emblem positioned above "ance" */}
          <g transform="translate(142, -4) scale(0.58)">
            {/* 1. Top-Left Wing Segment (Royal Blue) */}
            <path
              d="M 10 18 C 22 13, 38 13, 50 16 L 47 38 C 36 34, 26 28, 10 18 Z"
              fill={colors.emblemTopLeft}
            />
            {/* 2. Top-Right Wing Segment (Sky Cyan Blue) */}
            <path
              d="M 50 16 C 63 19, 78 24, 82 28 C 84 32, 79 40, 71 46 L 47 38 L 50 16 Z"
              fill={colors.emblemTopRight}
            />
            {/* 3. Bottom Petal Segment (Vibrant Leaf Green) */}
            <path
              d="M 47 38 L 71 46 C 65 57, 58 66, 52 67 C 47 67, 43 56, 47 38 Z"
              fill={colors.emblemBottom}
            />
            {/* Outer Continuous Outline */}
            <path
              d="M 10 18 C 28 10, 65 14, 82 28 C 86 31, 84 37, 71 46 C 63 59, 56 68, 52 67 C 46 66, 42 54, 45 36 C 36 32, 24 25, 10 18 Z"
              stroke={colors.emblemOutline}
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />
            {/* Internal Dividing Arcs */}
            <path
              d="M 50 16 C 49 26, 48 34, 47 38 C 46 47, 48 58, 52 67"
              stroke={colors.emblemOutline}
              strokeWidth="3.6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 10 18 C 28 26, 38 33, 47 38 C 57 41, 65 44, 71 46"
              stroke={colors.emblemOutline}
              strokeWidth="3.6"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </g>
      </svg>

      {/* Subtitle Station / Entity Mark (Ghana) - hidden on mobile to keep navbar compact */}
      {showSubtitle && (
        <div className={`hidden sm:flex flex-col justify-center pl-2.5 ml-1 leading-none py-0.5 border-l ${
          variant === 'on-light' ? 'border-slate-300' : 'border-slate-700/80'
        }`}>
          <span
            className="text-[11px] font-extrabold tracking-widest uppercase font-mono"
            style={{ color: colors.subtitle }}
          >
            {subtitleText}
          </span>
          <span className={`text-[8px] font-medium tracking-wider uppercase mt-0.5 ${
            variant === 'on-light' ? 'text-slate-500' : 'text-slate-400'
          }`}>
            Est. 1994
          </span>
        </div>
      )}
    </div>
  );
};
