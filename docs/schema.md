# Schema Information

## users
column name     | data type | details
----------------|-----------|--------------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
description     | text      | not null

## track
column name | data type | details
------------|-----------|--------------------------
id          | integer   | not null, primary key
composer_id | integer   | not null, indexed
title       | string    | not null

## channel
column name | data type | details
------------|-----------|--------------------------
id          | integer   | not null, primary key
track_id    | integer   | not null, indexed

## chord
column name   | data type | details
--------------|-----------|--------------------------
id            | integer   | not null, primary key
channel_id    | integer   | not null, indexed

## note
column name | data type    | details
------------|--------------|----------------------
id          | integer      | not null, primary key
chord_id    | integer      | not null, indexed
start_time  | integer      | not null
end_time    | integer      | not null
freq        | decimal(4,2) | not null
start_vol   | integer      | not null
end_vol     | integer      | not null

