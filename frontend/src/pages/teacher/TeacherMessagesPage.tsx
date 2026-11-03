import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { schoolStore } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Send, User } from 'lucide-react';
import type { ChatMessage } from '../../types';

export const TeacherMessagesPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(schoolStore.getMessages());
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = schoolStore.sendMessage(
      'T-01',
      'Mrs. Priya Sharma (Teacher)',
      'teacher',
      'USR-PRNT-1',
      'Mr. Sundaram Raman (Parent of Aarav)',
      inputText.trim()
    );

    setMessages([...schoolStore.getMessages()]);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100 flex flex-col">
      <Header title="Parent Communications" subtitle="Teacher Portal" />

      {/* Recipient Ribbon */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-4 py-2.5 max-w-md mx-auto w-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
            P
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Mr. Sundaram Raman
            </p>
            <p className="text-[10px] text-slate-400">
              Father of Aarav Sundaram (Class 8-A)
            </p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
          Active
        </span>
      </div>

      <main className="max-w-md mx-auto p-4 flex-1 w-full space-y-3 overflow-y-auto">
        {messages.map((msg) => {
          const isMe = msg.senderRole === 'teacher';

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

      {/* Message Input Box */}
      <div className="sticky bottom-16 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 p-3 max-w-md mx-auto w-full">
        <form onSubmit={handleSend} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message to parent..."
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
