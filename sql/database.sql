CREATE TABLE "Users" (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    "pswHash" text NOT NULL,
    email text NOT NULL,
    avatar_id integer REFERENCES "Avatar"(id),
    lightmode integer DEFAULT 1,
    role text DEFAULT 'user'::text
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
    "hairColor" character varying NOT NULL,
    "skinColor" character varying NOT NULL,
    "eyeColor" character varying NOT NULL,
    "eyebrowType" integer NOT NULL
);
