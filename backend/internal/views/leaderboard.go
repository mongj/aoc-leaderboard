package views

import "github.com/mongj/aoc-leaderboard/internal/models"

type LeaderboardViews struct {
	Event   string                    `json:"event"`
	Members map[int]*models.AOCMember `json:"members"`
}

func LeaderboardFrom(lb models.AOCLeaderboard) LeaderboardViews {
	return LeaderboardViews{
		Event:   lb.Event,
		Members: lb.Members,
	}
}
