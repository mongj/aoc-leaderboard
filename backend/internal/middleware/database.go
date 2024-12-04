package middleware

import (
	"context"
	"errors"
	"net/http"

	"github.com/mongj/aoc-leaderboard/internal/database"
	"gorm.io/gorm"
)

type contextKey string

const dbKey contextKey = "db"

// databaseMiddleware returns a middleware that injects the given *gorm.DB into the request context.
func databaseMiddleware(db *gorm.DB) func(next http.Handler) http.Handler {
	mw := func(next http.Handler) http.Handler {
		fn := func(w http.ResponseWriter, r *http.Request) {
			r = setDB(r, db, dbKey)
			next.ServeHTTP(w, r)
		}
		return http.HandlerFunc(fn)
	}
	return mw
}

// setDB returns a http.Request that contains the given *gorm.DB in its Context.
func setDB(r *http.Request, db *gorm.DB, key contextKey) *http.Request {
	ctx := context.WithValue(r.Context(), key, database.CloneSession(db))
	return r.WithContext(ctx)
}

// getDB retrieves the database that was previously saved to the given http.Request by setDB,
// and returns an error if no such database exists.
func GetDB(r *http.Request) (*gorm.DB, error) {
	return getDB(r, dbKey)
}

func getDB(r *http.Request, key contextKey) (*gorm.DB, error) {
	ctx := r.Context()
	db, ok := ctx.Value(key).(*gorm.DB)
	if !ok || db == nil {
		return nil, errors.New("error retrieving database from request context")
	}
	return db, nil
}
