## e-Beat System - Goa Police


create database ebeat;

create user police with password 'password';

grant all privileges on database ebeat to police;

psql -d ebeat

create extension postgis;

pip install psycopg2-binary








/opt/homebrew/Cellar/libspatialite/5.0.1_2/lib/mod_spatialite.7.dylib