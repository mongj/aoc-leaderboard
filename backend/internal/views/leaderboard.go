package views

import (
	"github.com/mongj/aoc-leaderboard/internal/models"
)

type LeaderboardViews struct {
	Event   string                    `json:"event"`
	Members map[int]*models.AOCMember `json:"members"`
}

type LeaderboardListViews struct {
	Id         int    `json:"id"`
	InviteCode string `json:"invite_code"`
	Size       int    `json:"size"`
}
