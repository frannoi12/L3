package main


import (
	"fmt"
	"log"
	"helloword/src/Model"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"net/http"
)

func main()  {
	db, err := gorm.Open(sqlite.Open("auth.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Database connection error: ", err)
		panic("Echec de connexion à la base de données")
	}
	db.AutoMigrate(&Model.Task{})

	fmt.Println("Server démarré sur http://localhost:8000")
	log.Fatal(http.ListenAndServe(":8000",nil))
}