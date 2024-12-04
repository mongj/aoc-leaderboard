package main

import (
	"flag"
	"log"

	"github.com/mongj/aoc-leaderboard/internal/config"
	"github.com/mongj/aoc-leaderboard/internal/database"
	"github.com/pkg/errors"
	migrate "github.com/rubenv/sql-migrate"
)

func main() {
	flag.Parse()
	switch flag.Arg(0) {
	case "migrateDB":
		migrateDB(migrate.Up)
	case "rollbackDB":
		migrateDB(migrate.Down)
	default:
		_ = errors.Errorf("Unknown command: %s", flag.Arg(0))
	}
}

// migrateDB migrates the database in the specified direction
// for now all available migrations will be applied/rolled back
func migrateDB(direction migrate.MigrationDirection) {
	cfg, err := config.LoadEnv()
	if err != nil {
		log.Fatalln(errors.Wrap(err, "error loading config"))
	}

	db, err := database.Connect(cfg)
	if err != nil {
		log.Fatalln(errors.Wrap(err, "error connecting to database"))
	}

	migrations := &migrate.FileMigrationSource{Dir: "migrations"}

	numSteps := 0 // TODO: Allow user to specify number of steps to apply/rollback
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("Failed to get database connection: %v\n", err)
	}

	steps, err := migrate.ExecMax(sqlDB, "postgres", migrations, direction, numSteps)
	if err != nil {
		log.Fatalf("Failed to migrate database: %v\n", err)
	}

	if direction == migrate.Up {
		log.Printf("Applied %d migration(s)!\n", steps)
	} else {
		log.Printf("Rolled back %d migration(s)!\n", steps)
	}
}
