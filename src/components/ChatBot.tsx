import React, { useState } from 'react';
import { Send, Close } from '@mui/icons-material';

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { content: input, role: 'user' }]);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { content: data.response, role: 'assistant' }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { content: "Sorry, I'm having trouble connecting to the server.", role: 'assistant' }
      ]);
    } finally {
      setLoading(false);
    }

    setInput('');
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${open ? 'w-80' : 'w-16'}`}>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-cyan-600 text-white p-3 rounded-full shadow-lg hover:bg-cyan-700 transition"
        aria-label="Open chat"
      >
        {open ? <Close /> : 'Chat'}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col h-96 w-80">
          <div className="p-4 flex-1 overflow-y-auto">
            {messages.length === 0 && (
              <div className="text-gray-500 dark:text-gray-400 text-sm text-center mt-12">
                Hi! Ask me anything about your scan, health, or this app.
              </div>
            )}
            {messages.map((msg: Message, idx: number) => (
              <div
                key={idx}
                className={`mb-3 p-2 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-cyan-100 dark:bg-cyan-900 ml-auto max-w-[80%]'
                    : 'bg-gray-100 dark:bg-gray-700 max-w-[90%]'
                }`}
              >
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  {msg.content}
                </p>
              </div>
            ))}
            {loading && (
              <div className="text-xs text-gray-400 dark:text-gray-500 italic">Thinking...</div>
            )}
          </div>
          <div className="border-t p-2 flex gap-2">
            <input
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === 'Enter' && !loading && handleSend()
              }
              placeholder="Type your question..."
              className="flex-1 p-2 text-sm bg-transparent focus:outline-none dark:text-gray-200"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className="p-2 text-cyan-600 dark:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              disabled={loading}
              aria-label="Send"
            >
              <Send fontSize="small" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
