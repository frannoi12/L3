FROM ubuntu:latest

# Mettre à jour le système et installer des paquets nécessaires
RUN apt-get update && apt-get install -y \
    curl \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de l'application (si nécessaire)
# COPY . .

# Commande par défaut (ajustez selon votre besoin)
CMD ["bash"]
