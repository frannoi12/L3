// function wait(duration) {
//   console.log("wait 1")
//   setTimeout(() => {
//     console.log("stop")
//   }, duration);
// }


// function wait2(duration) {
//   console.log("wait 2")
//   const prom = setTimeout(() => {
//     console.log("stop 2")
//   }, duration);
//   console.log(prom)
// }


// wait(1000)
// console.log("Hello")
// wait2(2000)
// console.log("500")


const lirFichier = new Promise((resolve,reject)=>{
  if(true){
    reject();
  }
  resolve();
}).then(()=>{
  console.log("Promesse resolve");  
}).catch(()=>{
  console.log("Promesse reject");
})

// console.log(lirFichier());