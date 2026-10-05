import { useMemo, useState } from 'react';
import { SendHorizonal, Sparkles } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/formatCurrency';

const suggestionPrompts = [
  'Where can I save money?',
  'Analyze my spending',
  'Can I afford ₹20,000?',
  'Summarize this month',
  'How is my budget doing?',
];

function generateAIResponse(input, totals) {
  const text = input.toLowerCase();

  if (text.includes('save money') || text.includes('save')) {
    return 'Your biggest cost center is Food, with ₹8,420 spent. Consider trimming 2-3 discretionary meals each week and redirecting that amount into savings.';
  }

  if (text.includes('spending') || text.includes('analyze')) {
    return `This month, your expenses are ${formatCurrency(totals.totalExpenses)} against income of ${formatCurrency(totals.totalIncome)}. Food and Shopping are your largest categories, together representing 48% of your spending.`;
  }

  if (text.includes('20,000') || text.includes('afford')) {
    return 'With a current balance of ₹75,420 and a savings rate of 29%, you can likely afford a ₹20,000 purchase while maintaining a healthy buffer.';
  }

  if (text.includes('summarize')) {
    return 'Your finances are healthy this month. Income is strong, spending is under control, and your savings remain positive at ₹17,420.';
  }

  if (text.includes('budget')) {
    return 'Your budgets are mostly under control. Food and Shopping are close to target, while Entertainment is near its spending limit, so a quick review would help.';
  }

  return 'Based on your latest spending patterns, your budget is stable and your savings trend remains positive. I can help you plan the next month with more detailed recommendations.';
}

export default function AIChat() {
  const { totalIncome, totalExpenses, balance, transactions } = useFinance();
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Hi! I can help you review your finances and suggest improvements for the month.' },
  ]);
  const [input, setInput] = useState('');

  const totals = useMemo(() => ({ totalIncome, totalExpenses, balance }), [totalIncome, totalExpenses, balance]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    const aiReply = { from: 'ai', text: generateAIResponse(input, totals) };
    setMessages((prev) => [...prev, userMessage, aiReply]);
    setInput('');
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-violet-400">AI assistant</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">FinTrack AI</h2>
        </div>
        <div className="rounded-xl border border-violet-500/40 bg-violet-500/10 p-2 text-violet-300"><Sparkles className="h-5 w-5" /></div>
      </div>

      <p className="mb-5 text-sm text-slate-400">Your personal financial assistant</p>

      <div className="mb-4 space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
        {messages.map((message, index) => (
          <div key={`${message.from}-${index}`} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${message.from === 'user' ? 'ml-auto bg-cyan-500/15 text-cyan-100' : 'bg-slate-800 text-slate-200'}`}>
            {message.text}
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {suggestionPrompts.map((prompt) => (
          <button key={prompt} type="button" onClick={() => setInput(prompt)} className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 transition hover:border-cyan-500 hover:text-cyan-300">{prompt}</button>
        ))}
      </div>

      <div className="flex gap-3">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about your finances..." className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none" />
        <button type="button" onClick={handleSend} className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-3 text-slate-950 font-semibold"><SendHorizonal className="h-4 w-4" /></button>
      </div>
    </div>
  );
}
