CREATE USER 'stock'@'localhost' IDENTIFIED BY 'stock';


CREATE DATABASE IF NOT EXISTS `stock-beheer`;

CREATE TABLE `stock-beheer`.`Bestelling` (`id` INT NOT NULL AUTO_INCREMENT, `aanmaak` DateTime NOT NULL,`winkelId` INT,`winkelEnkelString` VARCHAR(30) NOT NULL,`aantal` INT NOT NULL,`totaleKostPrijsExclBtw` Int NOT NULL,`url` VARCHAR(50) NOT NULL,`leverTijd` Int NOT NULL,`leveringsAdres` VARCHAR(45) NOT NULL,`omschrijving` VARCHAR(100),`artikelNr` VARCHAR(45) NOT NULL,`projectId` Int NOT NULL, `geplaatstDoor` Int NOT NULL,`rqNummer` BIGINT, `goedgekeurdDoorCoach` Boolean, `reden` VARCHAR(100),`bestellingDoorFDGeplaatst` Date,`verwachteAankomst` Date,`bestellingOntvangen` Date, `werkelijkBetaald` Int, `opmerking` VARCHAR(100), PRIMARY KEY(`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `stock-beheer`.`Project` (`id` INT NOT NULL AUTO_INCREMENT , `naam` VARCHAR(30) NOT NULL, `datum` DATE, `spendeerbaarBedrag` INT NOT NULL, PRIMARY KEY(`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `stock-beheer`.`Winkel` (`id` INT NOT NULL AUTO_INCREMENT , `naam` VARCHAR(30) NOT NULL, `url` VARCHAR(45),`specializatie` VARCHAR(60), PRIMARY KEY(`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `stock-beheer`.`Gebruiker` (`id` INT NOT NULL AUTO_INCREMENT , `voornaam` VARCHAR(30) NOT NULL,`achternaam` VARCHAR(30) NOT NULL,`email` VARCHAR(45) NOT NULL, `niveau` Int NOT NULL,`projectId` Int, `wachtwoord` VARCHAR(255) NOT NULL , PRIMARY KEY(`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `stock-beheer`.`LogAanpassing` (`id` INT NOT NULL AUTO_INCREMENT , `gebruikersId` Int NOT NULL,`moment` DateTime NOT NULL,`bestellingsId` Int, `querry` VARCHAR(1200) NOT NULL, `projectId` Int, PRIMARY KEY(`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);


GRANT ALL PRIVILEGES ON `stock-beheer`.* TO 'stock'@'localhost' WITH GRANT OPTION;
flush PRIVILEGES;
