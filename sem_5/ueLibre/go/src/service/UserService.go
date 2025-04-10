package service

import (
	"fmt"
	"helloword/src/jwt"
	"helloword/src/model"
	"helloword/src/repository"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// AuthService définit les méthodes pour le service d'authentification
type AuthService interface {
	Register(name, username, password string) (*model.User, error)
	Login(username, password string) (string, error)
}

// authService est l'implémentation concrète de AuthService
type authService struct {
	userRepo repository.UserRepository
}

// NewAuthService crée une nouvelle instance de AuthService
func NewAuthService(userRepo repository.UserRepository) AuthService {
	return &authService{userRepo: userRepo}
}

// Enregistre un nouvel utilisateur
func (s *authService) Register(name, username, password string) (*model.User, error) {
	// Vérifier si l'utilisateur existe déjà
	existingUser, _ := s.userRepo.GetUserByUsername(username)
	if existingUser != nil {
		return nil, fmt.Errorf("utilisateur existe déjà")
	}

	// Hacher le mot de passe
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("erreur lors du hachage du mot de passe : %w", err)
	}

	// Créer un nouvel utilisateur
	user := model.User{
		Name:     name,
		Username: username,
		Password: string(hashedPassword),
	}

	// Sauvegarder l'utilisateur dans la base de données
	createdUser, err := s.userRepo.CreateUser(&user)
	if err != nil {
		// Si l'erreur est "utilisateur existe déjà", retourner cette erreur
		if err.Error() == "utilisateur existe déjà" {
			return nil, fmt.Errorf("utilisateur existe déjà")
		}
		// Sinon, retourner une erreur générique
		return nil, fmt.Errorf("erreur lors de la création de l'utilisateur : %w", err)
	}

	return createdUser, nil
}

// Login authentifie un utilisateur existant
func (s *authService) Login(username, password string) (string, error) {
	// Récupérer l'utilisateur par son nom d'utilisateur
	user, err := s.userRepo.GetUserByUsername(username)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return "", fmt.Errorf("Nom d'utilisateur ou mot de passe incorrect")
		}
		return "", fmt.Errorf("Erreur lors de la communication avec la base de données : %w", err)
	}

	// Comparer le mot de passe fourni avec le mot de passe haché
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return "", fmt.Errorf("Nom d'utilisateur ou mot de passe incorrect")
	}

	// Générer un token JWT
	token, err := jwt.GenerateJWT(user.ID, user.Username)
	if err != nil {
		return "", fmt.Errorf("Échec de la génération du token : %w", err)
	}

	return token, nil
}