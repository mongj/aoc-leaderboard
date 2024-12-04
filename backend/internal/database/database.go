package database

import (
	"fmt"

	"github.com/mongj/aoc-leaderboard/internal/config"
	"github.com/pkg/errors"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Connect initialises a GORM connection to the database specified by the given parameters.
func Connect(cfg *config.Config) (*gorm.DB, error) {
	dsn := BuildDSN(cfg)
	dbDriver := postgres.Open(dsn)

	db, err := gorm.Open(dbDriver)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf("error connecting to database %s", cfg.DBName))
	}

	return db, nil
}

// BuildDSN builds the data source name that is used to connect to a database.
func BuildDSN(cfg *config.Config) string {
	dsn := ""
	if cfg.DBName != "" {
		dsn += fmt.Sprintf("dbname=%v", cfg.DBName)
	}
	if cfg.DBHostname != "" {
		dsn += fmt.Sprintf(" host=%v", cfg.DBHostname)
	}
	if cfg.DBPort != 0 {
		dsn += fmt.Sprintf(" port=%v", cfg.DBPort)
	}
	if cfg.DBUser != "" {
		dsn += fmt.Sprintf(" user=%v", cfg.DBUser)
	}
	if cfg.DBPassword != "" {
		dsn += fmt.Sprintf(" password=%v", cfg.DBPassword)
	}
	if cfg.DBSSLMode != "" {
		dsn += fmt.Sprintf(" sslmode=%v", cfg.DBSSLMode)
	}
	return dsn
}

// CloneSession creates a new session for queries that are to be reused.
func CloneSession(db *gorm.DB) *gorm.DB {
	return db.Session(&gorm.Session{})
}

// NewSession creates a fresh session without any prior queries.
func NewSession(db *gorm.DB) *gorm.DB {
	return db.Session(&gorm.Session{NewDB: true})
}
