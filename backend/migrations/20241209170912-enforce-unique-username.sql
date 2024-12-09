-- +migrate Up
ALTER TABLE users ADD CONSTRAINT unique_name UNIQUE (name);

-- +migrate Down
ALTER TABLE users DROP CONSTRAINT unique_name;
