import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import type { Note } from '../hooks/useNotes';

type NotesListProps = {
  notes: Note[];
  loading: boolean;
};

const NoteItem = ({ note }: Readonly<{ note: Note }>) => (
  <View style={styles.noteCard} testID={`note-item-${note.id}`}>
    <Text style={styles.noteName} numberOfLines={1}>
      {note.name}
    </Text>
    {note.description ? (
      <Text style={styles.noteDescription} numberOfLines={2}>
        {note.description}
      </Text>
    ) : null}
  </View>
);

const NotesList = ({ notes, loading }: Readonly<NotesListProps>) => {
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  if (notes.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText} testID="notes-empty-text">
          No notes
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      testID="notes-list"
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NoteItem note={item} />}
      contentContainerStyle={styles.listContent}
    />
  );
};

export default NotesList;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  noteCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  noteName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  noteDescription: {
    fontSize: 14,
    color: '#666',
  },
});
