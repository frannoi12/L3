import fs from 'fs/promises';
import path from 'path';

// Fonction pour afficher l'arborescence de manière récursive
async function displayDirectoryTree(dirPath, indent = '') {
    const items = await fs.readdir(dirPath, { withFileTypes: true });

    // Boucle sur chaque élément du répertoire
    for (const item of items) {
        const itemPath = path.join(dirPath, item.name); // Obtenir le chemin complet du fichier où dossier

        if (item.isDirectory()) {
            // Si c'est un dossier, on l'affiche et on entre dedans
            console.log(`${indent}${item.name}/`);
            await displayDirectoryTree(itemPath, `${indent}  `); // Appel récursif pour afficher le contenu du dossier
        } else {
            // Si c'est un fichier simple, on l'affiche
            console.log(`${indent}${item.name}`);
        }
    }
}

async function main() {
    const rootDir = '../src'; 
    console.log(`Arborescence du répertoire ${rootDir}:`);
    await displayDirectoryTree(rootDir);
}

main().catch(error => console.error(error));
