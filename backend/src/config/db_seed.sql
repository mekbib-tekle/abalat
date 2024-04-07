INSERT INTO abalat.contact_log (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-03-20 15:50:17.797198','2024-03-30 15:50:31.302051',1,2),
	 ('2024-03-25 15:50:17.810082','2024-04-03 20:20:39.721358',1,4),
	 ('2024-04-01 12:33:56.098978','2024-04-01 12:33:56.098978',2,6),
	 ('2024-04-01 12:33:56.108575','2024-04-01 12:33:56.108575',2,7),
	 ('2024-03-02 20:42:00.497466','2024-04-03 20:20:15.310050',1,5),
	 ('2023-04-02 20:42:09.074176','2024-04-03 19:10:48.559363',2,3);
INSERT INTO abalat.`member` (username,password,first_name,middle_name,last_name,phone_number,email,address,previous_church,role_in_previous_church,is_baptised,spouse_name,children_names,emergency_contact,marital_status,has_letter_from_prev_church,notes,gender,image_url,is_active,created_at,updated_at,deleted_at,member_type_id) VALUES
	 ('min','$2b$10$ZQC0vOJRcnK8Luv/NLaQBucXqXG7QiuDNugcWuc6rLbr/uR41wKLy','Hizkiel','D','Tsegaye','+348 555 222 432','foe@fmail.com','Katunkatu','Meserete Kirstos',NULL,'',NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,1,'2024-03-25 11:52:28.545745','2024-04-07 11:00:01.414558',NULL,1),
	 ('joe','$2b$10$ZQC0vOJRcnK8Luv/NLaQBucXqXG7QiuDNugcWuc6rLbr/uR41wKLy','Bruke','B','Wolde','+358 555 123 132','joe@joej.com','123 Street ','Muluwongel',NULL,'',NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,1,'2024-03-25 11:52:28.545745','2024-04-07 11:00:01.420092',NULL,1),
	 ('bart','$2b$10$ZQC0vOJRcnK8Luv/NLaQBucXqXG7QiuDNugcWuc6rLbr/uR41wKLy','Bart','B','Simpson','+358 555 111 222',NULL,NULL,NULL,NULL,'true',NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,1,'2024-03-29 15:29:25.381666','2024-04-07 10:56:51.289956',NULL,1),
	 ('lisa','$2b$10$ZQC0vOJRcnK8Luv/NLaQBucXqXG7QiuDNugcWuc6rLbr/uR41wKLy','Lisa','','Vanhautten','+35811223344','lisa@vanhouse.com','springfield street 12',NULL,NULL,'true',NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,1,'2024-03-30 11:14:04.715809','2024-04-01 12:30:00.168564',NULL,3),
	 ('user1',NULL,'John',NULL,'Doe','+1234567890','john.doe@example.com',NULL,NULL,NULL,'Yes',NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,1,'2024-04-01 12:28:43.238899','2024-04-01 12:28:43.238899',NULL,1),
	 ('user2',NULL,'Jane',NULL,'Smith','+9876543210','jane.smith@example.com',NULL,NULL,NULL,'Yes',NULL,NULL,NULL,'Single',NULL,NULL,'Female',NULL,1,'2024-04-01 12:28:43.238899','2024-04-07 10:56:28.973234',NULL,4),
	 ('user3',NULL,'Michael',NULL,'Brown','+0987654321','michael.brown@example.com',NULL,NULL,NULL,'No',NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,1,'2024-04-01 12:28:43.238899','2024-04-01 12:29:24.753914',NULL,3),
	 ('user4',NULL,'Ashley',NULL,'Williams','+1231234567','ashley.williams@example.com',NULL,NULL,NULL,'Yes',NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,1,'2024-04-01 12:28:43.238899','2024-04-07 10:56:28.984205',NULL,4),
	 ('user5',NULL,'David',NULL,'Miller','+9874561230','david.miller@example.com',NULL,NULL,NULL,'No',NULL,NULL,NULL,'Single',NULL,NULL,'Male',NULL,1,'2024-04-01 12:28:43.238899','2024-04-01 12:28:43.238899',NULL,2),
	 ('user6',NULL,'Sarah',NULL,'Taylor','+0123456789','sarah.taylor@example.com',NULL,NULL,NULL,'Yes',NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,1,'2024-04-01 12:28:43.238899','2024-04-07 10:56:47.718281',NULL,1);
INSERT INTO abalat.`member` (username,password,first_name,middle_name,last_name,phone_number,email,address,previous_church,role_in_previous_church,is_baptised,spouse_name,children_names,emergency_contact,marital_status,has_letter_from_prev_church,notes,gender,image_url,is_active,created_at,updated_at,deleted_at,member_type_id) VALUES
	 ('user7',NULL,'William',NULL,'Jones','+9870987654','william.jones@example.com',NULL,NULL,NULL,'No',NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,1,'2024-04-01 12:28:43.238899','2024-04-01 12:28:43.238899',NULL,1),
	 ('user8',NULL,'Jennifer',NULL,'Garcia','+1239876543','jennifer.garcia@example.com',NULL,NULL,NULL,'Yes',NULL,NULL,NULL,'Single',NULL,NULL,'Female',NULL,1,'2024-04-01 12:28:43.238899','2024-04-01 12:28:43.238899',NULL,2),
	 ('user9',NULL,'Matthew',NULL,'Davis','+0981234567','matthew.davis@example.com',NULL,NULL,NULL,'No',NULL,NULL,NULL,'Married',NULL,NULL,'Male',NULL,1,'2024-04-01 12:28:43.238899','2024-04-01 12:29:24.779096',NULL,3),
	 ('user10',NULL,'Lisa',NULL,'Rodriguez','+9873456789','lisa.rodriguez@example.com',NULL,NULL,NULL,'Yes',NULL,NULL,NULL,'Married',NULL,NULL,'Female',NULL,1,'2024-04-01 12:28:43.238899','2024-04-01 12:28:43.238899',NULL,1);
INSERT INTO abalat.member_ministries (created_at,updated_at,deleted_at,member_id,ministry_id,role_id) VALUES
	 ('2024-03-30 22:45:35.830896','2024-03-30 22:45:35.830896',NULL,1,1,1),
	 ('2024-04-01 12:32:25.866788','2024-04-01 12:32:25.866788',NULL,2,1,2);
INSERT INTO abalat.member_type (name,display_name,created_at,updated_at) VALUES
	 ('member','Member','2024-03-14 08:00:57.714993','2024-03-14 08:00:57.714993'),
	 ('regular','Regular','2024-03-30 11:12:03.751732','2024-04-07 10:56:03.768395'),
	 ('remote','Remote','2024-03-30 11:12:12.452039','2024-03-30 11:12:12.452039'),
	 ('visitor','Visitor','2024-04-07 10:55:19.644440','2024-04-07 10:56:03.788183');
INSERT INTO abalat.member_under_minister (created_at,updated_at,minister_id,member_id) VALUES
	 ('2024-03-29 15:28:09.657547','2024-04-01 14:26:42.682514',1,6),
	 ('2024-03-29 15:30:33.853042','2024-03-29 15:30:33.853042',1,3),
	 ('2024-03-30 11:18:06.352759','2024-03-30 15:57:11.895215',1,4),
	 ('2024-04-01 12:33:28.595767','2024-04-01 12:33:28.595767',1,5),
	 ('2024-04-01 12:33:28.605131','2024-04-01 14:26:42.690922',2,11),
	 ('2024-04-01 12:33:28.614678','2024-04-01 12:33:28.614678',2,7),
	 ('2024-04-01 12:33:28.621368','2024-04-01 12:33:28.621368',2,8),
	 ('2024-04-01 12:33:28.628393','2024-04-01 12:33:28.628393',2,9),
	 ('2024-04-01 12:33:28.633665','2024-04-01 12:33:28.633665',2,10);
INSERT INTO abalat.ministry (name,display_name,is_active,created_at,updated_at) VALUES
	 ('elder','Elder',1,'2024-03-30 22:43:54.321813','2024-03-30 22:43:54.321813');
INSERT INTO abalat.`role` (name,display_name,is_visible,created_at,updated_at) VALUES
	 ('chairman','Chairman',1,'2024-03-30 22:45:04.263737','2024-03-30 22:45:04.263737'),
	 ('secretary','Secretary',1,'2024-03-30 22:45:04.273467','2024-03-30 22:45:04.273467'),
	 ('treasurer','Treasurer',1,'2024-03-30 22:45:04.283344','2024-03-30 22:45:04.283344'),
	 ('member','Member',1,'2024-03-30 22:45:04.290316','2024-03-30 22:45:04.290316');
