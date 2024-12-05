package config

import (
	"fmt"
	"net/http"

	"github.com/mongj/aoc-leaderboard/internal/api/exterror"
	"github.com/mongj/aoc-leaderboard/internal/handlers"
	"github.com/mongj/aoc-leaderboard/internal/middleware"
	"github.com/mongj/aoc-leaderboard/internal/params"
	"github.com/pkg/errors"
)

const updateHandlerName = "config::update"

// HandleUpdate updates the leaderboard config
// NOTE: for now, this assumes that we only have one master leaderboard,
// i.e., there is only one row in the configs table
func HandleUpdate(w http.ResponseWriter, r *http.Request) ([]byte, error) {
	db, err := middleware.GetDB(r)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(handlers.ErrGetDB, updateHandlerName))
	}

	var p params.UpdateConfigParams
	err = params.Decode(r.Body, &p)
	if err != nil {
		return nil, &exterror.BadRequest{Message: fmt.Sprintf("failed to decode request body: %v", err)}
	}

	config := p.ToModel()
	_, err = config.Update(db)
	if err != nil {
		return nil, errors.Wrap(err, "failed to update config")
	}

	return []byte(`{"message": "Config updated successfully"}`), nil
}
