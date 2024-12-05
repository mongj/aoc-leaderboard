package main

import (
	"context"
	"log"
	"net/http"
	"os/signal"
	"strconv"
	"syscall"
	"time"

	"github.com/mongj/aoc-leaderboard/internal/config"
	"github.com/mongj/aoc-leaderboard/internal/cron"
	"github.com/mongj/aoc-leaderboard/internal/database"
	"github.com/mongj/aoc-leaderboard/internal/router"
	"github.com/pkg/errors"
)

const READ_HEADER_TIMEOUT_SEC = 3

func main() {
	cfg, err := config.LoadEnv()
	if err != nil {
		log.Fatalln(errors.Wrap(err, "error loading config"))
	}

	db, err := database.Connect(cfg)
	if err != nil {
		log.Fatalln(errors.Wrap(err, "error connecting to database"))
	}

	// Create a context that is cancelled on SIGINT or SIGTERM
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	go cron.Init(db)

	r := router.Setup(db)

	log.Printf("Listening on port %v", cfg.ServerPort)
	port := ":" + strconv.Itoa(cfg.ServerPort)
	server := &http.Server{
		Addr:              port,
		Handler:           r,
		ReadHeaderTimeout: READ_HEADER_TIMEOUT_SEC * time.Second,
	}

	// Run the server in a goroutine
	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Could not listen on %s: %v\n", port, err)
		}
	}()

	// Wait for the context to be cancelled
	<-ctx.Done()

	// Shutdown the server gracefully
	log.Println("Shutting down server...")
	if err := server.Shutdown(context.Background()); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}
}
