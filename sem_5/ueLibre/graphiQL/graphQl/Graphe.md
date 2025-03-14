

<<<<<<< HEAD
Cet exercice porte sur un graphe orienté défini par les relations de divisibilité entre les éléments de l'ensemble S={1,2,…,n}S = \{1, 2, \dots, n\}. Voici un résumé et une piste pour chaque question :

### 1. **Dictionnaire des prédécesseurs, matrice d’adjacence et représentation sagittale pour n=6n = 6 :**

- **Dictionnaire des prédécesseurs** : Pour chaque sommet tt, lister les sommets ss tels que s∣ts \mid t.
- **Matrice d'adjacence** : Matrice AA où A[i][j]=1A[i][j] = 1 si i∣ji \mid j, sinon 00.
- **Représentation sagittale** : Dessiner un graphe orienté où une flèche s→ts \to t existe si s∣ts \mid t.

### 2. **Caractérisation de la propriété « ss et tt sont premiers entre eux » :**

Deux sommets ss et tt sont premiers entre eux si leur plus grand commun diviseur (pgcd(s,t)\text{pgcd}(s, t)) est égal à 11.

### 3. **Caractérisation de la propriété « ss est premier » à l’aide des prédécesseurs :**

Un sommet ss est premier si ses seuls prédécesseurs sont 11 et lui-même.

### 4. **Valuation des arcs et décomposition en facteurs premiers :**

- La valuation y/xy/x représente le quotient t/st/s lorsque s→ts \to t.
- Pour retrouver la décomposition en facteurs premiers d’un nombre tt, suivre les arcs à partir de 11 jusqu’à tt, en enregistrant les valuations associées aux arcs.
=======
Cet exercice porte sur un graphe orienté défini par les relations de divisibilité entre les éléments de l'ensemble \( S = \{1, 2, \dots, n\} \). Voici un résumé et une piste pour chaque question :

### 1. *Dictionnaire des prédécesseurs, matrice d’adjacence et représentation sagittale pour \( n = 6 \) :*
- *Dictionnaire des prédécesseurs* : Pour chaque sommet \( t \), lister les sommets \( s \) tels que \( s \mid t \).
- *Matrice d'adjacence* : Matrice \( A \) où \( A[i][j] = 1 \) si \( i \mid j \), sinon \( 0 \).
- *Représentation sagittale* : Dessiner un graphe orienté où une flèche \( s \to t \) existe si \( s \mid t \).

### 2. *Caractérisation de la propriété « \( s \) et \( t \) sont premiers entre eux » :*
Deux sommets \( s \) et \( t \) sont premiers entre eux si leur plus grand commun diviseur (\( \text{pgcd}(s, t) \)) est égal à \( 1 \).

### 3. *Caractérisation de la propriété « \( s \) est premier » à l’aide des prédécesseurs :*
Un sommet \( s \) est premier si ses seuls prédécesseurs sont \( 1 \) et lui-même.

### 4. *Valuation des arcs et décomposition en facteurs premiers :*
- La valuation \( y/x \) représente le quotient \( t/s \) lorsque \( s \to t \).
- Pour retrouver la décomposition en facteurs premiers d’un nombre \( t \), suivre les arcs à partir de \( 1 \) jusqu’à \( t \), en enregistrant les valuations associées aux arcs.
>>>>>>> ad86bbd43fd787cfd3e96c8ab38b3a5296f35a3e

Souhaitez-vous que je développe en détail l'une des questions, ou fournir une implémentation Python pour générer ce graphe ?