import { Link } from "expo-router";
import { StyleSheet, Text, View, Image } from "react-native";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>On est en react native</Text>
      <Text style={styles.title}>Oui bonjour moi je suis là</Text>
      {/* <Image source={{uri:'http://reactnative.dev/img/tiny_logo.png'}}></Image> */}
      <Image source={require('../assets/images/react-logo.png')}></Image>
      <Link href={{pathname: '/propos'}}><Text>Propos</Text></Link>
    </View>
  );
}


const styles = StyleSheet.create({
  title:{
    textAlign:'left',
    color: 'blue',
  }
})