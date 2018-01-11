-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: vwn
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(50) NOT NULL,
  `region_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `web` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `org_id` int(11) NOT NULL,
  `post_code` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `house_number` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`,`org_id`),
  KEY `fk_contact_org_idx` (`org_id`),
  CONSTRAINT `fk_contact_org` FOREIGN KEY (`org_id`) REFERENCES `org` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_contact_region` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2054 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES 
(2014,'0031688999777',13,'info@hackyourfuture.net','http://www.hackyourfuture.net/','2017-10-24 22:19:36','2017-10-24 22:19:36',1014,'1017 CB','Amsterdam','504')
,(2015,'0031677446688',14,'info@global-workforce.nl','https://www.global-workforce.nl/pages/workforce/Home','2017-10-24 23:23:24','2017-10-24 23:23:24',1015,'1012 GH','Amsterdam','2')
,(2016,'0031677446688',15,'info@refugeestartforce.eu','https://refugeestartforce.eu/','2017-10-24 23:34:46','2017-10-24 23:34:46',1016,'3512 JE','Utrecht','13')
,(2017,'0031677446688',17,'info@refugeestartforce.eu','https://refugeestartforce.eu/','2017-10-24 23:34:46','2017-10-24 23:34:46',1016,'5611 CH','Eindhoven','55')
,(2018,'0031205231100',13,'info@humanitas.nl','https://www.humanitas.nl/programmas/taalmaatjes/','2017-10-25 15:02:45','2017-10-25 15:02:45',1017,'1017 WS','Amsterdam','4')
,(2019,'0031205231100',14,'info@humanitas.nl','https://www.humanitas.nl/programmas/taalmaatjes/','2017-10-25 15:02:45','2017-10-25 15:02:45',1017,'7513 HJ','Enschede','259')
,(2020,'0031206272408 ',15,'askv@dds.nl','http://www.askv.nl/','2017-10-25 15:18:13','2017-10-25 15:18:13',1018,'1052 HN','Amsterdam','111')
,(2021,'0031206272408 ',16,'askv@dds.nl','http://www.askv.nl/','2017-10-25 15:18:13','2017-10-25 15:18:13',1018,'6085 AB','Horn','41')
,(2022,'0031206272408 ',17,'askv@dds.nl','http://www.askv.nl/','2017-10-25 15:18:13','2017-10-25 15:18:13',1018,'9727 CC','Groningen','61')
,(2023,'0031638251938',13,'info@restaurantsyr.nl','http://restaurantsyr.nl/','2017-10-25 15:29:01','2017-10-25 15:29:01',1019,'3512 PE','Utrecht','71')
,(2024,'0031638251938',14,'info@restaurantsyr.nl','http://restaurantsyr.nl/','2017-10-25 15:29:01','2017-10-25 15:29:01',1019,'3262 HK','Oud-Beijerland','1')
,(2025,'0031673947173',15,'info@refugeecompany.com','https://www.refugeecompany.com/','2017-10-25 15:39:33','2017-10-25 15:39:33',1020,'1096 AN','Amsterdam','1')
,(2026,'0031673947173',16,'info@refugeecompany.com','https://www.refugeecompany.com/','2017-10-25 15:39:33','2017-10-25 15:39:33',1020,'8932 GN','Leeuwarden','15')
,(2027,'0031673947173',17,'info@refugeecompany.com','https://www.refugeecompany.com/','2017-10-25 15:39:33','2017-10-25 15:39:33',1020,'7602 HN','Almelo','9')
,(2028,'0031673958263',13,'info@takecarebnb.com','https://www.takecarebnb.com/','2017-10-25 16:10:22','2017-10-25 16:10:22',1021,'1018 DP','Amsterdam','18')
,(2029,'0031673958263',14,'info@takecarebnb.com','https://www.takecarebnb.com/','2017-10-25 16:10:22','2017-10-25 16:10:22',1021,'4331 TV','Middelburg','33')
,(2030,'0031649582018',15,'info@delitelabs.com','http://delitelabs.com/','2017-10-25 16:22:05','2017-10-25 16:22:05',1022,'1092 CK','Amsterdam','2')
,(2031,'0031649582018',16,'info@delitelabs.com','http://delitelabs.com/','2017-10-25 16:22:05','2017-10-25 16:22:05',1022,'6301','Valkenburg','22')
,(2032,'0031649582018',17,'info@delitelabs.com','http://delitelabs.com/','2017-10-25 16:22:05','2017-10-25 16:22:05',1022,'9673 HP','Winschoten','31')
,(2033,'0031673810543',13,'info@futurelearn.com','https://www.futurelearn.com/courses/dutch','2017-10-25 16:33:55','2017-10-25 16:33:55',1023,'5049 BR','Tilburg','192')
,(2034,'0031673810543',14,'info@futurelearn.com','https://www.futurelearn.com/courses/dutch','2017-10-25 16:33:55','2017-10-25 16:33:55',1023,'8253 CD','Dronten','3')
,(2035,'0031641294061',15,'info@mobile-educator.org','http://mobile-educator.org/','2017-10-25 16:41:00','2017-10-25 16:41:00',1024,'2313 ES','Leiden','21')
,(2036,'0031641294061',16,'info@mobile-educator.org','http://mobile-educator.org/','2017-10-25 16:41:00','2017-10-25 16:41:00',1024,'8748 GG','Witmarsum','5')
,(2037,'0031638451016',17,'info@new-bees.org','https://www.new-bees.org/','2017-10-25 16:52:34','2017-10-25 16:52:34',1025,'1506 MZ','Zaandam','3')
,(2038,'0031638451016',13,'info@new-bees.org','https://www.new-bees.org/','2017-10-25 16:52:34','2017-10-25 16:52:34',1025,'7122 TA','Aalten','65')
,(2039,'0031614793312',14,'info@yallafoundation.nl','http://yallafoundation.nl/','2017-10-25 17:00:21','2017-10-25 17:00:21',1026,'6541 BA','Nijmegen','150')
,(2040,'0031614793312',15,'info@yallafoundation.nl','http://yallafoundation.nl/','2017-10-25 17:00:21','2017-10-25 17:00:21',1026,'8019 AR','Zwolle','18A')
,(2041,'0031637481524',16,'info@openembassy.nl','http://www.openembassy.nl/','2017-10-25 17:10:54','2017-10-25 17:10:54',1027,'8225','Lelystad','33')
,(2042,'0031637481524',17,'info@openembassy.nl','http://www.openembassy.nl/','2017-10-25 17:10:54','2017-10-25 17:10:54',1027,'7007 AV','Doetinchem','43')
,(2043,'0031624879501',13,'info@syriersgezond.nl','https://www.gezondinnederland.info/','2017-10-25 17:22:51','2017-10-25 17:22:51',1028,'7944 XX','Meppel','55')
,(2044,'0031624879501',14,'info@syriersgezond.nl','https://www.gezondinnederland.info/','2017-10-25 17:22:51','2017-10-25 17:22:51',1028,'3315 AJ','Dordrecht','213');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-29  3:34:08
