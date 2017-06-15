CREATE TABLE category (
  id serial PRIMARY KEY,
  title varchar,
  name varchar
);

CREATE TABLE note (
  id serial PRIMARY KEY,
  title varchar,
  text varchar
);

CREATE TABLE belongs_to_category (
  category_id integer NOT NULL REFERENCES category (id),
  note_id integer NOT NULL REFERENCES note (id)
);

CREATE TABLE login_session (
  token varchar PRIMARY KEY,
  expires timestamp DEFAULT now() + interval '30 days'
);

CREATE INDEX search_notes_idx ON note USING GIN (to_tsvector('english', title || ' ' || text));
