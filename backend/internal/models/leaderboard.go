package models

import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Leaderboard struct {
	gorm.Model

	AocLeaderboardId int    `gorm:"primaryKey;not null"`
	InviteCode       string `gorm:"not null"`
	Data             datatypes.JSON
	Size             int
}

func (a *Leaderboard) Create(db *gorm.DB) error {
	return db.Create(&a).Error
}

// ReadLeaderboard returns a leaderboard from the database given by the ID
func ReadLeaderboard(db *gorm.DB, id int) (*Leaderboard, error) {
	var a Leaderboard
	if err := db.First(&a, "aoc_leaderboard_id = ?", id).Error; err != nil {
		return nil, err
	}
	return &a, nil
}

// ReadAllLeaderboards returns a list of all leaderboards from the database
func ReadAllLeaderboards(db *gorm.DB) ([]Leaderboard, error) {
	var a []Leaderboard
	if err := db.Find(&a).Error; err != nil {
		return nil, err
	}
	return a, nil
}

// UpdateLeaderboard updates a leaderboard in the database
func UpdateLeaderboard(db *gorm.DB, id int, data []byte) error {
	return db.Model(&Leaderboard{}).Where("aoc_leaderboard_id = ?", id).Update("data", data).Error
}
