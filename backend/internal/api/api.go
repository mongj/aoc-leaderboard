package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type Response struct {
	Paylod     json.RawMessage `json:"payload"`
	StatusCode int             `json:"status_code"`
}

type Handler = func(http.ResponseWriter, *http.Request) ([]byte, error)

// HTTPHandler converts the internal Handler type into a standard http.HandlerFunc.
func HTTPHandler(handler Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		response, err := handler(w, r)

		// No error occurred
		if err == nil {
			w.WriteHeader(http.StatusOK)
			_, err := w.Write(response)
			if err != nil {
				log.Println(err)
			}
			return
		}

		// Handle error
		log.Println(err)

		extErr, isExternal := asExtError(err)

		// Internal server error
		if !isExternal {
			w.WriteHeader(http.StatusInternalServerError)
			_, err := w.Write([]byte(`{"error": "Internal Server Error"}`))
			if err != nil {
				log.Println(err)
			}
			return
		}

		// User-facing error
		w.WriteHeader(extErr.StatusCode())
		_, err = w.Write([]byte(fmt.Sprintf(`{"error": "%s"}`, extErr.Error())))
		if err != nil {
			log.Println(err)
		}
	}
}
