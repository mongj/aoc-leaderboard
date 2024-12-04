package params

import (
	"encoding/json"
	"io"
)

func Decode(r io.Reader, view interface{}) error {
	decoder := json.NewDecoder(r)
	err := decoder.Decode(&view)
	if err != nil {
		return err
	}
	return nil
}
