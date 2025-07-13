import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Settings, HelpCircle } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { useUserProfile } from '../contexts/UserProfileContext';
import { AIAssistant } from '../services/AIAssistant';
import { ChatMessage } from '../types';

export const ChatAssistant: React.FC = () => {
  const { project } = useProject();
  const { userProfile, setUserProfile } = useUserProfile();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm your AI music production assistant. I can help you with chord progressions, mixing techniques, music theory, and arrangement ideas. Your project is in ${project.key} at ${project.bpm} BPM. What would you like to work on?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [aiAssistant] = useState(() => new AIAssistant());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = aiAssistant.generateResponse(inputMessage, project, userProfile);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    'Suggest chord progressions',
    'Help with mixing',
    'Explain music theory',
    'Arrangement ideas',
    'Song structure tips'
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="text-daw-accent" size={20} />
          <h3 className="font-semibold">AI Assistant</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <Settings size={16} />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded transition-colors">
            <HelpCircle size={16} />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <h4 className="font-medium mb-3">Assistant Settings</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Assistance Level</label>
              <select
                value={userProfile.preferences.assistanceLevel}
                onChange={(e) => setUserProfile(prev => ({
                  ...prev,
                  preferences: {
                    ...prev.preferences,
                    assistanceLevel: e.target.value as any
                  }
                }))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
              >
                <option value="minimal">Minimal</option>
                <option value="moderate">Moderate</option>
                <option value="comprehensive">Comprehensive</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Skill Level</label>
              <select
                value={userProfile.skillLevel}
                onChange={(e) => setUserProfile(prev => ({
                  ...prev,
                  skillLevel: e.target.value as any
                }))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`chat-message ${message.type === 'user' ? 'chat-user' : 'chat-ai'}`}>
              <div className="flex items-start space-x-2">
                {message.type === 'ai' && <Bot size={16} className="mt-1 flex-shrink-0" />}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.context?.suggestions && (
                    <div className="mt-2 space-y-1">
                      {message.context.suggestions.slice(0, 2).map((suggestion, index) => (
                        <div key={index} className="text-xs bg-black bg-opacity-20 rounded px-2 py-1">
                          💡 {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {message.type === 'user' && <User size={16} className="mt-1 flex-shrink-0" />}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="chat-message chat-ai">
              <div className="flex items-center space-x-2">
                <Bot size={16} />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400 mb-2">Quick Actions:</div>
        <div className="flex flex-wrap gap-1">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(action)}
              className="text-xs bg-gray-700 hover:bg-gray-600 rounded px-2 py-1 transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about music theory, mixing, or production..."
            className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm resize-none"
            rows={2}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="px-3 py-2 bg-daw-accent hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};