package model

import "time"


type Task struct {
	ID 			uint 		`json:"id" gorm:"primaryKey"`
	Title 		string		`json:"title" gorm:"not null"`
	Description string		`json:"description"`
	Status		string		`json:"status" gorm:"default:'en cours'"`
	UserID		uint		`json:"user_id"`
	CreateAt	time.Time	`json:"created_at"`
	UpdateAt	time.Time	`json:"updated_at"`
	User		User		`json:"user" gorm:"foreignKey:UserID"`
}