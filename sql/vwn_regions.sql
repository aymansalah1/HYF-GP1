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
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `regions` (
  `id` int(11) NOT NULL ,
  `name` varchar(45) NOT NULL,
  `fill` varchar(45) NOT NULL,
  `d` varchar(2000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `regions` VALUES (13,'zuidnederland','#AAD7AD','M312.22,396.411l7.324-4.883l-1.343-26.831l-12.195-17.09l1.343-9.766l-7.324-3.784l-3.771-8.411l-5.981-2.441l0.049-0.365l-1.392,0.365l-8.423-7.312l-0.948,2.493l-13.7,1.035l-12.195-10.853h-17.077l-13.55,1.099l-8.423-2.441l-9.754,3.784l-4.883-1.343l-7.312-2.441l-8.545,2.441l-12.201-3.54l-4.883,5.981l-7.318,1.343l-12.201,12.194l-13.421,4.883l-15.863-1.342l-6.104,1.342l1.221,4.871l-9.76,5.981l-6.091,1.343l-0.488-0.049l-5.621,3.589l7.317,12.207l-3.649,6.226l7.312,13.293l1.16,13.05l-1.953,1.538l4.455-3.491l4.883,2.441l8.539-1.343l-3.662-9.754l2.441-9.766l13.422-1.098l-1.221,10.863l6.097-2.441l7.324,2.441l2.441-5.98l9.455-8.24l0.305-0.485l0,0l-0.305,0.415l0.305-0.415l0,0l0,0l0,0l0,0l-0.305,0.415l0.305-0.415l10.98,4.87l-8.539,9.766l13.422,2.43l2.436,3.784l10.986-12.194l9.766,3.539l-0.928,1.344l0,0l0.928-1.344l-0.928,1.414l0.928-1.414l-0.928,1.414l-3.961,5.969l8.587,7.324l-1.257,7.324l3.735,1.343l3.576-3.784l3.784,3.784v7.324h10.853l2.441-2.441l8.423,3.54l7.324-5.981l7.324,3.54l1.284,7.987l0.059,0.68l30.371,12.194l-3.54,7.313l-2.441,8.423l-3.784,11.108l-3.54,5.981l3.54,3.784l-2.441,5.969l-10.853,9.766l7.324,9.754v8.667h4.871l4.883-6.226L290.271,500l7.324-3.784l-6.226-8.423l4.883,1.343l3.771-9.753l4.883-1.344l-1.343-9.753l-8.41-1.099l2.441-8.667h-14.648l-3.784-13.306l6.226-1.343l2.441,6.226l24.39-24.402l-8.655-3.783v-12.195L312.22,396.411z','2017-09-19 13:22:28','2017-09-19 13:22:28')
,(14,'oostnederland','#EAC3E6','M414.71,124.451l-4.871,37.707l-3.784-1.844l3.784,1.844L414.71,124.451l6.543-11.658L414.71,124.451z M218.152,220.715h6.226l-7.324-12.194l13.306-12.207l12.207,9.766l3.784-3.54h7.312l-2.441,5.981l12.195-7.324l8.423-4.883l6.226-10.864v-8.654l-4.456-5.371l2.015-3.04l5.981-3.784h7.324l6.226-3.54l-3.784-2.441l0.488,0.122l0.854-1.465l-6.226-2.441l2.441-4.883l-3.54-9.766l-6.226-4.883l-5.981-1.202l-1.025-4.278l3.467-1.832l5.981,3.669l3.784-6.11h3.54l9.753,2.441l8.667-5.98l9.754,8.422l-8.655,9.754l4.871,13.55l6.226-1.343l10.864,4.883l6.226,6.226l14.636,1.099l1.099-7.324l8.667-3.54l12.378,7.861l2.259,4.346l-1.343,3.528l4.883,6.225l-8.423,1.1l1.099,3.783l1.343,7.312l14.648,7.324l9.766,2.441l4.87-6.226l12.195,14.648l-1.343,7.324l-4.871,9.753l3.772,9.754l-7.312,3.54l-2.441,6.226l-6.213,1.343l-7.324,10.864h-12.207l1.343,5.981l-7.324,2.686v5.97l5.981,1.098l11.108,9.766l-4.883,2.43v7.324l-4.883,3.784l-9.766-2.441l-21.948,10.864l-8.667-4.883l1.343,4.883l1.099,6.226l-12.207-6.226l-9.766-2.441l-8.411-5.981l2.43,12.207l-11.097-3.784l-12.194,6.226l4.883,9.766l-3.125,4.382l-10.181-4.382l-14.648,1.087l-12.195-10.853h-17.077l-13.55,1.099l-8.423-2.441l-9.754,3.784l-4.883-1.343v-8.423l-4.87-3.784l3.345-9.814l0.354,0.049l3.613-4.883l3.784,1.343l2.441-2.441l13.294,1.099l15.747-4.871l2.441-10.852l-5.981-4.883l4.883-9.766l-6.226-6.226l-1.099-5.981l-3.784-2.441v-6.226l-10.425-8.044L218.152,220.715 M387.562,159.155l6.299,0.562l4.443-0.562l-4.443,0.562L387.562,159.155z M373.23,161.06l3.54-1.343L373.23,161.06L373.23,161.06z M270.74,130.432L270.74,130.432l1.099-0.549L270.74,130.432z M252.808,161.06L252.808,161.06l0.977,1.025L252.808,161.06z','2017-09-19 13:22:28','2017-09-19 13:22:28')
,(15,'westenmiddennederland','#F3F493','M234.144,262.207l5.981,4.883l-2.441,10.852l-15.747,4.871l-13.294-1.099l-2.441,2.441l-3.784-1.343l-3.613,4.883l-8.587-2.441v-4.871l-9.76,2.43c0,0-9.82,4.346-10.98,3.784c-1.037-0.537-8.539-14.636-8.539-14.636l8.539-7.313l-4.883-2.441v-3.54l-3.656-4.883l3.656-3.784l4.883,1.099l1.221-4.883l-10.98-5.981l1.16-4.81l0.061-0.073l-8.545,3.784l-5.854-3.906l-0.244,0.122l-4.883,4.883l-8.538-2.441l4.876-18.176l-4.876,1.098l-7.142-4.992l13.238-37.586l3.662-36.608l8.539-39.038l6.104-3.662l2.441,4.883l2.436,7.318l6.104,3.668l8.539-3.668l1.221-3.662l9.271-2.375l17.511-15.924l0.915,2.503l-16.961,15.368l7.604,16.168l-1.251,13.538l6.177,5.981l2.478-3.54h8.411l2.441,3.54l2.441,6.226l-1.831,0.977l9.704,5.14l-0.549,1.208l0.977-0.854l0.915,1.104l-2.258,1.337l-0.55-0.61l-10.681-5.859l-1.697,1.099l-4.883,9.766l-9.845,2.441l-3.692-4.883l-7.324,3.784l4.633,16.101l0.244,0.977l8.587,13.294l-12.249,11.108l-0.244,1.587l-0.971,0.854v8.423h8.557l7.386,7.312l9.802-2.441l5.97,3.785l0.439-0.977l10.425,8.044v6.226l3.784,2.441l1.099,5.981l6.226,6.226L234.144,262.207zM162.152,92.73l7.324-12.201l3.656-12.2l-6.098-8.545l-13.422,15.862l-8.111,19.824l-0.184,0.916h5.854L162.152,92.73zM286.487,154.834l2.441-4.883l-3.54-9.766l-6.226-4.883l-5.981-1.202l-1.025-4.278l-1.416,0.609l-4.883-5.98h-8.655v1.098l-8.423,11.097v19.531l7.324,8.423h19.52l15.747-5.981l0.488,0.122l0.854-1.465L286.487,154.834z M273.182,171.912l-21.961-4.871l-11.584,7.251l-13.306-17.627l-1.831,1.587l13.11,17.139l-5.908,3.846l-1.343,4.87l-32.813,23.315v9.766h9.753l10.853,3.527h6.226l-7.324-12.194l13.306-12.207l12.207,9.766l3.784-3.54h7.312l-2.441,5.981l12.195-7.324l8.423-4.883l6.226-10.864v-8.654l-4.456-5.371L273.182,171.912z','2017-09-19 13:22:28','2017-09-19 13:22:28')
,(16,'noordnederland','#EDDFB3','M415.809,39.044l-1.099,7.318l12.207,4.883l2.441,9.76l-4.883,8.538l3.54,3.662V92.73v8.539l-13.306,23.182l-4.871,37.707l-7.324-3.54l-8.654,1.099l-13.306-1.099l-7.324,2.441l0.183,0.537l-12.378-7.861l-8.667,3.54l-1.099,7.324l-14.636-1.099l-6.226-6.226l-10.864-4.883l-6.226,1.343l-4.871-13.55l8.655-9.754l-9.754-8.422l-8.667,5.98l-9.753-2.441h-3.54l-3.784,6.11l-5.981-3.669l-4.883,2.441l-4.883-5.98h-8.655l-0.671,0.311l-2.869-2.752l-8.654,2.441l-9.766-2.441h-8.423l-4.883-7.312l5.981-4.889l-2.441-17.078L224.5,79.064l-10.742,4.938l0,0L201.38,95.471l-0.977-2.435l13.306-12.201l0.415,0.427l10.254-4.883v-0.732l4.883-15.862l14.648-19.52l36.597-18.304l23.059-3.656l14.637-1.221l13.55,2.436l46.362-12.201h5.981l8.667,4.883c0,0-1.953,11.225,3.54,18.305c5.725,7.073,12.194,8.538,12.194,8.538H415.809z M319.544,6.104l-8.655,2.436l-2.441,2.441l-3.54-3.662l2.441-6.098L323.084,0h11.108L319.544,6.104z M291.37,7.318l-1.099,2.441l-21.973,4.883l-3.784-2.441l-5.97,3.662l-7.324-1.221l-1.343-4.883l9.766-3.656l3.772,2.436L291.37,7.318z M243.909,12.201l-9.766,7.318h-8.667L203.76,30.506l-3.784-2.441l4.883-8.545l32.825-8.539L243.909,12.201z M195.105,39.044l-14.648,8.539l-8.539,6.104l-4.883,2.441l-1.221-3.662l23.182-17.084L195.105,39.044z','2017-09-19 13:22:28','2017-09-19 13:22:28')
,(17,'zuidwestnederland','#FBD293','M104.81,254.943l-18.304,19.459l-0.788,2.562l-1.525,4.749l-9.766-3.772l-4.877,1.344l-3.662,4.87l4.883,8.423l10.98-2.441l-6.104,6.226l4.883,8.423l-23.182,3.784l-1.221,8.423l-2.441,3.771l-2.624,0.611l-9.576,2.93l-6.098,4.883l3.656,7.263L34.9,349.072l-9.277-1.465L8.057,360.352l-0.427,0.928l3.839,3.418L1.221,388.55l1.282,0.537l1.159,7.324L0,399.951l7.324,11.108l12.201,1.099l-1.221-7.324l7.318-3.54l24.401,9.766l-2.435,4.883l10.979,3.528l15.857-7.312h4.883l20.617-18.188l3.662-2.93l-1.221-13.05l-7.312-13.293l3.649-6.226l-7.317-12.207l5.621-3.589l0.488,0.049l6.091-1.343l9.76-5.981l-1.221-4.871h0.244l5.859-1.342l15.863,1.342l13.421-4.883l12.201-12.194l7.318-1.343l4.883-5.981l12.201,3.54l8.545-2.441l7.312,2.441v-8.423l-4.87-3.784l3.345-9.814l-8.233-2.393v-4.871l-9.76,2.43c0,0-6.653,2.93-9.76,3.735v0.049v-0.049c-0.549,0.049-1.037,0.049-1.221,0.049c-1.037-0.537-8.539-14.636-8.539-14.636l8.539-7.312l-4.883-2.441v-3.54l-3.656-4.883l3.656-3.784l4.883,1.099l1.221-4.883l-10.98-5.981l1.16-4.81l-8.484,3.711l-5.854-3.906l-0.244,0.122l-4.883,4.883l-8.538-2.441l4.876-18.176l-4.876,1.098l-7.324-4.943L104.81,254.943zM41.975,335.474l9.271-3.857l9.583,11.06l-5.188,5.848l-0.732-0.916l-14.642,2.441l-3.113-0.488L41.975,335.474zM48.804,393.543l-2.435-0.916l-10.98-3.54l-12.207-6.226l-18.726,4.395l8.966-20.923l7.324,6.774l4.877,3.785h8.545l1.221-3.785l7.318,8.655h3.662l2.435,2.441V393.543zM93.83,390.186l-4.883-1.099l-2.441,5.981l-4.755-3.54l-4.883-2.441l-2.441-4.883l-6.098-1.343v6.226l-8.539,3.54l-2.441,3.784l-6.104-2.259v-7.507l8.545-1.343l3.656-9.754l6.104-2.441l12.201,9.754l15.747,3.784L93.83,390.186zM96.271,375.549l-10.858,2.441l-7.324-10.852l-6.098-3.784l-7.324-2.441l-7.318-2.441H46.369l4.876-2.441l7.324,1.343l2.441-2.441l-3.845-4.455l6.342-7.19l2.38,0.537l7.318,1.343l9.766-6.226v3.784l2.441,3.54H80.53l-9.76,6.226l7.318,4.883l2.441,4.883l10.858,1.099L96.271,375.549z','2017-09-19 13:22:28','2017-09-19 13:22:28');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
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
