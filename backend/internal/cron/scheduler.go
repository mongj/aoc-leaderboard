package cron

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/pkg/errors"
	"github.com/robfig/cron/v3"
	"gorm.io/gorm"
)

// Init creates and starts the cron jobs
func Init(db *gorm.DB) {
	c := cron.New()

	// UpdateLeaderboard every 15 minutes
	_, err := c.AddFunc("@every 15m", func() { UpdateLeaderboard(db) })

	if err != nil {
		log.Fatalln(errors.Wrap(err, "error scheduling UpdateLeaderboard"))
	}

	// Start the cron scheduler
	c.Start()

	log.Println("Cron scheduler started")

	// Handle graceful shutdown
	shutdownChan := make(chan os.Signal, 1)
	signal.Notify(shutdownChan, syscall.SIGINT, syscall.SIGTERM)
	<-shutdownChan

	log.Println("Shutting down cron scheduler...")
	c.Stop()
}
