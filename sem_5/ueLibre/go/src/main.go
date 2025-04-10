package main

import (
	"fmt"
	"helloword/src/Handler"
	"helloword/src/middleware"
	"helloword/src/model"
	"helloword/src/repository"
	"helloword/src/service"
	"log"
	"net/http"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main()  {
	db, err := gorm.Open(sqlite.Open("auth.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Database connection error: ", err)
		panic("Echec de connexion à la base de données")
	}
	db.AutoMigrate( &model.User{}, &model.Task{})

	userRepository := repository.NewUserRepository(db)
	authService := service.NewAuthService(userRepository)
	authHandler := Handler.NewAuthHandler(authService)

	taskRepository := repository.NewTaskRepository(db)
	taskService := service.NewTaskService(taskRepository)
	taskHandler := Handler.NewTaskHandler(taskService)

	http.HandleFunc("/register", authHandler.Register) 
	http.HandleFunc("/login", authHandler.Login)

	http.Handle("/tasks/create", middleware.AuthMiddleware(http.HandlerFunc(taskHandler.CreateTask)))
	http.Handle("/tasks/tasks", middleware.AuthMiddleware(http.HandlerFunc(taskHandler.GetTasks)))

	fmt.Println("Server démarré sur http://localhost:8000")
	log.Fatal(http.ListenAndServe(":8000",nil))
}