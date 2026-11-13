'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, SlidersHorizontal, X } from 'lucide-react';
import { Email, formatTime, getInitials } from '@/lib/mail-data';

interface EmailListProps {
  emails: Email[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  folder: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function EmailList({
  emails,
  selectedId,
  onSelect,
  folder,
  searchQuery,
  onSearchChange,
}: EmailListProps) {
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const [starred, setStarred] = useState<Record<string, boolean>>(
    Object.fromEntries(emails.map((e) => [e.id, e.starred]))
  );

  const filtered = emails.filter((e) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.from.name.toLowerCase().includes(q) ||
      e.subject.toLowerCase().includes(q) ||
      e.preview.toLowerCase().includes(q)
    );
  });

  const folderLabel = folder.charAt(0).toUpperCase() + folder.slice(1);
  const unreadCount = emails.filter((e) => !e.read).length;

  return (
    <div
      className="glass rounded-2xl flex flex-col h-full overflow-hidden"
      style={{ width: 310, flexShrink: 0 }}
    >
      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.92)' }}>
              {folderLabel}
            </h2>
            {unreadCount > 0 && (
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 1 }}>
                {unreadCount} unread
              </p>
            )}
          </div>
          <button className="glass-btn rounded-lg p-1.5">
            <SlidersHorizontal size={14} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={13}
            className="absolute"
            style={{ left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)', pointerEvents: 'none' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search mail…"
            className="glass-input w-full rounded-xl py-2"
            style={{ paddingLeft: 30, paddingRight: searchQuery ? 30 : 10, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                onClick={() => onSearchChange('')}
                className="absolute"
                style={{ right: 8, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', background: 'none', border: 'none', padding: 2 }}
              >
                <X size={12} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.055)', margin: '0 16px' }} />

      {/* Email list */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-32"
              style={{ color: 'rgba(255,255,255,0.28)', fontSize: 13 }}
            >
              <Search size={24} style={{ marginBottom: 8, opacity: 0.4 }} />
              No emails found
            </motion.div>
          ) : (
            filtered.map((email, i) => (
              <motion.div
                key={email.id}
                layout
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0, transition: { delay: i * 0.03, duration: 0.25 } }}
                exit={{ opacity: 0, x: -12 }}
                className={`email-row px-3 py-3 ${selectedId === email.id ? 'selected' : ''}`}
                onClick={() => onSelect(email.id)}
              >
                <div className="flex items-start gap-2.5">
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: email.from.color,
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#fff',
                      opacity: 0.9,
                    }}
                  >
                    {getInitials(email.from.name)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span
                        className="truncate"
                        style={{
                          fontSize: 13,
                          fontWeight: email.read ? 500 : 700,
                          color: email.read ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.92)',
                        }}
                      >
                        {email.from.name}
                      </span>
                      <span
                        suppressHydrationWarning
                        style={{
                          fontSize: 10.5,
                          color: 'rgba(255,255,255,0.32)',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}
                      >
                        {formatTime(email.timestamp)}
                      </span>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <div className="flex-1 min-w-0">
                        <div
                          className="truncate"
                          style={{
                            fontSize: 12.5,
                            fontWeight: email.read ? 400 : 600,
                            color: email.read ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.80)',
                            marginBottom: 2,
                          }}
                        >
                          {email.subject}
                        </div>
                        <div
                          className="truncate"
                          style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.32)', lineHeight: 1.4 }}
                        >
                          {email.preview}
                        </div>
                      </div>

                      {/* Right side: unread dot + star */}
                      <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                        {!email.read && <span className="unread-dot" />}
                        <motion.button
                          whileTap={{ scale: 0.75 }}
                          onClick={(ev) => {
                            ev.stopPropagation();
                            setStarred((prev) => ({ ...prev, [email.id]: !prev[email.id] }));
                          }}
                          onMouseEnter={() => setHoveredStar(email.id)}
                          onMouseLeave={() => setHoveredStar(null)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            color: starred[email.id] ? '#fbbf24' : (hoveredStar === email.id ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)'),
                            transition: 'color 0.15s',
                          }}
                        >
                          <Star
                            size={12}
                            fill={starred[email.id] ? 'currentColor' : 'none'}
                            strokeWidth={1.8}
                          />
                        </motion.button>
                      </div>
                    </div>

                    {/* Labels */}
                    {email.labels && email.labels.length > 0 && (
                      <div className="flex gap-1 mt-1.5 flex-wrap">
                        {email.labels.map((l) => (
                          <span key={l} className="label-chip">{l}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
