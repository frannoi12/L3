#!/bin/bash

# Définition des variables
contenu_de_etc="/etc"
Destination_des_copie="./fichiers_etc"
Fichier_log="./log"
Fichier_des_erreurs="./erreurs"

# Suppression des fichiers existants
[ -f "$Fichier_des_erreurs" ] && rm "$Fichier_des_erreurs"
[ -d "$Destination_des_copie" ] && rm -r "$Destination_des_copie"

# Création des nouveaux dossiers et fichiers
mkdir -p "$Destination_des_copie"
echo "Suppression de erreurs" >> "$Fichier_log"
echo "Suppression de fichiers_etc" >> "$Fichier_log"
echo "Création de fichiers_etc" >> "$Fichier_log"
echo "Initialisation terminée" >> "$Fichier_log"

# Copie des fichiers
for file in "$contenu_de_etc"/*; do
    if [ -d "$file" ]; then
        echo "$(basename "$file") D -> pas de copie" >> "$Fichier_des_erreurs"
    else
        cp "$file" "$Destination_des_copie" 2>> "$Fichier_des_erreurs" && echo "$(basename "$file") F -> copie du fichier" >> "$Fichier_log"
    fi
done
