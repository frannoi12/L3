import fs from "fs/promises";
// import express from "express"
// import bordyParser from "body-parser"

import { PrismaClient} from "@prisma/client";




const prismaClient =  new PrismaClient()



async function seedRun(){
    const file = await fs.open('../seed/db_data_seed.json');
    const db_content = await file.readFile({
        encoding : "utf-8"
    });


    file.close();

    const list = JSON.parse(db_content);

    list.forEach(element => {
        prismaClient.artwork.create({
            data: element,
        });
        // console.log(element);
    });

    // const insert = await prismaClient.artwork.createMany(list)


    // console.log(list[0]);
    
}

seedRun()


// const app = express()
// const port = 3000;


// app.use(bordyParser.json())


// app.get('/add', async (req, res) => {
//     // Lecture du fichier existant
//     const file = await fs.open('../seed/db_data_seed.json');
//     const db_content = await file.readFile({
//         encoding : "utf-8"
//     });


//     file.close();

//     console.log(db_content);
    
//     res.json(db_content)
    
//     // res.json(list)
// });


// app.listen(port, ()=>{
//     console.log(`Server is running on localhost:${port}`);
// });

