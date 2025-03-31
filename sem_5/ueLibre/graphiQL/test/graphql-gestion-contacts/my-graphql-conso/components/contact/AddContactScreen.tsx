import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CREATE_CONTACT } from '@/api/mutations';
import { GET_USER } from '@/api/queries';

const AddContactScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [createContact, { loading, error }] = useMutation(CREATE_CONTACT, {
    refetchQueries: [{ query: GET_USER }], // Met à jour le dashboard après ajout
  });

  const handleAddContact = async () => {
    const storedUser = await AsyncStorage.getItem('user');
    if (!storedUser) {
      Alert.alert('Erreur', 'Utilisateur introuvable.');
      return;
    }

    const user = JSON.parse(storedUser);

    try {
      await createContact({
        variables: {
          phone,
          address,
          userId: user.id,
        },
      });
      Alert.alert('Succès', 'Contact ajouté avec succès !');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Erreur', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Ajouter" onPress={handleAddContact} disabled={loading} />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default AddContactScreen;
