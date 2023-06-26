-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Inovin
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Inovin
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Inovin` DEFAULT CHARACTER SET utf8 ;
USE `Inovin` ;

-- -----------------------------------------------------
-- Table `Inovin`.`Aroma`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Aroma` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO Aroma (name) VALUES ('Fruits'), ('Empyreumatiques'), ('Fleurs'), ('Animal'), ('Epices'), ('Défauts'), ('Végétaux');
-- -----------------------------------------------------
-- Table `Inovin`.`Flavour`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Flavour` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO Flavour (name) VALUES ('Acidité'), ('Gras'), ('Amer'), ('Alcool'), ('Sucre');
-- -----------------------------------------------------
-- Table `Inovin`.`Type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO Inovin.Type (name) VALUES ('Blanc'), ('Rouge'), ('Rosé');
-- -----------------------------------------------------
-- Table `Inovin`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `aroma_id` INT NOT NULL,
  `flavour_id` INT NOT NULL,
  `type_id` INT NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `birthdate` DATE NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `hashed_password` VARCHAR(255) NOT NULL,
  `street` VARCHAR(80) NULL,
    `postcode` INT NOT NULL,
  `city` VARCHAR(45) NULL,
  `role` VARCHAR(45) DEFAULT 'User',
  PRIMARY KEY (`id`),
  INDEX `fk_User_Aroma1_idx` (`aroma_id` ASC) VISIBLE,
  INDEX `fk_User_Flavour1_idx` (`flavour_id` ASC) VISIBLE,
  INDEX `fk_User_Type1_idx` (`type_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_Aroma1`
    FOREIGN KEY (`aroma_id`)
    REFERENCES `Inovin`.`Aroma` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_Flavour1`
    FOREIGN KEY (`flavour_id`)
    REFERENCES `Inovin`.`Flavour` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_Type1`
    FOREIGN KEY (`type_id`)
    REFERENCES `Inovin`.`Type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO User (aroma_id, flavour_id, type_id, firstname, lastname, birthdate, email, hashed_password, street, postcode, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- -----------------------------------------------------
-- Table `Inovin`.`Country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Country` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO Country (name) VALUES ('France'), ('Suisse');
-- -----------------------------------------------------
-- Table `Inovin`.`Region`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Region` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO Region (name) VALUES ('Bordeaux'), ('Beaujolais'), ('Bourgogne'), ('Sud-Ouest'), ('Vallée du Rhône'), ('Vallée de la Loire'), ('Alsace'), ('Vaud');
-- -----------------------------------------------------
-- Table `Inovin`.`Domain`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Domain` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO Domain (name)
VALUES
    ('Château Margaux'),
    ('Château Lafite Rothschild'),
    ('Château Latour'),
    ("Domaine de la Grand'Cour"),
    ('Domaine Marcel Lapierre'),
    ('Domaine Jean Foillard'),
    ('Domaine de la Romanée-Conti'),
    ('Domaine Leroy'),
    ('Domaine Armand Rousseau'),
    ('Château Pétrus'),
    ('Château Le Pin'),
    ('Château Angélus'),
    ('Domaine Le Roc'),
    ('Château Boujac'),
    ('Domaine Ribiera'),
    ('Domaine Jean-Louis Chave'),
    ('Guigal'),
    ('Chapoutier'),
    ('Domaine Leflaive'),
    ('Domaine Coche-Dury'),
    ('Bouchard Père & Fils'),
    ('Domaine Huet'),
    ('Domaine des Baumard'),
    ('François Chidaine'),
    ('Domaine Didier Dagueneau'),
    ('Pascal Jolivet'),
    ('Henri Bourgeois'),
    ('Château Rayas'),
    ('Domaine de la Mordorée'),
    ('Clos des Papes'),
    ('Trimbach'),
    ('Domaine Zind-Humbrecht'),
    ('Albert Mann'),
    ('Domaine Roulot'),
    ('Domaine Prieur-Brunet'),
    ('Domaine Coche-Dury'),
    ('Domaine Henri Cruchon'),
    ('Domaine du Daley'), 
    ('Cave de la Côte'), 
    ('Château Coutet'), 
    ('Château de Malle'), 
    ('Château de Rayne Vigneau');
-- -----------------------------------------------------
-- Table `Inovin`.`Grape_variety`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Grape_variety` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `picture` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO Grape_Variety (name, picture) 
VALUES 
("Cabernet Sauvignon", "https://upload.wikimedia.org/wikipedia/commons/a/a7/Lithographie_de_Cabernet_Sauvignon.jpg?uselang=fr"),
("Gamay", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Gamay_Fr%C3%A9aux_-_Amp%C3%A9lographie.jpg/640px-Gamay_Fr%C3%A9aux_-_Amp%C3%A9lographie.jpg"),
("Pinot Noir", "https://upload.wikimedia.org/wikipedia/commons/1/12/Lithographie_du_Pinot_noir.jpg?uselang=fr"),
("Merlot", "https://upload.wikimedia.org/wikipedia/commons/2/26/Merlot_-_Ampl%C3%A9lographie.jpg?uselang=fr"),
("Négrette", "https://upload.wikimedia.org/wikipedia/commons/d/d6/N%C3%A9grette_-_Amp%C3%A9lographie.jpg?uselang=fr"),
("Syrah", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Syrah_-_Amp%C3%A9lographie.jpg/640px-Syrah_-_Amp%C3%A9lographie.jpg"),
("Chardonnay", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Pinot_blanc_Chardonnay_-_Amp%C3%A9lographie.jpg/600px-Pinot_blanc_Chardonnay_-_Amp%C3%A9lographie.jpg?20191120131539"),
("Chenin", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Chenin_blanc_-_Amp%C3%A9lographie.jpg/605px-Chenin_blanc_-_Amp%C3%A9lographie.jpg?20191120151219"),
("Sauvignon", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Sauvignon_-_Amp%C3%A9lographie.jpg/605px-Sauvignon_-_Amp%C3%A9lographie.jpg?20191120173240"), 
("Grenache", "https://upload.wikimedia.org/wikipedia/commons/b/bd/Grenache_N.jpg?uselang=fr"),
("Riesling", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Riesling_-_Amp%C3%A9lographie.jpg/605px-Riesling_-_Amp%C3%A9lographie.jpg?20191120145753"),
("Aligoté", "https://upload.wikimedia.org/wikipedia/commons/b/b3/Aligot%C3%A9_Viala_Vermorel.jpg"),
("Chasselas", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Chasselas_dor%C3%A9_-_Amp%C3%A9lographie.jpg/605px-Chasselas_dor%C3%A9_-_Amp%C3%A9lographie.jpg?20191120183439"), 
("Muscadelle", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Muscadelle_-_Amp%C3%A9lographie.jpg/605px-Muscadelle_-_Amp%C3%A9lographie.jpg?20191125103251");
-- -----------------------------------------------------
-- Table `Inovin`.`Wine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Wine` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `country_id` INT NOT NULL,
  `region_id` INT NOT NULL,
  `type_id` INT NOT NULL,
  `domain_id` INT NOT NULL,
  `grape_variety_id` INT NOT NULL,
  `name` VARCHAR(80) NOT NULL,
  `vintage` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Wine_Country1_idx` (`country_id` ASC) VISIBLE,
  INDEX `fk_Wine_Region1_idx` (`region_id` ASC) VISIBLE,
  INDEX `fk_Wine_Type1_idx` (`type_id` ASC) VISIBLE,
  INDEX `fk_Wine_Domain1_idx` (`domain_id` ASC) VISIBLE,
  INDEX `fk_Wine_Grape_Variety1_idx` (`grape_variety_id` ASC) VISIBLE,
  CONSTRAINT `fk_Wine_Country1`
    FOREIGN KEY (`country_id`)
    REFERENCES `Inovin`.`Country` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Wine_Region1`
    FOREIGN KEY (`region_id`)
    REFERENCES `Inovin`.`Region` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Wine_Type1`
    FOREIGN KEY (`type_id`)
    REFERENCES `Inovin`.`Type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Wine_Domain1`
    FOREIGN KEY (`domain_id`)
    REFERENCES `Inovin`.`Domain` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Wine_Grape_Variety1`
    FOREIGN KEY (`grape_variety_id`)
    REFERENCES `Inovin`.`Grape_variety` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO Wine (country_id, region_id, type_id, domain_id, grape_variety_id, name, vintage) VALUES
	(1, 1, 2, 1, 1, 'Château Margaux', 2015),
	(1, 1, 2, 2, 1, 'Château Lafite Rothschild', 2012),
	(1, 1, 2, 3, 1, 'Château Latour', 2010),
	(1, 2, 2, 4, 2, "Domaine de la Grand'Cour Fleurie", 2018),
	(1, 2, 2, 5, 2, 'Domaine Marcel Lapierre Morgon', 2019),
	(1, 2, 2, 6, 2, 'Domaine Jean Foillard Côte du Py Morgon', 2017),
	(1, 3, 2, 7, 3, 'Domaine de la Romanée-Conti La Tâche', 2016),
	(1, 3, 2, 8, 3, 'Domaine Leroy Chambolle-Musigny 1er Cru Les Amoureuses', 2015),
	(1, 3, 2, 9, 3, 'Domaine Armand Rousseau Chambertin Grand Cru', 2014),
	(1, 1, 2, 10, 4, 'Château Pétrus', 2010),
	(1, 1, 2, 11, 4, 'Château Le Pin Pomerol', 2015),
	(1, 1, 2, 12, 4, 'Château Angélus', 2012),
	(1, 4, 2, 13, 5, 'Domaine Le Roc Fronton', 2018),
	(1, 4, 2, 14, 5, 'Château Boujac Cuvée Fébus Fronton', 2017),
	(1, 4, 2, 15, 5, 'Domaine Ribiera Vin de Pays des Côtes du Tarn', 2016),
	(1, 5, 2, 16, 6, 'Domaine Jean-Louis Chave Hermitage', 2015),
	(1, 5, 2, 17, 6, 'Guigal Côte-Rôtie La Landonne', 2016),
	(1, 5, 2, 18, 6, 'Chapoutier Ermitage Le Pavillon', 2014),
	(1, 3, 1, 19, 7, 'Domaine Leflaive Puligny-Montrachet Les Pucelles', 2017),
	(1, 3, 1, 20, 7, 'Domaine Coche-Dury Corton-Charlemagne Grand Cru', 2016),
	(1, 3, 1, 21, 7, 'Bouchard Père & Fils Meursault Genevrières 1er Cru', 2015),
	(1, 6, 1, 22, 8, 'Domaine Huet Vouvray Clos du Bourg Moelleux Première Trie', 2017),
	(1, 6, 1, 23, 8, 'Domaine des Baumard Quarts de Chaume', 2016),
	(1, 6, 1, 24, 8, 'François Chidaine Montlouis-sur-Loire Clos Baudoin', 2019),
	(1, 6, 1, 25, 9, 'Domaine Didier Dagueneau Pouilly-Fumé Silex', 2017),
	(1, 6, 1, 26, 9, 'Pascal Jolivet Sancerre Le Chêne Marchand', 2019),
	(1, 6, 1, 27, 9, 'Henri Bourgeois Sancerre La Bourgeoise', 2018),
	(1, 5, 2, 28, 10, 'Château Rayas Châteauneuf-du-Pape', 2010),
	(1, 5, 2, 29, 10, 'Domaine de la Mordorée La Reine des Bois Lirac', 2016),
	(1, 5, 2, 30, 10, 'Clos des Papes Châteauneuf-du-Pape', 2015),
	(1, 7, 1, 31, 11, 'Trimbach Clos Ste Hune Riesling', 2014),
	(1, 7, 1, 32, 11, 'Domaine Zind-Humbrecht Riesling Rangen de Thann Clos Saint Urbain Grand Cru', 2016),
	(1, 7, 1, 33, 11, 'Albert Mann Riesling Schlossberg Grand Cru', 2015),
	(1, 3, 1, 34, 12, 'Domaine Roulot Bourgogne Aligoté', 2018),
	(1, 3, 1, 35, 12, 'Domaine Prieur-Brunet Bourgogne Aligoté', 2019),
	(1, 3, 1, 36, 12, 'Domaine Coche-Dury Bourgogne Aligoté', 2017);
-- -----------------------------------------------------
-- Table `Inovin`.`Session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Session` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inovin`.`Receipt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Receipt` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `session_Id` INT NOT NULL,
  `name` VARCHAR(80) NULL,
  PRIMARY KEY (`id`, `user_id`, `session_Id`),
  INDEX `fk_Receipt_User1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_Receipt_Session1_idx` (`session_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Receipt_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `Inovin`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Receipt_Session1`
    FOREIGN KEY (`session_Id`)
    REFERENCES `Inovin`.`Session` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inovin`.`User_has_Session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`User_has_Session` (
  `user_id` INT NOT NULL,
  `session_Id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `session_Id`),
  INDEX `fk_User_has_Session_Session1_idx` (`session_Id` ASC) VISIBLE,
  INDEX `fk_User_has_Session_User1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_has_Session_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `Inovin`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Session_Session1`
    FOREIGN KEY (`session_Id`)
    REFERENCES `Inovin`.`Session` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inovin`.`Wine_has_Aroma`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Wine_has_Aroma` (
  `wine_id` INT NOT NULL,
  `aroma_id` INT NOT NULL,
  PRIMARY KEY (`wine_id`, `aroma_id`),
  INDEX `fk_Wine_has_Aroma_Aroma1_idx` (`aroma_id` ASC) VISIBLE,
  INDEX `fk_Wine_has_Aroma_Wine1_idx` (`wine_id` ASC) VISIBLE,
  CONSTRAINT `fk_Wine_has_Aroma_Wine1`
    FOREIGN KEY (`wine_id`)
    REFERENCES `Inovin`.`Wine` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Wine_has_Aroma_Aroma1`
    FOREIGN KEY (`aroma_id`)
    REFERENCES `Inovin`.`Aroma` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inovin`.`Wine_has_Flavour`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Wine_has_Flavour` (
  `wine_id` INT NOT NULL,
  `flavour_id` INT NOT NULL,
  PRIMARY KEY (`wine_id`, `flavour_id`),
  INDEX `fk_Wine_has_Flavour_Flavour1_idx` (`flavour_id` ASC) VISIBLE,
  INDEX `fk_Wine_has_Flavour_Wine1_idx` (`wine_id` ASC) VISIBLE,
  CONSTRAINT `fk_Wine_has_Flavour_Wine1`
    FOREIGN KEY (`wine_id`)
    REFERENCES `Inovin`.`Wine` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Wine_has_Flavour_Flavour1`
    FOREIGN KEY (`flavour_id`)
    REFERENCES `Inovin`.`Flavour` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inovin`.`Tasting_note`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Tasting_note` (
  `user_id` INT NOT NULL,
  `wine_id` INT NOT NULL,
  `session_Id` INT NOT NULL,
  `note` INT NOT NULL,
  PRIMARY KEY (`user_id`, `wine_id`, `session_Id`),
  INDEX `fk_User_has_Wine_Wine1_idx` (`wine_id` ASC) VISIBLE,
  INDEX `fk_User_has_Wine_User1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_Tasting_note_Session1_idx` (`session_Id` ASC) VISIBLE,
  CONSTRAINT `fk_User_has_Wine_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `Inovin`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Wine_Wine1`
    FOREIGN KEY (`wine_id`)
    REFERENCES `Inovin`.`Wine` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tasting_note_Session1`
    FOREIGN KEY (`session_Id`)
    REFERENCES `Inovin`.`Session` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inovin`.`Receipt_has_Wine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Receipt_has_Wine` (
  `receipt_id` INT NOT NULL,
  `wine_id` INT NOT NULL,
  `dosage` INT NOT NULL,
  PRIMARY KEY (`receipt_id`, `wine_id`),
  INDEX `fk_Receipt_has_Wine_Wine1_idx` (`wine_id` ASC) VISIBLE,
  INDEX `fk_Receipt_has_Wine_Receipt1_idx` (`receipt_id` ASC) VISIBLE,
  CONSTRAINT `fk_Receipt_has_Wine_Receipt1`
    FOREIGN KEY (`receipt_id`)
    REFERENCES `Inovin`.`Receipt` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Receipt_has_Wine_Wine1`
    FOREIGN KEY (`wine_id`)
    REFERENCES `Inovin`.`Wine` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inovin`.`User_has_Wine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`User_has_Wine` (
  `user_id` INT NOT NULL,
  `wine_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `wine_id`),
  INDEX `fk_User_has_Wine_Wine2_idx` (`wine_id` ASC) VISIBLE,
  INDEX `fk_User_has_Wine_User2_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_has_Wine_User2`
    FOREIGN KEY (`user_id`)
    REFERENCES `Inovin`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Wine_Wine2`
    FOREIGN KEY (`wine_id`)
    REFERENCES `Inovin`.`Wine` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inovin`.`Session_has_Wine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Session_has_Wine` (
  `session_Id` INT NOT NULL,
  `wine_id` INT NOT NULL,
  PRIMARY KEY (`session_Id`, `wine_id`),
  INDEX `fk_Session_has_Wine_Wine1_idx` (`wine_id` ASC) VISIBLE,
  INDEX `fk_Session_has_Wine_Session1_idx` (`session_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Session_has_Wine_Session1`
    FOREIGN KEY (`session_Id`)
    REFERENCES `Inovin`.`Session` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Session_has_Wine_Wine1`
    FOREIGN KEY (`wine_id`)
    REFERENCES `Inovin`.`Wine` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



