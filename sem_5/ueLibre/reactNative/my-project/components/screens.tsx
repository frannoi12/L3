import { Button, Text, View } from "react-native";
import FormulaireRegister from "./users/Register";
import FormulaireLogin from "./users/Login";

export function LoginScreen({navigation}){
    return(
        <View>
            <FormulaireLogin navigation={navigation}></FormulaireLogin>
            {/* <Text>Se Connecter</Text> */}
        </View>
    );
}



export function RegisterScreen({navigation}){
    return(
        <View>
            <Text>S'inscrire'</Text>
            <br />
            <FormulaireRegister navigation={navigation}></FormulaireRegister>
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