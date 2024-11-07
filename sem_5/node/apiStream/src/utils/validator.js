
/**
 * @param {*} user
 * @param [{*}] rules
 */


const rules = {
    "name" : {
        validator: (_name) => typeof _name == 'string' && _name.length >= 3,
        message : "Le nom doit être une chaîne de caractère avec au moins 3 caractères !"
    },
    "email" : {
        // validator: (_name) => typeof _name == 'string' && (_email) => const emailRegex == /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        message : "Le email est invalide !"
    }
}




const userValidator = (user,rules) => {
    // const vali = Object.entries(rules["name"]["validator"])
    return new Proxy(user, {
        set(user,prop,new_value){
            const field_rule = rules[prop];
            if(typeof rules[prop] === "object"){
                if(field_rule.validator(new_value)){
                    return Reflect.set(user,prop,new_value);
                    // return true
                }
                throw new Error(field_rule.message)
                // console.log(field_rule.message);
                // return true;
            }
            throw new Error("Proprièté invalide !")
        }
    })
}

const user = userValidator({
    "name" : "toy",
    "email" : "fran@t"
},rules);

user.name = "aZER"



// const vali = Object.entries(rules["name"].validator)
// console.log(Object.entries(rules["name"].validator("tt")));



// console.log(Object.entries(rules["name"]["validator"]));
