import { AuthProvider } from "@/components/auth/AuthProvieders";
import { AddCoursScreen, CoursScreen, EditCoursScreen, HomeScreen, LoginScreen, RegisterScreen } from "@/components/screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();


export default function Home(){
  return(
    <AuthProvider>
      <Stack.Navigator>
        <Stack.Screen name = "index" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name = "login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name = "register" component={RegisterScreen}></Stack.Screen>
        <Stack.Screen name = "cours" component={CoursScreen}></Stack.Screen>
        <Stack.Screen name = "addCours" component={AddCoursScreen}></Stack.Screen>
        <Stack.Screen name = "editCours" component={EditCoursScreen}></Stack.Screen>
      </Stack.Navigator>
    </AuthProvider>
    
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
