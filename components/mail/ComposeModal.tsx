'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2, Paperclip, Send, ChevronDown } from 'lucide-react';

interface ComposeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ComposeModal({ open, onClose }: ComposeModalProps) {
  const [minimized, setMinimized] = useState(false);
  const [to, setTo]           = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody]       = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!to || !subject) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSent(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSent(false);
    setTo(''); setSubject(''); setBody('');
    onClose();
  };

  const canSend = to.trim() !== '' && subject.trim() !== '' && !sending;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="compose"
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{
            opacity: 1,
            scale: minimized ? 0.95 : 1,
            y: minimized ? 320 : 0,
            transition: { type: 'spring', stiffness: 420, damping: 32 },
          }}
          exit={{ opacity: 0, scale: 0.88, y: 24, transition: { duration: 0.2, ease: 'easeIn' } }}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: 520,
            height: minimized ? 48 : 480,
            zIndex: 50,
            overflow: 'hidden',
            borderRadius: 18,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.25)',
          }}
          className="glass"
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{ borderBottom: minimized ? 'none' : '1px solid rgba(255,255,255,0.065)', cursor: minimized ? 'pointer' : 'default' }}
            onClick={minimized ? () => setMinimized(false) : undefined}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.80)' }}>
              New Message
            </span>
            <div className="flex items-center gap-1">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={(e) => { e.stopPropagation(); setMinimized((v) => !v); }}
                className="rounded-lg p-1.5"
                style={{ background: 'rgba(255,255,255,0.07)', border: 'none', color: 'rgba(255,255,255,0.55)', cursor: 'pointer', transition: 'background 0.15s' }}
              >
                {minimized ? <Maximize2 size={12} /> : <Minus size={12} />}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={onClose}
                className="rounded-lg p-1.5"
                style={{ background: 'rgba(255,255,255,0.07)', border: 'none', color: 'rgba(255,255,255,0.55)', cursor: 'pointer', transition: 'background 0.15s' }}
              >
                <X size={12} />
              </motion.button>
            </div>
          </div>

          {/* Body — hidden when minimized */}
          <AnimatePresence>
            {!minimized && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.08 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="flex flex-col flex-1 overflow-hidden"
              >
                {/* Fields */}
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.055)' }}>
                  <FieldRow label="To">
                    <input
                      type="email"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="recipient@email.com"
                      style={{
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                        fontSize: 13,
                        color: 'rgba(255,255,255,0.80)',
                        width: '100%',
                      }}
                    />
                    <button
                      style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}
                    >
                      Cc Bcc <ChevronDown size={10} />
                    </button>
                  </FieldRow>
                  <FieldRow label="Subject">
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="What's this about?"
                      style={{
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                        fontSize: 13,
                        color: 'rgba(255,255,255,0.80)',
                        width: '100%',
                        fontWeight: 500,
                      }}
                    />
                  </FieldRow>
                </div>

                {/* Body textarea */}
                <textarea
                  ref={bodyRef}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your message…"
                  className="compose-textarea flex-1 px-5 py-4"
                  style={{ minHeight: 0 }}
                />

                {/* Footer */}
                <div
                  className="flex items-center justify-between px-4 py-3 flex-shrink-0"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.055)' }}
                >
                  <div className="flex items-center gap-1.5">
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.9 }}
                      className="glass-btn rounded-lg p-1.5"
                    >
                      <Paperclip size={13} />
                    </motion.button>
                  </div>

                  <motion.button
                    whileHover={canSend ? { scale: 1.03 } : {}}
                    whileTap={canSend ? { scale: 0.96 } : {}}
                    onClick={handleSend}
                    disabled={!canSend}
                    className="rounded-xl flex items-center gap-2 px-4 py-2"
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: canSend ? 'pointer' : 'not-allowed',
                      background: canSend
                        ? 'rgba(139, 92, 246, 0.85)'
                        : 'rgba(255,255,255,0.08)',
                      border: `1px solid ${canSend ? 'rgba(167,139,250,0.4)' : 'rgba(255,255,255,0.08)'}`,
                      color: canSend ? '#fff' : 'rgba(255,255,255,0.3)',
                      transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                      boxShadow: canSend ? '0 4px 20px rgba(139,92,246,0.35)' : 'none',
                    }}
                  >
                    {sent ? (
                      <motion.span
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                      >
                        ✓ Sent
                      </motion.span>
                    ) : sending ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          style={{ display: 'inline-block', width: 12, height: 12, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                        />
                        Sending…
                      </span>
                    ) : (
                      <>
                        <Send size={12} />
                        Send
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-2.5"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.045)' }}
    >
      <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.32)', width: 46, flexShrink: 0 }}>
        {label}
      </span>
      <div className="flex-1 flex items-center gap-2 min-w-0">{children}</div>
    </div>
  );
}
