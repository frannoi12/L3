package repository

import (
	"helloword/src/model"

	"gorm.io/gorm"
)


type TaskRepository interface {
	CreateTask(task *model.Task) (*model.Task, error)
	GetTasksByUser(userID uint) ([]model.Task, error)
	UpdateTask(taskID uint, updateData map[string]interface{}, userID uint) (*model.Task, error)
	DeleteTask(taskID uint, userID uint) error
}

type taskRepository struct {
	db *gorm.DB
}

func NewTaskRepository(db *gorm.DB) TaskRepository {
	return &taskRepository{db: db}
}

func (r *taskRepository) CreateTask(task *model.Task) (*model.Task, error) {
	// Tentative d'insertion dans la base de données
	if err := r.db.Create(task).Error; err != nil {
		// Si une erreur survient, retourner nil et l'erreur
		return nil, err
	}
	// Si tout se passe bien, retourner la tâche créée et nil (pas d'erreur)
	return task, nil
}

func (r *taskRepository) GetTasksByUser(userID uint) ([]model.Task, error) {
	var tasks []model.Task
	error := r.db.Where("user_id =?", userID).Find(&tasks).Error
	if error != nil {
		return nil, error
	}
	return tasks, nil
}

func (r *taskRepository) DeleteTask(taskID uint, userID uint) error {
	var task model.Task
	if err := r.db.Where("id = ? AND user_id = ?", taskID, userID).Delete(&task).Error; err != nil {
		return err
	}
	return nil
}
func (r *taskRepository) UpdateTask(taskID uint, updateData map[string]interface{}, userID uint) (*model.Task, error) {
	var task model.Task
	// Vérifier si la tâche existe
	if err := r.db.Where("id = ? AND user_id = ?", taskID, userID).First(&task).Error; err != nil {
		return nil, err
	}

	// Mettre à jour la tâche avec les nouvelles données
	if err := r.db.Model(&task).Updates(updateData).Error; err != nil {
		return nil, err
	}

	return &task, nil
}



// TaskRepository définit les méthodes pour interagir avec les tâches en base de données.
// type TaskRepository interface {
// 	CreateTask(task *model.Task) (*model.Task, error)                              // Crée une nouvelle tâche.
// 	GetAllTasks() ([]model.Task, error)                                             // Récupère toutes les tâches.
// 	UpdateTask(taskID uint, updateData map[string]interface{}) (*model.Task, error) // Met à jour une tâche.
// 	DeleteTask(taskID uint) error                                                    // Supprime une tâche.
// }

// taskRepository implémente l'interface TaskRepository.
// type taskRepository struct {
// 	db *gorm.DB // Instance de la base de données GORM.
// }

// NewTaskRepository crée une nouvelle instance de taskRepository.
// func NewTaskRepository(db *gorm.DB) TaskRepository {
// 	return &taskRepository{db: db} // Retourne une instance initialisée avec la connexion à la base de données.
// }

// CreateTask insère une nouvelle tâche dans la base de données.
// func (r *taskRepository) CreateTask(task *model.Task) (*model.Task, error) {
// 	if err := r.db.Create(task).Error; err != nil { // Tente d'insérer la tâche.
// 		return nil, err // En cas d'erreur, retourne nil et l'erreur.
// 	}
// 	return task, nil // Si succès, retourne la tâche créée.
// }

// GetAllTasks récupère toutes les tâches de la base de données.
// func (r *taskRepository) GetAllTasks() ([]model.Task, error) {
// 	var tasks []model.Task                         // Déclare une variable pour stocker les tâches.
// 	if err := r.db.Find(&tasks).Error; err != nil { // Requête pour récupérer toutes les tâches.
// 		return nil, err // En cas d'erreur, retourne nil et l'erreur.
// 	}
// 	return tasks, nil // Retourne la liste des tâches.
// }

// UpdateTask met à jour une tâche existante.
// func (r *taskRepository) UpdateTask(taskID uint, updateData map[string]interface{}) (*model.Task, error) {
// 	var task model.Task                                    // Déclare une variable pour stocker la tâche à mettre à jour.
// 	if err := r.db.First(&task, taskID).Error; err != nil { // Vérifie si la tâche existe.
// 		return nil, err // Si la tâche n'existe pas, retourne une erreur.
// 	}
// 	if err := r.db.Model(&task).Updates(updateData).Error; err != nil { // Met à jour la tâche.
// 		return nil, err // En cas d'erreur, retourne nil et l'erreur.
// 	}
// 	return &task, nil // Retourne la tâche mise à jour.
// }

// DeleteTask supprime une tâche existante.
// func (r *taskRepository) DeleteTask(taskID uint) error {
// 	if err := r.db.Delete(&model.Task{}, taskID).Error; err != nil { // Supprime la tâche par son ID.
// 		return err // En cas d'erreur, retourne l'erreur.
// 	}
// 	return nil // Si succès, retourne nil.
// }