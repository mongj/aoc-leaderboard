package aocapi

import (
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/pkg/errors"
)

func GetLeaderboard(aocLeaderboardId int, sessionCookie string) ([]byte, error) {
	// TODO: abstract out the url and year
	url := fmt.Sprintf("https://adventofcode.com/2024/leaderboard/private/view/%d.json", aocLeaderboardId)
	client := http.Client{
		Timeout: 10 * time.Second,
	}

	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, errors.Wrap(err, "failed to create request")
	}

	req.Header.Set("Cookie", fmt.Sprintf("session=%s", sessionCookie))

	resp, err := client.Do(req)
	if err != nil {
		return nil, errors.Wrap(err, "failed to get leaderboard")
	}

	if resp.Body != nil {
		defer resp.Body.Close()
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, errors.Wrap(err, "failed to read response body")
	}

	return body, nil
}
