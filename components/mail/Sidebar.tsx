'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Inbox, Send, FileText, Star, ShieldAlert, Trash2, Archive,
  Edit3, ChevronDown, Circle,
} from 'lucide-react';
import { FolderType, MOCK_EMAILS } from '@/lib/mail-data';

const FOLDERS: {
  id: FolderType;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: 'inbox',  label: 'Inbox',  icon: Inbox },
  { id: 'sent',   label: 'Sent',   icon: Send },
  { id: 'drafts', label: 'Drafts', icon: FileText },
  { id: 'spam',   label: 'Spam',   icon: ShieldAlert },
  { id: 'trash',  label: 'Trash',  icon: Trash2 },
];

interface SidebarProps {
  selected: FolderType;
  onSelect: (f: FolderType) => void;
  onCompose: () => void;
}

export default function Sidebar({ selected, onSelect, onCompose }: SidebarProps) {
  const counts = Object.fromEntries(
    FOLDERS.map(({ id }) => [
      id,
      MOCK_EMAILS.filter((e) => e.folder === id && !e.read).length,
    ])
  );

  return (
    <aside
      className="glass rounded-2xl flex flex-col h-full select-none"
      style={{ width: 220, flexShrink: 0 }}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-2.5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>A</span>
        </div>
        <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.92)' }}>
          Aura Mail
        </span>
      </div>

      {/* Compose button */}
      <div className="px-4 pb-5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onCompose}
          className="glass-btn-accent w-full rounded-xl flex items-center justify-center gap-2 py-2.5"
          style={{ fontSize: 13 }}
        >
          <Edit3 size={14} />
          Compose
        </motion.button>
      </div>

      {/* Section label */}
      <div
        className="px-5 pb-2"
        style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase' }}
      >
        Mailboxes
      </div>

      {/* Folders */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {FOLDERS.map(({ id, label, icon: Icon }) => (
          <div
            key={id}
            className={`folder-item ${selected === id ? 'active' : ''}`}
            onClick={() => onSelect(id)}
          >
            {/* Active indicator */}
            <AnimatePresence>
              {selected === id && (
                <motion.div
                  layoutId="folder-pill"
                  className="absolute inset-0 rounded-[10px]"
                  style={{ background: 'rgba(139, 92, 246, 0.16)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>

            <span className="relative z-10 flex items-center gap-2.5 w-full">
              <Icon size={15} strokeWidth={selected === id ? 2.2 : 1.8} />
              <span className="flex-1 truncate">{label}</span>
              {counts[id] > 0 && (
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    minWidth: 18,
                    height: 18,
                    borderRadius: 9,
                    background: id === selected ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.1)',
                    color: id === selected ? '#e9d5ff' : 'rgba(255,255,255,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 5px',
                  }}
                >
                  {counts[id]}
                </motion.span>
              )}
            </span>
          </div>
        ))}
      </nav>

      {/* Divider */}
      <div
        className="mx-4 my-3"
        style={{ height: 1, background: 'rgba(255,255,255,0.06)' }}
      />

      {/* Section label */}
      <div
        className="px-5 pb-2"
        style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase' }}
      >
        Tags
      </div>

      <nav className="px-3 space-y-0.5 pb-2">
        {['Design', 'Engineering', 'Finance', 'Product', 'Partnerships'].map((tag) => (
          <div key={tag} className="folder-item" style={{ fontSize: 12 }}>
            <Circle size={7} fill="currentColor" strokeWidth={0} style={{ opacity: 0.6 }} />
            <span>{tag}</span>
          </div>
        ))}
      </nav>

      {/* Profile */}
      <div
        className="mx-3 mb-4 mt-2 rounded-xl px-3 py-2.5 flex items-center gap-2.5"
        style={{ background: 'rgba(255,255,255,0.04)', cursor: 'pointer' }}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', fontSize: 11, fontWeight: 700, color: '#fff' }}
        >
          Me
        </div>
        <div className="flex-1 min-w-0">
          <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)', lineHeight: 1.2 }}>
            Your Account
          </div>
          <div className="truncate" style={{ fontSize: 11, color: 'rgba(255,255,255,0.40)' }}>
            me@aura.mail
          </div>
        </div>
        <ChevronDown size={13} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
      </div>
    </aside>
  );
}
