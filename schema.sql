CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `roles` VALUES (4,'teacher'),(5,'admin'),(6,'student');

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` int DEFAULT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_UN` (`email`),
  KEY `role_id` (`roleId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` VALUES (10,'admin','admin@gmail.com','$2b$10$rJ/VUyWEpAsVtDprv7fZ.OtCUglkslXrvAqD9h/kz27EYKCCWhHQu',5,1),(11,'Geetha Krishna','chgeethakrishna@gmail.com','$2b$10$YwIEy0idN14DSh8UguF7nOz8xjXOCLog8i7w9ffRLwuiIEIHBo7Iq',4,1),(15,'student1','suvindyajanu125@gmail.com','$2b$10$nTJevpes6BtNNYudp3HBaebmw2.onhUPJZhH9/oi.oHRnuthqKcvW',6,1),(16,'teacher2','abcd@gmail.com','$2b$10$Kgbt1lGY52ii5KiFAQi8sOGvsV3pvo8NsVXoC2VlN050xb/WnnLN2',4,1),(17,'test','test@gmail.com','$2b$10$B.i7ym1avD3ylf79x0oPg.61kcYHQjSLKduNwQuV0xDLGgYTlr6UG',6,1),(29,'teacher2','geetha.beehyv@gmail.com','$2b$10$3sxve5TXFwZA2ySPBWTJ7Or.XkYO/.LmJZ3FLCys7q/gwfq2roE5q',4,1);

CREATE TABLE `teachers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `teachers_UN` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `teachers` VALUES (11,'abcd@gmail.com'),(1,'chgeethakrishna@gmail.com'),(12,'geetha.beehyv@gmail.com');

CREATE TABLE `exam_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(100) NOT NULL,
  `label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `exam_status` VALUES (1,'ADD_QUESTIONS','Add Questions'),(2,'ADD_STUDENTS','Add Students'),(3,'UPCOMING','Upcoming'),(4,'ACTIVE','Active'),(5,'COMPLETED','Completed');

CREATE TABLE `exams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdBy` int NOT NULL,
  `examDate` timestamp NOT NULL,
  `duration` int NOT NULL,
  `totalQuestions` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `webcam` tinyint(1) NOT NULL DEFAULT '1',
  `shuffleQuestions` tinyint(1) NOT NULL DEFAULT '1',
  `negativeMarking` tinyint(1) NOT NULL DEFAULT '0',
  `switchBetweenQuestions` tinyint(1) NOT NULL DEFAULT '1',
  `lockBrowser` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `created_by` (`createdBy`),
  KEY `exams_exam_status_FK` (`status`),
  CONSTRAINT `exams_exam_status_FK` FOREIGN KEY (`status`) REFERENCES `exam_status` (`id`),
  CONSTRAINT `exams_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `examId` int NOT NULL,
  `question` text NOT NULL,
  `optionA` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `optionB` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `optionC` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `optionD` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `answer` char(1) NOT NULL,
  `marks` int NOT NULL,
  `hasNegative` tinyint NOT NULL,
  `negativePercentage` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `exam_id` (`examId`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`examId`) REFERENCES `exams` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `enrollment_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `label` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `enrollment_status` VALUES (1,'PENDING','Pending'),(2,'EMAIL_SENT','Email Sent'),(3,'ENROLLED','Enrolled'),(4,'EMAIL_SENT_FAILED','Email Sent Failed'),(5,'ATTEMPTED','Attempted');

CREATE TABLE `attempted_answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `examId` int NOT NULL,
  `answer` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `questionId` int NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`userId`),
  KEY `exam_id` (`examId`),
  KEY `question_id` (`questionId`),
  CONSTRAINT `attempted_answers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `attempted_answers_ibfk_2` FOREIGN KEY (`examId`) REFERENCES `exams` (`id`),
  CONSTRAINT `attempted_answers_ibfk_3` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `enrolled_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userId` int DEFAULT NULL,
  `examId` int NOT NULL,
  `registrationDate` timestamp NULL DEFAULT NULL,
  `hasAttempted` tinyint NOT NULL DEFAULT '0',
  `status` int NOT NULL,
  `hasFinished` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`userId`),
  KEY `exam_id` (`examId`),
  KEY `status` (`status`),
  CONSTRAINT `enrolled_users_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `enrolled_users_ibfk_2` FOREIGN KEY (`examId`) REFERENCES `exams` (`id`),
  CONSTRAINT `enrolled_users_ibfk_3` FOREIGN KEY (`status`) REFERENCES `enrollment_status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `examId` int NOT NULL,
  `userId` int NOT NULL,
  `results` int DEFAULT NULL,
  `grade` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `examId` (`examId`),
  KEY `userId` (`userId`),
  CONSTRAINT `results_ibfk_1` FOREIGN KEY (`examId`) REFERENCES `exams` (`id`),
  CONSTRAINT `results_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;