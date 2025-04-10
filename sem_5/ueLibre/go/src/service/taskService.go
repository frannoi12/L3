package service

import (
	"errors"
	"helloword/src/model"
	"helloword/src/repository"
)


type TaskService interface {
	CreateTask(userID uint, title, description string) (*model.Task, error)
	GetTasksByUser(userID uint) ([]model.Task, error)
	UpdateTask(taskID uint, updateData map[string]interface{}, userID uint) (*model.Task, error)
	DeleteTask(taskID uint, userID uint) error
}
type taskService struct {
	taskRepo repository.TaskRepository
}

func NewTaskService(taskRepository repository.TaskRepository) TaskService {
	return &taskService{taskRepo: taskRepository}
}

func (s *taskService) CreateTask(userID uint, title, description string) (*model.Task, error) {
	if title == "" {
		return nil, errors.New("le titre de la tâche est requis")
	}
	task := model.Task{
		Title:       title,
		Description: description,
		UserID:      userID,
	}
	return s.taskRepo.CreateTask(&task)
}

func (s *taskService) GetTasksByUser(userID uint) ([]model.Task, error) {
	return s.taskRepo.GetTasksByUser(userID)
}

func (s *taskService) UpdateTask(taskID uint, updates map[string]interface{}, userID uint) (*model.Task, error) {
	return s.taskRepo.UpdateTask(taskID, updates, userID)
}

func (s *taskService) DeleteTask(taskID, userID uint) error {
	return s.taskRepo.DeleteTask(taskID, userID)
}


// TaskService définit les méthodes pour manipuler les tâches au niveau métier.
// type TaskService interface {
//     CreateTask(title, description string) (*model.Task, error) // Crée une nouvelle tâche.
//     GetAllTasks() ([]model.Task, error)                        // Récupère toutes les tâches.
//     UpdateTask(taskID uint, updates map[string]interface{}) (*model.Task, error) // Met à jour une tâche.
//     DeleteTask(taskID uint) error                               // Supprime une tâche.
// }

// taskService implémente l'interface TaskService.
// type taskService struct {
//     taskRepo repository.TaskRepository // Référence au référentiel des tâches.
// }

// NewTaskService crée une nouvelle instance de taskService.
// func NewTaskServices(taskRepository repository.TaskRepository) TaskService {
//     return &taskService{taskRepo: taskRepository} // Retourne une instance initialisée avec le référentiel.
// }

// CreateTask crée une nouvelle tâche via le service.
// func (s *taskService) CreateTask(title, description string) (*model.Task, error) {
//     if title == "" { // Vérifie que le titre n'est pas vide.
//         return nil, errors.New("le titre de la tâche est requis") // Retourne une erreur si le titre est manquant.
//     }
//     task := model.Task{
//         Title:       title,
//         Description: description,
//     } // Crée une nouvelle instance de Task.
//     return s.taskRepo.CreateTask(&task) // Appelle le référentiel pour créer la tâche.
// }

// GetAllTasks récupère toutes les tâches via le service.
// func (s *taskService) GetAllTasks() ([]model.Task, error) {
//     return s.taskRepo.GetAllTasks() // Appelle le référentiel pour récupérer les tâches.
// }

// UpdateTask met à jour une tâche existante via le service.
// func (s *taskService) UpdateTask(taskID uint, updates map[string]interface{}) (*model.Task, error) {
//     return s.taskRepo.UpdateTask(taskID, updates) // Appelle le référentiel pour mettre à jour la tâche.
// }

// DeleteTask supprime une tâche existante via le service.
// func (s *taskService) DeleteTask(taskID uint) error {
//     return s.taskRepo.DeleteTask(taskID) // Appelle le référentiel pour supprimer la tâche.
// }