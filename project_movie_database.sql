-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: projectmovie
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cinemamovies`
--

DROP TABLE IF EXISTS `cinemamovies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cinemamovies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cinemaId` int DEFAULT NULL,
  `movieId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cinemaId` (`cinemaId`),
  KEY `movieId` (`movieId`),
  CONSTRAINT `cinemamovies_ibfk_1` FOREIGN KEY (`cinemaId`) REFERENCES `cinemas` (`id`),
  CONSTRAINT `cinemamovies_ibfk_2` FOREIGN KEY (`movieId`) REFERENCES `movies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cinemamovies`
--

LOCK TABLES `cinemamovies` WRITE;
/*!40000 ALTER TABLE `cinemamovies` DISABLE KEYS */;
INSERT INTO `cinemamovies` VALUES (1,1,1,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(4,2,4,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(6,3,6,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(8,4,8,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(10,5,10,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(12,6,12,'2021-10-20 00:00:00','2021-10-20 00:00:00');
/*!40000 ALTER TABLE `cinemamovies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cinemas`
--

DROP TABLE IF EXISTS `cinemas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cinemas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `cineplexId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cineplexId` (`cineplexId`),
  CONSTRAINT `cinemas_ibfk_1` FOREIGN KEY (`cineplexId`) REFERENCES `cineplexes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cinemas`
--

LOCK TABLES `cinemas` WRITE;
/*!40000 ALTER TABLE `cinemas` DISABLE KEYS */;
INSERT INTO `cinemas` VALUES (1,'GLX - Huỳnh Tấn Phát','1362 Huỳnh Tấn Phát, KP1, Phú Mỹ, Q. 7','',1,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(2,'GLX - Kinh Dương Vương','718bis Kinh Dương Vương, Q.6','',1,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(3,'CGV - Aeon Bình Tân','Tầng 3, TTTM Aeon Mall Bình Tân, Số 1 đường số 17A, khu phố 11, Bình Trị Đông B, Bình Tân','',2,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(4,'CGV - Aeon Tân Phú','30 Bờ Bao Tân Thắng, Sơn Kỳ, Tân Phú','',2,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(5,'BHD Star Cineplex - 3/2','L5-Vincom 3/2, 3C Đường 3/2, Q.10','',3,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(6,'BHD Star Cineplex - Bitexco','L3-Bitexco Icon 68, 2 Hải Triều, Q.1','',3,'2021-10-20 00:00:00','2021-10-20 00:00:00');
/*!40000 ALTER TABLE `cinemas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cineplexes`
--

DROP TABLE IF EXISTS `cineplexes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cineplexes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cineplexes`
--

LOCK TABLES `cineplexes` WRITE;
/*!40000 ALTER TABLE `cineplexes` DISABLE KEYS */;
INSERT INTO `cineplexes` VALUES (1,'GalaxyCinema','','2021-10-20 00:00:00','2021-10-20 00:00:00'),(2,'CGVCinema','','2021-10-20 00:00:00','2021-10-20 00:00:00'),(3,'BHDStar','','2021-10-20 00:00:00','2021-10-20 00:00:00');
/*!40000 ALTER TABLE `cineplexes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `time` int DEFAULT NULL,
  `evaluate` int DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'Avenger','2021-09-01 00:00:00',120,9,'http://localhost:4000/public/images/poster/20211021093108_avenger1_banner.jpg','','2021-10-13 00:00:00','2021-10-21 09:31:08'),(2,'Ironman','2021-10-01 00:00:00',120,8,'','','2021-10-13 00:00:00','2021-10-13 00:00:00'),(3,'Doctor Strange','2021-09-02 00:00:00',140,8,'','','2021-10-20 19:30:28','2021-10-20 19:30:28'),(4,'Spider-Man','2021-09-12 00:00:00',145,8,'','','2021-10-20 20:10:53','2021-10-20 20:10:53'),(5,'Spider-Man 2','2021-09-14 16:30:00',148,7,'','','2021-10-20 20:15:53','2021-10-20 20:15:53'),(6,'Spider-Man 3','2021-12-14 19:30:00',160,9,'','','2021-10-20 20:20:17','2021-10-20 20:20:17'),(7,'The Amazing Spider-Man','2022-04-09 20:30:00',144,10,'','','2021-10-20 20:20:58','2021-10-20 20:20:58'),(8,'The Amazing Spider-Man 2','2022-08-14 18:30:00',148,9,'','','2021-10-20 20:47:55','2021-10-20 20:47:55'),(9,'The Amazing Spider-Man 3','2023-06-18 15:45:00',142,8,'','','2021-10-20 20:51:15','2021-10-20 20:51:15'),(10,'Batman','2018-02-19 17:30:00',140,7,'','','2021-10-20 21:04:07','2021-10-20 21:04:07'),(11,'Superman','2018-04-28 14:40:00',142,8,'','','2021-10-20 21:20:26','2021-10-20 21:20:26'),(12,'Black Panther','2021-09-10 20:44:00',148,9,'','','2021-10-20 21:23:16','2021-10-21 17:56:13');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seats`
--

DROP TABLE IF EXISTS `seats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `showtimeId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `showtimeId` (`showtimeId`),
  CONSTRAINT `seats_ibfk_1` FOREIGN KEY (`showtimeId`) REFERENCES `showtimes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seats`
--

LOCK TABLES `seats` WRITE;
/*!40000 ALTER TABLE `seats` DISABLE KEYS */;
INSERT INTO `seats` VALUES (7,'D3',1,70000,'standard',2,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(8,'D4',0,70000,'standard',2,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(9,'E3',1,90000,'couple',2,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(10,'E4',0,90000,'couple',2,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(11,'F3',1,11000,'luxury',2,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(12,'F4',0,110000,'luxury',2,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(19,'D5',1,70000,'standard',4,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(20,'D6',0,70000,'standard',4,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(21,'E5',1,90000,'couple',4,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(22,'E6',0,90000,'couple',4,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(23,'F5',1,11000,'luxury',4,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(24,'F6',0,110000,'luxury',4,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(31,'D7',1,70000,'standard',6,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(32,'D8',0,70000,'standard',6,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(33,'E7',1,90000,'couple',6,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(34,'E8',0,90000,'couple',6,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(35,'F7',1,11000,'luxury',6,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(36,'F8',0,110000,'luxury',6,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(43,'D7',1,70000,'standard',8,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(44,'D8',0,70000,'standard',8,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(45,'E7',1,90000,'couple',8,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(46,'E8',0,90000,'couple',8,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(47,'F7',1,11000,'luxury',8,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(48,'F8',0,110000,'luxury',8,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(55,'D7',1,70000,'standard',10,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(56,'D8',0,70000,'standard',10,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(57,'E7',1,90000,'couple',10,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(58,'E8',0,90000,'couple',10,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(59,'F7',1,11000,'luxury',10,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(60,'F8',0,110000,'luxury',10,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(67,'D7',1,70000,'standard',12,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(68,'D8',0,70000,'standard',12,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(69,'E7',1,90000,'couple',12,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(70,'E8',0,90000,'couple',12,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(71,'F7',1,11000,'luxury',12,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(72,'F8',0,110000,'luxury',12,'2021-10-20 00:00:00','2021-10-20 00:00:00');
/*!40000 ALTER TABLE `seats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20211013160451-create-user.js'),('20211013160534-create-movie.js'),('20211013160616-create-ticket.js'),('20211013160838-create-cineplex.js'),('20211013161051-create-cinema.js'),('20211013161342-create-cinema-movie.js'),('20211013161456-create-showtime.js'),('20211013161537-create-seat.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `showtimes`
--

DROP TABLE IF EXISTS `showtimes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `showtimes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `startTime` datetime DEFAULT NULL,
  `cinemaId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cinemaId` (`cinemaId`),
  CONSTRAINT `showtimes_ibfk_1` FOREIGN KEY (`cinemaId`) REFERENCES `cinemas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `showtimes`
--

LOCK TABLES `showtimes` WRITE;
/*!40000 ALTER TABLE `showtimes` DISABLE KEYS */;
INSERT INTO `showtimes` VALUES (2,'2021-10-01 00:00:00',1,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(4,'2021-09-12 00:00:00',2,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(6,'2021-12-14 19:30:00',3,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(8,'2022-08-14 18:30:00',4,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(10,'2018-02-19 17:30:00',5,'2021-10-20 00:00:00','2021-10-20 00:00:00'),(12,'2021-09-10 20:44:00',6,'2021-10-20 00:00:00','2021-10-20 00:00:00');
/*!40000 ALTER TABLE `showtimes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `movieId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `movieId` (`movieId`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`movieId`) REFERENCES `movies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (4,14,1,'2021-10-13 00:00:00','2021-10-13 00:00:00'),(5,14,2,'2021-10-13 00:00:00','2021-10-13 00:00:00'),(6,6,1,'2021-10-13 00:00:00','2021-10-13 00:00:00');
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `avatar` varchar(1000) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'John','john@gmail.com','0987462712','$2a$10$auyewe1u/zUTpltokoYKSOd5B0uKrD4ZN1ayQeGvT96os8FtFWAMO','STAFF','','2021-10-13 00:00:00','2021-10-16 16:14:49'),(13,'Lee','lee@gmail.com','0565025292','$2a$10$5KP6rPG6sIc8aa7qzEYcturiGbzJeli8rpfqRTwti4ZY0ZQrWKTa.','CUSTOMER','','2021-10-16 15:26:11','2021-10-16 15:26:11'),(14,'HieuDo','hieudo@gmail.com','0565025292','$2a$10$K8X1rnwsSDICnxllRzF6bez9iBFK/XtCY0PXldidKj/8BJg5oczzC','ADMIN','','2021-10-16 15:28:30','2021-10-16 15:28:30'),(15,'Hyoudou','hyoudou@gmail.com','0000000000','$2a$10$f3M.okLETPBaZK8p19XxaencMX6njzFg8kL01ytFkLYlEHQemXzsq','ADMIN','','2021-10-17 15:49:21','2021-10-21 17:55:31'),(16,'Kevin','kevin@gmail.com','1234567890','$2a$10$epoqy73zGj4nj8cX8ehTA.MC5quWPAKHEr3/AiFJW549w0Szl88Xm','CUSTOMER','','2021-10-17 17:18:35','2021-10-17 17:18:35'),(17,'Rock','rock@gmail.com','1234567894','$2a$10$JK2TxRLTshqg9Fy.QSO9geXG.6GKXyvIjjWP0RA3jQLGj818/J8Wm','CUSTOMER','','2021-10-17 17:26:10','2021-10-17 17:26:10'),(25,'Anna','anna@gmail.com','1234567892','$2a$10$SyIJ8dstRl4aoiJOy/9J.OjkNQalx88LGMT5O7NHsbQwWAX99iuCC','CUSTOMER','','2021-10-17 17:58:22','2021-10-17 17:58:22'),(26,'Rose','rose@gmail.com','1234567892','$2a$10$G2c.9R9BBoB9ruLL5uM8gO86M29jQG9HgGQ3/BW180VqIStx3OcwC','CUSTOMER','','2021-10-18 14:43:00','2021-10-18 14:43:00'),(27,'Lê Vinh','vinhle@gmail.com','1234567894','$2a$10$vn8exSC4unydMGA3CkZIWuCvyPEvl6EnQfNXzwYUJfUgpMVzYvt32','CUSTOMER','','2021-10-20 04:10:30','2021-10-20 04:10:30'),(28,'Eieiei','ei@gmail.com','1234567895','$2a$10$98QwlB9PAASeIgDbrAJqburZ4cGzUC2Lf.Hl7ftgxLBDEsVzrMMt6','CUSTOMER','','2021-10-20 05:23:59','2021-10-20 05:23:59'),(29,'Yae','yae@gmail.com','1234567894','$2a$10$AQTs6WkxQKX0V6gtHpxoGOfr0fSFc0tLADNXKHriR1F3LcGyTObz6','CUSTOMER','','2021-10-20 07:52:30','2021-10-20 07:52:30'),(30,'Phương Trinh','phuongtrinh@gmail.com','2234567891','$2a$10$aTJeowh17yseDRZaJindt.sb9yRXAB.YJ9shObN0ErxsMfK4gi5ni','CUSTOMER','','2021-10-20 08:31:32','2021-10-20 08:31:32'),(31,'Thúy Vy','thuyvy@gmail.com','2234567892','$2a$10$mxvOJ4HHSwZUm4vavljd4O8Mm/Sr6CBZ6y2r4iJWkXoBBKerllBiK','CUSTOMER','','2021-10-20 19:54:15','2021-10-20 19:54:15'),(32,'Đức Trung','trung@gmail.com','2234567893','$2a$10$2GGnZRufDHU1vOjLif1m6usFugCZl39pDEKOBPu66X6llovhHr00G','STAFF','','2021-10-20 19:55:14','2021-10-20 19:55:14'),(33,'Ngọc Thạch','thach@gmail.com','2234567894','$2a$10$xHK9BWptPbFbUZXQo6IJhOPsRR0aSIWTnMFRKnZRgDFO6CXTKUmB6','STAFF','','2021-10-20 22:10:00','2021-10-20 22:10:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-21 18:06:15
