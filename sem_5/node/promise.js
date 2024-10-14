function wait(duration){
    console.log("In wait ...");
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if (duration > 2000){
                reject("Erreur");
            }
            // console.log("Stop ....");
            resolve(duration);
        },duration);
    });
}


async function main() {
    const val = await wait(1000)    
    // await wait(1000)  
    console.log(val);

    const val1 = await wait(3000)
    console.log(val1)
    console.log("Fin du programme")    
}

main()


// .then((resolve)=>{
//     console.log("Promesse résolu avec: ",resolve);
// })
// .catch((reject)=>{
//     console.log("Promesse rejetée avec: ",reject);
// });



// wait(2000)
// console.log("Out of wait ...");



// new Promise((resolve,reject)=>{
//     console.log("In promise ...");
//     // resolve(10)
//     reject("la")
// }).then((result)=>{
//     console.log(result);
//     console.log("Promesse resolu");
// })
// .catch((error)=>{
//     console.log(error);
//     console.error("Pomesse rejeté");
// }).finally(()=>{
//     console.log("Appelez dans tout les cas");
// })

// Promise()