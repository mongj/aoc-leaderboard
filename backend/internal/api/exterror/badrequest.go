package exterror

import (
	"net/http"
)

type BadRequest struct {
	Message string
}

func (e *BadRequest) Error() string {
	if e.Message == "" {
		return "Bad Request"
	}
	return e.Message
}

func (e *BadRequest) StatusCode() int {
	return http.StatusBadRequest
}
