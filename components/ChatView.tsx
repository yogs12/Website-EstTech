import React, { useState, useEffect, useRef, FormEvent } from 'react';
import type { Property, Message } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface ChatViewProps {
  property: Property;
  onBack: () => void;
}

const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ChatView: React.FC<ChatViewProps> = ({ property, onBack }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Initial welcome message from the agent
    setTimeout(() => {
      setMessages([
        {
          id: `agent-welcome-${Date.now()}`,
          text: t('chat.agentWelcome', property.title),
          sender: 'agent',
          timestamp: new Date(),
        },
      ]);
    }, 500);
  }, [property.title, t]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate agent response
    setIsAgentTyping(true);
    setTimeout(() => {
      const agentResponse: Message = {
        id: `agent-${Date.now()}`,
        text: t('chat.agentResponse'),
        sender: 'agent',
        timestamp: new Date(),
      };
      setIsAgentTyping(false);
      setMessages(prev => [...prev, agentResponse]);
    }, 2500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-0 animate-fade-in max-w-4xl mx-auto flex flex-col h-[75vh]">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <button onClick={onBack} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition duration-300 mr-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="flex-grow ml-2 overflow-hidden">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t('chat.title')}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{t('chat.regarding')}: {property.title}</p>
        </div>
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
            <i className="fas fa-user-tie"></i>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
        <div className="space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.sender === 'agent' && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm">A</div>
              )}
              <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl shadow-sm ${message.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                <p className="text-sm break-words">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'} text-right`}>{formatTime(message.timestamp)}</p>
              </div>
            </div>
          ))}
          {isAgentTyping && (
             <div className="flex items-end gap-2 justify-start animate-fade-in">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm">A</div>
                <div className="px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm">
                    <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0s]"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                    </div>
                </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-800">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('chat.inputPlaceholder')}
            className="flex-grow block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white border border-transparent rounded-full shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center transition duration-300 flex-shrink-0 disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed" disabled={!inputValue.trim() || isAgentTyping}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatView;
