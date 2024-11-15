import fs from "fs/promises";
import { PrismaClient} from "@prisma/client";
import fileUrl from "node:url";
import path from "node:path";




const prismaClient =  new PrismaClient()

const file_url = fileUrl.fileURLToPath(import.meta.url)
// console.log(file_url);

const dirn = path.dirname(file_url);
const seed_file_path = dirn+"/db_data_seed.json"

console.log(seed_file_path);


async function seedRun() {
    try {

        const file = await fs.open(seed_file_path);
        const db_content = await file.readFile({ encoding: "utf-8" });
        await file.close(); 

        const list = JSON.parse(db_content);


        await Promise.all(list.map(async (element) => {
            await prismaClient.artwork.create({
                data: element,
            });
        }));

        console.log("Données insérées avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'insertion des données :", error);
    } finally {
        await prismaClient.$disconnect();
    }
}

seedRun()


