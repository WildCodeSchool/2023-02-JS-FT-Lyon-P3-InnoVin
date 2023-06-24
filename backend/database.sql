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

INSERT INTO Aroma (name) VALUES ("Fruits");
-- -----------------------------------------------------
-- Table `Inovin`.`Flavour`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Flavour` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO Flavour (name) VALUES ("Acidité");
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
  `address` VARCHAR(80) NULL,
  `city` VARCHAR(45) NULL,
  `role` VARCHAR(45) NOT NULL,
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

INSERT INTO User (aroma_id, flavour_id, type_id, firstname, lastname, birthdate, email, hashed_password, address, city, role) VALUES (0, 0, 0, "Yann", "Richard", "1989-07-12", "yann.richard9@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$cXFnN2s1ZHU0aTAwMDAwMA$XFP3Vrp4/huxiy9p4p2EAw", "Rue de l'exemple", "Lyon", "User");
-- -----------------------------------------------------
-- Table `Inovin`.`Country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Country` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inovin`.`Region`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Region` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inovin`.`Domain`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Domain` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inovin`.`Grape_variety`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inovin`.`Grape_variety` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `picture` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


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

