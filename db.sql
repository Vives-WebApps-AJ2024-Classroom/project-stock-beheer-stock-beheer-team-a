create database clerk_users_db;

use clerk_users_db;

CREATE TABLE gebruikers (
    rol_id INT AUTO_INCREMENT PRIMARY KEY,
    naam VARCHAR(100) NOT NULL,
    voornaam VARCHAR(100) NOT NULL,
    wachtwoord VARCHAR(255) NOT NULL,
    emailadres VARCHAR(255) NOT NULL UNIQUE,
    project_id INT
);
