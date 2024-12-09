package models

import (
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type User struct {
	gorm.Model

	Name        string
	SocialsLink *string
}

func ReadAllUsers(db *gorm.DB) ([]User, error) {
	var users []User
	if err := db.Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

// BatchUpsertUsers upserts a list of users into the database
func BatchUpsertUsers(db *gorm.DB, users []User) error {
	return db.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "name"}},
		DoUpdates: clause.AssignmentColumns([]string{"socials_link"}),
	}).Create(&users).Error
}
