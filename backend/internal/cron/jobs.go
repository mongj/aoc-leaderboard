package cron

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/mongj/aoc-leaderboard/internal/api/aocapi"
	"github.com/mongj/aoc-leaderboard/internal/models"
	"github.com/pkg/errors"
	"gorm.io/gorm"
)

func UpdateLeaderboard(db *gorm.DB) {
	log.Println("Updating leaderboard...")

	// List all leaderboards
	lbs, err := models.ReadAllLeaderboards(db)
	if err != nil {
		log.Fatalln(errors.Wrap(err, "failed to list leaderboards"))
	}

	// Get session cookie from config
	config, err := models.ReadConfig(db)
	if err != nil {
		log.Fatalln(errors.Wrap(err, "failed to get config"))
	}

	for _, lb := range lbs {
		// Get leaderboard from AOC API
		body, err := aocapi.GetLeaderboard(lb.AocLeaderboardId, config.SessionCookie)
		if err != nil {
			log.Fatalln(errors.Wrap(err, "failed to get leaderboard"))
		}

		var aocLeaderboard models.AOCLeaderboard
		err = json.Unmarshal(body, &aocLeaderboard)
		if err != nil {
			log.Fatalln(errors.Wrap(err, "failed to unmarshal response body"))
		}

		data, err := json.Marshal(aocLeaderboard)
		if err != nil {
			log.Fatalln(errors.Wrap(err, "failed to marshal leaderboard"))
		}

		// Update leaderboard in database
		err = models.UpdateLeaderboard(db, lb.AocLeaderboardId, data)
		if err != nil {
			log.Fatalln(errors.Wrap(err, "failed to update leaderboard"))
		}

		log.Println(fmt.Sprintf("Updated leaderboard %d", lb.AocLeaderboardId))
	}
}
