import fs from "node:fs/promises"
import express from "express"
import bordyParser from "body-parser"

// const express = require('express');

const app = express()
const port = 3000;


app.use(bordyParser.json())


app.get('/eleves', async (req, res) => {
    // console.log(fs.open('db.json','r'));
    const file = await fs.open('db.json');
    const db_content = await file.readFile({
        encoding : "utf-8"
    });
    file.close();

    console.log(typeof db_content)
    res.json(JSON.parse(db_content))
});




app.get('/elevesAdd', async (req, res) => {
    const newEleve = {
        id: 6, 
        nom: "DUPONT",
        prenom: "Marie",
        niveau: ["L1", "L2", "L3"]
    };

    // Lecture du fichier existant
    const file = await fs.open('db.json');
    const db_content = await file.readFile({
        encoding : "utf-8"
    });

    const list = JSON.parse(db_content)
    list.push(newEleve);

    file.close();


    await fs.writeFile('db.json', JSON.stringify(list, null, 2)); 

    res.json(JSON.parse(db_content))
    
    // res.json(list)
});


app.post('/elevesAjouter', async (req, res) => {
    const eleve_data = req.body;
    console.log(eleve_data)
    
    let file_db = await fs.open("db.json")
    const strig_elvs = await file_db.readFile({
        "encoding" : "utf-8"
    })
    file_db.close()

    const list_eleves = JSON.parse(strig_elvs)
    // console.log(list_eleves);
    list_eleves.push(eleve_data)
    console.log(list_eleves);

    let fil_db = await fs.open("db.json","w")
    await fil_db.writeFile(JSON.stringify(eleve_data))
    fil_db.close()

    res.send("Créer");
});










app.get('/', (req, res) => {

    const nom = req.query.nom;

    if (nom) {
        res.send(`Votre nom est ${nom}`);
    } else {
        res.send('Veuillez fournir un nom en utilisant le paramètre ?nom=votre_nom');
    }
});


// app.get('/eleves', (req, res) => {
//     // console.log(res);
//     res.send('Bonjour liste des eleves')
// });


// app.get('/eleve/:numero', (req, res) => {
//     const {numero} = req.params
//     // console.log(res);
//     res.send('Détail de l\'élève N°'+numero)
// });




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});