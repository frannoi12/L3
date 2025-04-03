import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CREATE_CONTACT } from '@/api/mutations';
import { GET_USER } from '@/api/queries';

const AddContactScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const { data: userData, refetch: refetchUser } = useQuery(GET_USER);


  const [createContact, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: async () => {
      Alert.alert('Succès', 'Contact ajouté avec succès !');
      navigation.replace('dashboard'); // Redirige vers le tableau de bord après le re-fetch
    },
    onError: (err) => {
      Alert.alert('Erreur', err.message);
    },
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
          name: name,
          phone: phone,
          address: address,
          userId: user.id, // Utilise l'ID récupéré de l'utilisateur
        },
      });
      await refetchUser({ variables: { id: user.id } }); // Re-fetch les contacts ici
    } catch (err) {
      Alert.alert('Erreur', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom du contact"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Numéro de Téléphone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse de la personne"
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