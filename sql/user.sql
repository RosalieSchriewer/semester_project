CREATE TABLE "Users" (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    "pswHash" text NOT NULL,
    email text NOT NULL,
    avatar_id integer REFERENCES "Avatar"(id)
);
CREATE TABLE "Hair" (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type integer NOT NULL,
    color text NOT NULL
);
CREATE TABLE "Eyes" (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type integer NOT NULL,
    color text NOT NULL
);
CREATE TABLE "Avatar" (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "Hair_id" integer NOT NULL REFERENCES "Hair"(id),
    "Skin" text NOT NULL,
    "Gender" text NOT NULL,
    "Eyebrows" text NOT NULL,
    "Eyes_id" integer NOT NULL REFERENCES "Eyes"(id)
);
