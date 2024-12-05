-- +migrate Up
ALTER TABLE leaderboards ADD COLUMN invite_code TEXT;

-- +migrate Down
ALTER TABLE leaderboards DROP COLUMN invite_code;
