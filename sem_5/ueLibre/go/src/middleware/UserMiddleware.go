package middleware

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

// Clé secrète utilisée pour signer et valider les tokens JWT
var jwtKey = []byte("your_secret_key")

// Clé pour stocker l'ID de l'utilisateur dans le contexte
type contextKey string

const userContextKey = contextKey("userID")

// AuthMiddleware est un middleware qui valide le token JWT et extrait l'ID de l'utilisateur
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Récupère le token JWT de l'en-tête Authorization
		tokenString := r.Header.Get("Authorization")
		if tokenString == "" {
			http.Error(w, "En-tête Authorization manquant", http.StatusUnauthorized)
			return
		}

		// Supprime le préfixe "Bearer " du token
		tokenString = strings.TrimPrefix(tokenString, "Bearer ")
		//fmt.Println("Token reçu après suppression du préfixe :", tokenString)

		// Structure pour stocker les claims du token
		claims := jwt.MapClaims{}
		token, err := jwt.ParseWithClaims(tokenString, &claims, func(token *jwt.Token) (interface{}, error) {
			// Vérifie que la méthode de signature est HMAC
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("méthode de signature inattendue : %v", token.Header["alg"])
			}
			return jwtKey, nil
		})

		// Si le token est invalide ou s'il y a une erreur, renvoie une erreur 401 Unauthorized
		if err != nil || !token.Valid {
			fmt.Printf("Erreur lors de la validation du token : %v\n", err)
			http.Error(w, "Token invalide", http.StatusUnauthorized)
			return
		}

		// Extraire l'ID de l'utilisateur depuis les claims
		userIDFloat, ok := claims["userID"].(float64) // Les claims retournent souvent des float64
		if !ok {
			http.Error(w, "ID utilisateur non trouvé dans le token", http.StatusUnauthorized)
			return
		}

		// Convertir l'ID en uint
		userID := uint(userIDFloat)
		//fmt.Printf("ID utilisateur extrait du token : %d\n", userID)

		// Ajouter l'ID de l'utilisateur au contexte
		ctx := context.WithValue(r.Context(), userContextKey, userID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// GetUserFromContext extrait l'ID de l'utilisateur depuis le contexte
func GetUserFromContext(c context.Context) (uint, error) {
	userID, ok := c.Value(userContextKey).(uint)
	if !ok {
		return 0, errors.New("ID utilisateur non trouvé dans le contexte")
	}
	return userID, nil
}