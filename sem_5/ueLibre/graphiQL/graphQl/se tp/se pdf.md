
## **Plan de la présentation détaillée**

### **1. Introduction à la récupération de données (5 min)**

**Qu’est-ce que la récupération de données ?**
    - C'est le processus de retrouver des fichiers ou des partitions perdues,supprimées ou corrompues.
    - Les causes de perte de données incluent :
        - Erreurs humaines (fichiers supprimés par accident).
        - Défaillances matérielles (disques endommagés).
        - Virus ou attaques malveillantes.
 **Importance :**
    - Récupérer des données critiques pour les entreprises ou les particuliers.
    - Répondre aux enjeux légaux, comme la protection de la vie privée.

---

### **2. Fonctionnement des supports de stockage et de la suppression (7 min)**

**Structure des supports de stockage :**
    - **Disques durs (HDD)** :
        - Données stockées sur des plateaux magnétiques.
        - Organisés en secteurs (unités de stockage de base) et clusters (ensembles de secteurs).
        - Un système de fichiers (ex. ext4) gère l'organisation des fichiers.
    - **Disques SSD** :
        - Pas de pièces mécaniques, utilise des cellules mémoire.
        - Effacement plus complexe (fonction TRIM).
 **Processus de suppression :**    
    - Quand un fichier est supprimé avec `rm` :
        - Les données restent sur le disque, mais l'entrée dans la table d'allocation est supprimée.
        - L'espace est marqué comme disponible, mais les données sont intactes jusqu'à réécriture.

---

### **3. Démonstrations pratiques (10 min)**

#### **a) Supprimer un fichier et le récupérer avec `testdisk`**

**Étape 1 : Préparation**

Crée un fichier test :
    ```bash
    echo "Données importantes" > test.txt
    ```
    
 Supprime-le avec `rm` :
    ```bash
    rm test.txt
    ```
    

**Étape 2 : Récupération avec `testdisk`**

 Installe `testdisk` :
    ```bash
    sudo apt install testdisk
    ```
    
 Lance l'outil :
    ```bash
    sudo testdisk
    ```
    
 Navigue dans l'interface pour :
    - Sélectionner le disque contenant le fichier supprimé.
    - Rechercher les fichiers supprimés.
    - Restaurer `test.txt`.

#### **b) Récupérer une partition supprimée**

**Étape 1 : Préparation avec GParted**

Crée une partition test :
    - Installe GParted :
        ```bash
        sudo apt install gparted
        ```
        
    - Crée une nouvelle partition via l'interface graphique.
 Supprime la partition via GParted.

**Étape 2 : Récupération avec `testdisk`**

 Suis les mêmes étapes que ci-dessus pour détecter les partitions supprimées.
 Restaure la partition.

---

### **4. Supprimer des données de manière sécurisée (5 min)**

 **Pourquoi la suppression normale n’est pas sûre :**
    
    - Les données restent accessibles avec des outils de récupération.
 **Supprimer un fichier de manière sécurisée avec `shred` :**
    ```bash
    shred -u test.txt
    ```
    
    - Le fichier est écrasé plusieurs fois avant suppression.
 **Effacer un disque entier avec `dd` ou `wipe` :**
    ```bash
    sudo dd if=/dev/zero of=/dev/sdX bs=1M
    ```
    
    - Cette commande remplace toutes les données du disque par des zéros.
 **Attention aux SSD :**
    
    - Utiliser la commande `blkdiscard` pour effacer les blocs inutilisés.

---

### **5. Présentation des outils de récupération (3 min)**

**TestDisk** :
    
    - Logiciel CLI gratuit pour récupérer des partitions et fichiers supprimés. 
    - 
**PhotoRec** :
    
    - Spécialisé dans la récupération de fichiers multimédia.
3. **extundelete** :
    
    - Récupération sur les systèmes de fichiers ext3/ext4.
4. **Logiciels avec interface graphique (facultatif) :**
    
    - `EaseUS` ou `Disk Drill` (sous Windows).

---

### **6. Conclusion (2 min)**

- **Résumé des points clés :**
    - Les données ne sont pas effacées immédiatement à la suppression.
    - Des outils comme `testdisk` permettent une récupération efficace.
    - Une suppression sécurisée est essentielle pour les données sensibles.

---

## **Matériel pour l'exposé**

**Diaporama :**
    - Présente les concepts théoriques avec des schémas pour les systèmes de fichiers.
 **Démo en direct :**
    - Prépare une machine virtuelle ou un disque dédié pour éviter les erreurs.
 **Script de secours :**
    - Prévois des commandes prêtes si une démo échoue.

Tu peux essayer chaque étape pour te familiariser. Si tu as besoin de modèles de slides ou d'un script détaillé pour ton diaporama, fais-moi signe !