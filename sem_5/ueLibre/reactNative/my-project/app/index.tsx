import { HomeScreen, LoginScreen, RegisterScreen } from "@/components/screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator();


export default function Home(){
  return(
    <Stack.Navigator>
      <Stack.Screen name = "index" component={HomeScreen}></Stack.Screen>
      <Stack.Screen name = "login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name = "register" component={RegisterScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}


// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Edit app/index.tsx to edit this screen.</Text>
//     </View>
//   );
// }
