'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/mail/Sidebar';
import EmailList from '@/components/mail/EmailList';
import EmailReader from '@/components/mail/EmailReader';
import ComposeModal from '@/components/mail/ComposeModal';
import { MOCK_EMAILS, FolderType, Email } from '@/lib/mail-data';

export default function MailApp() {
  const [folder, setFolder]           = useState<FolderType>('inbox');
  const [selectedId, setSelectedId]   = useState<string | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [emails, setEmails]           = useState<Email[]>(MOCK_EMAILS);

  const folderEmails = useMemo(
    () => emails.filter((e) => e.folder === folder),
    [emails, folder]
  );

  const selectedEmail = useMemo(
    () => emails.find((e) => e.id === selectedId) ?? null,
    [emails, selectedId]
  );

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, read: true } : e))
    );
  }, []);

  const handleFolderChange = useCallback((f: FolderType) => {
    setFolder(f);
    setSelectedId(null);
    setSearchQuery('');
  }, []);

  const handleDelete = useCallback(() => {
    if (!selectedId) return;
    setEmails((prev) =>
      prev.map((e) =>
        e.id === selectedId ? { ...e, folder: 'trash' as FolderType } : e
      )
    );
    setSelectedId(null);
  }, [selectedId]);

  return (
    <div
      className="flex h-full"
      style={{ padding: 10, gap: 8, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } }}
        className="h-full"
        style={{ flexShrink: 0 }}
      >
        <Sidebar
          selected={folder}
          onSelect={handleFolderChange}
          onCompose={() => setComposeOpen(true)}
        />
      </motion.div>

      {/* Email list */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.35, delay: 0.06, ease: [0.25, 0.46, 0.45, 0.94] } }}
        className="h-full"
        style={{ flexShrink: 0 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={folder}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.22 } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
            className="h-full"
          >
            <EmailList
              emails={folderEmails}
              selectedId={selectedId}
              onSelect={handleSelect}
              folder={folder}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Email reader */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.35, delay: 0.10, ease: [0.25, 0.46, 0.45, 0.94] } }}
        className="flex-1 min-w-0 h-full"
      >
        <EmailReader
          email={selectedEmail}
          onReply={() => setComposeOpen(true)}
          onDelete={handleDelete}
        />
      </motion.div>

      {/* Compose modal */}
      <ComposeModal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
      />
    </div>
  );
}
