package models

type AOCLeaderboard struct {
	OwnerID int                `json:"owner_id"`
	Event   string             `json:"event"`
	Members map[int]*AOCMember `json:"members"`
}

type AOCMember struct {
	LocalScore        int                       `json:"local_score"`
	Stars             int                       `json:"stars"`
	GlobalScore       int                       `json:"global_score"`
	LastStarTimestamp int64                     `json:"last_star_ts"`
	ID                int                       `json:"id"`
	Name              *string                   `json:"name"`
	CompletionDays    map[string]*CompletionDay `json:"completion_day_level"`
}

type CompletionDay struct {
	Part1 *StarCompletion `json:"1,omitempty"`
	Part2 *StarCompletion `json:"2,omitempty"`
}

type StarCompletion struct {
	StarIndex   int   `json:"star_index"`
	GetStarTime int64 `json:"get_star_ts"`
}
