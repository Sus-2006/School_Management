import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { schoolStore } from '../../data/mockData';
import { Send, Phone } from 'lucide-react';
import type { ChatMessage } from '../../types';

export const ParentMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(schoolStore.getMessages());
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    schoolStore.sendMessage(
      'USR-PRNT-1',
      'Mr. Sundaram Raman (Parent)',
      'parent',
      'T-01',
      'Mrs. Priya Sharma (Teacher)',
      inputText.trim()
    );

    setMessages([...schoolStore.getMessages()]);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100 flex flex-col">
      <Header title="Class Teacher Messages" subtitle="Parent Portal" />

      {/* Teacher Banner */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-4 py-2.5 max-w-md mx-auto w-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
            PS
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Mrs. Priya Sharma
            </p>
            <p className="text-[10px] text-slate-400">
              Class Teacher & Maths Faculty (Class 8-A)
            </p>
          </div>
        </div>
        <a
          href="tel:9840112233"
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 hover:bg-slate-200"
          title="Call Teacher"
        >
          <Phone className="w-3.5 h-3.5" />
        </a>
      </div>

      <main className="max-w-md mx-auto p-4 flex-1 w-full space-y-3 overflow-y-auto">
        {messages.map((msg) => {
          const isMe = msg.senderRole === 'parent';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  isMe
                    ? 'bg-[#1e4ed8] text-white rounded-br-xs shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 rounded-bl-xs shadow-xs'
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-[9px] block text-right mt-1 ${
                    isMe ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}
      </main>

      {/* Input box */}
      <div className="sticky bottom-16 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 p-3 max-w-md mx-auto w-full">
        <form onSubmit={handleSend} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Write a message to Mrs. Priya Sharma..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white shrink-0 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <BottomNav />
    </div>
  );
};
