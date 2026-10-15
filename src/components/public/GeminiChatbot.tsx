import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  RotateCcw,
  Copy,
  Check,
  User,
  AlertCircle,
  Minimize2,
  ChevronDown,
  Plane,
  Shield,
  Luggage,
  Zap,
  HelpCircle,
  Clock,
  Gauge,
} from 'lucide-react';
import { AvianceLogo } from '../ui/AvianceLogo';

export type ChatRole = 'general' | 'operations' | 'passenger_baggage';
export type GeminiModel = 'gemini-3.1-flash-lite' | 'gemini-3.8-flash';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

const ROLE_CONFIGS: Record<
  ChatRole,
  {
    name: string;
    icon: any;
    recommendedModel: GeminiModel;
    modelBadge: string;
    description: string;
    welcomeMessage: string;
    suggestedPrompts: string[];
  }
> = {
  general: {
    name: 'General Ground Concierge',
    icon: Plane,
    recommendedModel: 'gemini-3.1-flash-lite',
    modelBadge: 'Instant · gemini-3.1-flash-lite',
    description: 'Instant assistance for Kotoka T3, Kumasi & Tamale stations, contacts, and flight support.',
    welcomeMessage:
      'Welcome to Aviance Ghana Limited. I am your Ground Operations Concierge. How may I assist you with passenger handling, executive lounge access, or airport station information?',
    suggestedPrompts: [
      'What are the contact details for Kotoka Terminal 3 head office?',
      'Where does Aviance Ghana operate across Ghanaian aerodromes?',
      'Tell me about the Adinkra Executive Lounge amenities.',
    ],
  },
  operations: {
    name: 'Operations & Cargo Specialist',
    icon: Shield,
    recommendedModel: 'gemini-3.1-flash-lite',
    modelBadge: 'Fast Dispatch · gemini-3.1-flash-lite',
    description: 'Technical analysis for IATA ISAGO turnaround, EU Cargo RA3 cold chain, and SGHA handling.',
    welcomeMessage:
      'Aviance Flight Operations & Cargo Specialist ready. I can provide turnaround GSE sequencing, cold chain storage specifications (+2°C to +8°C), and ramp safety protocols.',
    suggestedPrompts: [
      'What are the temperature limits and security controls for EU Cargo RA3?',
      'Explain the B777-300ER turnaround GSE sequencing (GPU, ambulift, pushback).',
      'What certifications validate Aviance airside ground safety?',
    ],
  },
  passenger_baggage: {
    name: 'Passenger & Baggage Guide',
    icon: Luggage,
    recommendedModel: 'gemini-3.1-flash-lite',
    modelBadge: 'Instant Tracing · gemini-3.1-flash-lite',
    description: 'Rapid assistance for baggage reconciliation, lost property tracing, and arrival desks.',
    welcomeMessage:
      'Hello traveler. I am your Passenger & Baggage Guide. I can assist with baggage claim carousels, delayed bag tracing at Terminal 3 (Carousel 2), and Lost & Found procedures.',
    suggestedPrompts: [
      'Where is the Terminal 3 Baggage Services Office located?',
      'How does Aviance trace delayed baggage using SITA WorldTracer?',
      'Can walk-in travelers access the Adinkra Lounge?',
    ],
  },
};

export const GeminiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<ChatRole>('general');
  const [model, setModel] = useState<GeminiModel>('gemini-3.1-flash-lite');
  const [fastMode, setFastMode] = useState<boolean>(true);
  const [lastUserPrompt, setLastUserPrompt] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem('aviance_chat_history');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      {
        id: 'msg-welcome',
        role: 'assistant',
        content: ROLE_CONFIGS.general.welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'gemini-3.1-flash-lite',
      },
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of thread
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Save conversation history to local storage
  useEffect(() => {
    try {
      localStorage.setItem('aviance_chat_history', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Handle role switch: auto-set recommended model if not manually overridden
  const handleRoleChange = (newRole: ChatRole) => {
    setRole(newRole);
    const recModel = ROLE_CONFIGS[newRole].recommendedModel;
    setModel(recModel);

    // Add persona transition system notice
    const notice: ChatMessage = {
      id: `msg-switch-${Date.now()}`,
      role: 'assistant',
      content: ROLE_CONFIGS[newRole].welcomeMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: recModel,
    };
    setMessages((prev) => [...prev, notice]);
  };

  const handleClearHistory = () => {
    const welcome: ChatMessage = {
      id: `msg-welcome-${Date.now()}`,
      role: 'assistant',
      content: ROLE_CONFIGS[role].welcomeMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: model,
    };
    setMessages([welcome]);
    localStorage.removeItem('aviance_chat_history');
    setError(null);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const userText = (textToSend || input).trim();
    if (!userText || isLoading) return;

    setError(null);
    setInput('');
    setLastUserPrompt(userText);

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Build conversation history for multi-turn chat (excluding error messages or welcome duplicates)
      const historyPayload = newMessages
        .slice(-6) // Keep last 6 turns for optimal token processing & fast response
        .slice(0, -1) // Exclude current user prompt
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userText,
          history: historyPayload,
          model,
          role,
          fast: fastMode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'The Gemini API service encountered an unexpected error.');
      }

      const assistantMessage: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.model || model,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err?.message || 'Unable to connect to the Gemini API assistant. Please check connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentRoleConfig = ROLE_CONFIGS[role];
  const RoleIcon = currentRoleConfig.icon;

  return (
    <>
      {/* Floating Trigger Launcher Button with Official Aviance Logo */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3 group select-none">
          {/* Subtle sliding pill tooltip on hover */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/95 text-white border border-[#204696]/60 shadow-2xl backdrop-blur-md text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-[#72BF44] animate-pulse"></span>
            <span className="tracking-tight font-medium">Aviance AI Concierge</span>
            <span className="font-mono text-[9px] text-[#58C1EB] bg-[#204696]/30 px-1.5 py-0.5 rounded font-bold border border-[#58C1EB]/40">
              ⚡ Instant
            </span>
          </div>

          {/* Perfectly Round, Minimal & Modern Animated AI Button with Official Aviance Logo */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-14 h-14 sm:w-16 sm:h-16 aspect-square rounded-full flex items-center justify-center p-0 text-white shadow-2xl transition-all duration-300 transform hover:scale-108 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#58C1EB]/40 cursor-pointer animate-ai-breathe"
            aria-label="Open Aviance AI Concierge"
          >
            {/* Outer expanding pulsing radar wave */}
            <span className="absolute inset-0 rounded-full bg-[#58C1EB]/30 animate-ai-wave pointer-events-none" />

            {/* Subtle rotating brand halo aura (Cobalt, Cyan, Green) */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#204696] via-[#58C1EB] to-[#72BF44] opacity-80 blur-xs animate-ai-spin-slow pointer-events-none" />

            {/* Inner perfectly circular tactile button surface in Aviance Navy/Cobalt */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#081224] via-[#102754] to-[#204696] flex items-center justify-center overflow-hidden border-2 border-[#58C1EB]/80 shadow-inner">
              {/* Soft interior highlight */}
              <div className="absolute inset-0 rounded-full bg-radial from-white/35 via-transparent to-black/25 pointer-events-none" />

              {/* Shimmer sweep effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

              {/* Official Aviance Logo Emblem in Center */}
              <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <AvianceLogo variant="mark-only" size="sm" markSize={35} className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />

                {/* Modern "AI" Badge */}
                <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded-full bg-[#081224] text-[8.5px] font-mono font-black text-[#58C1EB] border border-[#58C1EB]/70 leading-none shadow-md">
                  AI
                </span>
              </div>
            </div>

            {/* Status Beacon Pip (Online 24/7 in Official Leaf Green) */}
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#72BF44] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#72BF44] border-2 border-slate-950 shadow-sm"></span>
            </span>
          </button>
        </div>
      )}

      {/* Expandable Chat Dialog Window */}
      {isOpen && (
        <div
          className="fixed bottom-5 right-5 z-50 w-[95vw] sm:w-[460px] h-[640px] max-h-[85vh] bg-[#0A162C] border border-[#204696]/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Aviance AI Multi-Turn Chatbot"
        >
          {/* Header with Official Aviance Logo */}
          <div className="p-4 bg-[#071120] border-b border-[#204696]/40 flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Official Aviance Brand Logo */}
                <div className="p-1 rounded-xl bg-[#0C1933] border border-[#204696]/60 shadow-sm">
                  <AvianceLogo variant="on-dark" size="sm" showSubtitle={false} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white tracking-tight">AI Concierge</span>
                    <button
                      onClick={() => setFastMode(!fastMode)}
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full border font-bold flex items-center gap-1 transition-colors ${
                        fastMode
                          ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-400'
                          : 'bg-[#58C1EB]/15 border-[#58C1EB]/40 text-[#58C1EB]'
                      }`}
                      title={fastMode ? 'Turbo Fast Response Active (<1s)' : 'Deep Reasoning Mode Active'}
                    >
                      <Zap className="w-2.5 h-2.5" />
                      <span>{fastMode ? 'Turbo (<1s)' : 'Deep AI'}</span>
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#72BF44]"></span>
                    <span>{currentRoleConfig.name}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Options, Reset, Close */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className={`p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${
                    settingsOpen ? 'bg-[#204696]/30 text-[#58C1EB]' : ''
                  }`}
                  title="Configure Model & Persona"
                  aria-label="Model and persona settings"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClearHistory}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Clear conversation history"
                  aria-label="Clear chat history"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Minimize chat"
                  aria-label="Minimize chat window"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Role Persona & Speed Configuration Bar / Dropdown */}
            {settingsOpen && (
              <div className="p-3 mt-1 bg-[#081224] border border-[#204696]/40 rounded-2xl space-y-3 text-xs animate-in fade-in duration-100">
                {/* Speed Mode Selector */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Response Speed Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setFastMode(true)}
                      className={`p-2 rounded-xl text-left border flex items-center gap-2 transition-colors ${
                        fastMode
                          ? 'bg-emerald-500/15 border-emerald-400 text-emerald-300 font-semibold'
                          : 'bg-[#0A162C] border-slate-800 text-slate-400'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <div>
                        <div className="text-[11px]">⚡ Turbo Fast</div>
                        <div className="text-[9px] text-slate-400">&lt; 1s instant replies</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setFastMode(false)}
                      className={`p-2 rounded-xl text-left border flex items-center gap-2 transition-colors ${
                        !fastMode
                          ? 'bg-[#204696]/30 border-[#58C1EB] text-[#58C1EB] font-semibold'
                          : 'bg-[#0A162C] border-slate-800 text-slate-400'
                      }`}
                    >
                      <Gauge className="w-3.5 h-3.5 text-[#58C1EB]" />
                      <div>
                        <div className="text-[11px]">🧠 Deep Reasoning</div>
                        <div className="text-[9px] text-slate-400">Multi-step analysis</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Select Specialist Persona
                  </label>
                  <div className="grid grid-cols-1 gap-1.5">
                    {(Object.keys(ROLE_CONFIGS) as ChatRole[]).map((rKey) => {
                      const cfg = ROLE_CONFIGS[rKey];
                      const Icon = cfg.icon;
                      const isSelected = role === rKey;
                      return (
                        <button
                          key={rKey}
                          onClick={() => handleRoleChange(rKey)}
                          className={`p-2 rounded-xl text-left border flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-[#58C1EB]/10 border-[#58C1EB]/40 text-[#58C1EB] font-semibold'
                              : 'bg-[#0A162C] border-slate-800/80 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5" />
                            <span>{cfg.name}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500">{cfg.recommendedModel}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Underlying Gemini Model
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-center font-mono text-[10px]">
                    <button
                      onClick={() => setModel('gemini-3.1-flash-lite')}
                      className={`p-2 rounded-lg border transition-colors ${
                        model === 'gemini-3.1-flash-lite'
                          ? 'bg-[#204696] text-white border-[#58C1EB] font-bold'
                          : 'bg-[#0A162C] border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      3.1-flash-lite
                      <span className="block text-[9px] font-sans font-normal opacity-80">High Speed (Recommended)</span>
                    </button>
                    <button
                      onClick={() => setModel('gemini-3.8-flash')}
                      className={`p-2 rounded-lg border transition-colors ${
                        model === 'gemini-3.8-flash'
                          ? 'bg-[#204696] text-white border-[#58C1EB] font-bold'
                          : 'bg-[#0A162C] border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      3.8-flash
                      <span className="block text-[9px] font-sans font-normal opacity-80">Comprehensive Reasoning</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Model active indicator pill */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Active Model: <strong className="text-slate-200">{model}</strong></span>
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#58C1EB]" />
                <span>{fastMode ? 'Latency: <1s' : 'Full Gemini Mode'}</span>
              </span>
            </div>
          </div>

          {/* Scrollable Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Official Aviance Logo Avatar for Assistant Responses */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#081224] to-[#163470] border border-[#204696]/60 flex items-center justify-center shrink-0 mt-0.5 shadow-md p-1.5">
                      <AvianceLogo variant="mark-only" size="sm" markSize={24} className="w-full h-full object-contain" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                        isUser
                          ? 'bg-[#204696] text-white border border-[#58C1EB]/40 font-medium rounded-tr-sm shadow-md'
                          : 'bg-[#071120] text-slate-200 border border-[#204696]/30 rounded-tl-sm shadow-md whitespace-pre-wrap'
                      }`}
                    >
                      {m.content}
                    </div>

                    <div className="flex items-center gap-2 px-1 text-[10px] text-slate-500 font-mono">
                      <span>{m.timestamp}</span>
                      {!isUser && m.modelUsed && (
                        <span>· {m.modelUsed}</span>
                      )}
                      {!isUser && (
                        <button
                          onClick={() => handleCopy(m.id, m.content)}
                          className="hover:text-[#58C1EB] transition-colors ml-1"
                          title="Copy reply text"
                        >
                          {copiedId === m.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Fast Loading / Typing indicator with animated Aviance Logo */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#081224] to-[#163470] border border-[#204696]/60 flex items-center justify-center shrink-0 shadow-md p-1.5 animate-pulse">
                  <AvianceLogo variant="mark-only" size="sm" markSize={24} className="w-full h-full object-contain" />
                </div>
                <div className="p-3.5 bg-[#071120] border border-[#204696]/30 rounded-2xl rounded-tl-sm flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#58C1EB] animate-bounce"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#204696] animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#72BF44] animate-bounce [animation-delay:0.4s]"></div>
                  <span className="ml-1.5 font-mono text-[10px] text-[#58C1EB]">Retrieving Aviance station operations...</span>
                </div>
              </div>
            )}

            {/* Error display */}
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3 shadow-lg">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1.5">
                  <div className="font-semibold text-rose-200">Processing Notice</div>
                  <div className="text-[11px] text-rose-300/90 leading-relaxed">{error}</div>
                  <button
                    onClick={() => {
                      const retryText =
                        lastUserPrompt ||
                        messages.filter((m) => m.role === 'user').slice(-1)[0]?.content;
                      if (retryText) handleSendMessage(retryText);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#204696] text-white border border-[#58C1EB]/40 font-bold text-[11px] hover:bg-[#183878] transition-colors shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry Last Query</span>
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompts Chips */}
          {messages.length <= 3 && !isLoading && (
            <div className="px-4 py-2 bg-[#071120]/80 border-t border-[#204696]/30 flex flex-wrap gap-1.5 text-[11px]">
              {currentRoleConfig.suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 rounded-full bg-[#0A162C] border border-[#204696]/40 hover:border-[#58C1EB] text-slate-300 hover:text-[#58C1EB] transition-colors text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <div className="p-3 bg-[#071120] border-t border-[#204696]/40">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask ${currentRoleConfig.name}...`}
                disabled={isLoading}
                className="flex-1 bg-[#0A162C] border border-[#204696]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB] transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2.5 bg-gradient-to-r from-[#204696] to-[#153472] hover:from-[#2653b0] hover:to-[#1a3d85] text-white border border-[#58C1EB]/40 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shrink-0 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-[#58C1EB]" />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500 font-mono px-1">
              <span>Enter to send · Instant Station Knowledge</span>
              <span className="text-[#58C1EB]/80 font-bold">Aviance Ghana</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
