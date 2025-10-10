DROP DATABASE IF EXISTS motoropedia;
CREATE DATABASE IF NOT EXISTS motoropedia;
USE motoropedia;


CREATE TABLE motorsport (
	motorsport_id  INT UNIQUE NOT NULL,
    motorsport_type VARCHAR(25),
    terrain VARCHAR(50),
    PRIMARY KEY (motorsport_id)
);

CREATE TABLE team (
	team_id INT(10) UNIQUE NOT NULL,
    team_name VARCHAR(50),
    sponsor VARCHAR(50),
    country VARCHAR(30),
    win_count INT(10),
    PRIMARY KEY (team_id)
);

CREATE TABLE person (
	person_id INT(10) UNIQUE NOT NULL,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    status VARCHAR(15),
    date_of_birth DATE,
    nationality VARCHAR(30),
    person_type VARCHAR(5),
    PRIMARY KEY (person_id)
);
CREATE TABLE tournaments (
	tournament_id INT UNIQUE NOT NULL,
    tournament_name VARCHAR(50),
    date_of_match DATE,
    circuit_street VARCHAR(50),
    circuit_city VARCHAR(50),
    circuit_state VARCHAR(50),
    circuit_zip INT(15),
    average_viewer_count INT,
    motorsport_id INT,
    caster_id INT NOT NULL,
    referee_id INT NOT NULL,
    PRIMARY KEY (tournament_id),
    FOREIGN KEY (motorsport_id) REFERENCES motorsport(motorsport_id),
    FOREIGN KEY (caster_id) REFERENCES person(person_id),
    FOREIGN KEY (referee_id) REFERENCES person(person_id)
);

CREATE TABLE car (
	carmodel_id INT UNIQUE NOT NULL,
    car_type VARCHAR(30),
    engine VARCHAR(50),
    manufacturer VARCHAR(50),
    product_year YEAR(4),
    team_id INT,
    PRIMARY KEY (carmodel_id),
    FOREIGN KEY (team_id) REFERENCES team(team_id)
);

CREATE TABLE racer (
	person_id INT UNIQUE NOT NULL,
    racer_license INT UNIQUE NOT NULL,
    PRIMARY KEY (person_id),
    FOREIGN KEY (person_id) REFERENCES person(person_id)
);

CREATE TABLE staff (
	person_id INT UNIQUE NOT NULL,
    years_experience INT(2),
    staff_type VARCHAR(7),
    referee_license INT,
    language VARCHAR(15),
    PRIMARY KEY (person_id),
    FOREIGN KEY (person_id) REFERENCES person(person_id)
);

CREATE TABLE tournament_participating (
	tournament_id INT NOT NULL,
    team_id INT NOT NULL,
    average_laps_time DECIMAL,
    start_time DATETIME,
    finish_time DATETIME,
    placement INT
);

CREATE TABLE team_roster (
	team_id INT NOT NULL,
    person_id INT NOT NULL,
    team_name VARCHAR(50),
    PRIMARY KEY (team_id, person_id),
    FOREIGN KEY (team_id) REFERENCES team(team_id),
    FOREIGN KEY (person_id) REFERENCES person(person_id)
)