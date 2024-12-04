package models

import (
	"gorm.io/gorm"
)

type Config struct {
	gorm.Model

	SessionCookie string `json:"session_cookie"`
}

func ReadConfig(db *gorm.DB) (Config, error) {
	var config Config
	// NOTE: for now, this assumes that we only have one master leaderboard
	err := db.First(&config).Error
	if err != nil {
		return Config{}, err
	}

	return config, nil
}

func (c *Config) Update(db *gorm.DB) (Config, error) {
	// NOTE: for now, this assumes that we only have one master leaderboard
	var config Config
	err := db.Assign(&c).FirstOrCreate(&config).Error
	if err != nil {
		return Config{}, err
	}

	return config, nil
}
