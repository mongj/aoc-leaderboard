-- +migrate Up
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  name          TEXT,
  socials_link  TEXT,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at    TIMESTAMP
);

-- +migrate Down
DROP TABLE users;
