-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: atlassian
-- ------------------------------------------------------
-- Server version	5.5.60-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `locations` (
  `tile` varchar(3) NOT NULL,
  `resource` varchar(30) NOT NULL,
  PRIMARY KEY (`tile`,`resource`),
  KEY `resources_idx` (`resource`),
  CONSTRAINT `tile` FOREIGN KEY (`tile`) REFERENCES `zones` (`zone`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `resources` FOREIGN KEY (`resource`) REFERENCES `resources` (`resource`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `resources`
--

DROP TABLE IF EXISTS `resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `resources` (
  `resource` varchar(30) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`resource`),
  KEY `type_idx` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resources`
--

LOCK TABLES `resources` WRITE;
/*!40000 ALTER TABLE `resources` DISABLE KEYS */;
INSERT INTO `resources` VALUES ('acai','berries'),('acerolla','berries'),('arcticraspberry','berries'),('bilberry','berries'),('blackberry','berries'),('elderberry','berries'),('lignonberry','berries'),('schisandra','berries'),('seagrapes','berries'),('strawberry','berries'),('anthracite','coal'),('graphite','coal'),('lignite','coal'),('nitre','coal'),('peat','coal'),('sulfur','coal'),('braincoral','coral'),('firecoral','coral'),('calcite','crystal'),('herkimer','crystal'),('quartz','crystal'),('tellurite','crystal'),('bamboo','fibers'),('cotton','fibers'),('hemp','fibers'),('jute','fibers'),('seaweed','fibers'),('silk','fibers'),('straw','fibers'),('agate','flint'),('basalt','flint'),('chalcedony','flint'),('chert','flint'),('obsidian','flint'),('radiolarite','flint'),('cocoa','fruit'),('coconut','fruit'),('lime','fruit'),('olive','fruit'),('diamond','gem'),('emerald','gem'),('garnet','gem'),('opal','gem'),('ruby','gem'),('sunstone','gem'),('celery','herbs'),('cilantro','herbs'),('garlic','herbs'),('mint','herbs'),('oregano','herbs'),('parsley','herbs'),('rosemary','herbs'),('thyme','herbs'),('hair','hide'),('leather','hide'),('pelt','hide'),('skin','hide'),('wool','hide'),('bone','keratinoid'),('carapace','keratinoid'),('chitin','keratinoid'),('residue','keratinoid'),('scale','keratinoid'),('shell','keratinoid'),('aloe','medicinal'),('basil','medicinal'),('chamomile','medicinal'),('licorice','medicinal'),('poppy','medicinal'),('spirulina','medicinal'),('turmeric','medicinal'),('yarrow','medicinal'),('cobalt','metal'),('copper','metal'),('iridium','metal'),('iron','metal'),('silver','metal'),('tin','metal'),('mythos','mythos'),('blubber','oil'),('crudeoil','oil'),('fishoil','oil'),('mineraloil','oil'),('naptha','oil'),('oliveoil','oil'),('flakesalt','salt'),('iodine','salt'),('kalanamak','salt'),('pinksalt','salt'),('seasalt','salt'),('gum','sap'),('honey','sap'),('resin','sap'),('sugarcane','sap'),('sugars','sap'),('syrup','sap'),('coquina','stone'),('granite','stone'),('limestone','stone'),('marble','stone'),('pearl','stone'),('sandstone','stone'),('slate','stone'),('fronds','thatch'),('reeds','thatch'),('roots','thatch'),('rushes','thatch'),('twigs','thatch'),('beans','vegetable'),('beet','vegetable'),('cactus','vegetable'),('carrot','vegetable'),('chickpeas','vegetable'),('chili','vegetable'),('greens','vegetable'),('maize','vegetable'),('onion','vegetable'),('pepper','vegetable'),('potato','vegetable'),('rice','vegetable'),('turnip','vegetable'),('wheat','vegetable'),('wheatgrass','vegetable'),('agedwood','wood'),('darkwood','wood'),('ironwood','wood'),('lightwood','wood'),('softwood','wood'),('strongwood','wood'),('wetwood','wood');
/*!40000 ALTER TABLE `resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zones`
--

DROP TABLE IF EXISTS `zones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `zones` (
  `zone` varchar(3) NOT NULL,
  `freeport` tinyint(4) NOT NULL DEFAULT '0',
  `lawless` tinyint(4) NOT NULL DEFAULT '0',
  `goldenage` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`zone`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zones`
--

LOCK TABLES `zones` WRITE;
/*!40000 ALTER TABLE `zones` DISABLE KEYS */;
INSERT INTO `zones` VALUES ('a1',0,0,0),('a10',1,0,0),('a11',0,0,0),('a12',0,0,0),('a13',0,0,0),('a14',0,0,0),('a15',0,0,0),('a2',0,0,0),('a3',0,0,0),('a4',0,0,0),('a5',0,0,0),('a6',1,0,0),('a7',0,0,0),('a8',0,0,0),('a9',0,0,0),('b1',0,0,0),('b10',0,0,0),('b11',0,0,0),('b12',0,0,0),('b13',0,0,0),('b14',0,0,0),('b15',0,0,0),('b2',0,0,0),('b3',0,0,0),('b4',0,0,0),('b5',0,0,0),('b6',0,0,0),('b7',0,0,0),('b8',0,0,0),('b9',0,0,0),('c1',0,0,0),('c10',0,0,0),('c11',0,0,0),('c12',0,0,0),('c13',0,0,0),('c14',1,0,0),('c15',0,0,0),('c2',0,0,0),('c3',0,0,0),('c4',0,0,0),('c5',0,0,0),('c6',0,0,1),('c7',0,0,0),('c8',0,0,0),('c9',0,0,0),('d1',0,0,0),('d10',0,0,0),('d11',0,0,0),('d12',0,0,1),('d13',0,0,0),('d14',0,0,0),('d15',0,0,0),('d2',0,0,0),('d3',0,0,0),('d4',0,0,0),('d5',0,0,0),('d6',0,0,0),('d7',0,0,0),('d8',1,0,0),('d9',0,0,0),('e1',0,0,0),('e10',0,0,0),('e11',0,0,0),('e12',1,0,0),('e13',0,0,0),('e14',0,0,0),('e15',0,0,0),('e2',0,0,0),('e3',0,0,0),('e4',1,0,0),('e5',0,0,0),('e6',0,0,0),('e7',0,0,0),('e8',0,0,0),('e9',0,0,0),('f1',0,0,0),('f10',0,0,0),('f11',0,0,0),('f12',0,0,0),('f13',0,0,0),('f14',0,0,0),('f15',0,0,0),('f2',0,0,0),('f3',0,0,0),('f4',0,0,0),('f5',0,0,0),('f6',0,0,0),('f7',0,0,0),('f8',0,0,1),('f9',0,0,0),('g1',0,0,0),('g10',0,0,0),('g11',0,0,0),('g12',0,0,0),('g13',0,0,0),('g14',0,0,0),('g15',0,0,0),('g2',0,0,0),('g3',0,0,0),('g4',0,0,0),('g5',0,0,0),('g6',0,0,0),('g7',1,0,0),('g8',0,0,0),('g9',0,0,0),('h1',0,0,0),('h10',0,0,0),('h11',0,0,0),('h12',0,0,0),('h13',1,0,0),('h14',0,0,0),('h15',0,0,0),('h2',0,0,0),('h3',0,0,0),('h4',0,0,0),('h5',0,0,0),('h6',0,0,1),('h7',0,0,0),('h8',0,0,0),('h9',0,0,0),('i1',0,0,0),('i10',0,0,0),('i11',0,0,0),('i12',0,0,0),('i13',0,0,0),('i14',0,0,0),('i15',0,0,0),('i2',0,0,0),('i3',1,0,0),('i4',0,0,0),('i5',0,0,0),('i6',0,0,0),('i7',0,0,0),('i8',0,0,0),('i9',0,0,0),('j1',0,0,0),('j10',0,0,0),('j11',0,0,0),('j12',0,0,0),('j13',0,0,0),('j14',0,0,0),('j15',0,0,0),('j2',0,0,0),('j3',0,0,0),('j4',0,0,0),('j5',0,0,0),('j6',0,0,0),('j7',0,0,0),('j8',0,0,0),('j9',1,0,0),('k1',0,0,0),('k10',0,0,0),('k11',0,0,0),('k12',0,0,0),('k13',0,0,0),('k14',0,0,0),('k15',0,0,0),('k2',0,0,0),('k3',0,0,0),('k4',0,0,0),('k5',0,0,0),('k6',0,0,0),('k7',0,0,0),('k8',0,0,0),('k9',0,0,0),('l1',0,0,0),('l10',0,0,0),('l11',0,0,0),('l12',1,0,0),('l13',0,0,0),('l14',0,0,0),('l15',0,0,0),('l2',0,0,0),('l3',0,0,0),('l4',0,0,0),('l5',1,0,0),('l6',0,0,0),('l7',0,0,0),('l8',1,0,0),('l9',0,0,0),('m1',0,0,0),('m10',0,0,0),('m11',0,0,0),('m12',0,0,1),('m13',0,0,0),('m14',0,0,0),('m15',0,0,0),('m2',1,0,0),('m3',0,0,0),('m4',0,0,0),('m5',0,0,0),('m6',0,0,0),('m7',1,0,0),('m8',0,0,0),('m9',1,0,0),('n1',0,0,0),('n10',0,0,0),('n11',0,0,0),('n12',0,0,0),('n13',0,0,0),('n14',0,0,0),('n15',0,0,0),('n2',0,0,0),('n3',0,0,0),('n4',0,0,0),('n5',0,0,0),('n6',0,0,0),('n7',0,0,0),('n8',0,0,0),('n9',0,0,0),('o1',0,0,0),('o10',0,0,0),('o11',0,0,0),('o12',0,0,0),('o13',0,0,0),('o14',0,0,1),('o15',0,0,0),('o2',0,0,0),('o3',0,0,0),('o4',0,0,0),('o5',0,0,0),('o6',0,0,0),('o7',0,0,1),('o8',0,0,0),('o9',0,0,0);
/*!40000 ALTER TABLE `zones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-20 16:14:42
