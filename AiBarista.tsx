
import React, { useState, useRef, useEffect } from 'react';
import { getBaristaAdvice } from '../services/gemini';
import { ChatMessage } from '../types';

const AiBarista: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Halo! Saya Tomo, AI Barista Anda. Butuh saran kopi hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openAiBarista', handleOpen);
    return () => window.removeEventListener('openAiBarista', handleOpen);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await getBaristaAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-80 sm:w-96 h-[500px] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-[#D7CCC8]/30">
          <div className="bg-[#3E2723] p-5 text-[#FAF7F2] flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#D7CCC8] rounded-2xl mr-3 flex items-center justify-center shadow-inner">
                <span className="text-[#3E2723] font-bold text-sm">AI</span>
              </div>
              <div>
                <span className="font-bold block">Barista Tomo</span>
                <span className="text-[10px] opacity-70 uppercase tracking-widest">Online Sekarang</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#FAF7F2] hover:opacity-70 p-2 rounded-full hover:bg-white/10 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#FAF7F2]/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-[#3E2723] text-white rounded-tr-none shadow-md' 
                    : 'bg-white text-[#3E2723] rounded-tl-none shadow-sm border border-[#D7CCC8]/20'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-sm border border-[#D7CCC8]/20">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#3E2723]/40 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#3E2723]/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-[#3E2723]/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-white border-t border-[#D7CCC8]/20 flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tanya Barista Tomo..."
              className="flex-1 bg-[#FAF7F2] border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-[#3E2723] outline-none placeholder:text-[#5D4037]/40"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-[#3E2723] text-white p-3 rounded-2xl hover:bg-[#5D4037] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#3E2723] text-white p-4 rounded-2xl shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all flex items-center space-x-3 border-b-4 border-black/20"
        >
          <div className="relative">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#3E2723] rounded-full"></span>
          </div>
          <span className="hidden sm:inline font-bold tracking-wide">Tanya Barista Tomo</span>
        </button>
      )}
    </div>
  );
};

export default AiBarista;
