package leaderboards

import (
	"fmt"
	"net/http"

	"github.com/mongj/aoc-leaderboard/internal/handlers"
	"github.com/mongj/aoc-leaderboard/internal/middleware"
	"github.com/mongj/aoc-leaderboard/internal/models"
	"github.com/mongj/aoc-leaderboard/internal/views"
	"github.com/pkg/errors"
)

const listHandlerName = "leaderboards::list"

// HandleList returns the list of linked leaderboards
func HandleList(w http.ResponseWriter, r *http.Request) ([]byte, error) {
	db, err := middleware.GetDB(r)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(handlers.ErrGetDB, listHandlerName))
	}

	// Get all leaderboards
	lbs, err := models.ReadAllLeaderboards(db)
	if err != nil {
		return nil, errors.Wrap(err, "failed to get leaderboards")
	}

	var listViews []views.LeaderboardListViews
	for _, lb := range lbs {
		listViews = append(listViews, views.LeaderboardListViews{
			Id:         lb.AocLeaderboardId,
			InviteCode: lb.InviteCode,
			Size:       lb.Size,
		})
	}

	data, err := views.Encode(listViews)
	if err != nil {
		return nil, errors.Wrap(err, "failed to marshal leaderboard list")
	}

	return data, nil
}
