-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 29, 2017 at 09:23 AM
-- Server version: 5.7.11
-- PHP Version: 7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `esocio`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_info`
--

CREATE TABLE `account_info` (
  `account_id` int(11) NOT NULL,
  `account_firstname` varchar(50) DEFAULT NULL,
  `account_middlename` varchar(50) DEFAULT NULL,
  `account_lastname` varchar(50) DEFAULT NULL,
  `account_name_municipality` varchar(150) DEFAULT NULL,
  `account_username` varchar(50) DEFAULT NULL,
  `account_password` varchar(50) DEFAULT NULL,
  `account_email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account_info`
--

INSERT INTO `account_info` (`account_id`, `account_firstname`, `account_middlename`, `account_lastname`, `account_name_municipality`, `account_username`, `account_password`, `account_email`) VALUES
(1, 'John Paul', 'Garcia', 'Balanon', 'sample', 'admin', 'admin', 'jp@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `items_groups`
--

CREATE TABLE `items_groups` (
  `item_group_id` int(11) NOT NULL,
  `item_group_item` int(11) NOT NULL,
  `item_group_description` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `parameters`
--

CREATE TABLE `parameters` (
  `parameter_id` int(11) NOT NULL,
  `parameter_no` int(11) DEFAULT NULL,
  `parameter_name` varchar(50) DEFAULT NULL,
  `parameter_short_name` varchar(50) DEFAULT NULL,
  `is_tabular` tinyint(4) NOT NULL DEFAULT '0',
  `is_tabular_multiple` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `parameters`
--

INSERT INTO `parameters` (`parameter_id`, `parameter_no`, `parameter_name`, `parameter_short_name`, `is_tabular`, `is_tabular_multiple`) VALUES
(1, 1, 'Physical Characteristics', 'PC', 0, 0),
(2, 1, 'Demographics', 'DEMO', 0, 0),
(3, 2, 'Employment and Development Finance', 'EDF', 0, 0),
(4, 3, 'Existing Land User Distribution', 'ELUD', 0, 0),
(5, 3, 'Land Classication', 'LC', 0, 0),
(6, 4, 'Food Sufficiency', 'FS', 0, 0),
(7, 5, 'Road Network', 'RN', 0, 0),
(8, 5, 'Bridges', 'BR', 0, 0),
(9, 6, 'Social Welfare', 'SW', 0, 0),
(10, 7, 'Health Sector', 'HS', 0, 0),
(11, 8, 'Education Sector', 'ES', 0, 0),
(12, 9, 'Development Administration Sector', 'DAS', 0, 0),
(13, 10, 'Trade, Industry and Tourism Sector', 'TITS', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `parameter_items`
--

CREATE TABLE `parameter_items` (
  `item_id` int(11) NOT NULL,
  `item_parameter` int(11) DEFAULT NULL,
  `item_attribute` varchar(500) DEFAULT NULL,
  `is_group_item` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `parameter_items`
--

INSERT INTO `parameter_items` (`item_id`, `item_parameter`, `item_attribute`, `is_group_item`) VALUES
(1, 1, 'Land Area', 0),
(2, 1, 'Terrain', 0),
(3, 1, 'Climate', 0),
(4, 1, 'Number of Barangays', 0),
(5, 2, 'Population', 0),
(6, 2, 'Growth Rate', 0),
(7, 2, 'Population Density', 0),
(8, 2, 'Number of Households', 0),
(9, 2, 'Number of Families', 0),
(10, 2, 'Major Dialects', 0),
(11, 2, 'Religion', 0),
(12, 2, 'Literacy Rate', 0),
(13, 3, 'Labor Force No', 0),
(14, 3, 'Employment Rate', 0),
(15, 3, 'ED Agriculture', 0),
(16, 3, 'ED Industry', 0),
(17, 3, 'ED Services', 0),
(18, 3, 'Poverty Incidence', 0),
(19, 3, 'Magnitude of Poor Families', 0),
(20, 3, 'Magnitude of Poor Population', 0),
(21, 3, 'Classification', 0),
(22, 3, 'Municipal Govt Revenue', 0),
(23, 3, 'Municipal Govt Expenditures', 0),
(24, 4, 'Agricultural Areas', 0),
(25, 4, 'Grassland Areas', 0),
(26, 4, 'Wooded Areas', 0),
(27, 4, 'Bareland Areas', 0),
(28, 4, 'Wetland Areas', 0),
(29, 4, 'Builtup Areas', 0),
(30, 5, 'Certified A&D', 0),
(31, 5, 'Public Forest Land', 0),
(32, 5, 'Number of Barangays ', 0),
(33, 5, 'Upland', 0),
(34, 5, 'Lowland', 0),
(35, 5, 'Coastal', 0),
(36, 5, 'Riverside', 0),
(37, 5, 'Number of Sawmills', 0),
(38, 5, 'Number of Lumberdealers', 0),
(39, 7, 'Brgy Road Concrete', 0),
(40, 7, 'Brgy Road Asphalt', 0),
(41, 7, 'Brgy Road Gravel', 0),
(42, 7, 'Brgy Rad Earthfill', 0),
(43, 7, 'Municipal Road Concrete', 0),
(44, 7, 'Municipal Road Asphalt', 0),
(45, 7, 'Municipal Road Gravel', 0),
(46, 7, 'Municipal Road Earthfill', 0),
(47, 7, 'Provincial Road Concrete', 0),
(48, 7, 'Provincial Road Asphalt', 0),
(49, 7, 'Provincial Road Gravel', 0),
(50, 7, 'Provincial Road Earthfill', 0),
(51, 7, 'National Road Concrete', 0),
(52, 7, 'National Road Asphalt', 0),
(53, 7, 'National Road Gravel', 0),
(54, 7, 'National Road Earthfill', 0),
(55, 8, 'Brgy span steel', 0),
(56, 8, 'Brgy span concrete', 0),
(57, 8, 'Brgy span Composite', 0),
(58, 8, 'Brgy span Jumbo', 0),
(59, 8, 'Brgy span Bailey', 0),
(60, 8, 'Brgy span Footbridge', 0),
(61, 8, 'Brgy Length Steel', 0),
(62, 8, 'Brgy Length Concrete', 0),
(63, 8, 'Brgy Length Composite', 0),
(64, 8, 'Brgy Length Jumbo', 0),
(65, 8, 'Brgy Length Bailey', 0),
(66, 8, 'Brgy Length Footbridge', 0),
(67, 8, 'Municipal span Steel', 0),
(68, 8, 'Municipal span Concrete', 0),
(69, 8, 'Municipal span Composite', 0),
(70, 8, 'Municipal span Jumbo', 0),
(71, 8, 'Municipal span Bailey', 0),
(72, 8, 'Municipal span Footbridge', 0),
(73, 8, 'Municipal length Steel', 0),
(74, 8, 'Municipal length Concrete', 0),
(75, 8, 'Municipal length Composite', 0),
(76, 8, 'Municipal length Jumbo', 0),
(77, 8, 'Municipal length Bailey', 0),
(78, 8, 'Municipal length Footbridge', 0),
(79, 8, 'Provincial span Steel', 0),
(80, 8, 'Provincial span Concrete', 0),
(81, 8, 'Provincial span Composite', 0),
(82, 8, 'Provincial span Jumbo', 0),
(83, 8, 'Provincial span Bailey', 0),
(84, 8, 'Provincial span Footbridge', 0),
(85, 8, 'Provincial length Steel', 0),
(86, 8, 'Provincial length Concrete', 0),
(87, 8, 'Provincial length Composite', 0),
(88, 8, 'Provincial length Jumbo', 0),
(89, 8, 'Provincial length Bailey', 0),
(90, 8, 'Provincial length Footbridge', 0),
(91, 8, 'National span Steel', 0),
(92, 8, 'National span Concrete', 0),
(93, 8, 'National span Composite', 0),
(94, 8, 'National span Jumbo', 0),
(95, 8, 'National span Bailey', 0),
(96, 8, 'National span Footbridge', 0),
(97, 8, 'National length Steel', 0),
(98, 8, 'National length Concrete', 0),
(99, 8, 'National length Composite', 0),
(100, 8, 'National length Jumbo', 0),
(101, 8, 'National length Bailey', 0),
(102, 8, 'National length Footbridge', 0),
(103, 9, 'No of Daycare Center', 0),
(104, 9, 'No of Daycare Worker', 0),
(105, 9, 'No of Daycare Children', 0),
(106, 10, 'Crude Birth Rate', 0),
(107, 10, 'Crude Death Rate', 0),
(108, 10, 'Maternal Mortality Rate', 0),
(109, 10, 'Infant Mortality Rate', 0),
(110, 10, 'Morbidity Rate', 0),
(111, 10, 'Mortality Rate', 0),
(112, 10, 'Contraceptive Prevalence Rate', 0),
(113, 10, 'Malnutrition Rate Pre School', 0),
(114, 10, 'Malnutrition Rate In School', 0),
(115, 10, 'No of Hospital', 0),
(116, 10, 'No of Clinics', 0),
(117, 11, 'No of Tertiary College', 0),
(118, 11, 'No of Tertiary University', 0),
(119, 11, 'No of Secondary Public', 0),
(120, 11, 'No of Secondary Private', 0),
(121, 11, 'No of Elem Public', 0),
(122, 11, 'No of Elem Private', 0),
(123, 12, 'Crime Rate Index', 0),
(124, 12, 'Crime Rate Non-Index', 0),
(125, 12, 'No of Cooperatives', 0),
(126, 12, 'No of Banks', 0),
(127, 12, 'No of Lending Institutions', 0),
(128, 12, 'No of Messengerial Offices', 0),
(129, 12, 'No of Fire trucks', 0),
(130, 12, 'No of Radio Stations', 0),
(131, 13, 'Parocial Fiesta Date', 0),
(132, 13, 'Town Fiesta Date', 0),
(133, 13, 'Name of Patron', 0),
(134, 13, 'Market Days', 0),
(135, 13, 'No of Business Trading', 0),
(136, 13, 'No of Business Services', 0),
(137, 13, 'No of Business Manufacturing', 0),
(138, 13, 'No of Beauty Parlor', 0),
(139, 13, 'No of Barber Shops', 0),
(140, 13, 'No of Photo studios', 0),
(141, 13, 'No of Tailoring shop', 0),
(142, 13, 'No of Restaurants', 0),
(143, 13, 'No of Eateries', 0),
(144, 13, 'No of Canteen', 0),
(145, 13, 'No of Funeral Parlor', 0),
(146, 13, 'No of Gasoline Stations', 0),
(147, 13, 'No of Water Stations', 0),
(148, 13, 'No of Resorts', 0),
(149, 13, 'Others', 0);

-- --------------------------------------------------------

--
-- Table structure for table `parameter_table_row`
--

CREATE TABLE `parameter_table_row` (
  `table_row_id` int(11) NOT NULL,
  `table_row_item` int(11) NOT NULL,
  `table_row_description` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `profile_id` int(11) NOT NULL,
  `profile_year` date DEFAULT NULL,
  `municipality` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `pb_north` varchar(50) DEFAULT NULL,
  `pb_south` varchar(50) DEFAULT NULL,
  `pb_east` varchar(50) DEFAULT NULL,
  `pb_west` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sectors`
--

CREATE TABLE `sectors` (
  `sector_id` int(11) NOT NULL,
  `sector_description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sectors`
--

INSERT INTO `sectors` (`sector_id`, `sector_description`) VALUES
(1, 'Macro Sector'),
(2, 'Employment and Development Finance Sector'),
(3, 'Environmental Sector'),
(4, 'Agriculture and Utilities Sector'),
(5, 'Infrastructure and Utilities Sector'),
(6, 'Social Welfare Sector'),
(7, 'Health Sector'),
(8, 'Education Sector'),
(9, 'Development Administration Sector'),
(10, 'Trade, Industry and Tourism Sector');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_info`
--
ALTER TABLE `account_info`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `items_groups`
--
ALTER TABLE `items_groups`
  ADD PRIMARY KEY (`item_group_id`),
  ADD KEY `item_group_item` (`item_group_item`);

--
-- Indexes for table `parameters`
--
ALTER TABLE `parameters`
  ADD PRIMARY KEY (`parameter_id`);

--
-- Indexes for table `parameter_items`
--
ALTER TABLE `parameter_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `item_parameter` (`item_parameter`);

--
-- Indexes for table `parameter_table_row`
--
ALTER TABLE `parameter_table_row`
  ADD PRIMARY KEY (`table_row_id`),
  ADD KEY `table_row_item` (`table_row_item`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`profile_id`);

--
-- Indexes for table `sectors`
--
ALTER TABLE `sectors`
  ADD PRIMARY KEY (`sector_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_info`
--
ALTER TABLE `account_info`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `items_groups`
--
ALTER TABLE `items_groups`
  MODIFY `item_group_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `parameters`
--
ALTER TABLE `parameters`
  MODIFY `parameter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `parameter_items`
--
ALTER TABLE `parameter_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;
--
-- AUTO_INCREMENT for table `parameter_table_row`
--
ALTER TABLE `parameter_table_row`
  MODIFY `table_row_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sectors`
--
ALTER TABLE `sectors`
  MODIFY `sector_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `items_groups`
--
ALTER TABLE `items_groups`
  ADD CONSTRAINT `items_groups_ibfk_1` FOREIGN KEY (`item_group_item`) REFERENCES `parameter_items` (`item_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `parameter_items`
--
ALTER TABLE `parameter_items`
  ADD CONSTRAINT `parameter_items_ibfk_1` FOREIGN KEY (`item_parameter`) REFERENCES `parameters` (`parameter_id`);

--
-- Constraints for table `parameter_table_row`
--
ALTER TABLE `parameter_table_row`
  ADD CONSTRAINT `parameter_table_row_ibfk_1` FOREIGN KEY (`table_row_item`) REFERENCES `parameter_items` (`item_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
