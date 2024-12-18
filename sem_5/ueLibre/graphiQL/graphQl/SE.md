

Voici un résumé complet des notions pour t'aider à te préparer pour l'évaluation.

---

### **1. Fstab**

#### **Fonctionnement/Description générale :**

- **`fstab`** (File Systems Table) est un fichier de configuration qui décrit la manière dont les systèmes de fichiers doivent être montés au démarrage.
- Situé dans `/etc/fstab`, il permet d’automatiser le montage des disques et partitions.

#### **Commandes associées :**

1. **`mount`** :
    - Monte un système de fichiers.
    - Exemples :
        - `mount /dev/sda1 /mnt` : monte la partition `/dev/sda1` sur `/mnt`.
        - `mount -a` : monte toutes les entrées définies dans `/etc/fstab`.
2. **`lsblk`** :
    - Affiche une vue arborescente des périphériques de stockage.
    - Exemple : `lsblk` pour identifier les disques, partitions, et points de montage.

#### **Structure du fichier `fstab` :**

Chaque ligne correspond à un système de fichiers. Syntaxe :

```
<Disque ou UUID> <Point de montage> <Type de système de fichiers> <Options de montage> <Dump> <Pass>
```

- **Disque/UUID** :
    - Exemples : `/dev/sda1`, UUID (identifiant unique pour chaque partition, obtenu avec `blkid`).
- **Point de montage** : Où le système de fichiers est accessible (ex. `/mnt`, `/home`).
- **Type de système de fichiers** : ext4, xfs, ntfs, etc.
- **Options de montage** : Paramètres comme `defaults`, `noatime`, `ro` (lecture seule).
- **Dump** : Sauvegarde (0 ou 1).
- **Pass** : Ordre de vérification (`fsck` au démarrage, 0 pour ignorer).

#### **Notions importantes :**

- **UUID** : Identifiant unique pour les partitions (plus fiable que `/dev/sdX`).
- **Disque vs Partition** :
    - Disque : Matériel (ex. `/dev/sda`).
    - Partition : Portion logique (ex. `/dev/sda1`).
- **Point de montage** : Répertoire où une partition est accessible dans le système de fichiers.

---

### **2. Systemd**

#### **Fonctionnement/Description générale :**

- **Systemd** est un système d'init moderne pour gérer les services et démarrer les processus au démarrage.
- Centralise la gestion des services, des points de montage, des cgroups, etc.

#### **Commandes de gestion de base :**

1. **Administration des services :**
    - `systemctl start <service>` : Démarrer un service.
    - `systemctl stop <service>` : Arrêter un service.
    - `systemctl restart <service>` : Redémarrer un service.
    - `systemctl enable <service>` : Activer un service au démarrage.
    - `systemctl disable <service>` : Désactiver un service.
    - `systemctl status <service>` : Voir l’état d’un service.
2. **Logs :**
    - `journalctl` : Affiche les logs systemd.
    - Exemples :
        - `journalctl -u <service>` : Logs d’un service spécifique.
        - `journalctl -b` : Logs du dernier démarrage.

#### **Structure d’un fichier unité (service) :**

Fichiers situés dans `/etc/systemd/system/` ou `/lib/systemd/system/`. Structure :

```
[Unit]
Description=<Description du service>
After=<Dépendances>

[Service]
ExecStart=<Commande à exécuter>
Restart=<Politique de redémarrage>

[Install]
WantedBy=<Cible>
```

- **[Unit]** : Décrit le service et ses dépendances.
- **[Service]** : Définit comment le service est lancé.
- **[Install]** : Configuration pour activer le service.

---

### **3. Partitionnement**

#### **Notions importantes :**

- **Table de partition** : Structure qui décrit comment un disque est divisé (ex. MBR, GPT).
- **Partition** : Section logique d’un disque utilisée pour stocker des données.
- **Système de fichiers** : Organisation des données sur une partition (ex. ext4, xfs, ntfs).

#### **Sous-commandes `parted` :**

- `parted` : Outil pour gérer les partitions.
    - `mklabel gpt` : Crée une table de partition GPT.
    - `mkpart` : Crée une partition. Exemple :
        
        ```
        mkpart primary ext4 1MiB 100%
        ```
        
    - `print` : Affiche les partitions existantes.
    - `rm <num>` : Supprime une partition.

#### **Utilisation de `mkfs` :**

- Commande pour formater une partition avec un système de fichiers.
- Exemples :
    - `mkfs.ext4 /dev/sda1` : Formate `/dev/sda1` en ext4.
    - `mkfs.xfs /dev/sda2` : Formate `/dev/sda2` en xfs.

---

Avec ce résumé, tu devrais avoir une vue d'ensemble claire et organisée. Si tu veux approfondir une partie, n'hésite pas à demander ! 😊