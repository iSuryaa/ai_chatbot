import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchChatHistory, sendMessage } from '../api/chat';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const scrollToBottom = () => endRef.current?.scrollIntoView({ behavior: 'smooth' });

  // fetchHistory wrapped in useCallback to satisfy ESLint & reuse for button
  const fetchHistory = useCallback(async () => {
    try {
      const data = await fetchChatHistory();
      setMessages(data.messages || []);
      scrollToBottom();
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchHistory(); // called once on mount
  }, [fetchHistory]);

  const send = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input, temp: true };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const data = await sendMessage(userMsg.text);
      // append assistant and replace temp
      setMessages(prev => [...prev.filter(m => !m.temp), { role: 'user', text: userMsg.text }, { role: 'assistant', text: data.assistant.text }]);
      setLoading(false);
      scrollToBottom();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <header className="chat-header">
        <div>
          <button className='arrow-btn' onClick={fetchHistory}>
            <img src="images/down-arrow.png" alt="" />
          </button>
        </div>
      </header>
      <div className="chat-window">
        {messages.length === 0 && !loading && (
          <div className="bubble assistant welcome">
            I'm your support agent 👋 How can I help you today?
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.role === 'assistant' ? 'assistant' : 'user'}`}>
            {m.text}
          </div>
        ))}
        {loading && <div className="bubble assistant">Typing…</div>}
        <div ref={endRef} />
      </div>
      <form className="chat-input" onSubmit={send}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Write a message..." />
        <button type="submit" disabled={input === ""}>Send</button>
      </form>
    </div>
  );
}
