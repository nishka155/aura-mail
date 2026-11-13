'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Reply, Forward, Trash2, Archive, Star, MoreHorizontal,
  Paperclip, FileText, Image as ImageIcon, Code2, File, ArrowLeft,
} from 'lucide-react';
import { Email, formatTime, getInitials } from '@/lib/mail-data';

interface EmailReaderProps {
  email: Email | null;
  onReply: () => void;
  onDelete: () => void;
  onBack?: () => void;
}

function AttachIcon({ type }: { type: string }) {
  if (type === 'pdf')   return <FileText size={14} style={{ color: '#f87171' }} />;
  if (type === 'image') return <ImageIcon size={14} style={{ color: '#60a5fa' }} />;
  if (type === 'code')  return <Code2 size={14} style={{ color: '#a78bfa' }} />;
  return <File size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />;
}

function EmptyState() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-full gap-4"
      style={{ color: 'rgba(255,255,255,0.28)' }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.15)' }}
      >
        <span style={{ fontSize: 28 }}>✉</span>
      </div>
      <div className="text-center">
        <p style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>
          No message selected
        </p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>
          Choose an email from the list to read it
        </p>
      </div>
    </motion.div>
  );
}

export default function EmailReader({ email, onReply, onDelete, onBack }: EmailReaderProps) {
  return (
    <div className="glass rounded-2xl flex flex-col h-full overflow-hidden flex-1 min-w-0">
      <AnimatePresence mode="wait">
        {!email ? (
          <EmptyState key="empty" />
        ) : (
          <motion.div
            key={email.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            className="flex flex-col h-full"
          >
            {/* Top toolbar */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.055)' }}
            >
              <div className="flex items-center gap-2">
                {onBack && (
                  <motion.button
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onBack}
                    className="glass-btn rounded-lg p-1.5 mr-1"
                  >
                    <ArrowLeft size={14} />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onReply}
                  className="glass-btn rounded-lg flex items-center gap-1.5 px-3 py-1.5"
                  style={{ fontSize: 12, fontWeight: 500 }}
                >
                  <Reply size={13} />
                  Reply
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="glass-btn rounded-lg flex items-center gap-1.5 px-3 py-1.5"
                  style={{ fontSize: 12, fontWeight: 500 }}
                >
                  <Forward size={13} />
                  Forward
                </motion.button>
              </div>

              <div className="flex items-center gap-1.5">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.85 }}
                  className="glass-btn rounded-lg p-1.5"
                >
                  <Archive size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={onDelete}
                  className="glass-btn rounded-lg p-1.5"
                  style={{ color: '#f87171' }}
                >
                  <Trash2 size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.85 }}
                  className="glass-btn rounded-lg p-1.5"
                >
                  <MoreHorizontal size={14} />
                </motion.button>
              </div>
            </div>

            {/* Email content */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {/* Subject */}
              <motion.h1
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.05 } }}
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: 'rgba(255,255,255,0.93)',
                  lineHeight: 1.25,
                  marginBottom: 20,
                }}
              >
                {email.subject}
              </motion.h1>

              {/* Sender row */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.08 } }}
                className="flex items-center gap-3 mb-6"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: email.from.color, fontSize: 13, fontWeight: 700, color: '#fff' }}
                >
                  {getInitials(email.from.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.88)' }}>
                      {email.from.name}
                    </span>
                    {email.starred && (
                      <Star size={12} fill="#fbbf24" style={{ color: '#fbbf24' }} />
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.28)' }}>from </span>
                    {email.from.email}
                    <span style={{ color: 'rgba(255,255,255,0.28)' }}> · </span>
                    <span suppressHydrationWarning>{formatTime(email.timestamp)}</span>
                  </div>
                </div>

                {/* Labels */}
                {email.labels && email.labels.length > 0 && (
                  <div className="flex gap-1.5">
                    {email.labels.map((l) => (
                      <span key={l} className="label-chip">{l}</span>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.055)', marginBottom: 24 }} />

              {/* Body */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.12 } }}
                style={{ fontSize: 14.5, lineHeight: 1.72, color: 'rgba(255,255,255,0.75)', whiteSpace: 'pre-wrap' }}
              >
                {email.body.split('\n\n').map((paragraph, i) => (
                  <p key={i} style={{ marginBottom: 16 }}>
                    {paragraph.split('\n').map((line, j) => {
                      // Bold (**text**)
                      const parts = line.split(/(\*\*[^*]+\*\*)/g);
                      return (
                        <span key={j}>
                          {parts.map((part, k) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong
                                  key={k}
                                  style={{ fontWeight: 600, color: 'rgba(255,255,255,0.90)' }}
                                >
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            return <span key={k}>{part}</span>;
                          })}
                          {j < line.split('\n').length - 1 && <br />}
                        </span>
                      );
                    })}
                  </p>
                ))}
              </motion.div>

              {/* Attachments */}
              {email.attachments && email.attachments.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.18 } }}
                  className="mt-6"
                >
                  <div
                    className="flex items-center gap-1.5 mb-3"
                    style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.07em', textTransform: 'uppercase' }}
                  >
                    <Paperclip size={11} />
                    Attachments ({email.attachments.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {email.attachments.map((att) => (
                      <div key={att.name} className="attach-chip">
                        <AttachIcon type={att.type} />
                        <span style={{ fontWeight: 500 }}>{att.name}</span>
                        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>{att.size}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Reply bar */}
            <div
              style={{ borderTop: '1px solid rgba(255,255,255,0.055)', padding: '12px 24px' }}
            >
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onReply}
                className="w-full rounded-xl flex items-center gap-2 px-4 py-2.5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: 13,
                  cursor: 'text',
                  textAlign: 'left',
                  transition: 'background 0.15s',
                }}
              >
                <Reply size={13} style={{ flexShrink: 0 }} />
                Reply to {email.from.name.split(' ')[0]}…
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
