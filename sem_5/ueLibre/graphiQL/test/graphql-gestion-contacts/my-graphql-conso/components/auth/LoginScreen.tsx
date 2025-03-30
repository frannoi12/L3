import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@/api/mutations';

const FormulaireLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading, error }] = useMutation(LOGIN);

  const handleLogin = async () => {
    try {
      const { data } = await login({
        variables: { email, password },
      });

      if (data.login.token) {
        // Sauvegarde du token dans AsyncStorage ou un contexte global
        Alert.alert("Connexion réussie", "Bienvenue !");
        // Tu peux rediriger vers l'écran d'accueil par exemple
        navigation.replace('Home');
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Erreur", "Email ou mot de passe incorrect");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
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
      <Button title={loading ? 'Chargement...' : 'Se connecter'} onPress={handleLogin} />
      {error && <Text style={styles.error}>{error.message}</Text>}
      <Button
        title="Pas encore de compte ? S'inscrire"
        onPress={() => navigation.navigate('Register')}
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

export default FormulaireLoginScreen;
