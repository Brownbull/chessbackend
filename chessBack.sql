CREATE DATABASE "chessBack"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE SCHEMA "DEV01"
    AUTHORIZATION postgres;


-- create
create table "DEV01".games
(
    id serial primary key,
    game integer,
    piece varchar(100),
    srce integer,
    dest integer
);
commit;



