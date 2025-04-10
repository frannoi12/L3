package repository

import (
	"fmt"
	"helloword/src/model"
	"strings"

	"gorm.io/gorm"
)

type UserRepository interface {
	CreateUser(user *model.User) (*model.User, error)
	GetUserByUsername(username string) (*model.User, error)
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}
func (r *userRepository) CreateUser(user *model.User) (*model.User, error) {
	if err := r.db.Create(user).Error; err != nil {
		// Vérifier si l'erreur est due à une violation de contrainte unique
		if strings.Contains(err.Error(), "UNIQUE constraint failed") {
			return nil, fmt.Errorf("utilisateur existe déjà")
		}
		// Retourner l'erreur telle quelle pour les autres cas
		return nil, err
	}
	return user, nil
}

func (r *userRepository) GetUserByUsername(username string) (*model.User, error) {
	var user model.User
	err := r.db.Where("username = ?", username).First(&user).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil // Aucun utilisateur trouvé
		}
		return nil, err
	}
	return &user, nil
}