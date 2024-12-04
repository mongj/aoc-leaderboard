package params

import "github.com/mongj/aoc-leaderboard/internal/models"

type UpdateConfigParams struct {
	SessionCookie string `json:"session_cookie"`
}

func (p *UpdateConfigParams) ToModel() *models.Config {
	return &models.Config{
		SessionCookie: p.SessionCookie,
	}
}
