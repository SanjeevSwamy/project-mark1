import React, { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

const API_URL = 'https://0a6f-101-0-62-160.ngrok-free.app/chat'; // Change this to your backend URL if needed

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    setMessages(prev => [...prev, { content: input, role: 'user' }]);
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

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

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSend();
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${open ? 'w-80' : 'w-auto'}`}>
{/* Floating Chat Button */}
<button
onClick={() => setOpen(!open)}
className="bg-cyan-600 text-white p-3 rounded-full shadow-lg hover:bg-cyan-700 transition"
aria-label={open ? "Close chat" : "Open chat"}
>
{open ? <CloseIcon /> : 'Chat With Me'}
</button>

      {/* Chat Window */}
      {open && (
        <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col h-96 w-80">
          <div className="p-4 flex-1 overflow-y-auto">
            {messages.length === 0 && !loading && (
              <div className="text-gray-500 dark:text-gray-400 text-sm text-center mt-12">
                Hi! Ask me anything about your scan, health, or this app.
              </div>
            )}
            {messages.map((msg: Message, idx: number) => (
              <div
                key={idx}
                className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-2 rounded-lg shadow
                    ${msg.role === 'user'
                      ? 'bg-cyan-600 text-white dark:bg-cyan-500'
                      : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'}
                    max-w-[80%] break-words
                  `}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center justify-center space-x-2 text-gray-400 dark:text-gray-500 mt-2">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-cyan-600"></div>
                <span className="text-xs italic">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t p-2 flex gap-2">
            <input
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Type your question..."
              className="flex-1 p-2 text-sm bg-transparent focus:outline-none dark:text-gray-200"
              disabled={loading}
              aria-label="Type your question"
            />
            <button
              onClick={handleSend}
              className="p-2 text-cyan-600 dark:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              disabled={loading}
              aria-label="Send"
            >
              <SendIcon fontSize="small" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
