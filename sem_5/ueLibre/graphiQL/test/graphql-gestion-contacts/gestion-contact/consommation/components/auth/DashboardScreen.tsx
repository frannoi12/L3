import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, ScrollView, SafeAreaView } from 'react-native';
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
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserId(user.id);
        }
      } else {
        Alert.alert('Erreur', 'Vous devez être connecté pour accéder au Dashboard');
        navigation.replace('login');
      }
    };

    fetchUser();
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    navigation.replace('login');
  };

  if (loading) return <Text>Chargement...</Text>;
  if (error) return <Text>Erreur : {error.message}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {data?.user ? (
          <>
            <Text style={styles.title}>Bienvenue, {data.user.name} !</Text>
            <Text style={styles.info}>Email : {data.user.email}</Text>

            {/* Liste des contacts */}
            <Text style={styles.subtitle}>📞 Mes Contacts :</Text>
            {data.user.contacts.length > 0 ? (
              <FlatList
                data={data.user.contacts}
                keyExtractor={(contact) => contact.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactName}>📱 {item.phone}</Text>
                    <Text style={styles.contactAddress}>🏠 {item.address}</Text>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.noContacts}>Aucun contact trouvé.</Text>
            )}

            {/* 🟢 Boutons bien affichés en bas */}
            <View style={styles.buttonContainer}>
              <Button 
                title="Ajouter un Contact" 
                onPress={
                  () => {
                    navigation.navigate('AddContact');
                    console.log("Boutton ajoutter appuyé !!");
                  }
                } />
              <View style={styles.space} />
              <Button title="Se Déconnecter" onPress={handleLogout} color="red" />
            </View>
          </>
        ) : (
          <Text>Utilisateur non trouvé</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // 🟢 Correction ici
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  contactItem: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactAddress: {
    fontSize: 14,
    color: '#555',
  },
  noContacts: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  space: {
    width: 20,
  },
});

export default DashboardScreen;
