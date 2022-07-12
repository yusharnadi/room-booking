-- -------------------------------------------------------------
-- TablePlus 3.6.0(318)
--
-- https://tableplus.com/
--
-- Database: postgres
-- Generation Time: 2022-07-12 13:23:15.8370
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."booking";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS booking_booking_id_seq;

-- Table Definition
CREATE TABLE "public"."booking" (
    "booking_id" int4 NOT NULL DEFAULT nextval('booking_booking_id_seq'::regclass),
    "client" varchar,
    "usage_description" text,
    "created_at" timestamp,
    "updated_at" timestamp,
    "room_id" int4,
    PRIMARY KEY ("booking_id")
);

DROP TABLE IF EXISTS "public"."room";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS room_room_id_seq;

-- Table Definition
CREATE TABLE "public"."room" (
    "room_id" int4 NOT NULL DEFAULT nextval('room_room_id_seq'::regclass),
    "room_name" varchar,
    "room_description" text,
    "created_at" timestamp,
    "updated_at" timestamp,
    PRIMARY KEY ("room_id")
);

DROP TABLE IF EXISTS "public"."user";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS user_user_id_seq;

-- Table Definition
CREATE TABLE "public"."user" (
    "user_id" int4 NOT NULL DEFAULT nextval('user_user_id_seq'::regclass),
    "name" varchar,
    "email" varchar,
    "password" varchar,
    "role" varchar,
    "created_at" timestamp,
    "updated_at" timestamp,
    PRIMARY KEY ("user_id")
);

INSERT INTO "public"."booking" ("booking_id", "client", "usage_description", "created_at", "updated_at", "room_id") VALUES
('1', 'Yusharnadi', 'Meeting Backend Developer Se-Indonesia', '2022-07-11 06:41:22.256', '2022-07-12 06:21:00.838', '1'),
('16', 'Budi', 'Meeting Safari Ramadhan', '2022-07-12 06:20:03.341', '2022-07-12 06:20:03.341', '2');

INSERT INTO "public"."room" ("room_id", "room_name", "room_description", "created_at", "updated_at") VALUES
('1', 'Room Mawar', 'Mawar room', '2022-07-09 07:43:33.437876', '2022-07-09 07:43:33.437876'),
('2', 'Room Anggrek', 'Anggrek room', '2022-07-12 06:11:12.826958', '2022-07-12 06:11:12.826958'),
('3', 'Room Edelweis', 'Edelweis room', '2022-07-12 06:11:48.709201', '2022-07-12 06:11:48.709201');

INSERT INTO "public"."user" ("user_id", "name", "email", "password", "role", "created_at", "updated_at") VALUES
('3', 'admin', 'admin@mail.com', '$2b$10$leWWUJuXpZ61HXaxfzzZhejGCXGjBjrAIZb.sdl2BMpulkk7FWjES', 'admin', '2022-07-12 06:16:27.11', '2022-07-12 06:16:27.11'),
('4', 'karyawan', 'karyawan@mail.com', '$2b$10$7YhLFi8746n6g/ARQ7uSDeMCN1znrqZ.NTqaZkuPMnDh3P5uAklSq', 'karyawan', '2022-07-12 06:18:23.77', '2022-07-12 06:18:23.77');

ALTER TABLE "public"."booking" ADD FOREIGN KEY ("room_id") REFERENCES "public"."room"("room_id");
