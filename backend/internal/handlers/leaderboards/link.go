package leaderboards

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/mongj/aoc-leaderboard/internal/api/aocapi"
	"github.com/mongj/aoc-leaderboard/internal/api/exterror"
	"github.com/mongj/aoc-leaderboard/internal/handlers"
	"github.com/mongj/aoc-leaderboard/internal/middleware"
	"github.com/mongj/aoc-leaderboard/internal/models"
	"github.com/mongj/aoc-leaderboard/internal/params"
	"github.com/pkg/errors"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

const linkHandlerName = "leaderboards::link"

// HandleLink links an AOC leaderboard to the master leaderboard
func HandleLink(w http.ResponseWriter, r *http.Request) ([]byte, error) {
	db, err := middleware.GetDB(r)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(handlers.ErrGetDB, linkHandlerName))
	}

	var p params.LinkLeaderboardParams
	err = params.Decode(r.Body, &p)
	if err != nil {
		return nil, &exterror.BadRequest{Message: fmt.Sprintf("failed to decode request body: %v", err)}
	}

	// Validate leaderboard has not been linked
	lb, err := models.ReadLeaderboard(db, p.AocLeaderboardId)
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.Wrap(err, "failed to get leaderboard")
	}
	if lb != nil {
		return nil, &exterror.BadRequest{Message: "leaderboard already linked"}
	}

	// Make request to AOC API

	// Get session cookie from config
	config, err := models.ReadConfig(db)
	if err != nil {
		return nil, errors.Wrap(err, "failed to get config")
	}

	body, err := aocapi.GetLeaderboard(p.AocLeaderboardId, config.SessionCookie)
	if err != nil {
		return nil, errors.Wrap(err, "failed to get leaderboard")
	}

	var aocLeaderboard models.AOCLeaderboard
	err = json.Unmarshal(body, &aocLeaderboard)
	if err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal response body")
	}

	data, err := json.Marshal(aocLeaderboard)
	if err != nil {
		return nil, errors.Wrap(err, "failed to marshal leaderboard")
	}

	// Create the leaderboard
	a := models.Leaderboard{
		AocLeaderboardId: p.AocLeaderboardId,
		InviteCode:      p.InviteCode,
		Data:             datatypes.JSON(data),
		Size:             len(aocLeaderboard.Members),
	}
	if err = a.Create(db); err != nil {
		return nil, errors.Wrap(err, "failed to link leaderboard")
	}

	return []byte(`{"message": "Leaderboard linked successfully"}`), nil
}
