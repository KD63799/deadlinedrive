# API Deadline Drive

## Description

Bienvenue dans la documentation de l'API RESTful de Deadline Drive. Cette API permet de gérer les utilisateurs, les citations, les commentaires, les catégories, les deadlines, et les tâches. Conçue selon les normes REST, elle est accessible via des requêtes HTTP standard, avec les données retournées en format JSON pour une intégration facile dans toute application ou site web. Dans les sections suivantes, nous détaillerons les différentes fonctionnalités et routes de l'API, ainsi que des exemples de requêtes et de réponses.

## Endpoints

### Home page:
- **GET** `localhost:5000/`

### Users:
- **Browse:** GET `localhost:5000/users`
- **Read:** GET `localhost:5000/users/:id`
- **Edit:** PUT `localhost:5000/users/:id`
- **Add:** POST `localhost:5000/users`
- **Deletion:** DELETE `localhost:5000/users/:id`

### Quotes:
- **Browse:** GET `localhost:5000/quotes`
- **Read:** GET `localhost:5000/quotes/:id`
- **Edit:** PUT `localhost:5000/quotes/:id`
- **Add:** POST `localhost:5000/quotes`
- **Deletion:** DELETE `localhost:5000/quotes/:id`

### Comments:
- **Browse:** GET `localhost:5000/comments`
- **Read:** GET `localhost:5000/comments/:id`
- **Edit:** PUT `localhost:5000/comments/:id`
- **Add:** POST `localhost:5000/comments`
- **Deletion:** DELETE `localhost:5000/comments/:id`

### Categories:
- **Browse:** GET `localhost:5000/categories`
- **Read:** GET `localhost:5000/categories/:id`
- **Edit:** PUT `localhost:5000/categories/:id`
- **Add:** POST `localhost:5000/categories`
- **Deletion:** DELETE `localhost:5000/categories/:id`

### Deadlines:
- **Browse:** GET `localhost:5000/deadlines`
- **Read:** GET `localhost:5000/deadlines/:id`
- **Edit:** PUT `localhost:5000/deadlines/:id`
- **Add:** POST `localhost:5000/deadlines`
- **Deletion:** DELETE `localhost:5000/deadlines/:id`

### Quote-Categories:
- **Browse:** GET `localhost:5000/quote_categories`
- **Read:** GET `localhost:5000/quote_categories/:id`
- **Edit:** PUT `localhost:5000/quote_categories/:id`
- **Add:** POST `localhost:5000/quote_categories`
- **Deletion:** DELETE `localhost:5000/quote_categories/:id`

### Tasks:
- **Browse:** GET `localhost:5000/tasks`
- **Read:** GET `localhost:5000/tasks/:id`
- **Edit:** PUT `localhost:5000/tasks/:id`
- **Add:** POST `localhost:5000/tasks`
- **Deletion:** DELETE `localhost:5000/tasks/:id`

### Favorites
- **Add:** POST `localhost:5000/favorites`
- **Get:** GET `localhost:5000/favorites/:id`
- **Remove:** DELETE `localhost:5000/favorites/:quoteId`

### Notifications
- **Browse** GET `localhost:5000/notifications`
- **Read** GET `localhost:5000/notifications/:id`
- **Create** POST `localhost:5000/notifications`
- **Mark** PUT `localhost:5000/notifications/:id/read`
- **Delete** DELETE `localhost:5000/notifications/:id`
- **Find** GET `localhost:5000/notifications/user/:userId`

# Exemple Utilisateurs

## Récupérer tous les utilisateurs

**Requête :**

GET `localhost:5000/users`

**Réponse :**
```json
{
    "users": [
        {
            "id": 1,
            "firstname": "Adrien",
            "lastname": "Sergent",
            "email": "as@example.com",
            "password": "hashed_password",
        },
        {
            "id": 2,
            "firstname": "Jane",
            "lastname": "Smith",
            "email": "janesmith@example.com",
            "password": "hashed_password",
        }
    ]
}

Récupérer un utilisateur par son ID
Requête :

GET localhost:5000/users/:id

Réponse :

{
    "id": 1,
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@example.com",
    "password": "hashed_password",
}

Ajouter un utilisateur
Requête :

POST localhost:5000/users

Body :

{
  "firstname": "John",
  "lastname": "Doe",
  "email": "johndoe@email.com",
  "password": "password_hash",
}


markdown
Copier le code
# Exemple Utilisateurs

## Récupérer tous les utilisateurs

**Requête :**

GET `localhost:5000/users`

**Réponse :**
```json
{
    "users": [
        {
            "id": 1,
            "firstname": "Adrien",
            "lastname": "Sergent",
            "email": "as@example.com",
            "password": "hashed_password",
        },
        {
            "id": 2,
            "firstname": "Jane",
            "lastname": "Smith",
            "email": "janesmith@example.com",
            "password": "hashed_password",
        }
    ]
}
Récupérer un utilisateur par son ID
Requête :

GET localhost:5000/users/:id

Réponse :

json
Copier le code
{
    "id": 1,
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@example.com",
    "password": "hashed_password",
}
Ajouter un utilisateur
Requête :

POST localhost:5000/users

Body :

json
Copier le code
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "johndoe@email.com",
  "password": "password_hash",
}

Mise à jour d'un utilisateur
Requête :

PUT localhost:5000/users/:id

Body :

{
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@example.com",
    "password": "mysecretpassword",
}

Réponse HTTP/1.1 200 OK :

{
    "id": 42,
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@example.com",
    "password": "mysecretpassword",
}

Effacer un utilisateur
Requête :

DELETE localhost:5000/users/:id

Réponse :

HTTP/1.1 200 OK

{
    "message": "Utilisateur supprimé avec succès."
}
