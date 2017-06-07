
CREATE TABLE friend (
  id serial PRIMARY KEY,
  first_name varchar,
  last_name varchar,
  email varchar,
  phone varchar,
  company varchar,
  note varchar
);

CREATE TABLE note_category (
  id serial PRIMARY KEY,
  title varchar,
  name varchar
);

CREATE TABLE note (
  id serial PRIMARY KEY,
  text varchar,
  category_id integer references note_category (id)
);

CREATE TABLE login_session (
  token varchar PRIMARY KEY,
  expires timestamp DEFAULT now() + interval '30 days'
);
