import { ref, push } from 'firebase/database';
import { database } from '../config/firebase';

export async function addNote(
  userId: string,
  name: string,
  description: string
): Promise<void> {
  const notesRef = ref(database, `notes/${userId}`);
  await push(notesRef, {
    name: name.trim(),
    description: description.trim(),
    createdAt: Date.now(),
  });
}
