// Package config manages the environment vairables used by the application
package config

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strconv"

	"github.com/joho/godotenv"
	"github.com/pkg/errors"
)

// Config contains the application's environment variables.
type Config struct {
	// General
	ServerPort int

	// Database
	DBHostname string
	DBPort     int
	DBName     string
	DBUser     string
	DBPassword string
	DBSSLMode  string
}

var (
	cwd, _ = os.Getwd()
	// Path to current working directory, with symlinks evaluated.
	RuntimeWorkingDirectory, _ = filepath.EvalSymlinks(cwd)
)

// LoadEnv loads environment variables from a relevant environment configuration file, based on GO_ENV.
// Variables that are not specified in the configuration file are loaded from the shell environment.
// An error is returned if any variable is not found or does not meet its validation criteria.
func LoadEnv() (*Config, error) {
	var config Config

	err := loadEnvFromFile(".env")
	if err != nil {
		log.Printf("Loading environment from shell")
	}

	// Get general environment variables
	config.ServerPort, err = parsePort(os.Getenv("SERVER_PORT"))
	if err != nil {
		return nil, errors.Wrap(err, "unable to parse server port")
	}

	// Get database environment variables
	config.DBHostname = os.Getenv("DB_HOSTNAME")
	config.DBPort, err = parsePort(os.Getenv("DB_PORT"))
	if err != nil {
		return nil, errors.Wrap(err, "unable to parse DB port")
	}
	config.DBName = os.Getenv("DB_NAME")
	config.DBUser = os.Getenv("DB_USERNAME")
	config.DBPassword = os.Getenv("DB_PASSWORD")
	config.DBSSLMode = os.Getenv("DB_SSLMODE")

	return &config, nil
}

func parsePort(value string) (int, error) {
	result, err := strconv.Atoi(value)
	if err != nil {
		return 0, errors.New("invalid port: not an integer")
	}
	if result < 0 || result > 65535 {
		return 0, errors.New("invalid port: port number should be a 16-bit unsigned integer")
	}
	return result, nil
}

// loadEnvFromFile attemps to load the environment configuration file provided,
// and returns an error if the files does not exist or failed to be loaded.
func loadEnvFromFile(configFileName string) error {
	err := godotenv.Load(RuntimeWorkingDirectory + "/" + configFileName)
	if err != nil {
		return errors.Wrap(err, fmt.Sprintf("error while loading %s", configFileName))
	}
	return nil
}
