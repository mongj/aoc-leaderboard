package views

import (
	"encoding/json"
)

func Encode(view interface{}) ([]byte, error) {
	return json.Marshal(view)
}
