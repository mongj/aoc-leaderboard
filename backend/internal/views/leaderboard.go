package views

import (
	"time"

	"github.com/mongj/aoc-leaderboard/internal/models"
)

type MemberView struct {
	LocalScore        int                              `json:"local_score"`
	Stars             int                              `json:"stars"`
	GlobalScore       int                              `json:"global_score"`
	LastStarTimestamp int64                            `json:"last_star_ts"`
	ID                int                              `json:"id"`
	Name              *string                          `json:"name,omitempty"`
	SocialsLink       *string                          `json:"socials_link,omitempty"`
	CompletionDays    map[string]*models.CompletionDay `json:"completion_day_level"`
}

type LeaderboardViews struct {
	Event       string       `json:"event"`
	Members     []MemberView `json:"members"`
	LastUpdated time.Time    `json:"last_updated"`
}

type LeaderboardListViews struct {
	Id         int    `json:"id"`
	InviteCode string `json:"invite_code"`
	Size       int    `json:"size"`
}
