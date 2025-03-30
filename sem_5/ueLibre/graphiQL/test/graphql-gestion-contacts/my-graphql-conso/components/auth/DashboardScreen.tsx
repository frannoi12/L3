import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_USER } from '@/api/queries';

const DashboardScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId, 
  });

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté en récupérant le token et l'ID de l'utilisateur
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token'); // Récupère le token depuis AsyncStorage
      if (token) {
        const storedUser = await AsyncStorage.getItem('user'); // Récupère l'utilisateur depuis AsyncStorage
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserId(user.id); // Met à jour l'ID de l'utilisateur
        }
      } else {
        Alert.alert('Erreur', 'Vous devez être connecté pour accéder au Dashboard');
        navigation.replace('Login'); // Redirige vers l'écran de login si pas de token
      }
    };

    fetchUser();
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token'); // Supprime le token
    await AsyncStorage.removeItem('user'); // Supprime les données de l'utilisateur
    navigation.replace('Login'); // Redirige vers la page de login
  };

  if (loading) return <Text>Chargement...</Text>; // Affiche un message pendant le chargement
  if (error) return <Text>Erreur : {error.message}</Text>; // Affiche une erreur en cas de problème

  return (
    <View style={styles.container}>
      {data && data.user ? (
        <>
          <Text style={styles.title}>Bienvenue, {data.user.name} !</Text>
          <Text style={styles.info}>Email : {data.user.email}</Text>
          <Button
            title="Voir mes contacts"
            onPress={() => navigation.navigate('Contacts')} // Ou l'écran où l'utilisateur peut voir ses contacts
          />
          <Button title="Se déconnecter" onPress={handleLogout} />
        </>
      ) : (
        <Text>Utilisateur non trouvé</Text>
      )}
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
  info: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default DashboardScreen;
