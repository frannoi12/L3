package Handler

import (
	"encoding/json"
	"errors"
	"helloword/src/service"
	"net/http"
	"strings"
)

type AuthHandler struct {
	authService service.AuthService
}

func NewAuthHandler(as service.AuthService) *AuthHandler {
	return &AuthHandler{authService: as}
}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	// Structure pour lire les données d'entrée
	var input struct {
		Name     string `json:"name"`
		Username string `json:"username"`
		Password string `json:"password"`
	}

	// Décodage du corps de la requête
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Requête invalide"})
		return
	}

	if input.Name == "" || input.Username == "" || input.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Tous les champs sont requis"})
		return
	}

	// Validation des identifiants
	if err := validateCredentials(input.Username, input.Password); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	// Appel du service pour enregistrer l'utilisateur
	user, err := h.authService.Register(input.Name, input.Username, input.Password)
	if err != nil {
		// Gestion des erreurs spécifiques
		if strings.Contains(err.Error(), "utilisateur existe déjà") {
			w.WriteHeader(http.StatusConflict)
			json.NewEncoder(w).Encode(map[string]string{"error": "Nom d'utilisateur déjà pris"})
			return
		}
		// Erreur générique pour les autres cas
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Échec de l'inscription"})
		return
	}

	// Réponse avec les détails de l'utilisateur créé
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Utilisateur créé avec succès",
		"user":    user,
	})
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	// Structure pour lire les données d'entrée
	var input struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	// Décodage du corps de la requête
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Requête invalide"})
		return
	}

	// Appel du service pour authentifier l'utilisateur
	token, err := h.authService.Login(input.Username, input.Password)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	// Réponse avec le token JWT
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"token": token})
}

func validateCredentials(username, password string) error {

	if len(username) < 3 {
		return errors.New("Le nom d'utilisateur doit être de 3 characteres minimum")
	}
	if len(password) < 8 {
		return errors.New("Le mot de passe doit être de 8 characteres minimum")
	}
	return nil
}