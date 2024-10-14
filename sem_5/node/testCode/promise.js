// function wait(duration){
//     console.log("In wait ...");
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             if (duration > 2000){
//                 reject("Erreur");
//             }
//             // console.log("Stop ....");
//             resolve(duration);
//         },duration);
//     });
// }


// async function main() {
//     const val = await wait(1000)    
//     // await wait(1000)  
//     console.log(val);

//     const val1 = await wait(3000)
//     console.log(val1)
//     console.log("Fin du programme")    
// }

// main()


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




async function fetchOdds() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'eabded00demshb8d1f29ef9846ecp1dab10jsncdc131725948', // Remplacez par votre clé API.
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };
  
    try {
      const ans = await fetch('https://api-football-v1.p.rapidapi.com/v2/odds/league/865927/bookmaker/5?page=2', options);
      const ans_json = await ans.json();
      console.log(ans_json);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  }
  
  fetchOdds();
  


