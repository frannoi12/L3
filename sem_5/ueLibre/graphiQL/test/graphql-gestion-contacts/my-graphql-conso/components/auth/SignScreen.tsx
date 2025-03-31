import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '@/api/mutations';

const FormulaireRegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signup, { loading, error }] = useMutation(SIGNUP);

  const handleSignup = async () => {
    try {
      const { data } = await signup({
        variables: { name, email, password },
      });

      if (data.signup.token) {
        // Sauvegarde du token dans AsyncStorage ou un contexte global
        Alert.alert("Inscription réussie", "Bienvenue !");
        navigation.replace('login');
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Erreur", "Impossible de créer le compte. Essayez à nouveau.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={loading ? 'Chargement...' : 'S\'inscrire'} onPress={handleSignup} />
      {error && <Text style={styles.error}>{error.message}</Text>}
      <Button
        title="Déjà un compte ? Se connecter"
        onPress={() => navigation.navigate('login')}
      />
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
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default FormulaireRegisterScreen;
