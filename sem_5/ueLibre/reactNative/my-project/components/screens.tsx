import { Button, Text, View } from "react-native";
import FormulaireRegister from "./users/Register";
import FormulaireLogin from "./users/Login";
import ListCours from "./cours";
import AjouterCours from "./cours/AddCours";
import UpdateCours from "./cours/EditCours";

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

export function CoursScreen({navigation}){
    return(
        <View>
            <ListCours navigation={navigation}></ListCours>
        </View>
    );
}

export function AddCoursScreen({navigation}){
    return(
        <View>
            <AjouterCours navigation={navigation}></AjouterCours>
        </View>
    );
}

export function EditCoursScreen(props){
    const {navigation,route} = props;
    return(
        <View>
            <UpdateCours navigation={navigation} route={route}></UpdateCours>
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