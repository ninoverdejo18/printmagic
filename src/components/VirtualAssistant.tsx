import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Palette, PenTool, User, Minimize2, Maximize2, RefreshCw, ChevronRight, ChevronDown, ChevronUp, Minus, Volume2, VolumeX, Mic, MicOff, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const GraphicDesignerBotIcon = ({ className = "w-6 h-6", showHand = true }: { className?: string; showHand?: boolean }) => {
  return (
    <svg
      viewBox="0 0 40 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left Arm & Waving Hand */}
      {showHand && (
        <>
          <path
            d="M 10 21 C 5 20 3 15 4 10"
            stroke="#0F172A"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <g transform="translate(1, 3)">
            <circle cx="3.5" cy="5.5" r="2.2" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.2" />
            <path d="M 2 3.8 L 1 1.8" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 3.5 3.3 L 3.5 1" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 5 3.8 L 6 1.8" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
            {/* Waving sparkles */}
            <path d="M 0 1 L 1.5 2.5" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" />
          </g>
        </>
      )}

      {/* Right Arm holding Palette */}
      <path
        d="M 29 21 C 33 22 35 25 32 29"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="31.5" cy="28.5" r="2" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.2" />

      {/* Artist Beret Hat */}
      <path
        d="M 12 11 C 11 7 15 4.5 20 4.5 C 25 4.5 29 7 28 10.5 C 27.5 12 23.5 12.5 20 12.5 C 16.5 12.5 13 12 12 11 Z"
        fill="#F59E0B"
      />
      <circle cx="20" cy="3.5" r="1.5" fill="#D97706" />

      {/* Bot Body Frame */}
      <rect x="9" y="11" width="22" height="16" rx="4.5" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.5" />

      {/* Screen / Face Area */}
      <rect x="11.5" y="13.5" width="17" height="11" rx="3" fill="#0F172A" />

      {/* Glowing CMYK / Designer Eyes */}
      <circle cx="15.5" cy="18" r="2" fill="#06B6D4" />
      <circle cx="24.5" cy="18" r="2" fill="#EC4899" />

      {/* Smile */}
      <path
        d="M 18 21.5 C 18.5 22.3 21.5 22.3 22 21.5"
        stroke="#F8FAFC"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Bot Ears */}
      <rect x="6.5" y="16" width="2.5" height="6" rx="1" fill="#64748B" />
      <rect x="31" y="16" width="2.5" height="6" rx="1" fill="#64748B" />

      {/* Paint Palette in corner */}
      <g transform="translate(21, 19)">
        <circle cx="7" cy="7" r="6" fill="#FFF" stroke="#12941F" strokeWidth="1.3" />
        <circle cx="5" cy="5" r="1" fill="#EF4444" />
        <circle cx="8.5" cy="4.5" r="1" fill="#3B82F6" />
        <circle cx="9.5" cy="8" r="1" fill="#10B981" />
        <circle cx="6" cy="9" r="0.9" fill="#F59E0B" />
      </g>
    </svg>
  );
};

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

interface VirtualAssistantProps {
  setCurrentPage?: (page: string) => void;
  setSelectedServiceQuote?: (service: string) => void;
}

const INITIAL_GREETING = `Hello! Welcome to PrintMagic.
How may I help you today?

Please select from our main options:

[🛠️ Services]
[📋 Request a Quotation]
[🎨 Graphic Design]
[🖨️ Printing Services]
[🖼️ Portfolio / Completed Projects]
[❓ Frequently Asked Questions (FAQ)]
[🏢 About PrintMagic]
[📞 Contact Information]
[🕒 Business Hours]
[🪪 ID Application Links]
[💬 Chat with Our Team]`;

export default function VirtualAssistant({ 
  setCurrentPage, 
  setSelectedServiceQuote 
}: VirtualAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isQuickActionsMinimized, setIsQuickActionsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: INITIAL_GREETING,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const synthIntervalRef = useRef<any>(null);
  const activeUtterancesRef = useRef<SpeechSynthesisUtterance[]>([]);
  const scrollTimeoutRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 700);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const stopSpeaking = () => {
    if (!('speechSynthesis' in window)) return;
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    window.speechSynthesis.cancel();
    activeUtterancesRef.current = [];
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const speakText = (rawText: string) => {
    if (!('speechSynthesis' in window)) return;
    stopSpeaking();

    // Clean text for speech output (removing markdown, emojis, URLs, brackets)
    let spokenText = rawText
      .replace(/━{3,}/g, '')
      .replace(/\[([^\]]+)\]/g, '$1')
      .replace(/[#*`_~]/g, '')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/https?:\/\/\S+/g, 'our website')
      .trim();

    if (!spokenText) return;

    // Split text into natural sentence chunks to prevent browser cutoff bug (~10 second limit)
    const sentences = spokenText
      .split(/(?<=[.!?\n])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (sentences.length === 0) return;

    const voices = window.speechSynthesis.getVoices();
    let naturalVoice: SpeechSynthesisVoice | null = null;
    if (voices.length > 0) {
      naturalVoice = voices.find(v => 
        (v.lang.startsWith('en') || v.lang.startsWith('fil') || v.lang.startsWith('tl')) &&
        (v.name.toLowerCase().includes('natural') || 
         v.name.toLowerCase().includes('neural') || 
         v.name.toLowerCase().includes('google') || 
         v.name.toLowerCase().includes('enhanced') || 
         v.name.toLowerCase().includes('premium') || 
         v.name.toLowerCase().includes('online'))
      ) || voices.find(v => 
        (v.lang.startsWith('en') || v.lang.startsWith('fil') || v.lang.startsWith('tl')) &&
        (v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Jenny') || v.name.includes('Victoria') || v.name.includes('Zira') || v.name.includes('Ava') || v.name.includes('Daniel'))
      ) || voices.find(v => v.lang.startsWith('en') || v.lang.startsWith('fil') || v.lang.startsWith('tl')) || null;
    }

    setIsSpeaking(true);

    // Keep-alive timer to prevent Chrome speech synthesis timeout
    synthIntervalRef.current = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      } else if (!window.speechSynthesis.pending) {
        stopSpeaking();
      }
    }, 4000);

    const utterances: SpeechSynthesisUtterance[] = [];

    sentences.forEach((sentence, index) => {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.rate = 1.0;
      utterance.pitch = 1.02;

      if (naturalVoice) {
        utterance.voice = naturalVoice;
      }

      if (index === sentences.length - 1) {
        utterance.onend = () => {
          stopSpeaking();
        };
        utterance.onerror = () => {
          stopSpeaking();
        };
      }

      utterances.push(utterance);
      window.speechSynthesis.speak(utterance);
    });

    activeUtterancesRef.current = utterances;
  };

  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please type your message.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.warn(e);
        }
      }
      setIsListening(false);
      alert("Voice input turned OFF 🎤❌");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setInputValue(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          alert("Microphone access was blocked or denied. Please allow microphone access in your browser settings.");
        } else if (event.error === 'no-speech') {
          alert("No speech detected. Voice input stopped.");
        } else if (event.error !== 'aborted') {
          alert(`Voice input error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
      alert("Voice input turned ON 🎤✨ - Speak now into your microphone...");
    } catch (err) {
      console.error("Speech recognition error:", err);
      setIsListening(false);
      alert("Could not start voice input. Please ensure microphone access is allowed.");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    // Context switching triggers for app page navigation
    const lowerText = text.toLowerCase();
    if (lowerText === "home" || lowerText.includes("homepage") || lowerText === "go to home") {
      if (setCurrentPage) setCurrentPage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (lowerText === "services" || lowerText.includes("our services")) {
      if (setCurrentPage) setCurrentPage("services");
    }
    if (lowerText === "contact us" || lowerText.includes("contact us") || lowerText === "contact") {
      if (setCurrentPage) setCurrentPage("contact");
    }
    if (lowerText.includes("request a quotation") || lowerText.includes("request quotation") || lowerText.includes("quote")) {
      if (setSelectedServiceQuote) setSelectedServiceQuote("Printing");
    }

    try {
      // Send chat history to backend API
      const apiHistory = messages
        .filter(m => m.text && m.text.trim().length > 0)
        .map(m => ({
          role: m.sender === "user" ? "user" : "model",
          content: m.text
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPrompt: text,
          message: text,
          messages: apiHistory,
          history: apiHistory
        })
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();
      const botResponseText = data.reply || data.response || "Thank you for reaching out to PrintMagic. How else may we assist you today?";

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      if (isVoiceMode) {
        speakText(botResponseText);
      }
    } catch (err) {
      console.error("Chat API error:", err);
      // Fallback message
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "Thank you for contacting PrintMagic! We are happy to assist you with printing services, graphic design, and quotations. For immediate assistance, feel free to call us at 0926 022 6003 or email printmagiconline.service@gmail.com.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
      if (isVoiceMode) {
        speakText(fallbackMsg.text);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    if (!window.confirm("Clear chat?")) return;

    stopSpeaking();
    setMessages([
      {
        id: Date.now().toString(),
        sender: "bot",
        text: INITIAL_GREETING,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper function to render bracketed options as clickable buttons
  const renderFormattedText = (text: string) => {
    // Strip decorative separator bars like ━━━━━━━━━━━━━━━━━━
    const cleanedText = text.replace(/━{3,}/g, "").trim();
    const parts = cleanedText.split(/(\[[^\]]+\])/g);

    return (
      <div className="space-y-1.5 text-sm leading-relaxed w-full">
        {parts.map((part, idx) => {
          if (part.startsWith("[") && part.endsWith("]")) {
            const label = part.slice(1, -1);
            return (
              <button
                key={idx}
                onClick={() => handleSendMessage(label)}
                className="my-1 text-left w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 px-3.5 py-2.5 rounded-xl font-medium transition-all duration-150 flex items-center justify-between group shadow-xs text-sm"
              >
                <span>{label}</span>
                <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </button>
            );
          }
          const trimmed = part.trim();
          if (!trimmed) return null;
          return <span key={idx} className="block whitespace-pre-line leading-relaxed text-slate-800 font-normal">{trimmed}</span>;
        })}
      </div>
    );
  };

  return (
    <div className={`fixed bottom-5 right-5 z-50 font-sans transition-all duration-300 ${
      isScrolling ? "opacity-0 pointer-events-none translate-y-8 scale-90" : "opacity-100 pointer-events-auto translate-y-0 scale-100"
    }`}>
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 28, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.88, transition: { duration: 0.18, ease: "easeIn" } }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 28,
              mass: 0.85
            }}
            style={{ transformOrigin: "bottom right" }}
            className={`bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border-none transition-[height,width] duration-300 ease-out ${
              isMinimized ? "h-16 w-80 sm:w-96" : "h-[540px] w-[90vw] sm:w-[410px] max-w-[420px]"
            }`}
          >
            {/* Assistant Header */}
            <div className="bg-[#12941F] px-4 py-3 flex items-center justify-between shrink-0 text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white overflow-hidden p-0.5">
                    <GraphicDesignerBotIcon className="w-7 h-7" showHand={false} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-300 border-2 border-[#12941F] rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide">PrintMagic Assistant</h3>
                </div>
              </div>

              <div className="flex items-center gap-1 text-white">
                {!isMinimized && (
                  <>
                    <button
                      onClick={() => {
                        const nextMode = !isVoiceMode;
                        setIsVoiceMode(nextMode);
                        if (!nextMode) {
                          stopSpeaking();
                        } else if (nextMode && messages.length > 0) {
                          const lastBotMsg = [...messages].reverse().find(m => m.sender === "bot");
                          if (lastBotMsg) speakText(lastBotMsg.text);
                        }
                      }}
                      title={isVoiceMode ? "Voice Mode Active (Click to Mute)" : "Enable Voice Mode (Text-to-Speech)"}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors shrink-0 ${
                        isVoiceMode ? "bg-amber-400 text-slate-900 font-bold shadow-xs" : "hover:bg-white/20 text-white"
                      }`}
                    >
                      {isVoiceMode ? <Volume2 className="w-4 h-4 animate-pulse text-slate-900" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={handleResetChat}
                      title="Reset Menu"
                      className="w-7 h-7 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors text-white shrink-0"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? "Expand" : "Minimize"}
                  className="w-7 h-7 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors text-white shrink-0"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    stopSpeaking();
                    setIsOpen(false);
                  }}
                  title="Close"
                  className="w-7 h-7 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors text-white shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Quick Actions Chip Bar Component with Minimize Feature */}
                <div className="bg-slate-100/90 px-3 py-1.5 flex items-center justify-between text-xs transition-all border-b border-slate-200/50">
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth flex-1 mr-2">
                    <span title="Quick Actions" className="shrink-0 text-amber-500 flex items-center justify-center p-0.5">
                      <Zap className="w-3.5 h-3.5 fill-amber-400/30" />
                    </span>
                    {!isQuickActionsMinimized && (
                      <>
                        <button
                          onClick={() => handleSendMessage("menu")}
                          className="shrink-0 bg-[#12941F] hover:bg-[#0f7e1a] text-white px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors font-medium text-xs shadow-xs"
                        >
                          📋 Menu
                        </button>
                        <button
                          onClick={() => {
                            if (setCurrentPage) setCurrentPage("services");
                            handleSendMessage("Services");
                          }}
                          className="shrink-0 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors font-medium text-xs border border-slate-200 shadow-xs"
                        >
                          🎨 Services
                        </button>
                        <button
                          onClick={() => {
                            if (setCurrentPage) setCurrentPage("contact");
                            handleSendMessage("Contact Us");
                          }}
                          className="shrink-0 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors font-medium text-xs border border-slate-200 shadow-xs"
                        >
                          📞 Contact Us
                        </button>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => setIsQuickActionsMinimized(!isQuickActionsMinimized)}
                    title={isQuickActionsMinimized ? "Expand Quick Actions" : "Minimize Quick Actions"}
                    className="shrink-0 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 p-1 rounded-lg transition-colors flex items-center justify-center shrink-0"
                  >
                    {isQuickActionsMinimized ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                    ) : (
                      <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                </div>

                {/* Messages Body */}
                <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.sender === "bot" && (
                        <div className="w-7 h-7 rounded-full bg-[#12941F] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm overflow-hidden p-0.5 border border-emerald-400/30">
                          <GraphicDesignerBotIcon className="w-6 h-6" showHand={false} />
                        </div>
                      )}

                      <div
                        className={`rounded-2xl ${
                          msg.sender === "user"
                            ? "max-w-[85%] bg-[#12941F] text-white rounded-br-none px-4 py-2.5 shadow-sm text-sm"
                            : "flex-1 w-full bg-white text-slate-800 rounded-2xl rounded-tl-none p-3.5 shadow-sm"
                        }`}
                      >
                        {msg.sender === "bot" ? (
                          renderFormattedText(msg.text)
                        ) : (
                          <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        )}
                        <div className="flex items-center justify-between mt-1.5 text-[10px] text-slate-400">
                          {msg.sender === "bot" ? (
                            <button
                              onClick={() => speakText(msg.text)}
                              title="Listen to message"
                              className="text-slate-400 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                            >
                              <Volume2 className="w-3 h-3" />
                              <span>Listen</span>
                            </button>
                          ) : (
                            <span />
                          )}
                          <span>{msg.timestamp}</span>
                        </div>
                      </div>

                      {msg.sender === "user" && (
                        <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-2.5 justify-start">
                      <div className="w-7 h-7 rounded-full bg-[#12941F] flex items-center justify-center text-white shrink-0 shadow-sm overflow-hidden p-0.5 border border-emerald-400/30">
                        <GraphicDesignerBotIcon className="w-6 h-6" showHand={false} />
                      </div>
                      <div className="bg-white text-slate-600 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Footer */}
                <div className="p-3 bg-white border-t border-slate-100">
                  {isListening && (
                    <div className="mb-2 px-3 py-1.5 bg-red-50 text-red-700 text-xs rounded-lg flex items-center gap-2 animate-pulse border border-red-200">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                      <span className="font-medium">Listening... Speak now into your microphone</span>
                    </div>
                  )}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    <button
                      type="button"
                      onClick={toggleListening}
                      title={isListening ? "Stop Listening" : "Voice Input (Speak)"}
                      className={`p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 ${
                        isListening
                          ? "bg-red-500 text-white animate-pulse shadow-md"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {isListening ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-slate-600" />}
                    </button>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={isListening ? "Listening..." : "Type a message or speak..."}
                      className="flex-1 bg-slate-100 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#12941F] placeholder:text-slate-400 transition-all border-none"
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-[#12941F] hover:bg-[#0f7e1a] disabled:opacity-40 text-white p-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="chat-launcher"
            initial={{ opacity: 0, scale: 0.5, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 12, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative group flex flex-col items-end"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(true)}
              className="bg-[#12941F] hover:bg-[#0f7e1a] text-white p-3 rounded-full shadow-2xl border-2 border-emerald-400/40 flex items-center justify-center group transition-all duration-300 cursor-pointer"
              aria-label="Open Virtual Assistant"
            >
              <div className="relative flex items-center justify-center bg-white/20 p-1 rounded-full">
                <GraphicDesignerBotIcon className="w-7 h-7" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full border-2 border-[#12941F] animate-ping"></span>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
