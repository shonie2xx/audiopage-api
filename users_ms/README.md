Setup

* Docker installed
* Insert roles manually into users_db
    - INSERT INTO roles VALUES (1, 'user', now(), now());
    - INSERT INTO roles VALUES (2, 'admin', now(), now());