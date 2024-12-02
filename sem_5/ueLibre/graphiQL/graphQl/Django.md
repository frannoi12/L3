
Super ! Commençons par la **configuration initiale** du projet. Voici les étapes pour bien démarrer.

---

### **1. Créer le projet Django**

1. Assure-toi d’avoir un environnement virtuel actif (c’est une bonne pratique) :
    
    ```bash
    virtualenv venv
    source venv/bin/activate

    ```
    
2. Installe Django et psycopg2 (pour PostgreSQL) :
    
    ```bash
    pip install django psycopg2-binary
    ```
    
3. Crée un nouveau projet :
    
    ```bash
    django-admin startproject BlogCollaboratif
    cd BlogCollaboratif
    ```
    

---

### **2. Configurer PostgreSQL**

Dans le fichier `settings.py` du projet :

1. Remplace la section `DATABASES` par cette configuration :
    
    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'blog_db',
            'USER': 'toyi',
            'PASSWORD': 'krami',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }
    ```
    
2. Crée la base de données dans PostgreSQL :
    
    - Connecte-toi à PostgreSQL :
        
        ```bash
        psql -U toyi
        ```
        
    - Crée la base de données :
        
        ```sql
        CREATE DATABASE blog_db;
        ```

---

### **3. Créer l'application "users"**

1. Crée l’application `users` :
    
    ```bash
    python manage.py startapp users
    ```
    
2. Enregistre l’application dans `INSTALLED_APPS` de `settings.py` :
    
    ```python
    INSTALLED_APPS = [
        # Django apps par défaut
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        
        # Applications du projet
        'users',
    ]
    ```
    

---

### **4. Étendre le modèle utilisateur (optionnel mais recommandé)**

1. Dans l’application `users`, crée un fichier `models.py` et définis un modèle utilisateur personnalisé :
    
    ```python
    from django.contrib.auth.models import AbstractUser
    from django.db import models
    
    class CustomUser(AbstractUser):
        ROLE_CHOICES = [
            ('admin', 'Administrateur'),
            ('editor', 'Rédacteur'),
            ('reader', 'Lecteur'),
        ]
        role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='reader')
    
        def __str__(self):
            return f"{self.username} ({self.get_role_display()})"
    ```
    
2. Indique à Django d’utiliser ce modèle dans `settings.py` :
    
    ```python
    AUTH_USER_MODEL = 'users.CustomUser'
    ```
    

---

### **5. Appliquer les migrations**

1. Crée et applique les migrations :
    
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```
    

---

### **6. Tester l’installation**

1. Lance le serveur de développement :
    
    ```bash
    python manage.py runserver
    ```
    
2. Accède à `http://127.0.0.1:8000` pour vérifier que tout fonctionne.

---

## Implémentations des fonctionnalités.

### **1. Créer l’application `blog`**

1. Crée l'application `blog` :
    
    ```bash
    python manage.py startapp blog
    ```
    
2. Enregistre l’application dans `INSTALLED_APPS` de `settings.py` :
    
    ```python
    INSTALLED_APPS = [
        # Applications du projet
        'users',
        'blog',  # Ajoute cette ligne
    ]
    ```
    

---

### **2. Créer le modèle d'article**

1. Dans `blog/models.py`, ajoute un modèle pour les articles. Ce modèle contiendra les champs suivants :
    - `titre` : Le titre de l'article.
    - `contenu` : Le contenu de l'article.
    - `auteur` : L'utilisateur qui a écrit l'article.
    - `statut` : Le statut de l'article (par exemple, en attente, publié).
    - `date_de_creation` : La date de création de l'article.
    - `categorie` : Une catégorie pour organiser les articles.

Voici le code pour le modèle `Article` dans `blog/models.py` :

```python
from django.db import models
from users.models import CustomUser

class Categorie(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom

class Article(models.Model):
    STATUT_CHOICES = [
        ('draft', 'Brouillon'),
        ('published', 'Publié'),
    ]
    
    titre = models.CharField(max_length=255)
    contenu = models.TextField()
    auteur = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    statut = models.CharField(max_length=10, choices=STATUT_CHOICES, default='draft')
    date_de_creation = models.DateTimeField(auto_now_add=True)
    categorie = models.ForeignKey(Categorie, related_name='articles', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.titre
```

---

### **3. Appliquer les migrations pour le modèle Article**

1. Crée les migrations pour le modèle `Article` :
    
    ```bash
    python manage.py makemigrations blog
    ```
    
2. Applique les migrations :
    
    ```bash
    python manage.py migrate
    ```
    

---

### **4. Créer l'interface d'administration pour les articles**

1. Dans `blog/admin.py`, inscris les modèles `Article` et `Categorie` pour les rendre accessibles dans l’interface d’administration Django :
    
    ```python
    from django.contrib import admin
    from .models import Article, Categorie
    
    admin.site.register(Article)
    admin.site.register(Categorie)
    ```
    

---

### **5. Ajouter des vues pour afficher les articles**

Maintenant, on va créer des vues pour afficher les articles publiés.

1. Crée une vue dans `blog/views.py` pour afficher la liste des articles publiés et afficher un article en particulier :

```python
from django.shortcuts import render
from .models import Article

def liste_articles(request):
    articles = Article.objects.filter(statut='published').order_by('-date_de_creation')
    return render(request, 'blog/liste_articles.html', {'articles': articles})

def detail_article(request, article_id):
    article = Article.objects.get(id=article_id)
    return render(request, 'blog/detail_article.html', {'article': article})
```

2. Crée les URLs pour les vues dans `blog/urls.py` :
    
    ```python
    from django.urls import path
    from . import views
    
    urlpatterns = [
        path('', views.liste_articles, name='liste_articles'),
        path('article/<int:article_id>/', views.detail_article, name='detail_article'),
    ]
    ```
    
3. Dans `BlogCollaboratif/urls.py`, ajoute l'URL de l’application `blog` :
    
    ```python
    from django.contrib import admin
    from django.urls import path, include
    
    urlpatterns = [
        path('admin/', admin.site.urls),
        path('blog/', include('blog.urls')),  # Ajoute cette ligne
    ]
    ```
    

---

### **6. Créer les templates pour afficher les articles**

1. Crée le dossier `templates/blog/` dans l'application `blog`.
    
2. Crée le fichier `liste_articles.html` dans `blog/templates/blog/` pour afficher la liste des articles :
    
    ```html
    <h1>Liste des articles</h1>
    <ul>
    {% for article in articles %}
        <li><a href="{% url 'detail_article' article.id %}">{{ article.titre }}</a></li>
    {% endfor %}
    </ul>
    ```
    
3. Crée le fichier `detail_article.html` pour afficher les détails d'un article :
    
    ```html
    <h1>{{ article.titre }}</h1>
    <p>{{ article.contenu }}</p>
    <p>Publié par {{ article.auteur }} le {{ article.date_de_creation }}</p>
    <p><a href="{% url 'liste_articles' %}">Retour à la liste</a></p>
    ```
    

---

### **7. Tester la création des articles**

1. Crée un super utilisateur pour accéder à l’interface d’administration :
    
    ```bash
    python manage.py createsuperuser
    ```
    
2. Lance le serveur :
    
    ```bash
    python manage.py runserver
    ```
    
3. Accède à l’interface d’administration (`http://127.0.0.1:8000/admin/`) avec ton super utilisateur, crée des articles et des catégories.
    
4. Vérifie que tu peux afficher la liste des articles publiés sur `http://127.0.0.1:8000/blog/` et voir les détails d'un article à l'adresse `http://127.0.0.1:8000/blog/article/{id}/`.
    

---
