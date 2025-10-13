DROP DATABASE IF EXISTS motoropedia;
CREATE DATABASE IF NOT EXISTS motoropedia;
USE motoropedia;

CREATE TABLE motorsport (
    motorsport_id INT NOT NULL AUTO_INCREMENT,
    motorsport_type VARCHAR(25),
    terrain VARCHAR(50),
    PRIMARY KEY (motorsport_id)
);

CREATE TABLE team (
    team_id INT NOT NULL AUTO_INCREMENT,
    team_name VARCHAR(50),
    sponsor VARCHAR(50),
    country VARCHAR(30),
    win_count INT,
    PRIMARY KEY (team_id)
);

CREATE TABLE person (
    person_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    status VARCHAR(15),
    date_of_birth DATE,
    nationality VARCHAR(30),
    person_type VARCHAR(5),
    PRIMARY KEY (person_id)
);

CREATE TABLE tournaments (
    tournament_id INT NOT NULL AUTO_INCREMENT,
    tournament_name VARCHAR(50),
    date_of_match DATE,
    circuit_street VARCHAR(50),
    circuit_city VARCHAR(50),
    circuit_state VARCHAR(50),
    circuit_zip INT(15),
    average_viewer_count INT,
    motorsport_id INT,
    caster_id INT,
    referee_id INT,
    PRIMARY KEY (tournament_id),
    FOREIGN KEY (motorsport_id) REFERENCES motorsport(motorsport_id) ON DELETE RESTRICT,
    FOREIGN KEY (caster_id) REFERENCES person(person_id) ON DELETE RESTRICT,
    FOREIGN KEY (referee_id) REFERENCES person(person_id) ON DELETE RESTRICT
);

CREATE TABLE car (
    carmodel_id INT NOT NULL AUTO_INCREMENT,
    car_type VARCHAR(30),
    engine VARCHAR(50),
    manufacturer VARCHAR(50),
    product_year YEAR,
    team_id INT,
    PRIMARY KEY (carmodel_id),
    FOREIGN KEY (team_id) REFERENCES team(team_id) ON DELETE SET NULL
);

CREATE TABLE racer (
    person_id INT NOT NULL,
    racer_license VARCHAR(20) UNIQUE NOT NULL,
    PRIMARY KEY (person_id),
    FOREIGN KEY (person_id) REFERENCES person(person_id) ON DELETE CASCADE
);

CREATE TABLE staff (
    person_id INT NOT NULL,
    years_experience INT,
    staff_type VARCHAR(20),
    referee_license VARCHAR(20),
    language VARCHAR(15),
    PRIMARY KEY (person_id),
    FOREIGN KEY (person_id) REFERENCES person(person_id) ON DELETE CASCADE
);

CREATE TABLE tournament_participating (
    tournament_id INT NOT NULL,
    team_id INT NOT NULL,
    average_laps_time DECIMAL(10, 3),
    start_time DATETIME,
    finish_time DATETIME,
    placement INT,
    PRIMARY KEY (tournament_id, team_id),
    FOREIGN KEY (tournament_id) REFERENCES tournaments(tournament_id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES team(team_id) ON DELETE CASCADE
);

CREATE TABLE team_roster (
    team_id INT NOT NULL,
    person_id INT NOT NULL,
    team_name VARCHAR(50),
    PRIMARY KEY (team_id, person_id),
    FOREIGN KEY (team_id) REFERENCES team(team_id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES person(person_id) ON DELETE CASCADE
);