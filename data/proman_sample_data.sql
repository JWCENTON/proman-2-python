--
-- PostgreSQL database Proman
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET default_tablespace = '';

SET default_with_oids = false;

---
--- drop tables
---

DROP TABLE IF EXISTS statuses CASCADE;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS cards;

---
--- create tables
---

CREATE TABLE statuses (
    id       SERIAL PRIMARY KEY     NOT NULL,
    title    VARCHAR(200)           NOT NULL,
    status_id INTEGER               NOT NULL,
    board_id INTEGER                NOT NULL
);

CREATE TABLE boards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    title       VARCHAR(200)        NOT NULL,
    user_id     INTEGER             NOT NULL,
    is_private  BOOLEAN             NOT NULL
);

CREATE TABLE cards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    board_id    INTEGER             NOT NULL,
    status_id   INTEGER             NOT NULL,
    title       VARCHAR (200)       NOT NULL,
    card_order  INTEGER             NOT NULL
);

CREATE TABLE users (
    id          SERIAL PRIMARY KEY  NOT NULL,
    username    VARCHAR (200)       NOT NULL,
    email       VARCHAR (200)       NOT NULL,
    password    VARCHAR (200)       NOT NULL 
);


---
--- insert data
---

INSERT INTO statuses(title, status_id, board_id) VALUES ('new',1 , 1);
INSERT INTO statuses(title, status_id, board_id) VALUES ('in progress', 2, 1);
INSERT INTO statuses(title, status_id, board_id) VALUES ('testing',3 , 1);
INSERT INTO statuses(title, status_id, board_id) VALUES ('done',4 ,1);

INSERT INTO users(username, email, password) VALUES ('admin', 'admin@admin.com', 'admin');

INSERT INTO boards(title, user_id, is_private) VALUES ('Board 1', 1, false);
INSERT INTO boards(title, user_id, is_private) VALUES ('Board 2', 1, false);


INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 1, 'new card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 1, 'new card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 2, 'in progress card', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 3, 'planning', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 4, 'done card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 4, 'done card 1', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 1, 'new card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 1, 'new card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 2, 'in progress card', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 3, 'planning', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 4, 'done card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 4, 'done card 1', 2);

---
--- add constraints
---

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_board_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_status_id FOREIGN KEY (status_id) REFERENCES statuses(id);

ALTER TABLE ONLY boards
    ADD CONSTRAINT fk_boards_user_id FOREIGN KEY (user_id) REFERENCES users(id);