package leaderboards

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/mongj/aoc-leaderboard/internal/handlers"
	"github.com/mongj/aoc-leaderboard/internal/middleware"
	"github.com/mongj/aoc-leaderboard/internal/models"
	"github.com/mongj/aoc-leaderboard/internal/views"
	"github.com/pkg/errors"
)

const readMergedHandlerName = "leaderboards::readmerged"

// HandleReadMerged returns a merged leaderboard
func HandleReadMerged(w http.ResponseWriter, r *http.Request) ([]byte, error) {
	db, err := middleware.GetDB(r)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(handlers.ErrGetDB, readMergedHandlerName))
	}

	// Get all leaderboards
	leaderboards, err := models.ReadAllLeaderboards(db)
	if err != nil {
		return nil, errors.Wrap(err, "failed to get leaderboards")
	}

	// Merge leaderboards
	// All members will be combined (by id)

	var mergedLeaderboard views.LeaderboardViews
	mergedLeaderboard.Members = make(map[int]*models.AOCMember)

	for _, lb := range leaderboards {
		// Unmarshall json data from leaderboard
		var lbData models.AOCLeaderboard
		if err := json.Unmarshal(lb.Data, &lbData); err != nil {
			return nil, errors.Wrap(err, "failed to unmarshal leaderboard")
		}

		// For now we assume that all leaderboards are for the same event
		// So we just take the last one
		mergedLeaderboard.Event = lbData.Event

		// Add members to merged leaderboard
		for _, member := range lbData.Members {
			mergedLeaderboard.Members[member.ID] = member
		}
	}

	data, err := views.Encode(mergedLeaderboard)
	if err != nil {
		return nil, errors.Wrap(err, "failed to marshal merged leaderboard")
	}

	return data, nil
}
