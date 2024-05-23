CREATE DATABASE IF NOT EXISTS abalat;
-- abalat.member_type definition
use abalat;
CREATE TABLE IF NOT EXISTS `member_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- abalat.ministry definition

CREATE TABLE IF NOT EXISTS `ministry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- abalat.`role` definition

CREATE TABLE IF NOT EXISTS `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `is_visible` tinyint NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- abalat.`member` definition

CREATE TABLE IF NOT EXISTS `member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `previous_church` varchar(255) DEFAULT NULL,
  `role_in_previous_church` varchar(255) DEFAULT NULL,
  `spouse_name` varchar(255) DEFAULT NULL,
  `children_names` varchar(255) DEFAULT NULL,
  `emergency_contact` varchar(255) DEFAULT NULL,
  `marital_status` enum('Married','Single','Divorced','Widowed') NOT NULL,
  `has_letter_from_prev_church` tinyint DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `member_type_id` int DEFAULT NULL,
  `is_baptised` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_1945f9202fcfbce1b439b47b77` (`username`),
  KEY `FK_dfe7c8528514d83e17b6aa47bd4` (`member_type_id`),
  CONSTRAINT `FK_dfe7c8528514d83e17b6aa47bd4` FOREIGN KEY (`member_type_id`) REFERENCES `member_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- abalat.member_ministry definition

CREATE TABLE IF NOT EXISTS `member_ministry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `ministry_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0fd61dc8c09833318fcecab6cad` (`member_id`),
  KEY `FK_8ab5bc4b4456333128368a2fc4a` (`ministry_id`),
  KEY `FK_218461742fbe962ab6e00e506ab` (`role_id`),
  CONSTRAINT `FK_0fd61dc8c09833318fcecab6cad` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FK_218461742fbe962ab6e00e506ab` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FK_8ab5bc4b4456333128368a2fc4a` FOREIGN KEY (`ministry_id`) REFERENCES `ministry` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- abalat.member_under_minister definition

CREATE TABLE IF NOT EXISTS `member_under_minister` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `minister_id` int DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_89a7331afbf827a83f408fd8cb8` (`minister_id`),
  KEY `FK_372dfcbb4afe537ca06a967fe28` (`member_id`),
  CONSTRAINT `FK_372dfcbb4afe537ca06a967fe28` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FK_89a7331afbf827a83f408fd8cb8` FOREIGN KEY (`minister_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- abalat.contact_log definition

CREATE TABLE IF NOT EXISTS `contact_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `minister_id` int DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `contactMethod` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `flagged` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_38416bf2822a129786bd3ea3af4` (`minister_id`),
  KEY `FK_219bdfc6ee332f5d8e9b6d39453` (`member_id`),
  CONSTRAINT `FK_219bdfc6ee332f5d8e9b6d39453` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FK_38416bf2822a129786bd3ea3af4` FOREIGN KEY (`minister_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO abalat.member_type (name,display_name,created_at,updated_at) VALUES
	 ('member','Member','2024-03-14 08:00:57.714993','2024-03-14 08:00:57.714993'),
	 ('regular','Regular','2024-03-30 11:12:03.751732','2024-04-07 10:56:03.768395'),
	 ('remote','Remote','2024-03-30 11:12:12.452039','2024-03-30 11:12:12.452039'),
	 ('visitor','Visitor','2024-04-07 10:55:19.644440','2024-04-07 10:56:03.788183');
INSERT INTO abalat.member (first_name,middle_name,last_name,username,phone_number,email,address,previous_church,role_in_previous_church,is_baptised,spouse_name,children_names,emergency_contact,marital_status,has_letter_from_prev_church,notes,gender,image_url,password,is_active,created_at,updated_at,deleted_at,member_type_id) VALUES
	 ('Hizkiel','Daniel','Tsegaye','admin','898433273','hizkiel@eecfin.org','Address 118, Street 2',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,'$2b$10$9jBVJOoIRpCvEuSoJiCacet7xtPLdLfYdZgYh89gBAsCwCDITTgfy',1,'2024-04-15 19:31:46.120538','2024-04-15 20:41:18.126843',NULL,1),
	 ('Bruke','Bereda','Wolde','bruke','619947305','bruke@eecfin.org','Address 191, Street 4',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,'$2b$10$9jBVJOoIRpCvEuSoJiCacet7xtPLdLfYdZgYh89gBAsCwCDITTgfy',1,'2024-04-15 19:31:46.120538','2024-04-15 20:41:18.136400',NULL,1),
	 ('Tamirat','Teshome','Atsmegiorgis','tame','1003028352','tamirat@eecfin.org','Address 52, Street 6',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,'$2b$10$9jBVJOoIRpCvEuSoJiCacet7xtPLdLfYdZgYh89gBAsCwCDITTgfy',1,'2024-04-15 19:31:46.120538','2024-04-15 20:41:18.140491',NULL,1),
	 ('Frehiwot','Amare','Tekle','frehiwot.tekle','719663236','frehiwot.Tekle@example.com','Address 277, Street 6',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:31:46.120538','2024-04-15 19:45:04.833136',NULL,2),
	 ('Gebre','Yohannes','Mesfin','gebre.mesfin','667422975','gebre.Mesfin@example.com','Address 671, Street 7',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:31:46.120538','2024-04-15 19:45:04.835854',NULL,2),
	 ('Haimanot','Mekonnen','Kassaye','haimanot.kassaye','470761247','haimanot.Kassaye@example.com','Address 215, Street 10',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 19:31:46.120538','2024-04-15 19:45:04.839386',NULL,3),
	 ('Kidist','Berhe','Mamo','kidist.mamo','1089094940','kidist.Mamo@example.com','Address 276, Street 5',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 19:31:46.120538','2024-04-15 19:45:04.841820',NULL,4),
	 ('Selamawit','Chanyalew','Yohannes','selamewit.yohannes','920093895','selamawit.Yohannes@example.com','Address 402, Street 6',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 19:32:44.106091','2024-04-15 19:45:04.844239',NULL,2),
	 ('Mekdes','Liku','Berhane','mekdes.berhane','388463666','mekdes.Berhane@example.com','Address 532, Street 8',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:32:44.106091','2024-04-15 19:45:04.848269',NULL,1),
	 ('Samuel','Yohanes','Tekle','samuel.tekle','301128986','samuel.Tekle@example.com','Address 624, Street 6',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 19:32:44.106091','2024-04-15 19:45:04.851515',NULL,1);
INSERT INTO abalat.member (first_name,middle_name,last_name,username,phone_number,email,address,previous_church,role_in_previous_church,is_baptised,spouse_name,children_names,emergency_contact,marital_status,has_letter_from_prev_church,notes,gender,image_url,password,is_active,created_at,updated_at,deleted_at,member_type_id) VALUES
	 ('Tafari','Abebe','Gebremariam','Tafari.gebremariam','668622509','Tafari.Gebremariam@example.com','Address 54, Street 6',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 19:32:44.106091','2024-04-15 19:45:04.854629',NULL,2),
	 ('Mebratu','Fikre','Tesfaye','mebratu.tesfaye','943896983','mebratu.Tesfaye@example.com','Address 546, Street 2',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:32:44.106091','2024-04-15 19:45:04.856475',NULL,1),
	 ('Rahel','Mekuriya','Lemma','rahel.lemma','672819152','rahel.Lemma@example.com','Address 507, Street 9',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:32:44.106091','2024-04-15 19:45:04.858430',NULL,1),
	 ('Bereket','Hagos','Wolde','bereket.wolde','941321961','bereket.Wolde@example.com','Address 317, Street 1',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 19:32:44.106091','2024-04-15 19:45:04.859993',NULL,3),
	 ('Feven','Hailu','Dessalegn','feven.dessalegn','854878599','feven.Dessalegn@example.com','Address 96, Street 3',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:33:23.957657','2024-04-15 19:45:04.862617',NULL,1),
	 ('Yonatan','Girma','Tesfaye','yonatan.tesfaye','104735739','yonatan.Tesfaye@example.com','Address 213, Street 1',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 19:33:23.957657','2024-04-15 19:45:04.864137',NULL,2),
	 ('Tizita','Dibaba','Gebre','tizita.gebre','649754418','tizita.Gebre@example.com','Address 134, Street 1',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:33:23.957657','2024-04-15 19:45:04.865988',NULL,1),
	 ('Meaza','Melaku','Araya','meaza.araya','837020978','meaza.Araya@example.com','Address 618, Street 9',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:33:23.957657','2024-04-15 19:45:04.868915',NULL,2),
	 ('Sofia','Nebil','Mengesha','sofia.mengesha','615658630','sofia.Mengesha@example.com','Address 515, Street 1',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 19:33:23.957657','2024-04-15 19:45:04.870091',NULL,1),
	 ('Eskinder','Gemechu','Belay','emebet.belay','600419884','emebet.Belay@example.com','Address 948, Street 3',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 19:33:23.957657','2024-04-15 19:45:04.871338',NULL,1);
INSERT INTO abalat.member (first_name,middle_name,last_name,username,phone_number,email,address,previous_church,role_in_previous_church,is_baptised,spouse_name,children_names,emergency_contact,marital_status,has_letter_from_prev_church,notes,gender,image_url,password,is_active,created_at,updated_at,deleted_at,member_type_id) VALUES
	 ('Mersha','Legesse','Tekle','Mersha.tekle','914321556','Mersha.Tekle@example.com','Address 183, Street 5',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 19:33:23.957657','2024-04-15 19:45:04.872397',NULL,1),
	 ('Selam','Werknesh','Dessalegn','selam.dessalegn','622302092','selam.Dessalegn@example.com','Address 862, Street 8',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:34:02.738774','2024-04-15 19:45:04.873673',NULL,1),
	 ('Getnet','Markos','Haile','getnet.haile','615486004','getnet.Haile@example.com','Address 454, Street 8',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:34:02.738774','2024-04-15 19:45:04.875029',NULL,1),
	 ('Almaz','Gosaye','Moges','almaz.moges','522487078','almaz.Moges@example.com','Address 33, Street 9',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:34:02.738774','2024-04-15 19:45:04.877521',NULL,2),
	 ('Mahlet','Hailu','Araya','mahlet.araya','1005379534','mahlet.Araya@example.com','Address 902, Street 8',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 19:34:02.738774','2024-04-15 19:45:04.879019',NULL,3),
	 ('Robel','Nega','Teklehaimanot','robel.teklehaimanot','870492650','robel.Teklehaimanot@example.com','Address 128, Street 4',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:34:02.738774','2024-04-15 19:45:04.880200',NULL,1),
	 ('Meaza','Lemma','Wolde','meaza.wolde','569471342','meaza.Wolde@example.com','Address 629, Street 8',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 19:34:02.738774','2024-04-15 19:45:04.881322',NULL,4),
	 ('Fitsum','Abraham','Tekle','fitsum.tekle','340554936','fitsum.Tekle@example.com','Address 48, Street 6',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 19:34:02.738774','2024-04-15 19:45:04.883949',NULL,1),
	 ('Meklit','Medhin','Gebre','bereket.gebre','211607026','bereket.Gebre@example.com','Address 6, Street 7',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:37:12.700256','2024-04-15 20:08:54.005017',NULL,2),
	 ('Eskedar','Markos','Mengesha','emebet.mengesha','468213978','emebet.Mengesha@example.com','Address 423, Street 1',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 19:37:12.700256','2024-04-15 20:08:54.010395',NULL,1);
INSERT INTO abalat.member (first_name,middle_name,last_name,username,phone_number,email,address,previous_church,role_in_previous_church,is_baptised,spouse_name,children_names,emergency_contact,marital_status,has_letter_from_prev_church,notes,gender,image_url,password,is_active,created_at,updated_at,deleted_at,member_type_id) VALUES
	 ('Ermias','Bizuayehu','Araya','frehiwot.araya','1095149348','frehiwot.Araya@example.com','Address 377, Street 9',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:37:12.700256','2024-04-15 20:08:54.015366',NULL,4),
	 ('Berhane','Meaza','Lemma','haimanot.lemma','469331889','haimanot.Lemma@example.com','Address 585, Street 9',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:37:12.700256','2024-04-15 20:08:54.018354',NULL,4),
	 ('Werknesh','Ketema','Teklehaimanot','Werknesh.teklehaimanot','1043283774','kidist.Teklehaimanot@example.com','Address 163, Street 10',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:37:12.700256','2024-04-15 20:08:54.021471',NULL,4),
	 ('Lemma','Haile-Mariam','Wolde','lemma.wolde','695957789','lemma.Wolde@example.com','Address 459, Street 6',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:37:12.700256','2024-04-15 20:08:54.023786',NULL,1),
	 ('Lishan','Kagnew','Geremew','lishan.geremew','919820755','lishan.geremew@example.com','Address 328, Street 2',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 19:37:12.700256','2024-04-15 20:08:54.025091',NULL,2),
	 ('Hadera','Bizuayehu','Kassaye','hadera.kassaye','405550325','hadera.Kassaye@example.com','Address 529, Street 8',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:01:25.770621','2024-04-15 20:10:38.626554',NULL,4),
	 ('Abegaz','Seble','Abraham','Abegaz.wolde','1045482767','abegaz.Abraham@example.com','Address 694, Street 7',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 20:01:25.770621','2024-04-15 20:10:38.631865',NULL,1),
	 ('Abenet','Alula','Dessalegn','abel.dessalegn','438391527','abel.Dessalegn@example.com','Address 139, Street 7',NULL,NULL,NULL,NULL,NULL,NULL,'Widowed',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 20:01:25.770621','2024-04-15 20:10:38.635799',NULL,2),
	 ('Selamawit','Fikre','Alemayehu','selamewit.Alemayehu','475228769','selamawit.Alem@example.com','Address 287, Street 4',NULL,NULL,NULL,NULL,NULL,NULL,'Divorced',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:01:25.770621','2024-04-15 20:10:38.639035',NULL,3),
	 ('Mebrat','Alazar','Belayneh','mebrat.belayneh','333331571','mebrat.Belayneh@example.com','Address 813, Street 4',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 20:01:25.770621','2024-04-15 20:10:38.642235',NULL,4);
INSERT INTO abalat.member (first_name,middle_name,last_name,username,phone_number,email,address,previous_church,role_in_previous_church,is_baptised,spouse_name,children_names,emergency_contact,marital_status,has_letter_from_prev_church,notes,gender,image_url,password,is_active,created_at,updated_at,deleted_at,member_type_id) VALUES
	 ('Abiy','Kiros','Kassaye','Abiy.kassaye','1083514881','abiy.Kassaye@example.com','Address 436, Street 3',NULL,NULL,NULL,NULL,NULL,NULL,'Widowed',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:01:25.770621','2024-04-15 20:10:38.645268',NULL,4),
	 ('Rahel','Adugna','Tekle','rahel.tekle','1084917793','rahel.Tekle@example.com','Address 427, Street 2',NULL,NULL,NULL,NULL,NULL,NULL,'Divorced',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 20:01:25.770621','2024-04-15 20:10:38.649139',NULL,3),
	 ('Akalu','Alula','Alemayehu','Akalu.Alemayehu','859668010','akalu.Alem@example.com','Address 244, Street 10',NULL,NULL,NULL,NULL,NULL,NULL,'Widowed',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:01:25.770621','2024-04-15 20:10:38.651607',NULL,2),
	 ('Abebe','Mulugeta','Girma','abebe.girma','1234567890','abebe@example.com','123 Main St',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:07:50.133562','2024-04-15 20:10:04.228568',NULL,1),
	 ('Almaz','Hagos','Assefa','almaz.assefa','0987654321','almaz@example.com','456 Elm St',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 20:07:50.133562','2024-04-15 20:10:04.230805',NULL,2),
	 ('Bekele','Tsegaye','Tadesse','bekele.tadesse','5555555555','bekele@example.com','789 Oak St',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:07:50.133562','2024-04-15 20:10:04.232453',NULL,3),
	 ('Betelhem','Tadesse','Yohannes','betelhem.yohannes','9998887777','betelhem@example.com','101 Pine St',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 20:07:50.133562','2024-04-15 20:10:04.233916',NULL,4),
	 ('Chala','Mekonnen','Lemma','chala.lemma','7777777777','chala@example.com','321 Cedar St',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:07:50.133562','2024-04-15 20:10:04.235307',NULL,1),
	 ('Dawit','Tesfaye','Woldemichael','dawit.woldemichael','3333333333','dawit@example.com','543 Birch St',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:07:50.133562','2024-04-15 20:10:04.237333',NULL,2),
	 ('Elsa','Mintesnot','Abebe','elsa.abebe','2222222222','elsa@example.com','654 Maple St',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 20:07:50.133562','2024-04-15 20:10:04.239123',NULL,3);
INSERT INTO abalat.member (first_name,middle_name,last_name,username,phone_number,email,address,previous_church,role_in_previous_church,is_baptised,spouse_name,children_names,emergency_contact,marital_status,has_letter_from_prev_church,notes,gender,image_url,password,is_active,created_at,updated_at,deleted_at,member_type_id) VALUES
	 ('Elias','Alemu','Kebede','elias.kebede','4444444444','elias@example.com','987 Pine St',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:07:50.133562','2024-04-15 20:10:04.240464',NULL,4),
	 ('Fana','Dereje','Mulugeta','fana.mulugeta','6666666666','fana@example.com','123 Oak St',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 20:07:50.133562','2024-04-15 20:10:04.241863',NULL,1),
	 ('Getachew','Tadesse','Gebremedhin','getachew.gebremedhin','5555555555','getachew@example.com','345 Cedar St',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:07:50.133562','2024-04-15 20:10:04.245391',NULL,2),
	 ('Hirut','Michael','Berhanu','hirut.berhanu','7777777777','hirut@example.com','567 Elm St',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 20:07:50.133562','2024-04-15 20:10:04.246713',NULL,3),
	 ('Kalkidan','Tadele','Alemu','kalkidan.alemu','8888888888','kalkidan@example.com','789 Pine St',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 20:07:50.133562','2024-04-15 20:10:04.247801',NULL,4),
	 ('Mulualem','Isayas','Hailu','mulualem.hailu','9999999999','mulualem@example.com','987 Cedar St',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:07:50.133562','2024-04-15 20:10:04.248967',NULL,1),
	 ('Tadelech','Getachew','Beyene','tadelech.beyene','1111111111','tadelech@example.com','654 Elm St',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 20:07:50.133562','2024-04-15 20:10:04.251522',NULL,2),
	 ('Tesfaye','Kidus','Worku','tesfaye.worku','2222222222','tesfaye@example.com','321 Oak St',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:07:50.133562','2024-04-15 20:10:04.252384',NULL,3),
	 ('Yonas','Girma','Tekle','yonas.tekle','1234567890','yonas@example.com','123 Main St',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:08:44.892345','2024-04-15 20:10:04.253606',NULL,1),
	 ('Zenebe','Habte','Haile','zenebe.haile','0987654321','zenebe@example.com','456 Elm St',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:08:44.892345','2024-04-15 20:10:04.254654',NULL,2);
INSERT INTO abalat.member (first_name,middle_name,last_name,username,phone_number,email,address,previous_church,role_in_previous_church,is_baptised,spouse_name,children_names,emergency_contact,marital_status,has_letter_from_prev_church,notes,gender,image_url,password,is_active,created_at,updated_at,deleted_at,member_type_id) VALUES
	 ('Genet','Tadesse','Gebremichael','genet.gebremichael','5555555555','genet@example.com','789 Oak St',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 20:08:44.892345','2024-04-15 20:10:04.257369',NULL,3),
	 ('Million','Tekle','Kebede','Million.kebede','9998887777','Million@example.com','101 Pine St',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 20:08:44.892345','2024-04-15 20:10:04.258854',NULL,4),
	 ('Solomon','Girmachew','Tesfaye','solomon.tesfaye','7777777777','solomon@example.com','321 Cedar St',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:08:44.892345','2024-04-15 20:10:04.260607',NULL,1),
	 ('Selam','Dereje','Belay','selam.belay','3333333333','selam@example.com','543 Birch St',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 20:08:44.892345','2024-04-15 20:10:04.262772',NULL,2),
	 ('Addis','Matheos','Getachew','addis.getachew','2222222222','addis@example.com','654 Maple St',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:08:44.892345','2024-04-15 20:10:04.263913',NULL,3),
	 ('Helen','Mesay','Abate','helen.abate','4444444444','helen@example.com','987 Pine St',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 20:08:44.892345','2024-04-15 20:10:04.266210',NULL,4),
	 ('Kidist','Alemu','Mengistu','kidist.mengistu','6666666666','kidist@example.com','123 Oak St',NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,'Female',NULL,NULL,1,'2024-04-15 20:08:44.892345','2024-04-15 20:10:04.267387',NULL,1),
	 ('Bereket','Molalign','Gebremedhin','bereket.gebremedhin','5555555555','bereket@example.com','345 Cedar St',NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,NULL,1,'2024-04-15 20:08:44.892345','2024-04-15 20:10:04.268709',NULL,2),
	 ('Anteneh','Aschalew','Endrias','anteneh.endrias','+358441231234',NULL,NULL,NULL,NULL,'1',NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,'$2b$10$9jBVJOoIRpCvEuSoJiCacet7xtPLdLfYdZgYh89gBAsCwCDITTgfy',1,'2024-04-15 20:40:52.512654','2024-04-15 20:42:24.276783',NULL,1);
INSERT INTO abalat.member_under_minister (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-03-29 15:28:09.657547','2024-04-01 14:26:42.682514',1,4),
	 ('2024-03-29 15:30:33.853042','2024-03-29 15:30:33.853042',1,5),
	 ('2024-03-30 11:18:06.352759','2024-03-30 15:57:11.895215',1,6),
	 ('2024-04-01 12:33:28.595767','2024-04-01 12:33:28.595767',1,7),
	 ('2024-04-01 12:33:28.605131','2024-04-01 14:26:42.690922',1,8),
	 ('2024-04-01 12:33:28.614678','2024-04-01 12:33:28.614678',1,9),
	 ('2024-04-01 12:33:28.621368','2024-04-01 12:33:28.621368',1,10),
	 ('2024-04-01 12:33:28.628393','2024-04-01 12:33:28.628393',1,11),
	 ('2024-04-01 12:33:28.633665','2024-04-01 12:33:28.633665',1,12),
	 ('2024-03-29 15:28:09.657547','2024-04-01 14:26:42.682514',1,13);
INSERT INTO abalat.member_under_minister (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-03-29 15:30:33.853042','2024-03-29 15:30:33.853042',1,14),
	 ('2024-03-30 11:18:06.352759','2024-03-30 15:57:11.895215',1,15),
	 ('2024-04-01 12:33:28.595767','2024-04-01 12:33:28.595767',1,16),
	 ('2024-04-01 12:33:28.605131','2024-04-01 14:26:42.690922',1,17),
	 ('2024-04-01 12:33:28.614678','2024-04-01 12:33:28.614678',1,18),
	 ('2024-04-01 12:33:28.621368','2024-04-01 12:33:28.621368',1,19),
	 ('2024-04-01 12:33:28.628393','2024-04-01 12:33:28.628393',1,20),
	 ('2024-04-01 12:33:28.633665','2024-04-01 12:33:28.633665',1,21),
	 ('2024-03-29 15:28:09.657547','2024-04-01 14:26:42.682514',1,22),
	 ('2024-03-29 15:30:33.853042','2024-03-29 15:30:33.853042',1,23);
INSERT INTO abalat.member_under_minister (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-03-30 11:18:06.352759','2024-03-30 15:57:11.895215',2,24),
	 ('2024-04-01 12:33:28.595767','2024-04-01 12:33:28.595767',2,25),
	 ('2024-04-01 12:33:28.605131','2024-04-01 14:26:42.690922',2,26),
	 ('2024-04-01 12:33:28.614678','2024-04-01 12:33:28.614678',2,27),
	 ('2024-04-01 12:33:28.621368','2024-04-01 12:33:28.621368',2,28),
	 ('2024-04-01 12:33:28.628393','2024-04-01 12:33:28.628393',2,29),
	 ('2024-04-01 12:33:28.633665','2024-04-01 12:33:28.633665',2,30),
	 ('2024-03-29 15:28:09.657547','2024-04-01 14:26:42.682514',2,31),
	 ('2024-03-29 15:30:33.853042','2024-03-29 15:30:33.853042',2,32),
	 ('2024-03-30 11:18:06.352759','2024-03-30 15:57:11.895215',2,33);
INSERT INTO abalat.member_under_minister (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-04-01 12:33:28.595767','2024-04-01 12:33:28.595767',2,34),
	 ('2024-04-01 12:33:28.605131','2024-04-01 14:26:42.690922',2,35),
	 ('2024-04-01 12:33:28.614678','2024-04-01 12:33:28.614678',2,36),
	 ('2024-04-01 12:33:28.621368','2024-04-01 12:33:28.621368',2,37),
	 ('2024-04-01 12:33:28.628393','2024-04-01 12:33:28.628393',2,38),
	 ('2024-04-01 12:33:28.633665','2024-04-01 12:33:28.633665',2,39),
	 ('2024-03-29 15:30:33.853042','2024-03-29 15:30:33.853042',2,40),
	 ('2024-03-30 11:18:06.352759','2024-03-30 15:57:11.895215',2,41),
	 ('2024-04-01 12:33:28.595767','2024-04-01 12:33:28.595767',2,42),
	 ('2024-04-01 12:33:28.605131','2024-04-01 14:26:42.690922',2,43);
INSERT INTO abalat.member_under_minister (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-04-01 12:33:28.614678','2024-04-01 12:33:28.614678',2,44),
	 ('2024-04-01 12:33:28.621368','2024-04-01 12:33:28.621368',3,45),
	 ('2024-04-01 12:33:28.628393','2024-04-01 12:33:28.628393',3,46),
	 ('2024-04-01 12:33:28.633665','2024-04-01 12:33:28.633665',3,47),
	 ('2024-03-29 15:28:09.657547','2024-04-01 14:26:42.682514',3,48),
	 ('2024-03-29 15:30:33.853042','2024-03-29 15:30:33.853042',3,49),
	 ('2024-03-30 11:18:06.352759','2024-03-30 15:57:11.895215',3,50),
	 ('2024-04-01 12:33:28.595767','2024-04-01 12:33:28.595767',3,51),
	 ('2024-04-01 12:33:28.605131','2024-04-01 14:26:42.690922',3,52),
	 ('2024-04-01 12:33:28.614678','2024-04-01 12:33:28.614678',3,53);
INSERT INTO abalat.member_under_minister (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-04-01 12:33:28.621368','2024-04-01 12:33:28.621368',3,54),
	 ('2024-04-01 12:33:28.628393','2024-04-01 12:33:28.628393',3,55),
	 ('2024-04-01 12:33:28.633665','2024-04-01 12:33:28.633665',3,56),
	 ('2024-03-29 15:28:09.657547','2024-04-01 14:26:42.682514',3,57),
	 ('2024-03-29 15:30:33.853042','2024-03-29 15:30:33.853042',3,58),
	 ('2024-03-30 11:18:06.352759','2024-03-30 15:57:11.895215',3,59),
	 ('2024-04-01 12:33:28.595767','2024-04-01 12:33:28.595767',3,60),
	 ('2024-04-01 12:33:28.605131','2024-04-01 14:26:42.690922',3,61),
	 ('2024-04-01 12:33:28.614678','2024-04-01 12:33:28.614678',3,62),
	 ('2024-04-01 12:33:28.621368','2024-04-01 12:33:28.621368',3,63);
INSERT INTO abalat.member_under_minister (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-04-01 12:33:28.628393','2024-04-01 12:33:28.628393',3,64),
	 ('2024-04-01 12:33:28.628393','2024-04-01 12:33:28.628393',3,65),
	 ('2024-04-01 12:33:28.628393','2024-04-01 12:33:28.628393',3,66),
	 ('2024-04-01 12:33:28.633665','2024-04-01 12:33:28.633665',3,67),
	 ('2024-04-01 12:33:28.633665','2024-04-01 12:33:28.633665',3,68);
INSERT INTO abalat.ministry (name,display_name,is_active,created_at,updated_at) VALUES
	 ('elder','Elder',1,'2024-03-30 22:43:54.321813','2024-03-30 22:43:54.321813');
INSERT INTO abalat.role (name,display_name,is_visible,created_at,updated_at) VALUES
	 ('chairman','Chairman',1,'2024-03-30 22:45:04.263737','2024-03-30 22:45:04.263737'),
	 ('secretary','Secretary',1,'2024-03-30 22:45:04.273467','2024-03-30 22:45:04.273467'),
	 ('treasurer','Treasurer',1,'2024-03-30 22:45:04.283344','2024-03-30 22:45:04.283344'),
	 ('member','Member',1,'2024-03-30 22:45:04.290316','2024-03-30 22:45:04.290316');

INSERT INTO abalat.contact_log (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-04-09 00:00:00','2024-04-15 20:36:33.707868',1,3),
	 ('2024-03-17 00:00:00','2024-04-15 20:36:33.707868',1,4),
	 ('2024-03-24 00:00:00','2024-04-15 20:36:33.707868',1,5),
	 ('2024-03-23 00:00:00','2024-04-15 20:36:33.707868',1,6),
	 ('2024-04-02 00:00:00','2024-04-15 20:36:33.707868',1,7),
	 ('2024-04-15 00:00:00','2024-04-15 20:36:33.707868',1,8),
	 ('2024-03-16 00:00:00','2024-04-15 20:36:33.707868',1,9),
	 ('2024-04-04 00:00:00','2024-04-15 20:36:33.707868',1,10),
	 ('2024-03-12 00:00:00','2024-04-15 20:36:33.707868',1,11),
	 ('2024-03-13 00:00:00','2024-04-15 20:36:33.707868',1,12);
INSERT INTO abalat.contact_log (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-03-17 00:00:00','2024-04-15 20:36:33.707868',1,13),
	 ('2024-04-06 00:00:00','2024-04-15 20:36:33.707868',1,14),
	 ('2024-03-14 00:00:00','2024-04-15 20:36:33.707868',1,15),
	 ('2024-03-19 00:00:00','2024-04-15 20:36:33.707868',1,16),
	 ('2024-04-10 00:00:00','2024-04-15 20:36:33.707868',1,17),
	 ('2024-04-02 00:00:00','2024-04-15 20:36:33.707868',1,18),
	 ('2024-03-30 00:00:00','2024-04-15 20:36:33.707868',1,19),
	 ('2024-04-10 00:00:00','2024-04-15 20:36:33.707868',1,20),
	 ('2024-04-01 00:00:00','2024-04-15 20:36:33.707868',1,21),
	 ('2024-03-24 00:00:00','2024-04-15 20:36:33.707868',1,22);
INSERT INTO abalat.contact_log (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-03-12 00:00:00','2024-04-15 20:36:33.707868',1,23),
	 ('2024-03-14 00:00:00','2024-04-15 20:36:33.707868',1,24),
	 ('2024-03-23 00:00:00','2024-04-15 20:36:33.707868',1,25),
	 ('2024-03-27 00:00:00','2024-04-15 20:36:33.707868',1,26),
	 ('2024-03-17 00:00:00','2024-04-15 20:36:33.707868',1,27),
	 ('2024-03-28 00:00:00','2024-04-15 20:36:33.707868',1,28),
	 ('2024-04-14 00:00:00','2024-04-15 20:36:33.707868',1,29),
	 ('2024-03-21 00:00:00','2024-04-15 20:36:33.707868',1,30),
	 ('2024-03-30 00:00:00','2024-04-15 20:38:15.930339',2,20),
	 ('2024-04-07 00:00:00','2024-04-15 20:38:15.930339',2,21);
INSERT INTO abalat.contact_log (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-03-22 00:00:00','2024-04-15 20:38:15.930339',2,22),
	 ('2024-03-18 00:00:00','2024-04-15 20:38:15.930339',2,23),
	 ('2024-03-12 00:00:00','2024-04-15 20:38:15.930339',2,24),
	 ('2024-03-28 00:00:00','2024-04-15 20:38:15.930339',2,25),
	 ('2024-03-24 00:00:00','2024-04-15 20:38:15.930339',2,26),
	 ('2024-03-25 00:00:00','2024-04-15 20:38:15.930339',2,27),
	 ('2024-04-10 00:00:00','2024-04-15 20:38:15.930339',2,28),
	 ('2024-03-12 00:00:00','2024-04-15 20:38:15.930339',2,29),
	 ('2024-03-31 00:00:00','2024-04-15 20:38:15.930339',2,30),
	 ('2024-04-07 00:00:00','2024-04-15 20:38:15.930339',2,31);
INSERT INTO abalat.contact_log (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-03-17 00:00:00','2024-04-15 20:38:15.930339',2,32),
	 ('2024-03-27 00:00:00','2024-04-15 20:38:15.930339',2,33),
	 ('2024-04-09 00:00:00','2024-04-15 20:38:15.930339',2,34),
	 ('2024-04-07 00:00:00','2024-04-15 20:38:15.930339',2,35),
	 ('2024-03-24 00:00:00','2024-04-15 20:38:15.930339',2,36),
	 ('2024-03-28 00:00:00','2024-04-15 20:38:15.930339',2,37),
	 ('2024-03-20 00:00:00','2024-04-15 20:38:15.930339',2,38),
	 ('2024-04-11 00:00:00','2024-04-15 20:38:15.930339',2,39),
	 ('2024-04-04 00:00:00','2024-04-15 20:38:15.930339',2,40),
	 ('2024-04-03 00:00:00','2024-04-15 20:38:15.930339',2,41);
INSERT INTO abalat.contact_log (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-03-21 00:00:00','2024-04-15 20:38:15.930339',2,42),
	 ('2024-03-26 00:00:00','2024-04-15 20:38:15.930339',2,43),
	 ('2024-03-21 00:00:00','2024-04-15 20:38:15.930339',2,44),
	 ('2024-03-15 00:00:00','2024-04-15 20:38:15.930339',2,45),
	 ('2024-04-07 00:00:00','2024-04-15 20:38:15.930339',2,46),
	 ('2024-03-25 00:00:00','2024-04-15 20:38:15.930339',2,47),
	 ('2024-04-05 00:00:00','2024-04-15 20:38:15.930339',2,48),
	 ('2024-03-22 00:00:00','2024-04-15 20:38:15.930339',2,49),
	 ('2024-03-28 00:00:00','2024-04-15 20:38:15.930339',2,50),
	 ('2024-03-25 00:00:00','2024-04-15 20:39:18.997789',3,40);
INSERT INTO abalat.contact_log (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-03-30 00:00:00','2024-04-15 20:39:18.997789',3,41),
	 ('2024-03-30 00:00:00','2024-04-15 20:39:18.997789',3,42),
	 ('2024-03-12 00:00:00','2024-04-15 20:39:18.997789',3,43),
	 ('2024-03-28 00:00:00','2024-04-15 20:39:18.997789',3,44),
	 ('2024-03-25 00:00:00','2024-04-15 20:39:18.997789',3,45),
	 ('2024-03-28 00:00:00','2024-04-15 20:39:18.997789',3,46),
	 ('2024-03-18 00:00:00','2024-04-15 20:39:18.997789',3,47),
	 ('2024-04-01 00:00:00','2024-04-15 20:39:18.997789',3,48),
	 ('2024-03-23 00:00:00','2024-04-15 20:39:18.997789',3,49),
	 ('2024-04-10 00:00:00','2024-04-15 20:39:18.997789',3,50);
INSERT INTO abalat.contact_log (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-03-20 00:00:00','2024-04-15 20:39:18.997789',3,51),
	 ('2024-04-04 00:00:00','2024-04-15 20:39:18.997789',3,52),
	 ('2024-04-03 00:00:00','2024-04-15 20:39:18.997789',3,53),
	 ('2024-03-19 00:00:00','2024-04-15 20:39:18.997789',3,54),
	 ('2024-03-15 00:00:00','2024-04-15 20:39:18.997789',3,55),
	 ('2024-04-11 00:00:00','2024-04-15 20:39:18.997789',3,56),
	 ('2024-03-13 00:00:00','2024-04-15 20:39:18.997789',3,57),
	 ('2024-04-04 00:00:00','2024-04-15 20:39:18.997789',3,58),
	 ('2024-03-17 00:00:00','2024-04-15 20:39:18.997789',3,59),
	 ('2024-04-07 00:00:00','2024-04-15 20:39:18.997789',3,60);
INSERT INTO abalat.contact_log (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-03-22 00:00:00','2024-04-15 20:39:18.997789',3,61),
	 ('2024-03-19 00:00:00','2024-04-15 20:39:18.997789',3,62),
	 ('2024-03-16 00:00:00','2024-04-15 20:39:18.997789',3,63),
	 ('2024-03-15 00:00:00','2024-04-15 20:39:18.997789',3,64),
	 ('2024-03-14 00:00:00','2024-04-15 20:39:18.997789',3,65),
	 ('2024-03-13 00:00:00','2024-04-15 20:39:18.997789',3,66),
	 ('2024-04-14 00:00:00','2024-04-15 20:39:18.997789',3,67),
	 ('2024-04-06 00:00:00','2024-04-15 20:39:18.997789',3,68);
	 ('2024-04-06 00:00:00','2024-04-15 20:39:18.997789',3,17);
INSERT INTO abalat.member_ministry (created_at,updated_at,deleted_at,member_id,ministry_id,role_id) VALUES
	 ('2024-03-30 22:45:35.830896','2024-03-30 22:45:35.830896',NULL,1,1,1),
	 ('2024-04-01 12:32:25.866788','2024-04-01 12:32:25.866788',NULL,2,1,2),
	 ('2024-04-01 12:32:25.866788','2024-04-01 12:32:25.866788',NULL,3,1,3);