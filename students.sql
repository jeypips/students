-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 29, 2017 at 04:50 PM
-- Server version: 5.7.11
-- PHP Version: 7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `students`
--

-- --------------------------------------------------------

--
-- Table structure for table `student_info`
--

CREATE TABLE `student_info` (
  `student_id` int(11) NOT NULL,
  `student_no` int(11) DEFAULT NULL,
  `student_firstname` varchar(100) DEFAULT NULL,
  `student_middlename` varchar(100) DEFAULT NULL,
  `student_lastname` varchar(100) DEFAULT NULL,
  `student_address` varchar(100) DEFAULT NULL,
  `student_username` varchar(50) DEFAULT NULL,
  `student_password` varchar(50) DEFAULT NULL,
  `student_contact` varchar(50) DEFAULT NULL,
  `student_grade` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_info`
--

INSERT INTO `student_info` (`student_id`, `student_no`, `student_firstname`, `student_middlename`, `student_lastname`, `student_address`, `student_username`, `student_password`, `student_contact`, `student_grade`) VALUES
(1, 1, 'Juan', 'De', 'La Cruz', 'SFC', 'admin', 'admin', '09999999999', '1'),
(2, NULL, 'Allen Jayson', 'De', 'Florendo', 'SFC', NULL, NULL, '09999999999', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `student_info`
--
ALTER TABLE `student_info`
  ADD PRIMARY KEY (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `student_info`
--
ALTER TABLE `student_info`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
