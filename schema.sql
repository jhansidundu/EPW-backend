-- Table structure for table `roles`
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `users`
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`roleId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Table structure for table `teachers`
CREATE TABLE `teachers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `teachers_UN` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `enrollment_status`
CREATE TABLE `enrollment_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stauts` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `exam_status`
CREATE TABLE `exam_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(100) NOT NULL,
  `label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `exams`
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Table structure for table `questions`
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Table structure for table `enrolled_users`
CREATE TABLE `enrolled_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userId` int DEFAULT NULL,
  `examId` int NOT NULL,
  `registrationDate` timestamp NULL DEFAULT NULL,
  `hasAttempted` tinyint NOT NULL DEFAULT '0',
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`userId`),
  KEY `exam_id` (`examId`),
  KEY `status` (`status`),
  CONSTRAINT `enrolled_users_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `enrolled_users_ibfk_2` FOREIGN KEY (`examId`) REFERENCES `exams` (`id`),
  CONSTRAINT `enrolled_users_ibfk_3` FOREIGN KEY (`status`) REFERENCES `enrollment_status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Table structure for table `attempted_answers`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `roles`
INSERT INTO `roles` VALUES (4,'teacher'),(5,'admin'),(6,'student');

-- Dumping data for table `users`
INSERT INTO `users` VALUES (10,'admin','admin@gmail.com','$2b$10$rJ/VUyWEpAsVtDprv7fZ.OtCUglkslXrvAqD9h/kz27EYKCCWhHQu',5),(11,'Geetha Krishna','chgeethakrishna@gmail.com','$2b$10$YwIEy0idN14DSh8UguF7nOz8xjXOCLog8i7w9ffRLwuiIEIHBo7Iq',4);

-- Dumping data for table `teachers`
INSERT INTO `teachers` VALUES (1,'chgeethakrishna@gmail.com');

-- Dumping data for table `enrollment_status`
INSERT INTO `enrollment_status` VALUES (1,'PENDING');

-- Dumping data for table `exam_status`
INSERT INTO `exam_status` VALUES (1,'ADD_QUESTIONS','Add Questions'),(2,'ADD_STUDENTS','Add Students'),(3,'UPCOMING','Upcoming'),(4,'ACTIVE','Active'),(5,'COMPLETED','Completed');

-- Dumping data for table `exams`
INSERT INTO `exams` VALUES (8,11,'2024-02-15 04:30:00',30,12,'Exam 1',1,1,0,0,0,0),(9,11,'2024-02-15 04:10:00',30,0,'Exam 1',1,0,1,1,1,1),(10,11,'2024-02-23 05:30:00',30,13,'Exam 2',1,0,1,0,0,1),(11,11,'2024-02-23 05:20:00',30,15,'Exam 3',1,0,0,0,0,0);

-- Dumping data for table `questions`
INSERT INTO `questions` VALUES (5,8,'<p>Find the sum of first 100 natural numbers.</p>','5500','5512','5502','5590','B',2,0,'');


CREATE TABLE results (
  id INT PRIMARY KEY AUTO_INCREMENT,
  examId INT NOT NULL,
  userId INT NOT NULL,
  results int,
  grade varchar(255),
  FOREIGN KEY (examId) REFERENCES exams(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);