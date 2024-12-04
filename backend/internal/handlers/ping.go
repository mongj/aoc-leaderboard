package handlers

import "net/http"

func HandlePing(w http.ResponseWriter, r *http.Request) ([]byte, error) {
	return []byte("pong"), nil
}
