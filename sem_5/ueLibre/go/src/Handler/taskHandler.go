package Handler

import (
	"encoding/json"
	"helloword/src/middleware"
	"helloword/src/service"
	"net/http"
	"strconv"
)

type TaskHandler struct {
	taskService service.TaskService
}

func NewTaskHandler(taskService service.TaskService) *TaskHandler {
	return &TaskHandler{taskService: taskService}
}

func (h *TaskHandler) CreateTask(w http.ResponseWriter, r *http.Request) {
	// Récupérer l'ID de l'utilisateur depuis le contexte
	userID, err := middleware.GetUserFromContext(r.Context())
	if err != nil {
		http.Error(w, "Utilisateur non authentifié", http.StatusUnauthorized)
		return
	}

	// Décoder le corps de la requête
	var input struct {
		Title       string `json:"title"`
		Description string `json:"description"`
	}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Requête invalide", http.StatusBadRequest)
		return
	}

	// Appeler le service pour créer la tâche
	task, err := h.taskService.CreateTask(userID, input.Title, input.Description)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Réponse réussie avec la tâche créée
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Tâche créée avec succès",
		"task":    task,
	})
}

func (h *TaskHandler) GetTasks(w http.ResponseWriter, r *http.Request) {
	userID, err := middleware.GetUserFromContext(r.Context())
	if err != nil {
		http.Error(w, "Utilisateur non authentifié", http.StatusUnauthorized)
		return
	}

	tasks, err := h.taskService.GetTasksByUser(userID)
	if err != nil {
		http.Error(w, "Erreur lors de la récupération des tâches", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(tasks)
}

func (h *TaskHandler) UpdateTask(w http.ResponseWriter, r *http.Request) {
	// Récupérer l'ID de l'utilisateur depuis le contexte
	userID, err := middleware.GetUserFromContext(r.Context())
	if err != nil {
		http.Error(w, "Utilisateur non authentifié", http.StatusUnauthorized)
		return
	}

	// Récupérer l'ID de la tâche depuis les paramètres de la requête
	taskID, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "ID de tâche invalide", http.StatusBadRequest)
		return
	}

	// Décoder le corps de la requête
	var input map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Requête invalide", http.StatusBadRequest)
		return
	}

	// Appeler le service pour mettre à jour la tâche
	updatedTask, err := h.taskService.UpdateTask(uint(taskID), input, userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Réponse réussie avec la tâche mise à jour
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Tâche mise à jour avec succès",
		"task":    updatedTask,
	})
}

func (h *TaskHandler) DeleteTask(w http.ResponseWriter, r *http.Request) {
	userID, err := middleware.GetUserFromContext(r.Context())
	if err != nil {
		http.Error(w, "Utilisateur non authentifié", http.StatusUnauthorized)
		return
	}

	taskID, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "ID de tâche invalide", http.StatusBadRequest)
		return
	}

	if err := h.taskService.DeleteTask(uint(taskID), userID); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Tâche supprimée avec succès"})
}


// type TaskHandler struct {
// 	taskService service.TaskService // Référence au service des tâches.
// }

// NewTaskHandler crée une nouvelle instance de TaskHandler.
// func NewTaskHanddler(taskService service.TaskService) *TaskHandler {
// 	return &TaskHandler{taskService: taskService} // Retourne une instance initialisée avec le service.
// }

// CreateTask gère la création d'une nouvelle tâche.
// func (h *TaskHandler) CreateTask(w http.ResponseWriter, r *http.Request) {
// 	var input struct {
// 		Title       string `json:"title"`       // Titre de la tâche.
// 		Description string `json:"description"` // Description de la tâche.
// 	}
// 	if err := json.NewDecoder(r.Body).Decode(&input); err != nil { // Décodage du corps de la requête.
// 		http.Error(w, "Requête invalide", http.StatusBadRequest) // Retourne une erreur si le JSON est invalide.
// 		return
// 	}
// 	task, err := h.taskService.CreateTask(input.Title, input.Description) // Appelle le service pour créer la tâche.
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest) // Retourne une erreur si la création échoue.
// 		return
// 	}
// 	w.WriteHeader(http.StatusCreated) // Réponse HTTP 201 Created.
// 	json.NewEncoder(w).Encode(map[string]interface{}{
// 		"message": "Tâche créée avec succès",
// 		"task":    task,
// 	})
// }

// GetAllTasks gère la récupération de toutes les tâches.
// func (h *TaskHandler) GetAllTasks(w http.ResponseWriter, r *http.Request) {
// 	tasks, err := h.taskService.GetAllTasks() // Appelle le service pour récupérer les tâches.
// 	if err != nil {
// 		http.Error(w, "Erreur lors de la récupération des tâches", http.StatusInternalServerError) // Retourne une erreur en cas de problème.
// 		return
// 	}
// 	w.WriteHeader(http.StatusOK) // Réponse HTTP 200 OK.
// 	json.NewEncoder(w).Encode(tasks)
// }

// UpdateTask gère la mise à jour d'une tâche existante.
// func (h *TaskHandler) UpdateTask(w http.ResponseWriter, r *http.Request) {
// 	taskID, err := strconv.Atoi(r.PathValue("id")) // Récupère l'ID de la tâche depuis l'URL.
// 	if err != nil {
// 		http.Error(w, "ID de tâche invalide", http.StatusBadRequest) // Retourne une erreur si l'ID est invalide.
// 		return
// 	}
// 	var input map[string]interface{}
// 	if err := json.NewDecoder(r.Body).Decode(&input); err != nil { // Décodage du corps de la requête.
// 		http.Error(w, "Requête invalide", http.StatusBadRequest) // Retourne une erreur si le JSON est invalide.
// 		return
// 	}
// 	updatedTask, err := h.taskService.UpdateTask(uint(taskID), input) // Appelle le service pour mettre à jour la tâche.
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest) // Retourne une erreur si la mise à jour échoue.
// 		return
// 	}
// 	w.WriteHeader(http.StatusOK) // Réponse HTTP 200 OK.
// 	json.NewEncoder(w).Encode(map[string]interface{}{
// 		"message": "Tâche mise à jour avec succès",
// 		"task":    updatedTask,
// 	})
// }

// DeleteTask gère la suppression d'une tâche existante.
// func (h *TaskHandler) DeleteTask(w http.ResponseWriter, r *http.Request) {
// 	taskID, err := strconv.Atoi(r.PathValue("id")) // Récupère l'ID de la tâche depuis l'URL.
// 	if err != nil {
// 		http.Error(w, "ID de tâche invalide", http.StatusBadRequest) // Retourne une erreur si l'ID est invalide.
// 		return
// 	}
// 	if err := h.taskService.DeleteTask(uint(taskID)); err != nil { // Appelle le service pour supprimer la tâche.
// 		http.Error(w, err.Error(), http.StatusBadRequest) // Retourne une erreur si la suppression échoue.
// 		return
// 	}
// 	w.WriteHeader(http.StatusOK) // Réponse HTTP 200 OK.
// 	json.NewEncoder(w).Encode(map[string]string{"message": "Tâche supprimée avec succès"})
// }