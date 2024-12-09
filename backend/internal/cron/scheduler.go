package cron

import (
	"fmt"
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

	// Make a list of jobs
	jobs := []struct {
		Interval string
		Run      func(db *gorm.DB)
	}{
		{Interval: "@every 15m", Run: UpdateLeaderboard},
		{Interval: "@every 15m", Run: UpdateUsers},
	}

	for _, job := range jobs {
		// Run the job immediately
		job.Run(db)

		// Schedule the job to run at the given interval
		_, err := c.AddFunc(job.Interval, func() { job.Run(db) })
		if err != nil {
			log.Fatalln(errors.Wrap(err, fmt.Sprintf("error scheduling %v", job)))
		}
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
