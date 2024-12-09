package cron

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/anaskhan96/soup"
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

		size := len(aocLeaderboard.Members)

		// Update leaderboard in database
		err = models.UpdateLeaderboard(db, lb.AocLeaderboardId, data, size)
		if err != nil {
			log.Fatalln(errors.Wrap(err, "failed to update leaderboard"))
		}

		log.Printf("Updated leaderboard %d", lb.AocLeaderboardId)
	}
}

func UpdateUsers(db *gorm.DB) {
	log.Println("Updating users...")

	// Set session cookie
	config, err := models.ReadConfig(db)
	if err != nil {
		log.Fatalln(errors.Wrap(err, "failed to get config"))
	}

	soup.Cookie("session", config.SessionCookie)

	// Get leaderboards
	lbs, err := models.ReadAllLeaderboards(db)
	if err != nil {
		log.Fatalln(errors.Wrap(err, "failed to get leaderboards"))
	}

	for _, lb := range lbs {
		resp, err := soup.Get(fmt.Sprintf("https://adventofcode.com/2024/leaderboard/private/view/%d", lb.AocLeaderboardId))

		if err != nil {
			log.Fatalln(errors.Wrap(err, "failed to get users"))
		}

		doc := soup.HTMLParse(resp)
		spans := doc.FindAll("span", "class", "privboard-name")

		users := []models.User{}
		for _, span := range spans {
			name := span.FullText()
			var link *string
			if span.Find("a").Error == nil {
				l := span.Find("a").Attrs()["href"]
				link = &l
			}
			users = append(users, models.User{Name: name, SocialsLink: link})
		}

		// Upsert users into database
		err = models.BatchUpsertUsers(db, users)
		if err != nil {
			log.Fatalln(errors.Wrap(err, "failed to upsert users"))
		}

		log.Printf("Updated users for leaderboard %d", lb.AocLeaderboardId)
	}
}
