export interface AnalyticsEventRecord {
  id: string;
  eventName: string;
  pagePath: string;
  sessionId: string;
  referrer?: string;
  deviceType: 'desktop' | 'tablet' | 'mobile';
  timestamp: string;
  metadata?: Record<string, any>;
}

const ANALYTICS_KEY = 'aviance_analytics_events';
const SESSION_KEY = 'aviance_session_id';

function getSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

function getDeviceType(): 'desktop' | 'tablet' | 'mobile' {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

function getStoredEvents(): AnalyticsEventRecord[] {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (!raw) return generateInitialMockEvents();
    return JSON.parse(raw);
  } catch {
    return generateInitialMockEvents();
  }
}

// Seed realistic anonymized events for reporting charts
function generateInitialMockEvents(): AnalyticsEventRecord[] {
  const events: AnalyticsEventRecord[] = [];
  const paths = [
    '/',
    '/services',
    '/cargo',
    '/ramp-handling',
    '/find-my-bag',
    '/lounge',
    '/careers',
    '/contact',
    '/certifications'
  ];
  const now = Date.now();
  const dayMs = 24 * 3600 * 1000;

  for (let d = 29; d >= 0; d--) {
    const date = new Date(now - d * dayMs);
    const count = 40 + Math.floor(Math.sin(d / 3) * 15) + Math.floor(Math.random() * 20);

    for (let i = 0; i < count; i++) {
      const p = paths[Math.floor(Math.random() * paths.length)];
      const hour = Math.floor(Math.random() * 24);
      const eventTime = new Date(date);
      eventTime.setHours(hour, Math.floor(Math.random() * 60));

      const isMobile = Math.random() < 0.42;
      const isTablet = !isMobile && Math.random() < 0.15;

      events.push({
        id: `ev-${d}-${i}`,
        eventName: 'page_view',
        pagePath: p,
        sessionId: `sess_historical_${d}_${Math.floor(i / 3)}`,
        referrer: i % 4 === 0 ? 'https://google.com' : i % 7 === 0 ? 'https://linkedin.com' : undefined,
        deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
        timestamp: eventTime.toISOString(),
      });
    }
  }

  // Add specific conversion events
  for (let c = 0; c < 24; c++) {
    events.push({
      id: `conv-enq-${c}`,
      eventName: 'enquiry_submit',
      pagePath: '/contact',
      sessionId: `sess_conv_${c}`,
      deviceType: 'desktop',
      timestamp: new Date(now - c * 28 * 3600 * 1000).toISOString(),
    });
  }

  try {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(events));
  } catch {}
  return events;
}

export const analyticsService = {
  trackEvent: (
    eventName: string,
    pagePath: string,
    metadata?: Record<string, any>
  ): void => {
    try {
      const events = getStoredEvents();
      const newEvent: AnalyticsEventRecord = {
        id: `ev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        eventName,
        pagePath,
        sessionId: getSessionId(),
        referrer: typeof document !== 'undefined' ? document.referrer : undefined,
        deviceType: getDeviceType(),
        timestamp: new Date().toISOString(),
        metadata,
      };
      events.push(newEvent);
      // Keep bounded at last 3000 events
      if (events.length > 3000) events.splice(0, events.length - 3000);
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(events));
    } catch (e) {
      console.warn('Analytics event tracking error:', e);
    }
  },

  getStats: (days: number = 30) => {
    const events = getStoredEvents();
    const cutoff = Date.now() - days * 24 * 3600 * 1000;
    const filtered = events.filter((e) => new Date(e.timestamp).getTime() >= cutoff);

    const uniqueSessions = new Set(filtered.map((e) => e.sessionId)).size;
    const totalViews = filtered.filter((e) => e.eventName === 'page_view').length;
    const enquirySubmits = filtered.filter((e) => e.eventName === 'enquiry_submit').length;
    const baggageSearches = filtered.filter((e) => e.eventName === 'baggage_search').length;
    const careerSubmits = filtered.filter((e) => e.eventName === 'career_application_submit').length;

    // Daily breakdown for line chart
    const dailyMap: Record<string, { date: string; pageViews: number; visitors: number }> = {};
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 3600 * 1000);
      const key = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      dailyMap[key] = { date: key, pageViews: 0, visitors: 0 };
    }

    const sessionPerDay: Record<string, Set<string>> = {};
    filtered.forEach((e) => {
      const key = new Date(e.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      if (dailyMap[key]) {
        dailyMap[key].pageViews += 1;
        if (!sessionPerDay[key]) sessionPerDay[key] = new Set();
        sessionPerDay[key].add(e.sessionId);
      }
    });

    Object.keys(dailyMap).forEach((key) => {
      dailyMap[key].visitors = sessionPerDay[key] ? sessionPerDay[key].size : Math.round(dailyMap[key].pageViews * 0.45);
    });

    const trafficTrends = Object.values(dailyMap);

    // Page performance
    const pageCounts: Record<string, number> = {};
    filtered
      .filter((e) => e.eventName === 'page_view')
      .forEach((e) => {
        pageCounts[e.pagePath] = (pageCounts[e.pagePath] || 0) + 1;
      });

    const topPages = Object.entries(pageCounts)
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 7);

    // Device breakdown
    const devices = { desktop: 0, mobile: 0, tablet: 0 };
    filtered.forEach((e) => {
      devices[e.deviceType] = (devices[e.deviceType] || 0) + 1;
    });

    const totalDev = (devices.desktop + devices.mobile + devices.tablet) || 1;
    const deviceBreakdown = [
      { name: 'Desktop', percentage: Math.round((devices.desktop / totalDev) * 100), count: devices.desktop },
      { name: 'Mobile', percentage: Math.round((devices.mobile / totalDev) * 100), count: devices.mobile },
      { name: 'Tablet', percentage: Math.round((devices.tablet / totalDev) * 100), count: devices.tablet },
    ];

    return {
      uniqueVisitors: uniqueSessions,
      totalPageViews: totalViews,
      enquirySubmits,
      baggageSearches,
      careerSubmits,
      conversionRate: uniqueSessions > 0 ? ((enquirySubmits + careerSubmits) / uniqueSessions * 100).toFixed(1) : '2.8',
      trafficTrends,
      topPages,
      deviceBreakdown,
    };
  },
};
