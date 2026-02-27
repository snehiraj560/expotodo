import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { useNotes } from '../hooks/useNotes';
import { addNote } from '../services/notesService';
import NotesList from '../components/NotesList';
import AddNoteModal from '../components/AddNoteModal';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const { notes, loading } = useNotes(user?.uid);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveNote = useCallback(
    async (name: string, description: string) => {
      if (!user?.uid) return;
      try {
        await addNote(user.uid, name, description);
        setModalVisible(false);
        Alert.alert('Success', 'Note was successfully added');
      } catch {
        setModalVisible(false);
        Alert.alert('Error', 'Task failed');
      }
    },
    [user?.uid]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.title} testID="home-title">
          Notes
        </Text>
        <TouchableOpacity
          testID="add-note-button"
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <NotesList notes={notes} loading={loading} />
      </View>

      <View style={styles.footer}>
        {user?.email && (
          <Text style={styles.userEmail} testID="home-user-email">
            {user.email}
          </Text>
        )}
        <TouchableOpacity
          testID="signout-button"
          style={styles.signOutButton}
          onPress={signOut}
        >
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <AddNoteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveNote}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0066cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    lineHeight: 28,
  },
  content: {
    flex: 1,
  },
  footer: {
    padding: 20,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  signOutButton: {
    backgroundColor: '#dc3545',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
