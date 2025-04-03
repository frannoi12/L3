import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_USER } from '@/api/queries';
import { DELETE_CONTACT } from '@/api/mutations';

const DashboardScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  
  const { data, loading, error, refetch } = useQuery(GET_USER, {
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

  const [deleteContact] = useMutation(DELETE_CONTACT, {
    onCompleted: () => {
      Alert.alert('Succès', 'Contact supprimé avec succès');
      refetch();
    },
    onError: (error) => {
      Alert.alert('Erreur', error.message);
    }
  });

  const handleDelete = (contactId) => {
    console.log("ID du contact à supprimer :", contactId);
    Alert.alert('Confirmation', 'Voulez-vous vraiment supprimer ce contact ?', [
      { text: 'Annuler', style: 'cancel' },
      { 
        text: 'Supprimer', 
        onPress: async () => {
          try {
            const { data } = await deleteContact({
              variables: { id: contactId },
            });
            console.log("Réponse de suppression:", data);
          } catch (err) {
            console.error("Erreur lors de la suppression:", err);
            Alert.alert('Erreur', err.message);
          }
        } 
      }
    ]);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    navigation.replace('login');
  };

  if (loading) return <Text>Chargement...</Text>;
  if (error) return <Text>Erreur : {error.message}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      {data?.user ? (
        <>
          <Text style={styles.title}>Bienvenue, {data.user.name} !</Text>
          <Text style={styles.info}>Email : {data.user.email}</Text>

          <View style={styles.buttonContainer}>
            <Button title="Ajouter un Contact" onPress={() => navigation.navigate('AddContact')} />
            <View style={styles.space} />
            <Button title="Se Déconnecter" onPress={handleLogout} color="red" />
          </View>

          <Text style={styles.subtitle}>📞 Mes Contacts :</Text>
          {data?.user?.contacts?.length > 0 ? (
            <FlatList
              data={data.user.contacts}
              keyExtractor={(contact) => contact.id.toString()}
              contentContainerStyle={{ flexGrow: 1 }}
              renderItem={({ item }) => (
                <View style={styles.contactItem}>
                  <Text style={styles.contactName}>😊 {item.name}</Text>
                  <Text style={styles.contactPhone}>📱 {item.phone}</Text>
                  <Text style={styles.contactAddress}>🏠 {item.address}</Text>
                  <View style={styles.buttonGroup}>
                    <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={() => navigation.navigate('UpdateContact', { contact: item })}>
                      <Text style={styles.buttonText}>Modifier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDelete(item.id)}>
                      <Text style={styles.buttonText}>Supprimer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.showButton]} onPress={() => navigation.navigate('ShowContact', { contact: item })}>
                      <Text style={styles.buttonText}>Voir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noContacts}>Aucun contact trouvé.</Text>
          )}
        </>
      ) : (
        <Text>Utilisateur non trouvé</Text>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  info: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  subtitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  contactItem: { backgroundColor: '#f8f9fa', padding: 10, borderRadius: 8, marginVertical: 5 },
  contactName: { fontSize: 16, fontWeight: 'bold' },
  contactPhone: { fontSize: 14, color: '#555' },
  contactAddress: { fontSize: 14, color: '#555' },
  noContacts: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  button: { flex: 1, padding: 8, borderRadius: 5, alignItems: 'center', marginHorizontal: 5 },
  updateButton: { backgroundColor: '#007bff' },
  deleteButton: { backgroundColor: '#dc3545' },
  showButton: { backgroundColor: '#28a745' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  space: { width: 20 },
});

export default DashboardScreen;
