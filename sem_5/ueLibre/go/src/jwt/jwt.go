package jwt


import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// GenerateJWT génère un token JWT pour un utilisateur donné
func GenerateJWT(userID uint, username string) (string, error) {
	// Créer les claims avec l'ID de l'utilisateur
	claims := jwt.MapClaims{
		"userID":   userID,
		"username": username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(), // Expiration dans 24 heures
	}

	// Créer le token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Signer le token avec la clé secrète
	return token.SignedString([]byte("your_secret_key"))
}