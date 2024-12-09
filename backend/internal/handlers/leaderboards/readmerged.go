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

	// Get all users
	users, err := models.ReadAllUsers(db)
	if err != nil {
		return nil, errors.Wrap(err, "failed to get users")
	}

	nameToLink := make(map[string]*string)
	for _, u := range users {
		nameToLink[u.Name] = u.SocialsLink
	}

	// Merge leaderboards, i.e., combine members by id
	var mergedLb views.LeaderboardViews
	var mergedMembers = make(map[int]views.MemberView)

	for _, lb := range leaderboards {
		// Unmarshall json data from leaderboard
		var lbData models.AOCLeaderboard
		if err := json.Unmarshal(lb.Data, &lbData); err != nil {
			return nil, errors.Wrap(err, "failed to unmarshal leaderboard")
		}

		// For now we assume that all leaderboards are for the same event
		// So we just take the last one
		mergedLb.Event = lbData.Event
		mergedLb.LastUpdated = lb.UpdatedAt

		// Add members to merged leaderboard
		for _, member := range lbData.Members {
			// Inject social link
			m := views.MemberView{
				ID:                member.ID,
				CompletionDays:    member.CompletionDays,
				LocalScore:        member.LocalScore,
				Stars:             member.Stars,
				GlobalScore:       member.GlobalScore,
				LastStarTimestamp: member.LastStarTimestamp,
			}
			if member.Name != nil {
				m.Name = member.Name
				m.SocialsLink = nameToLink[*member.Name]
			}
			mergedMembers[member.ID] = m
		}
	}

	mergedLb.Members = make([]views.MemberView, 0, len(mergedMembers))
	for _, m := range mergedMembers {
		mergedLb.Members = append(mergedLb.Members, m)
	}

	data, err := views.Encode(mergedLb)
	if err != nil {
		return nil, errors.Wrap(err, "failed to marshal merged leaderboard")
	}

	return data, nil
}
