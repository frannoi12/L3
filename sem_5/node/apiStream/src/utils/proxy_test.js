console.log("Mon premier proxy !!!");


const user = {
    name: "TOYI",
    age: 18,
    genre: "M"
}


const userProxy = new Proxy(user,{
    get(target, prop, recevier ) {
        // console.log("L'attribut " + prop + " à été accédé");
        // console.log(target);
        // console.log(recevier);
        
        if (prop == "name"){
            return target[prop]
        }
        if (prop == "genre"){
            return target[prop]
        }

        if (prop == "age"){
            target[prop] = target[prop]/2
        }
        
        return Reflect.get(target,prop);
    },

    set(target, prop, value){
        console.log(arguments);
        // return true;
        return Reflect.set(target,prop,value);
    }
    
})


// console.log(userProxy);


// console.log(userProxy.name);
console.log(userProxy.age);

userProxy.age = 3

console.log(userProxy);


// user.age=-28;

console.log([{...user}]);

