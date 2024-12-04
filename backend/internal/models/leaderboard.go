package models

import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Leaderboard struct {
	gorm.Model

	AocLeaderboardId int `gorm:"primaryKey;not null"`
	Data             datatypes.JSON
	Size             int
}

func (a *Leaderboard) Create(db *gorm.DB) error {
	return db.Create(&a).Error
}

func ListLeaderboards(db *gorm.DB) ([]Leaderboard, error) {
	var a []Leaderboard
	if err := db.Find(&a).Error; err != nil {
		return nil, err
	}
	return a, nil
}

// ReadLeaderboard returns a leaderboard from the database given by the ID
func ReadLeaderboard(db *gorm.DB, id int) (*Leaderboard, error) {
	var a Leaderboard
	if err := db.First(&a, "aoc_leaderboard_id = ?", id).Error; err != nil {
		return nil, err
	}
	return &a, nil
}

func ReadAllLeaderboards(db *gorm.DB) ([]Leaderboard, error) {
	var a []Leaderboard
	if err := db.Find(&a).Error; err != nil {
		return nil, err
	}
	return a, nil
}
