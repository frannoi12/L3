import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../auth/AuthProvieders";

const ListCours = ({navigation}) => {

    const [dataCours, setDataCours] = useState([]);

    const {user} = React.useContext(AuthContext);

    useEffect(()=>{
        fetch('http://192.168.62.154:8080/api/cours', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((reponse)=>reponse.json())
        .then((data)=>{
            console.log(data);
            setDataCours(data);
        })
        .catch((error)=>{
            console.log(error);
        });
    },[])

    const deleteCours = async (id:number) => {
        try{
            const reponse = fetch(`http://192.168.62.154:8080/api/cours/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            setDataCours(dataCours.filter((cours)=>cours.id !== id));
        }catch(error){
            console.log(error);
        }
    }
    

    return(
        <View style={styles.container}>
            <Button title="Ajouter" 
                onPress={()=>{
                    navigation.navigate('addCours');
                    console.log("Ajouter");
                }}>
            </Button>
            <h2 style={styles.cell}> Listes Des Cours</h2>
            <View style={styles.row}>
                <Text style={styles.cell}> <b>ID</b> </Text>
                <Text style={styles.cell}> <b>Titre</b> </Text>
                <Text style={styles.cell}> <b>Description</b> </Text>
                <Text style={styles.cell}> <b>Prix</b> </Text>
                <Text style={styles.cell}> <b>Credit</b> </Text>
                <Text style={styles.cell}> <b>Action</b> </Text>
            </View>
            <FlatList
                data={dataCours}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item})=>(
                    <View style={styles.row}>
                        <Text style={styles.cell}>{item.id}</Text>
                        <Text style={styles.cell}>{item.titre}</Text>
                        <Text style={styles.cell}>{item.description}</Text>
                        <Text style={styles.cell}>{item.prix}</Text>
                        <Text style={styles.cell}>{item.credit}</Text>
                        <Text style={styles.cell}>
                            <Button
                            title="Supprimer"
                                onPress={()=>{
                                    deleteCours(item.id);
                                    console.log("Supprimer");
                                }}
                            >Supprimer</Button>
                            <Button
                                title="Modifier"
                                onPress={()=>{
                                    navigation.navigate('editCours', item);
                                    console.log("Modifier");
                                }}
                            ></Button>
                        </Text>
                    </View>
                )}
            ></FlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        borderCollapse: true,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    cell: {
        borderWidth: 1,
        borderColor: '#CCC',
        padding: 10,
        flex: 1,
        textAlign: 'center'
    }
});


export default ListCours;