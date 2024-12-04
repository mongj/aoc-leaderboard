package main

import (
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/mongj/aoc-leaderboard/internal/config"
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

	r := router.Setup(db)

	log.Printf("Listening on port %v", cfg.ServerPort)
	port := ":" + strconv.Itoa(cfg.ServerPort)
	server := &http.Server{
		Addr:              port,
		Handler:           r,
		ReadHeaderTimeout: READ_HEADER_TIMEOUT_SEC * time.Second,
	}
	err = server.ListenAndServe()

	if err != nil {
		log.Fatalln(err)
	}
}
