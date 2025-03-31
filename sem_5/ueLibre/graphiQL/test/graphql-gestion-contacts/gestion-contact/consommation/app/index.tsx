import client from "@/api/apolloClient";
import DashboardScreen from "@/components/auth/DashboardScreen";
import { AddContactScreens, Dashboard, HomeScreen, LoginScreen, RegisterScreen } from "@/components/screens";
import { ApolloProvider } from "@apollo/client";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator();


export default function Home() {
  return (
    <ApolloProvider client={client}>
      <Stack.Navigator>
        <Stack.Screen name = "accueil" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name = "login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name = "register" component={RegisterScreen}></Stack.Screen>
        <Stack.Screen name= "dashboard" component={Dashboard}></Stack.Screen>
        <Stack.Screen name="AddContact" component={AddContactScreens}></Stack.Screen>
      </Stack.Navigator>
      {/* <Text>Je suis à L'acceuil !</Text> */}
    </ApolloProvider>
  );
}
