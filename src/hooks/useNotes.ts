import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';

export type Note = {
  id: string;
  name: string;
  description: string;
  createdAt: number;
};

export const useNotes = (userId: string | undefined) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setNotes([]);
      setLoading(false);
      return;
    }

    const notesRef = ref(database, `notes/${userId}`);

    const unsubscribe = onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list: Note[] = Object.entries(data).map(([id, val]) => {
          const note = val as { name: string; description: string; createdAt: number };
          return {
            id,
            name: note.name ?? '',
            description: note.description ?? '',
            createdAt: note.createdAt ?? 0,
          };
        });
        list.sort((a, b) => b.createdAt - a.createdAt);
        setNotes(list);
      } else {
        setNotes([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return { notes, loading };
};
