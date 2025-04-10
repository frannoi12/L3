package model

import (
	"gorm.io/gorm"
)


type User struct{
	gorm.Model
	Name		string		`json:"name" gorm:"not null"`
	Username	string		`gorm:"unique;not null" json:"username"`
	Password	string		`json:"-" gorm:"not null"`
	Tasks		[]Task		`json:"tasks" gorm:"foreignKey:UserID"`
}