package api

import "errors"

// ExtError is implemented by all external errors
// that are meant to be returned in the API response.
type ExtError interface {
	error
	StatusCode() int
}

// asExtError finds the first error within the error chain
// that is an ExtError, and returns true if found.
func asExtError(err error) (ExtError, bool) {
	var e ExtError
	ok := errors.As(err, &e)
	return e, ok
}
