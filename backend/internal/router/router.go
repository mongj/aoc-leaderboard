package router

import (
	"github.com/go-chi/chi"
	"github.com/mongj/aoc-leaderboard/internal/api"
	"github.com/mongj/aoc-leaderboard/internal/handlers"
	"github.com/mongj/aoc-leaderboard/internal/handlers/config"
	"github.com/mongj/aoc-leaderboard/internal/handlers/leaderboards"
	"github.com/mongj/aoc-leaderboard/internal/middleware"
	"gorm.io/gorm"
)

func Setup(db *gorm.DB) chi.Router {
	r := chi.NewRouter()
	middleware.Setup(r, db)
	setupRoutes(r)
	return r
}

func setupRoutes(r chi.Router) {
	r.Get("/", api.HTTPHandler(handlers.HandlePing))
	r.Route("/leaderboards", func(r chi.Router) {
		r.Get("/merged", api.HTTPHandler(leaderboards.HandleReadMerged))
		r.Post("/children", api.HTTPHandler(leaderboards.HandleLink))
	})
	r.Route("/configs", func(r chi.Router) {
		r.Patch("/", api.HTTPHandler(config.HandleUpdate))
	})
}
