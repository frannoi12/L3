import { Button, Text, View } from "react-native";
import FormulaireLoginScreen from "./auth/LoginScreen";
import FormulaireRegisterScreen from "./auth/SignScreen";

export function LoginScreen({navigation}){
    return(
        <View>
            <FormulaireLoginScreen navigation={navigation}></FormulaireLoginScreen>
            {/* <Text>Se Connecter</Text> */}
        </View>
    );
}



export function RegisterScreen({navigation}){
    return(
        <View>
            {/* <Text>S'inscrire'</Text> */}
            <br />
            <FormulaireRegisterScreen navigation={navigation}></FormulaireRegisterScreen>
        </View>
    );
}

export function HomeScreen({navigation}){
    return(
        <View>
            <Button title="Se connecter"
                onPress={()=>navigation.navigate('login')}
            ></Button>
            <Text>Où</Text>
            <Button title="S'inscrire"
                onPress={()=>navigation.navigate('register')}
            ></Button>
        </View>
    );
}