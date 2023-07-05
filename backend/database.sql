SET  FOREIGN_KEY_CHECKS=0;


-- -----------------------------------------------------
-- Table `aroma`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aroma` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO aroma (name) VALUES ('Fruits'), ('Empyreumatiques'), ('Fleurs'), ('Animal'), ('Epices'), ('Défauts'), ('Végétaux');

-- -----------------------------------------------------
-- Table `flavour`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flavour` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO flavour (name) VALUES ('Acidité'), ('Gras'), ('Amer'), ('Alcool'), ('Sucre');

-- -----------------------------------------------------
-- Table `type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO type (name) VALUES ('Blanc'), ('Rouge'), ('Rosé');

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
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
  `postcode` INT NULL, 
  `city` VARCHAR(45) NULL,
  `role` VARCHAR(45) DEFAULT 'User',
  PRIMARY KEY (`id`),

  CONSTRAINT `fk_user_aroma`
    FOREIGN KEY (`aroma_id`)
    REFERENCES `aroma` (`id`),

  CONSTRAINT `fk_user_flavour`
    FOREIGN KEY (`flavour_id`)
    REFERENCES `flavour` (`id`),

  CONSTRAINT `fk_user_type`
    FOREIGN KEY (`type_id`)
    REFERENCES `type` (`id`))

ENGINE = InnoDB;

INSERT INTO user (aroma_id, flavour_id, type_id, firstname, lastname, birthdate, email, hashed_password, address, postcode, city, role) 
VALUES (1, 1, 1, "Yann", "Richard", "1989-07-12", "yann.richard9@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$cXFnN2s1ZHU0aTAwMDAwMA$XFP3Vrp4/huxiy9p4p2EAw", "Rue de l'exemple", 69000, "Lyon", "User");

-- -----------------------------------------------------
-- Table `country`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `country` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO country (name) VALUES ('France'), ('Suisse'), ('Italie'), ('Argentine');

-- -----------------------------------------------------
-- Table `region`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `region` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO region (name) VALUES ('Bordeaux'), ('Beaujolais'), ('Bourgogne'), ('Sud-Ouest'), ('Vallée du Rhône'), ('Vallée de la Loire'), ('Alsace'), ('Vaud'), ('Provence'), ('Languedoc'), ('Toscane'), ('Mendoza');

-- -----------------------------------------------------
-- Table `domain`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `domain` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO domain (name)
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
    ('Domaine Henri Cruchon'),
    ('Domaine du Daley'), 
    ('Cave de la Côte'), 
    ('Château Coutet'), 
    ('Château de Malle'), 
    ('Château de Rayne Vigneau'), 
    ('Domaine de la Bastide Blanche'), 
    ('Domaine de la Marotte'), 
    ('Domaines Ott'), 
    ('Domaine de la Vallongue'), 
    ("Domaine de l'Hermitage"), 
    ("Domaine de la Marfée"), 
    ('Tenuta La Fuga'), 
    ('Podere II Palazzino'), 
    ("Villa Sant'Anna"), 
    ('Domaine de la Vallée'), 
    ('Vina del Sol'), 
    ('Domaine de la Roseraie') ;

-- -----------------------------------------------------
-- Table `grape_variety`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grape_variety` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `picture` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO grape_variety (name, picture) 
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
("Muscadelle", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Muscadelle_-_Amp%C3%A9lographie.jpg/605px-Muscadelle_-_Amp%C3%A9lographie.jpg?20191125103251"),
("Mourvèdre", "https://upload.wikimedia.org/wikipedia/commons/0/08/Mourv%C3%A8dre_-_Amp%C3%A9lographie.jpg?uselang=fr"), 
("Cinsault", "https://upload.wikimedia.org/wikipedia/commons/8/8a/Cinsaut_-_Amp%C3%A9lographie.jpg"), 
("Sangiovese", "https://upload.wikimedia.org/wikipedia/commons/c/cb/Nieluccio_-_Amp%C3%A9lographie.png"), 
("Malbec", "https://upload.wikimedia.org/wikipedia/commons/a/a5/C%C3%B4t_-_Amp%C3%A9lographie.jpg"); 

-- -----------------------------------------------------
-- Table `wine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wine` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `country_id` INT NOT NULL,
  `region_id` INT NOT NULL,
  `type_id` INT NOT NULL,
  `domain_id` INT NOT NULL,
  `grape_variety_id` INT NOT NULL,
  `flavour_id` INT NOT NULL,
  `aroma_id` INT NOT NULL,
  `name` VARCHAR(80) NOT NULL,
  `vintage` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_wine_country`
    FOREIGN KEY (`country_id`)
    REFERENCES `country` (`id`),

  CONSTRAINT `fk_wine_region`
    FOREIGN KEY (`region_id`)
    REFERENCES `region` (`id`),

  CONSTRAINT `fk_wine_type`
    FOREIGN KEY (`type_id`)
    REFERENCES `type` (`id`),

  CONSTRAINT `fk_wine_domain`
    FOREIGN KEY (`domain_id`)
    REFERENCES `domain` (`id`),
 
  CONSTRAINT `fk_wine_grape_variety`
    FOREIGN KEY (`grape_variety_id`)
    REFERENCES `grape_variety` (`id`),

  CONSTRAINT `fk_wine_flavour`
    FOREIGN KEY (`flavour_id`)
    REFERENCES `flavour` (`id`),

  CONSTRAINT `fk_wine_aroma`
    FOREIGN KEY (`aroma_id`)
    REFERENCES `aroma` (`id`))

ENGINE = InnoDB;

INSERT INTO wine (country_id, region_id, type_id, domain_id, grape_variety_id, flavour_id, aroma_id, name, vintage) VALUES
	(1, 1, 2, 1, 1, 4, 1, 'Margaux Grand Cru', 2015),
	(1, 1, 2, 2, 1, 4, 4,  'Rothschild Réserve Spéciale', 2012),
	(1, 1, 2, 3, 1, 4, 7,  'Latour Cuvée Prestige', 2010),
	(1, 2, 2, 4, 2, 1, 1,  "Fleurie", 2018),
	(1, 2, 2, 5, 2, 1, 3,  'Morgon', 2019),
	(1, 2, 2, 6, 2, 1, 7,  'Côte du Py Morgon', 2017),
	(1, 3, 2, 7, 3, 2, 1, 'Romanée-Conti La Tâche', 2016),
	(1, 3, 2, 8, 3, 2, 3, 'Chambolle-Musigny 1er Cru Les Amoureuses', 2015),
	(1, 3, 2, 9, 3, 2, 7, 'Chambertin Grand Cru', 2014),
	(1, 1, 2, 10, 4, 5, 1, 'Pomerol Prestige', 2010),
	(1, 1, 2, 11, 4, 5, 5, 'Pomerol', 2015),
	(1, 1, 2, 12, 4, 5, 7, 'Saint-Emilion Excellence', 2012),
	(1, 4, 2, 13, 5, 2, 1, 'Fronton', 2018),
	(1, 4, 2, 14, 5, 2, 5, 'Cuvée Fébus Fronton', 2017),
	(1, 4, 2, 15, 5, 2, 7, 'Vin de Pays des Côtes du Tarn', 2016),
	(1, 5, 2, 16, 6, 3, 1, 'Hermitage', 2015),
	(1, 5, 2, 17, 6, 3, 2, 'Côte-Rôtie La Landonne', 2016),
	(1, 5, 2, 18, 6, 3, 7, 'Ermitage Le Pavillon', 2014),
	(1, 3, 1, 19, 7, 2, 1, 'Puligny-Montrachet Les Pucelles', 2017),
	(1, 3, 1, 20, 7, 2, 2, 'Corton-Charlemagne Grand Cru', 2016),
	(1, 3, 1, 21, 7, 2, 7, 'Meursault Genevrières 1er Cru', 2015),
	(1, 6, 1, 22, 8, 5, 1, 'Vouvray Clos du Bourg Moelleux Première Trie', 2017),
	(1, 6, 1, 23, 8, 5, 3, 'Quarts de Chaume', 2016),
	(1, 6, 1, 24, 8, 5, 7, 'Montlouis-sur-Loire Clos Baudoin', 2019),
	(1, 6, 1, 25, 9, 1, 1, 'Pouilly-Fumé Silex', 2017),
	(1, 6, 1, 26, 9, 1, 2, 'Sancerre Le Chêne Marchand', 2019),
	(1, 6, 1, 27, 9, 1, 7, 'Sancerre La Bourgeoise', 2018),
	(1, 5, 2, 28, 10, 2, 1, 'Châteauneuf-du-Pape', 2010),
	(1, 5, 2, 29, 10, 2, 5, 'La Reine des Bois Lirac', 2016),
	(1, 5, 2, 30, 10, 2, 7, 'Châteauneuf-du-Pape', 2015),
	(1, 7, 1, 31, 11, 1, 1, 'Clos Ste Hune Riesling', 2014),
	(1, 7, 1, 32, 11, 1, 7, 'Riesling Rangen de Thann Clos Saint Urbain Grand Cru', 2016),
	(1, 7, 1, 33, 11, 1, 7, 'Riesling Schlossberg Grand Cru', 2015),
	(1, 3, 1, 34, 12, 1, 1, 'Bourgogne Aligoté', 2018),
	(1, 3, 1, 35, 12, 1, 7, 'Bourgogne Aligoté', 2019),
	(1, 3, 1, 20, 12, 1, 1, 'Bourgogne Aligoté', 2017),
  (2, 8, 1, 36, 13, 1, 1, 'La Côte AOC Chasselas', 2019),
  (2, 8, 1, 37, 13, 1, 7, 'Dézaley Grand Cru AOC Chasselas', 2018),
  (2, 8, 1, 38, 13, 1, 7, 'Epesses AOC Chasselas', 2020),
  (1, 1, 1, 39, 14, 2, 1, 'Premier Cru Barsac', 2015),
  (1, 1, 1, 40, 14, 2, 3, 'Sauternes', 2016),
  (1, 1, 1, 41, 14, 2, 4, 'Premier Cru Sauternes', 2014),
  (1, 9, 3, 42, 15, 4, 1, 'La Londe Rosé', 2017), 
  (1, 9, 3, 43, 15, 4, 2, 'Cuvée Spéciale Rosé', 2018), 
  (1, 9, 3, 44, 15, 4, 4, 'Clos Mireille Rosé', 2019), 
  (1, 9, 3, 45, 16, 2, 5, 'Château de Pibarnon', 2019), 
  (1, 9, 3, 46, 16, 2, 1, 'Mas de Gourgonnier Rosé', 2020),
  (1, 10, 3, 47, 16, 2, 3, 'Château des Estanilles Rosé', 2018), 
  (3, 11, 3, 48, 17, 1, 5, 'Fattoria dei Barbi Rosso di Montalcino', 2018), 
  (3, 11, 3, 49, 17, 1, 1, 'Caparzo Rosso di Montalcino', 2017), 
  (3, 11, 3, 50, 17, 1, 3, 'Castello di Volpaia Rosato', 2020), 
  (1, 4, 3, 51, 18, 5, 5, "Rose d'été 'La Vie en Rose'", 2020), 
  (4, 12, 3, 52, 18, 5, 3, 'Rosado Mistico', 2019), 
  (1, 10, 3, 53, 18, 5, 7, "Soleil d'Été Rosé", 2021); 

-- -----------------------------------------------------
-- Table `session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `session` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO session (date) VALUES ("2023-07-04"), ("2023-07-10"), ("2023-07-15"), ("2023-07-20"), ("2023-07-28");

-- -----------------------------------------------------
-- Table `recipe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `session_id` INT NOT NULL,
  `name` VARCHAR(80) NULL,
  PRIMARY KEY (`id`, `user_id`, `session_id`),

  CONSTRAINT `fk_recipe_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`),

  CONSTRAINT `fk_recipe_session`
    FOREIGN KEY (`session_id`)
    REFERENCES `session` (`id`))

ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `user_has_session`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `user_has_session` (
  `user_id` INT NOT NULL,
  `session_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `session_id`),

  CONSTRAINT `fk_user_has_session_User`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`),

  CONSTRAINT `fk_user_has_session_session`
    FOREIGN KEY (`session_id`)
    REFERENCES `session` (`id`))

ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `tasting_note`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `tasting_note` (
  `user_id` INT NOT NULL,
  `wine_id` INT NOT NULL,
  `session_id` INT NOT NULL,
  `note` INT NOT NULL,
  PRIMARY KEY (`user_id`, `wine_id`, `session_id`),

  CONSTRAINT `fk_tasting_note_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`),

  CONSTRAINT `fk_tasting_note_wine`
    FOREIGN KEY (`wine_id`)
    REFERENCES `wine` (`id`),

  CONSTRAINT `fk_tasting_note_session`
    FOREIGN KEY (`session_id`)
    REFERENCES `session` (`id`))

ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `recipe_has_wine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipe_has_wine` (
  `recipe_id` INT NOT NULL,
  `wine_id` INT NOT NULL,
  `dosage` INT NOT NULL,
  PRIMARY KEY (`recipe_id`, `wine_id`),

  CONSTRAINT `fk_recipe_has_wine_recipe`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `recipe` (`id`),
  
  CONSTRAINT `fk_recipe_has_wine_wine`
    FOREIGN KEY (`wine_id`)
    REFERENCES `wine` (`id`))

ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `user_has_wine`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `user_has_wine` (
  `user_id` INT NOT NULL,
  `wine_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `wine_id`),

  CONSTRAINT `fk_user_has_wine_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`),

  CONSTRAINT `fk_user_has_wine_wine`
    FOREIGN KEY (`wine_id`)
    REFERENCES `wine` (`id`))

ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `session_has_wine`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `session_has_wine` (
  `session_id` INT NOT NULL,
  `wine_id` INT NOT NULL,
  PRIMARY KEY (`session_id`, `wine_id`),

  CONSTRAINT `fk_session_has_wine_session`
    FOREIGN KEY (`session_id`)
    REFERENCES `session` (`id`),

  CONSTRAINT `fk_session_has_wine_wine`
    FOREIGN KEY (`wine_id`)
    REFERENCES `wine` (`id`))

ENGINE = InnoDB;
 INSERT INTO session_has_wine (session_id, wine_id) VALUE 
 (1, 1), 
 (1, 2), 
 (1, 19), 
 (1, 43), 
 (2, 20), 
 (2, 21), 
 (2, 3), 
 (2, 44), 
 (3, 4), 
 (3, 22), 
 (3, 45), 
 (3, 46), 
 (4, 5), 
 (4, 6), 
 (4, 23), 
 (4, 47), 
 (5, 5), 
 (5, 6), 
 (5, 23), 
 (5, 47);

SET FOREIGN_KEY_CHECKS=1;



