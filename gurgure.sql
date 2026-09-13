-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2026 at 02:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gurgure`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `translations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`translations`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `slug`, `excerpt`, `content`, `image`, `author`, `is_published`, `created_at`, `updated_at`, `translations`) VALUES
(1, 'Strategic Transformation: A Roadmap for Afghan Enterprises', 'strategic-transformation-afghan-enterprises', 'Discover how Afghan businesses can navigate strategic transformation with practical roadmaps, feasibility studies, and institutional assessments.', 'In today\'s rapidly evolving business landscape, Afghan enterprises face unique challenges and opportunities. Strategic transformation is not merely about adopting new technologies—it requires a comprehensive approach that encompasses organizational development, market positioning, and operational excellence. At GURGURE, we guide organizations through every step of this journey, from initial institutional assessments to detailed strategic roadmaps. Our approach integrates business planning with feasibility studies to ensure that every strategic decision is grounded in data and aligned with long-term objectives. Through our work with emerging businesses across Afghanistan, we have seen firsthand how a well-crafted strategic plan can unlock growth, attract investment, and build resilience in challenging markets.', NULL, 'GURGURE Team', 1, '2026-05-24 14:35:31', '2026-05-24 14:35:31', NULL),
(2, 'The Power of Branding in Afghanistan\'s Emerging Market', 'power-of-branding-afghanistan', 'Branding is more than a logo. Learn why a strong brand identity is a critical asset for businesses operating in Afghanistan\'s competitive landscape.', 'In emerging markets like Afghanistan, branding serves as a powerful differentiator that builds trust, communicates values, and creates lasting connections with customers. A well-executed brand strategy goes beyond visual identity to encompass the entire customer experience—from first impression to ongoing engagement. GURGURE\'s branding methodology combines international best practices with deep local market understanding. We help organizations develop cohesive visual systems that resonate with their target audiences while maintaining consistency across all touchpoints. Whether it\'s a complete corporate identity overhaul or a targeted campaign, our creative team delivers solutions that elevate market presence and drive business results. The most successful brands in Afghanistan today are those that have invested in authentic, professionally-crafted brand identities that reflect their unique value propositions.', NULL, 'GURGURE Team', 1, '2026-05-24 14:35:31', '2026-05-24 14:35:31', NULL),
(3, 'Digital Transformation: Moving Beyond the Hype', 'digital-transformation-beyond-hype', 'Digital transformation is about fundamentally rethinking how your organization operates. Here\'s how to approach it strategically.', 'Digital transformation has become a buzzword, but its true meaning lies in fundamentally rethinking how organizations operate, deliver value, and engage with stakeholders. For Afghan organizations, the digital journey starts with understanding specific needs rather than chasing trends. GURGURE\'s approach to digital transformation begins with a thorough assessment of existing systems, processes, and capabilities. We then design custom digital solutions—from websites and learning management systems to enterprise resource planning platforms—that address real business challenges. Our expertise spans database design, system architecture, and custom software development, ensuring that every solution is built on a solid technical foundation. The key is to prioritize initiatives that deliver measurable impact, whether through improved operational efficiency, enhanced customer experiences, or new revenue streams. By taking a phased, strategic approach, organizations can achieve sustainable digital transformation that drives long-term growth.', NULL, 'GURGURE Team', 1, '2026-05-24 14:35:31', '2026-05-24 14:35:31', NULL),
(4, 'ICT Infrastructure: Building the Backbone of Modern Business', 'ict-infrastructure-modern-business', 'Reliable ICT infrastructure is the foundation of any modern organization. Explore best practices for network design, implementation, and optimization.', 'In an increasingly connected world, robust ICT infrastructure is the backbone of successful business operations. From local area networks to wide area connectivity, the quality of an organization\'s technology infrastructure directly impacts productivity, security, and scalability. GURGURE provides end-to-end ICT consulting and implementation services, helping organizations design network architectures that meet current needs while accommodating future growth. Our expertise covers LAN and WAN design, system architecture planning, and network optimization. We work closely with clients to understand their operational requirements, security needs, and budget constraints, delivering solutions that balance performance with cost-effectiveness. Whether setting up a new office network or modernizing an existing infrastructure, our team ensures that technology serves as an enabler rather than a bottleneck. In Afghanistan\'s developing digital ecosystem, investing in proper ICT infrastructure is not just an operational necessity—it is a strategic advantage.', NULL, 'GURGURE Team', 1, '2026-05-24 14:35:31', '2026-05-24 14:35:31', NULL),
(5, 'The Art of the Pitch: Crafting Investor-Ready Presentations', 'art-of-the-pitch-investor-presentations', 'A compelling pitch deck can make the difference between securing funding and being overlooked. Learn the elements of effective investor presentations.', 'In the competitive world of fundraising, a well-crafted pitch deck is essential for capturing investor attention and communicating your venture\'s value proposition. At GURGURE, we specialize in transforming complex business concepts into clear, compelling narratives that resonate with investors. Our approach combines strategic storytelling with professional design to create presentations that are both informative and visually engaging. We guide entrepreneurs through the process of articulating their vision, market opportunity, business model, and financial projections in a concise and persuasive manner. The most effective pitch decks tell a story that investors can connect with—one that clearly explains the problem being solved, the uniqueness of the solution, and the potential for returns. With Afghanistan\'s startup ecosystem growing, having a professional, investor-ready pitch deck is no longer optional—it is a critical tool for success.', NULL, 'GURGURE Team', 1, '2026-05-24 14:35:31', '2026-05-24 14:35:31', NULL),
(6, 'Education Technology in Afghanistan: Opportunities and Challenges', 'education-technology-afghanistan', 'EdTech is transforming education delivery in Afghanistan. Explore the opportunities, challenges, and how institutions can leverage digital learning platforms.', 'Educational technology is reshaping how knowledge is delivered and accessed in Afghanistan. From learning management systems to digital content platforms, technology offers unprecedented opportunities to expand educational access and improve learning outcomes. GURGURE has been at the forefront of this transformation, developing custom LMS solutions for educational institutions across the country. Our platforms support remote learning, course management, student tracking, and assessment delivery—all tailored to the specific needs of Afghan educational contexts. However, successful EdTech implementation requires more than just technology. It demands thoughtful integration with existing curricula, adequate training for educators, and reliable infrastructure to support digital delivery. Despite these challenges, the potential impact is immense: digital learning platforms can reach students in remote areas, provide flexible learning options, and enable institutions to scale their offerings efficiently.', NULL, 'GURGURE Team', 1, '2026-05-24 14:35:31', '2026-05-24 14:35:31', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `case_studies`
--

CREATE TABLE `case_studies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `challenge` text NOT NULL,
  `solution` text NOT NULL,
  `results` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `testimonial` text DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `translations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`translations`))
) ;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `sector` varchar(255) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `translations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`translations`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `slug`, `description`, `logo`, `website`, `sector`, `order`, `is_published`, `created_at`, `updated_at`, `translations`) VALUES
(1, 'Estedaad', 'client-one', NULL, NULL, NULL, 'Technology', 1, 1, '2026-05-14 04:35:06', '2026-05-24 14:24:11', NULL),
(2, 'Qasemi Group', 'client-two', NULL, NULL, NULL, 'Finance', 2, 1, '2026-05-14 04:35:06', '2026-05-24 14:24:11', NULL),
(3, 'Moraa Educational Complex', 'client-three', NULL, NULL, NULL, 'Education', 3, 1, '2026-05-14 04:35:06', '2026-05-24 14:24:11', NULL),
(4, 'Hadith Academy', 'client-four', NULL, NULL, NULL, 'Healthcare', 4, 1, '2026-05-14 04:35:06', '2026-05-24 14:24:11', NULL),
(6, 'Sarvari Group', 'sarvari-group', NULL, NULL, NULL, 'Conglomerate', 5, 1, '2026-05-24 14:24:11', '2026-05-24 14:24:11', NULL),
(7, 'Amini Roshandel Group', 'amini-roshandel', NULL, NULL, NULL, 'Conglomerate', 6, 1, '2026-05-24 14:24:11', '2026-05-24 14:24:11', NULL),
(8, 'MIDS', 'mids', NULL, NULL, NULL, 'Consulting', 7, 1, '2026-05-24 14:24:11', '2026-05-24 14:24:11', NULL),
(9, 'Rokham Services', 'rokham-services', NULL, NULL, NULL, 'Services', 8, 1, '2026-05-24 14:24:11', '2026-05-24 14:24:11', NULL),
(10, 'Shinwari Aluminum Factory', 'shinwari-aluminum', NULL, NULL, NULL, 'Manufacturing', 9, 1, '2026-05-24 14:24:11', '2026-05-24 14:24:11', NULL),
(11, 'Danish Press', 'danish-press', NULL, NULL, NULL, 'Media', 10, 1, '2026-05-24 14:24:11', '2026-05-24 14:24:11', NULL),
(12, 'Pajhwok', 'pajhwok', NULL, NULL, NULL, 'Media', 11, 1, '2026-05-24 14:24:12', '2026-05-24 14:24:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `service_interest` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `organization_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `password_reset_expires_at` timestamp NULL DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `organization_name`, `email`, `password`, `password_reset_token`, `password_reset_expires_at`, `phone`, `avatar`, `address`, `created_at`, `updated_at`) VALUES
(1, 'Gh. Mustafa Baedaar', 'GURGURE', 'baedaar@gmail.com', NULL, NULL, NULL, '0700777480', NULL, '3rd Street of Taimani', '2026-06-27 12:09:23', '2026-06-27 12:09:23'),
(2, 'Said Yaqub Sadat', 'sadat', 'saidyaqubsadat15@gmail.com', NULL, NULL, NULL, '+93789622113', NULL, 'ssss', '2026-08-17 05:01:18', '2026-08-17 05:01:18'),
(3, 'Said Yaqub Sadat', 'sadat', 'sadat@gmail.com', '$2y$12$xfveMP1hEfN0XnGLQQ6xWuJObGjokxlNIvpiIQpwqoeImjFRkRrr2', NULL, NULL, '0789622113', '/storage/uploads/nfe8fSPd0U8MII7VMWGPUx9EcVku0traz2aiy4WZ.png', 'ssss', '2026-08-17 05:16:33', '2026-09-08 03:47:36'),
(4, 'Said Yaqub Sadat', 'sadat', 'saidyaqubsadat15@gmail.com', NULL, NULL, NULL, '0789622113', NULL, NULL, '2026-09-08 03:06:44', '2026-09-08 03:06:44'),
(6, 'sadat khan', NULL, 'kt@gmail.com', '$2y$12$6paI8MtDFYGCIfL7rWC0seXlj1InRHhuhHK6ajPZAdIJpZ9737So6', NULL, NULL, '+93789622113', NULL, 'ssss', '2026-09-09 03:19:56', '2026-09-09 03:19:56');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `translations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`translations`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `order`, `is_published`, `created_at`, `updated_at`, `translations`) VALUES
(1, 'What services does GURGURE offer?', 'We offer strategic management, creative design, software development, ICT infrastructure, hosting, and presentation design services.', 'Services', 1, 1, '2026-05-14 04:35:59', '2026-05-14 06:12:54', NULL),
(2, 'How can I contact GURGURE?', 'You can reach us via email at info@gurgure.com, phone at +93 700 777 480, or visit our offices in Kabul or Kandahar.', 'General Questions', 2, 1, '2026-05-14 04:35:59', '2026-05-14 04:35:59', NULL),
(3, 'Do you offer international services?', 'Yes, we work with clients globally and deliver services remotely.', 'General Questions', 3, 1, '2026-05-14 04:35:59', '2026-05-14 04:35:59', NULL),
(4, 'What is the typical project timeline?', 'Timelines vary by project scope. We provide detailed timelines during the proposal phase.', 'Timeline & Delivery Questions', 4, 1, '2026-05-14 04:35:59', '2026-05-14 04:35:59', NULL),
(5, 'How do you price your services?', 'Our pricing depends on the scope, complexity, and timeline of each project. We offer packages at different levels (Basic, Silver, Gold, Platinum) and also provide custom quotes for unique requirements.', 'Pricing & Investment Questions', 5, 1, '2026-05-24 18:46:08', '2026-05-24 18:46:08', NULL),
(6, 'What is your process for starting a new project?', 'We begin with a discovery call to understand your needs, then provide a proposal and timeline. Once agreed, we move through our Analyze, Design, Develop, Deliver phases with regular check-ins.', 'Process Questions', 6, 1, '2026-05-24 18:46:08', '2026-05-24 18:46:08', NULL),
(7, 'What makes GURGURE different from other consultancies?', 'Unlike single-service providers, GURGURE offers fully integrated solutions. We connect strategy, branding, technology, and training under one roof. This means your brand, systems, and people work together seamlessly — not in isolation. You get one partner, one relationship, and one integrated growth engine.', 'General Questions', 7, 1, '2026-05-24 14:24:12', '2026-05-24 14:24:12', NULL),
(8, 'What types of organizations do you work with?', 'We work with businesses, NGOs, educational institutions, entrepreneurs, and donor-funded projects. Whether you are a startup, an established enterprise, or a growing nonprofit, our solutions are tailored to your specific context and needs.', 'General Questions', 8, 1, '2026-05-24 14:24:12', '2026-05-24 14:24:12', NULL),
(9, 'Are you based only in Afghanistan?', 'Our headquarters is in Kabul, Afghanistan, and we specialize in the local market context. However, we work with organizations regionally and can deliver virtual services — including strategy, training, and digital development — to clients anywhere.', 'General Questions', 9, 1, '2026-05-24 14:24:12', '2026-05-24 14:24:12', NULL),
(10, 'How does your engagement process work?', 'We follow a 5-phase framework: Discover, Design, Build, Activate, Scale. We start with a discovery conversation to understand your needs, then propose a tailored scope of work. Once engaged, we work collaboratively with your team through each phase, ensuring transparency and measurable outcomes at every step.', 'Process Questions', 10, 1, '2026-05-24 14:24:12', '2026-05-24 14:24:12', NULL),
(11, 'Do you work on-site or remotely?', 'Both. We offer on-site engagements in Kabul and select locations, as well as virtual delivery for strategy, training, and digital projects. We adapt to your preferences and operational realities in Afghanistan and beyond.', 'Process Questions', 11, 1, '2026-05-24 14:24:12', '2026-05-24 14:24:12', NULL),
(12, 'How involved will my team need to be?', 'We believe in partnership, not handoff. Your team input is essential for context and buy-in. We typically schedule regular check-ins, reviews, and training sessions. However, we handle the heavy lifting — you stay focused on running your organization.', 'Process Questions', 12, 1, '2026-05-24 14:24:12', '2026-05-24 14:24:12', NULL),
(13, 'Do you offer discounts for NGOs or nonprofits?', 'Yes. We work with many NGOs and social enterprises and offer flexible, mission-aligned pricing. We will discuss options during your consultation based on your budget and project scope.', 'Pricing & Investment Questions', 13, 1, '2026-05-24 14:24:12', '2026-05-24 14:24:12', NULL),
(14, 'Is there a consultation fee?', 'No. Our initial discovery consultation is completely free. We will learn about your needs, answer your questions, and provide recommendations — with no obligation to move forward.', 'Pricing & Investment Questions', 14, 1, '2026-05-24 14:24:12', '2026-05-24 14:24:12', NULL),
(15, 'How long does a typical project take?', 'It varies by scope. A brand identity project might take 4-6 weeks. A strategic plan typically takes 6-8 weeks. A custom ERP system can take 3-6 months. We provide clear timelines in every proposal and work in phases to deliver value quickly.', 'Timeline & Delivery Questions', 15, 1, '2026-05-24 14:24:12', '2026-05-24 14:24:12', NULL),
(16, 'Do you provide ongoing support after project completion?', 'Absolutely. We offer maintenance retainers, annual strategy reviews, and on-call advisory services. Many of our clients work with us as long-term partners, not just for one project.', 'Timeline & Delivery Questions', 16, 1, '2026-05-24 14:24:12', '2026-05-24 14:24:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_no` varchar(255) NOT NULL,
  `quotation_id` bigint(20) UNSIGNED DEFAULT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `subtotal` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `tax` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `paid_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `balance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` varchar(255) NOT NULL DEFAULT 'unpaid' COMMENT 'unpaid, partial_paid, paid, cancelled',
  `due_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `invoice_no`, `quotation_id`, `customer_id`, `subtotal`, `discount`, `tax`, `total`, `paid_amount`, `balance`, `status`, `due_date`, `created_at`, `updated_at`) VALUES
(1, 'INV-20260817-0001', 2, 1, 800.00, 0.00, 0.00, 800.00, 0.00, 800.00, 'pending', '2026-08-07', '2026-08-17 07:09:29', '2026-08-17 07:09:29'),
(2, 'INV-20260817-0002', 4, 3, 2000.00, 0.00, 0.00, 2000.00, 0.00, 2000.00, 'pending', '2026-09-16', '2026-08-17 07:09:47', '2026-08-17 07:09:47'),
(3, 'INV-20260817-0003', 3, 3, 3500.00, 0.00, 0.00, 3500.00, 0.00, 3500.00, 'pending', '2026-08-17', '2026-08-17 07:10:03', '2026-08-17 07:10:03'),
(4, 'INV-20260817-0004', 1, 1, 2000.00, 0.00, 0.00, 2000.00, 0.00, 2000.00, 'pending', '2026-07-27', '2026-08-17 07:14:32', '2026-08-17 07:14:32'),
(5, 'INV-20260908-0001', NULL, 4, 3500.00, 100.00, 0.00, 3400.00, 0.00, 3400.00, 'pending', '2026-09-08', '2026-09-08 03:06:44', '2026-09-08 03:06:44');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_items`
--

CREATE TABLE `invoice_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED DEFAULT NULL,
  `package_id` bigint(20) UNSIGNED DEFAULT NULL,
  `item_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `unit_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_items`
--

INSERT INTO `invoice_items` (`id`, `invoice_id`, `service_id`, `package_id`, `item_name`, `description`, `quantity`, `unit_price`, `total_price`, `created_at`, `updated_at`) VALUES
(1, 5, 1, 2, 'Strategic Management & Advisory — Silver', NULL, 1, 3500.00, 3500.00, '2026-09-08 03:06:44', '2026-09-08 03:06:44');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_01_01_000001_create_pages_table', 1),
(5, '2024_01_01_000002_create_services_table', 1),
(6, '2024_01_01_000003_create_projects_table', 1),
(7, '2024_01_01_000004_create_contacts_table', 1),
(8, '2024_01_01_000005_create_settings_table', 1),
(9, '2024_01_01_000006_create_blogs_table', 1),
(10, '2024_01_01_100000_add_is_admin_to_users_table', 1),
(11, '2024_01_01_000007_create_clients_table', 2),
(12, '2024_01_01_000008_create_team_members_table', 2),
(13, '2024_01_01_000009_create_testimonials_table', 2),
(14, '2024_01_01_000010_create_faqs_table', 2),
(15, '2024_01_01_000011_create_newsletter_subscribers_table', 2),
(16, '2026_05_14_094912_create_personal_access_tokens_table', 3),
(17, '2026_05_24_061359_add_image_to_services_table', 4),
(18, '2026_05_24_100001_create_packages_table', 5),
(19, '2026_05_24_100002_create_package_items_table', 5),
(20, '2026_05_24_100003_create_customers_table', 5),
(21, '2026_05_24_100004_create_quotations_table', 5),
(22, '2026_05_24_100005_create_quotation_items_table', 5),
(23, '2026_05_24_100006_create_invoices_table', 5),
(24, '2026_05_24_100007_create_payments_table', 5),
(25, '2026_05_24_100008_create_receipts_table', 5),
(26, '2024_01_01_000012_create_case_studies_table', 6),
(27, '2026_05_31_075311_update_services_with_full_data', 7),
(28, '2026_05_31_075748_add_category_to_services_table', 8),
(29, '2026_05_31_075804_assign_service_categories', 8),
(30, '2026_08_17_000001_add_password_to_customers_table', 9),
(31, '2026_08_17_000002_add_password_reset_to_customers_table', 10),
(32, '2026_08_22_000001_add_translations_columns', 11),
(33, '2026_09_08_000001_create_invoice_items_table', 12),
(34, '2026_09_08_000002_add_package_to_invoice_items_table', 13),
(35, '2026_09_08_000003_add_avatar_to_customers_and_users_table', 14),
(36, '2026_09_08_000010_create_print_products_table', 15),
(37, '2026_09_08_000011_create_print_option_groups_table', 15),
(38, '2026_09_08_000012_create_print_options_table', 15),
(39, '2026_09_08_000013_create_print_price_rules_table', 15),
(40, '2026_09_08_000014_create_print_orders_table', 15),
(41, '2026_09_08_000020_create_software_products_table', 16),
(42, '2026_09_08_000021_update_nav_links_for_ecosystem', 17);

-- --------------------------------------------------------

--
-- Table structure for table `newsletter_subscribers`
--

CREATE TABLE `newsletter_subscribers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `newsletter_subscribers`
--

INSERT INTO `newsletter_subscribers` (`id`, `email`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'maryam.siddiqui811@gmail.com', 1, '2026-05-14 05:56:59', '2026-05-14 05:56:59');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL COMMENT 'basic, silver, gold, platinum',
  `description` text DEFAULT NULL,
  `base_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `delivery_time` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `translations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`translations`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `service_id`, `name`, `level`, `description`, `base_price`, `delivery_time`, `is_active`, `created_at`, `updated_at`, `translations`) VALUES
(1, 1, 'Basic', 'basic', 'Basic (Standard)', 1500.00, '30 days', 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(2, 1, 'Silver', 'silver', 'Silver (Economy)', 3500.00, '45 days', 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(3, 1, 'Gold', 'gold', 'Gold (Enterprise)', 7500.00, '60 days', 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(4, 1, 'Platinum', 'platinum', 'Platinum (Special)', 15000.00, '90 days', 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(5, 2, 'Basic', 'basic', 'Basic (Standard)', 800.00, '14 days', 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(6, 2, 'Silver', 'silver', 'Silver (Economy)', 2000.00, '21 days', 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(7, 2, 'Gold', 'gold', 'Gold (Enterprise)', 5000.00, '35 days', 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(8, 2, 'Platinum', 'platinum', 'Platinum (Special)', 10000.00, '50 days', 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(9, 3, 'Basic', 'basic', 'Basic (Standard)', 2500.00, '35 days', 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(10, 3, 'Silver', 'silver', 'Silver (Economy)', 6000.00, '55 days', 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(11, 3, 'Gold', 'gold', 'Gold (Enterprise)', 15000.00, '90 days', 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(12, 3, 'Platinum', 'platinum', 'Platinum (Special)', 35000.00, '150 days', 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(13, 4, 'Basic', 'basic', 'Basic (Standard)', 1200.00, '10 days', 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(14, 4, 'Silver', 'silver', 'Silver (Economy)', 3500.00, '21 days', 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(15, 4, 'Gold', 'gold', 'Gold (Enterprise)', 10000.00, '45 days', 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(16, 4, 'Platinum', 'platinum', 'Platinum (Special)', 25000.00, '70 days', 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(17, 5, 'Basic', 'basic', 'Basic (Standard)', 120.00, '2 days', 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(18, 5, 'Silver', 'silver', 'Silver (Economy)', 300.00, '3 days', 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(19, 5, 'Gold', 'gold', 'Gold (Enterprise)', 800.00, '5 days', 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(20, 5, 'Platinum', 'platinum', 'Platinum (Special)', 2000.00, '7 days', 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(21, 6, 'Basic', 'basic', 'Basic (Standard)', 300.00, '5 days', 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(22, 6, 'Silver', 'silver', 'Silver (Economy)', 800.00, '8 days', 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(23, 6, 'Gold', 'gold', 'Gold (Enterprise)', 2000.00, '12 days', 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(24, 6, 'Platinum', 'platinum', 'Platinum (Special)', 5000.00, '18 days', 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(25, 8, 'Basic', 'basic', 'Basic (Standard)', 400.00, '7 days', 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(26, 8, 'Silver', 'silver', 'Silver (Economy)', 1000.00, '14 days', 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(27, 8, 'Gold', 'gold', 'Gold (Enterprise)', 2500.00, '30 days', 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(28, 8, 'Platinum', 'platinum', 'Platinum (Special)', 6000.00, '45 days', 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(29, 7, 'Basic', 'basic', 'Basic (Standard)', 500.00, '5 days', 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(30, 7, 'Silver', 'silver', 'Silver (Economy)', 1200.00, '10 days', 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(31, 7, 'Gold', 'gold', 'Gold (Enterprise)', 3000.00, '21 days', 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(32, 7, 'Platinum', 'platinum', 'Platinum (Special)', 8000.00, '45 days', 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `package_items`
--

CREATE TABLE `package_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `package_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `pricing_type` varchar(255) NOT NULL DEFAULT 'fixed' COMMENT 'fixed, per_unit, monthly, daily, custom',
  `quantity_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `is_optional` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `translations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`translations`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `package_items`
--

INSERT INTO `package_items` (`id`, `package_id`, `name`, `description`, `price`, `pricing_type`, `quantity_enabled`, `is_optional`, `is_active`, `created_at`, `updated_at`, `translations`) VALUES
(1, 1, 'Strategic Planning', 'Basic strategic plan (3-year)', 1500.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(2, 1, 'Business Planning', 'Standard business plan', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(3, 1, 'Feasibility Studies', 'Basic feasibility assessment', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(4, 1, 'Proposal Writing', 'Technical narrative only', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(5, 1, 'Market Research', 'Secondary research only', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(6, 1, 'Financial Modeling', '3-year projection', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(7, 1, 'Advisory Support', '5 hours/month', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(8, 1, 'Annual Operating Plans', 'Basic AOP', 500.00, 'fixed', 0, 1, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(9, 2, 'Strategic Planning', 'Comprehensive strategic plan (5-year)', 3500.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(10, 2, 'Business Planning', 'Detailed business plan with financials', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(11, 2, 'Feasibility Studies', 'Comprehensive feasibility study', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(12, 2, 'Proposal Writing', 'Technical narrative + budget outline', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(13, 2, 'Market Research', 'Primary + secondary research', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(14, 2, 'Financial Modeling', '5-year projection + sensitivity analysis', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(15, 2, 'Advisory Support', '15 hours/month', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(16, 2, 'Annual Operating Plans', 'Basic AOP included', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(17, 2, 'Training Included', '1 workshop (2 days)', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(18, 3, 'Strategic Planning', 'Multi-department strategic plan + OKRs', 7500.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(19, 3, 'Business Planning', 'Investor-ready business plan + pitch summary', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(20, 3, 'Feasibility Studies', 'Full feasibility + risk analysis + mitigation', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(21, 3, 'Proposal Writing', 'Full proposal package + donor mapping', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(22, 3, 'Market Research', 'Full market research + competitor analysis', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(23, 3, 'Financial Modeling', '5-year projection + scenario planning + valuation', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(24, 3, 'Advisory Support', 'Dedicated strategic advisor (40 hours/month)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(25, 3, 'Annual Operating Plans', 'Comprehensive AOP with bottom-up budgeting', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(26, 3, 'Training Included', '3 workshops (5 days total)', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(27, 3, 'Organizational Development', 'Full OD plan + governance framework', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(28, 4, 'Strategic Planning', 'Full organizational transformation roadmap', 15000.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(29, 4, 'Business Planning', 'Complete business plan suite + ongoing advisory', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(30, 4, 'Feasibility Studies', 'Feasibility + market entry strategy + execution plan', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(31, 4, 'Proposal Writing', 'End-to-end proposal development + submission support', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(32, 4, 'Market Research', 'Custom research + data analytics + insights dashboard', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(33, 4, 'Financial Modeling', 'Custom financial model + investor-grade reporting', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(34, 4, 'Advisory Support', 'On-call executive advisory (unlimited)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(35, 4, 'Annual Operating Plans', 'Full AOP + quarterly monitoring + variance analysis', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(36, 4, 'Training Included', 'Full capacity building program (10+ days)', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(37, 4, 'Organizational Development', 'Complete institutional transformation', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(38, 5, 'Brand Audit', 'Basic audit (internal only)', 800.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(39, 5, 'Logo Design', '2 initial concepts, 2 rounds of revision', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(40, 5, 'Visual Identity', 'Basic color palette + 2 fonts', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(41, 5, 'Brand Guidelines', 'Basic 10-page PDF', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(42, 5, 'Corporate Collateral', 'Business cards only', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(43, 5, 'Social Media Assets', 'Profile images only', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(44, 6, 'Brand Audit', 'Comprehensive audit + competitive analysis', 2000.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(45, 6, 'Logo Design', '3 concepts, 3 revisions', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(46, 6, 'Visual Identity', 'Full color palette + typography system', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(47, 6, 'Brand Guidelines', 'Comprehensive 25-page PDF', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(48, 6, 'Corporate Collateral', 'Business cards + letterhead + envelope', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(49, 6, 'Social Media Assets', 'Profile images + 5 post templates', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(50, 6, 'Graphic Design', '15 designs/month', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(51, 7, 'Brand Audit', 'Full brand audit + market positioning report', 5000.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(52, 7, 'Logo Design', '5 concepts, 5 revisions + logo variations', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(53, 7, 'Visual Identity', 'Complete visual identity system + usage rules', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(54, 7, 'Brand Guidelines', 'Full 50-page brand book (print + digital)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(55, 7, 'Corporate Collateral', 'Full stationery set + email signatures + templates', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(56, 7, 'Social Media Assets', 'Complete social media kit (20+ templates)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(57, 7, 'Graphic Design', '30 designs/month', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(58, 7, 'Photography', '2 day shoot (150 photos + editing)', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(59, 7, 'Virtual Tours', '1 virtual tour (up to 10 scenes)', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(60, 7, 'Creative Campaigns', '3 integrated campaigns', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(61, 8, 'Brand Audit', 'Strategic brand audit + consumer insights + recommendations', 10000.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(62, 8, 'Logo Design', 'Unlimited concepts, unlimited revisions + complete logo system', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(63, 8, 'Visual Identity', 'Enterprise visual identity + brand architecture', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(64, 8, 'Brand Guidelines', 'Premium 100+ page brand bible + training videos', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(65, 8, 'Corporate Collateral', 'Complete collateral suite + premium printing management', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(66, 8, 'Social Media Assets', 'Full social media system + content calendar + monthly assets', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(67, 8, 'Graphic Design', 'Unlimited designs + dedicated designer', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(68, 8, '2D & 3D Design', 'Full 3D visualization + animation', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(69, 8, 'Photography', 'Multi-location shoot (300+ photos + retouching)', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(70, 8, 'Virtual Tours', '3 virtual tours + 360° product photography', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(71, 8, 'Creative Campaigns', 'Full-year campaign (quarterly) + performance tracking', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(72, 8, 'Print Management', 'Full print production + quality control + delivery', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(73, 9, 'Custom Website', '5-page responsive website', 2500.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(74, 9, 'MIS', 'Basic MIS (single department)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(75, 9, 'HR Management', 'Employee directory only', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(76, 9, 'Finance System', 'Basic income/expense tracking', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(77, 9, 'Database Design', 'Single-table database', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(78, 9, 'User Accounts', 'Up to 50 users', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(79, 10, 'Custom Website', '10-page website + basic CMS', 6000.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(80, 10, 'MIS', 'Multi-department MIS', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(81, 10, 'ERP', 'Basic ERP (2 modules)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(82, 10, 'HR Management', 'Employee directory + attendance + leave', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(83, 10, 'Finance System', 'Full accounting + invoicing', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(84, 10, 'Procurement & Inventory', 'Inventory + purchase orders', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(85, 10, 'Database Design', 'Multi-table database (5-10 tables)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(86, 10, 'User Accounts', 'Up to 200 users', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(87, 10, 'Training', '2-hour training session', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(88, 11, 'Custom Website', '20-page website + advanced CMS + blog', 15000.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(89, 11, 'MIS', 'Full organizational MIS + reporting dashboard', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(90, 11, 'ERP', 'Full ERP (5+ modules)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(91, 11, 'HR Management', 'Full HRIS (recruitment, performance, payroll integration)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(92, 11, 'Finance System', 'Complete finance suite + budgeting + donor compliance', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(93, 11, 'Procurement & Inventory', 'Full procurement + inventory + supplier management', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(94, 11, 'LMS', 'Full LMS (students, grading, certificates)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(95, 11, 'Database Design', 'Complex database (10-20 tables) + optimization', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(96, 11, 'Automation', '15 automated workflows + approval chains', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(97, 11, 'User Accounts', 'Up to 1,000 users', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(98, 11, 'Training', '2-day training program', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(99, 12, 'Custom Website', 'Unlimited pages + custom CMS + e-commerce', 35000.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(100, 12, 'MIS', 'Enterprise MIS + predictive analytics + BI', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(101, 12, 'ERP', 'Custom enterprise ERP + API integrations', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(102, 12, 'HR Management', 'Enterprise HRIS + talent management + succession planning', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(103, 12, 'Finance System', 'Enterprise finance + multi-currency + audit trail', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(104, 12, 'Procurement & Inventory', 'Supply chain management + demand forecasting', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(105, 12, 'LMS', 'Enterprise LMS + gamification + analytics + SCORM', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(106, 12, 'Database Design', 'Enterprise database + data warehousing + ETL', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(107, 12, 'Automation', 'Full business process automation + RPA', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(108, 12, 'System Integration', 'Full ecosystem integration + custom APIs', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(109, 12, 'User Accounts', 'Unlimited users + role-based access control', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(110, 12, 'Training', 'Full training + certification + ongoing support', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(111, 12, 'Support', '24/7 dedicated support + SLA (1 year)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(112, 13, 'Network Design', 'Basic LAN design (single office)', 1200.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(113, 13, 'Network Implementation', 'Basic setup + configuration', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(114, 13, 'Wireless Infrastructure', '1-3 access points', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(115, 13, 'Network Security', 'Basic firewall configuration', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(116, 13, 'Server Deployment', 'Single server (basic)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(117, 14, 'Network Design', 'Multi-office LAN design', 3500.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(118, 14, 'Network Implementation', 'Full implementation + testing', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(119, 14, 'Wireless Infrastructure', '4-10 access points', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(120, 14, 'Network Security', 'Advanced firewall + antivirus', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(121, 14, 'Server Deployment', 'Multi-server (2-3 servers)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(122, 14, 'Cloud Integration', 'Basic cloud backup', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(123, 14, 'VPS Solutions', '2 VPS (4GB RAM, 100GB each)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(124, 15, 'Network Design', 'Full WAN design (multi-location)', 10000.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(125, 15, 'Network Implementation', 'Implementation + optimization + documentation', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(126, 15, 'Wireless Infrastructure', '11-25 access points', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(127, 15, 'Network Security', 'Enterprise security + IDS/IPS + VPN', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(128, 15, 'Server Deployment', 'Server cluster (4-10 servers)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(129, 15, 'Cloud Integration', 'Hybrid cloud setup', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(130, 15, 'VPS Solutions', '3 VPS (8GB RAM, 200GB each)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(131, 15, 'Technical Support', '24/7 support (1-hour response)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(132, 15, 'Disaster Recovery', 'Daily backups + recovery plan', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(133, 16, 'Network Design', 'Enterprise network architecture (unlimited sites)', 25000.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(134, 16, 'Network Implementation', 'Turnkey implementation + certification + handover', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(135, 16, 'Wireless Infrastructure', '25+ access points + mesh network', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(136, 16, 'Network Security', 'Zero-trust architecture + SOC integration', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(137, 16, 'Server Deployment', 'Enterprise data center + virtualization', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(138, 16, 'Cloud Integration', 'Full cloud migration + multi-cloud strategy', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(139, 16, 'VPS Solutions', 'Custom cluster (16GB+ RAM per node)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(140, 16, 'Technical Support', '24/7 dedicated team (15-min response, on-site available)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(141, 16, 'Security Audits', 'Comprehensive audit + compliance certification', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(142, 16, 'Disaster Recovery', 'Real-time replication + DR site', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:29', '2026-05-24 13:47:29', NULL),
(143, 17, 'Hosting Type', 'Shared Hosting', 120.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(144, 17, 'Storage Space', '5 GB', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(145, 17, 'Monthly Bandwidth', '50 GB', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(146, 17, 'Email Accounts', '5 accounts', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(147, 17, 'Database Support', '1 database (MySQL)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(148, 17, 'Domain Registration', '1 domain (.com/.af)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(149, 17, 'SSL Certificate', 'Standard SSL', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(150, 17, 'Uptime Guarantee', '99.5%', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(151, 18, 'Hosting Type', 'Enhanced Shared Hosting', 300.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(152, 18, 'Storage Space', '20 GB', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(153, 18, 'Monthly Bandwidth', '200 GB', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(154, 18, 'Email Accounts', '25 accounts', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(155, 18, 'Database Support', '5 databases (MySQL)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(156, 18, 'Domain Registration', '2 domains', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(157, 18, 'SSL Certificate', 'Standard SSL', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(158, 18, 'Daily Backups', 'Daily backups (7-day retention)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(159, 18, 'Uptime Guarantee', '99.7%', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(160, 19, 'Hosting Type', 'VPS (Virtual Private Server)', 800.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(161, 19, 'Storage Space', '100 GB SSD', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(162, 19, 'Monthly Bandwidth', '1 TB', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(163, 19, 'CPU Cores', '2 dedicated cores', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(164, 19, 'RAM', '4 GB dedicated', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(165, 19, 'Email Accounts', 'Unlimited', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(166, 19, 'Database Support', '10 databases (MySQL/PostgreSQL)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(167, 19, 'Domain Registration', '5 domains', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(168, 19, 'SSL Certificate', 'Wildcard SSL', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(169, 19, 'Daily Backups', 'Daily backups (30-day retention)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(170, 19, 'Uptime Guarantee', '99.9%', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(171, 19, 'Load Time', '< 2 seconds', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(172, 19, 'CDN', 'Basic CDN', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(173, 20, 'Hosting Type', 'Dedicated Server / Custom', 2000.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(174, 20, 'Storage Space', '500 GB+ NVMe SSD', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(175, 20, 'Monthly Bandwidth', 'Unlimited (10+ TB)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(176, 20, 'CPU Cores', '8+ dedicated cores', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(177, 20, 'RAM', '32 GB+ dedicated', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(178, 20, 'Email Accounts', 'Unlimited + enterprise mail', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(179, 20, 'Database Support', 'Unlimited + optimization', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(180, 20, 'Domain Registration', 'Unlimited domains', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(181, 20, 'SSL Certificate', 'EV SSL + Extended Validation', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(182, 20, 'Daily Backups', 'Real-time backups (90-day retention)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(183, 20, 'Uptime Guarantee', '99.99% + SLA credits', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(184, 20, 'Load Time', '< 1 second', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(185, 20, 'CDN', 'Global CDN + optimization', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(186, 20, 'Staging Environment', 'Full staging + version control', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(187, 21, 'Pitch Deck', '5 slides (basic template)', 300.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(188, 21, 'Company Profile', '5-page PDF template', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(189, 21, 'Corporate Presentations', 'Basic template (3 designs)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(190, 21, 'Revisions', '2 rounds', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(191, 22, 'Pitch Deck', '10 slides (custom design)', 800.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(192, 22, 'Investor Decks', 'Basic investor deck', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(193, 22, 'Sales Decks', '10-slide sales deck', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(194, 22, 'Company Profile', '10-page custom design', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(195, 22, 'Corporate Presentations', 'Custom template (5 designs)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(196, 22, 'Visual Storytelling', 'Custom infographics', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(197, 22, 'Revisions', '3 rounds', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(198, 23, 'Pitch Deck', '15-20 slides (fully custom)', 2000.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(199, 23, 'Investor Decks', 'Comprehensive investor deck + financials', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(200, 23, 'Sales Decks', '15-slide sales deck + case studies', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(201, 23, 'Company Profile', '20-page comprehensive profile + infographics', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(202, 23, 'Corporate Presentations', 'Full presentation system (10 templates)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(203, 23, 'Executive Materials', 'Executive summary + board materials', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(204, 23, 'Visual Storytelling', 'Data visualization + narrative framework', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(205, 23, 'Revisions', '5 rounds', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(206, 23, 'Training', '1-day presentation skills workshop', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(207, 24, 'Pitch Deck', '25+ slides (premium design + animation)', 5000.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(208, 24, 'Investor Decks', 'Enterprise-grade investor deck + data room setup', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(209, 24, 'Sales Decks', '20+ slide sales system + battle cards', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(210, 24, 'Company Profile', '30+ page premium profile + interactive PDF', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(211, 24, 'Corporate Presentations', 'Enterprise presentation suite (custom branding)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(212, 24, 'Executive Materials', 'Complete executive communication package', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(213, 24, 'Visual Storytelling', 'Premium visual storytelling + motion graphics', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(214, 24, 'Animation', 'Advanced motion graphics + interactive elements', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(215, 24, 'Revisions', 'Unlimited rounds', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(216, 24, 'Research Support', 'Full research + custom data + messaging strategy', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(217, 24, 'Training', 'Executive coaching + speaker training', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(218, 25, 'Digital Marketing Strategy', 'Basic 1-page strategy', 400.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(219, 25, 'Social Media Management', '1 platform (5 posts/month)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(220, 25, 'Content Creation', 'Basic graphics', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(221, 25, 'Social Media Branding', 'Profile optimization', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(222, 25, 'SEO', 'Basic on-page SEO', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(223, 26, 'Digital Marketing Strategy', 'Comprehensive 10-page strategy', 1000.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(224, 26, 'Social Media Management', '2 platforms (15 posts/month)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(225, 26, 'Content Creation', 'Custom graphics + captions', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(226, 26, 'Social Media Branding', 'Profile + cover images', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(227, 26, 'SEO', 'On-page + keyword research', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(228, 26, 'Content Marketing', '4 blog posts + newsletter', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(229, 26, 'Campaign Management', '2 campaigns (1 month each)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(230, 27, 'Digital Marketing Strategy', 'Full strategic roadmap + quarterly planning', 2500.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(231, 27, 'Social Media Management', '3 platforms (30 posts/month)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(232, 27, 'Content Creation', 'Video content + blog posts', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(233, 27, 'Social Media Branding', 'Complete social media identity', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(234, 27, 'SEO', 'Full SEO (on-page + off-page + technical)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(235, 27, 'Content Marketing', '8 blog posts + newsletter + lead magnets', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(236, 27, 'Campaign Management', '4 campaigns (quarterly)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(237, 27, 'Paid Advertising', 'Managed ads ($2,000/month)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(238, 27, 'Analytics & Reporting', 'Weekly deep-dive + recommendations', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(239, 27, 'Community Management', 'Active engagement + sentiment monitoring', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(240, 28, 'Digital Marketing Strategy', 'Enterprise strategy + annual roadmap + KPIs', 6000.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(241, 28, 'Social Media Management', '4+ platforms (daily posts + stories + reels)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(242, 28, 'Content Creation', 'Premium video + interactive content', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(243, 28, 'Social Media Branding', 'Enterprise social media system', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(244, 28, 'SEO', 'Enterprise SEO + local SEO + analytics', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(245, 28, 'Content Marketing', 'Weekly content + whitepapers + e-books', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(246, 28, 'Campaign Management', '12 campaigns (year-round)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(247, 28, 'Paid Advertising', 'Full-scale ads ($5,000+/month)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(248, 28, 'Email Marketing', 'Full email marketing + segmentation + automation', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(249, 28, 'Analytics & Reporting', 'Real-time dashboard + executive summary + ROI tracking', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(250, 28, 'Community Management', '24/7 community management + crisis response', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(251, 28, 'Influencer Partnerships', 'Full influencer program + management', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(252, 28, 'Corporate Messaging', 'Brand voice guide + executive communications', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(253, 28, 'Competitor Analysis', 'Continuous competitive intelligence', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(254, 29, 'Training Topics', '1 topic (pre-selected)', 500.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(255, 29, 'Program Duration', '1 day (4-6 hours)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(256, 29, 'Participants', 'Up to 10 participants', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(257, 29, 'Delivery Format', 'On-site OR virtual', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(258, 29, 'Training Materials', 'Basic handouts', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(259, 29, 'Certification', 'Participation certificate', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(260, 30, 'Training Topics', '2 topics (customizable)', 1200.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(261, 30, 'Program Duration', '2 days (8-12 hours)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(262, 30, 'Participants', 'Up to 20 participants', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(263, 30, 'Delivery Format', 'On-site + virtual options', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(264, 30, 'Training Materials', 'Digital workbooks', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(265, 30, 'Certification', 'Completion certificate', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(266, 30, 'Assessment', 'Pre/post assessment', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(267, 30, 'Follow-up Support', '1-month email support', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(268, 31, 'Training Topics', '3-5 topics (fully customizable)', 3000.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(269, 31, 'Program Duration', '5 days (30+ hours)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(270, 31, 'Participants', 'Up to 50 participants', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(271, 31, 'Delivery Format', 'Blended (on-site + virtual + self-paced)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(272, 31, 'Training Materials', 'Printed manuals + digital resources', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(273, 31, 'Certification', 'Accredited certificate + digital badge', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(274, 31, 'Assessment', 'Pre/post + skills testing + feedback', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(275, 31, 'Follow-up Support', '3 months (2 coaching sessions)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(276, 31, 'Custom Curriculum', 'Full curriculum design', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(277, 31, 'LMS Access', 'Basic LMS for materials', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(278, 32, 'Training Topics', 'Unlimited topics (tailored curriculum)', 8000.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(279, 32, 'Program Duration', '10+ days (comprehensive program)', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(280, 32, 'Participants', '50+ participants (enterprise cohort)', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(281, 32, 'Delivery Format', 'Fully customized delivery', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(282, 32, 'Training Materials', 'Premium materials + learning portal', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(283, 32, 'Certification', 'Professional certification + transcript', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(284, 32, 'Assessment', 'Comprehensive assessment + competency mapping', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(285, 32, 'Follow-up Support', '6 months (quarterly coaching + refresher)', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(286, 32, 'Custom Curriculum', 'Enterprise learning journey design', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(287, 32, 'LMS Access', 'Full LMS with progress tracking', 0.00, 'monthly', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(288, 32, 'Train-the-Trainer', 'Full internal trainer certification', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(289, 32, 'Needs Assessment', 'Organizational learning audit', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(290, 32, 'Post-training Report', 'Strategic L&D roadmap', 0.00, 'fixed', 0, 0, 1, '2026-05-24 13:47:30', '2026-05-24 13:47:30', NULL),
(291, 29, 'Assessment', 'None', 0.00, 'fixed', 0, 0, 1, '2026-05-24 14:24:38', '2026-05-24 14:24:38', NULL),
(292, 29, 'Follow-up Support', 'None', 0.00, 'fixed', 0, 0, 1, '2026-05-24 14:24:38', '2026-05-24 14:24:38', NULL),
(293, 29, 'Custom Curriculum', 'Not included', 0.00, 'fixed', 0, 0, 1, '2026-05-24 14:24:38', '2026-05-24 14:24:38', NULL),
(294, 29, 'Additional Participants', 'Per additional participant', 150.00, 'per_unit', 1, 1, 1, '2026-05-24 14:24:38', '2026-05-24 14:24:38', NULL),
(295, 30, 'Custom Curriculum', 'Basic customization', 0.00, 'fixed', 0, 0, 1, '2026-05-24 14:24:38', '2026-05-24 14:24:38', NULL),
(296, 30, 'Additional Participants', 'Per additional participant', 120.00, 'per_unit', 1, 1, 1, '2026-05-24 14:24:38', '2026-05-24 14:24:38', NULL),
(297, 31, 'Case Studies', 'Real scenarios from your organization', 0.00, 'fixed', 0, 0, 1, '2026-05-24 14:24:38', '2026-05-24 14:24:38', NULL),
(298, 31, 'Train-the-Trainer', 'Basic (1 person trained)', 0.00, 'per_unit', 1, 0, 1, '2026-05-24 14:24:38', '2026-05-24 14:24:38', NULL),
(299, 31, 'Additional Participants', 'Per additional participant', 100.00, 'per_unit', 1, 1, 1, '2026-05-24 14:24:38', '2026-05-24 14:24:38', NULL),
(300, 32, 'Additional Participants', 'Per additional participant', 80.00, 'per_unit', 1, 1, 1, '2026-05-24 14:24:38', '2026-05-24 14:24:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `sections` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `translations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`translations`))
) ;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `slug`, `title`, `content`, `sections`, `meta_title`, `meta_description`, `is_published`, `created_at`, `updated_at`, `translations`) VALUES
(1, 'home', 'Home', 'Home page content managed from admin panel.', NULL, NULL, NULL, 1, '2026-05-14 03:15:05', '2026-08-22 05:20:00', '{\"fa\": {\"title\": \"درباره ما\"}}'),
(3, 'about', 'About', 'Company history and mission managed from admin panel.', NULL, NULL, NULL, 1, '2026-05-24 14:24:34', '2026-09-08 03:58:26', '{\"fa\":{\"title\":\"\\u062f\\u0631\\u0628\\u0627\\u0631\\u0647\"},\"ps\":{\"title\":\"\\u0632\\u0645\\u0648\\u0646\\u0696 \\u067e\\u0647 \\u0627\\u0693\\u0647\"}}'),
(4, 'services', 'Services', 'Services overview managed from admin panel.', NULL, NULL, NULL, 1, '2026-05-24 14:24:34', '2026-05-24 14:24:34', NULL),
(5, 'faq', 'FAQ', 'FAQ page content managed from admin panel.', NULL, NULL, NULL, 1, '2026-05-24 14:24:34', '2026-05-24 14:24:34', NULL),
(6, 'team', 'Team', 'Team page content managed from admin panel.', NULL, NULL, NULL, 1, '2026-05-24 14:24:34', '2026-05-24 14:24:34', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(255) DEFAULT NULL COMMENT 'cash, bank_transfer, online, check',
  `transaction_reference` varchar(255) DEFAULT NULL,
  `payment_date` date NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 3, 'admin-token', '2f5c52baae88e913e177adce1dbfe9712e3fa14a3aedbdb90b02238e27f96d2e', '[\"admin\"]', NULL, NULL, '2026-05-14 05:19:43', '2026-05-14 05:19:43'),
(2, 'App\\Models\\User', 3, 'admin-token', 'a82193627c2ee2a94cbe7bde75323b6bdd23538afb00e20b76fe511d371082d4', '[\"admin\"]', NULL, NULL, '2026-05-14 05:44:24', '2026-05-14 05:44:24'),
(4, 'App\\Models\\User', 3, 'admin-token', '991b6447a4b88a0f80bbb35776b3f3c6796e8401be9482acacf1cf0198a7f4d7', '[\"admin\"]', '2026-05-24 03:12:20', NULL, '2026-05-24 01:05:15', '2026-05-24 03:12:20'),
(5, 'App\\Models\\User', 3, 'admin-token', '7da4cd8f2ddc47234fac24217a617f64ef69f5de4129cec30470fc140121091b', '[\"admin\"]', '2026-05-24 04:29:35', NULL, '2026-05-24 04:01:50', '2026-05-24 04:29:35'),
(6, 'App\\Models\\User', 3, 'admin-token', '0dfe2b0c0f939832899b798f7a57944fcf1d77af3240090e418ef29205dbf90c', '[\"admin\"]', '2026-05-24 13:49:18', NULL, '2026-05-24 10:10:03', '2026-05-24 13:49:18'),
(7, 'App\\Models\\User', 3, 'admin-token', '2ae4dedc97f1a70253fe7a236d5f7daf36e8c99e6ec431c4fdb455071f551487', '[\"admin\"]', '2026-06-01 03:06:16', NULL, '2026-05-24 13:53:05', '2026-06-01 03:06:16'),
(8, 'App\\Models\\User', 3, 'admin-token', '94f925871438fb69ce31b86322fa307f40a7d5de55a59008a5072e258289be34', '[\"admin\"]', '2026-07-14 02:47:33', NULL, '2026-06-27 12:06:09', '2026-07-14 02:47:33'),
(9, 'App\\Models\\User', 3, 'admin-token', 'd9bbbe6fe65a4e7c629c91a2a54f0fab1b9073bc278f82f1afe2f35168690ea7', '[\"admin\"]', '2026-08-17 07:17:06', NULL, '2026-08-17 04:41:53', '2026-08-17 07:17:06'),
(11, 'App\\Models\\Customer', 3, 'customer-token', '7fdfbb220cb651f7435e993e2ac7eeb3f0f621621f749ac3c1be3ebac9b42647', '[\"customer\"]', '2026-08-22 02:06:32', NULL, '2026-08-17 06:08:37', '2026-08-22 02:06:32'),
(12, 'App\\Models\\User', 3, 'admin-token', '6531b7f34afabe633a5b25ef3c0f69a24c72a95e379875845649a2b55a155c4d', '[\"admin\"]', '2026-08-22 07:03:29', NULL, '2026-08-22 02:44:20', '2026-08-22 07:03:29'),
(13, 'App\\Models\\Customer', 3, 'customer-token', '68c0d5abce84b11cd602ccba2db0c03bb6e920e05ef0a2ec61ef82faa4dee9bc', '[\"customer\"]', '2026-09-08 03:32:45', NULL, '2026-09-08 01:22:35', '2026-09-08 03:32:45'),
(14, 'App\\Models\\User', 3, 'admin-token', 'ee41ae0795fe7f294553f6ccb934b1a77d0ada7a8acdd0dc00b0f8af94a81e7b', '[\"admin\"]', '2026-09-09 03:53:59', NULL, '2026-09-08 02:12:12', '2026-09-09 03:53:59'),
(16, 'App\\Models\\User', 3, 'admin-token', '391e4ad1a52e1e691a61b733591144478a15f385d6e5f7d3fc5ac136fecb1d59', '[\"admin\"]', NULL, NULL, '2026-09-08 04:45:32', '2026-09-08 04:45:32'),
(17, 'App\\Models\\User', 3, 'admin-token', '2c936ba1c6dc08ed5f21ace9e74743c41fa589bc2465e5eb0e9329b8d677db75', '[\"admin\"]', '2026-09-08 04:47:40', NULL, '2026-09-08 04:46:07', '2026-09-08 04:47:40'),
(18, 'App\\Models\\User', 3, 'admin-token', '8c8968a0288b13d3c281314ef35bc82a1e7d5a7d3c95ed1f9400f7f68498ab7e', '[\"admin\"]', '2026-09-08 05:02:45', NULL, '2026-09-08 05:02:45', '2026-09-08 05:02:45'),
(19, 'App\\Models\\User', 3, 'admin-token', 'd46f519889f1b2f26d5619b7bc578b41655a44162b00eb71675d600e7023e196', '[\"admin\"]', '2026-09-08 05:03:11', NULL, '2026-09-08 05:03:11', '2026-09-08 05:03:11'),
(20, 'App\\Models\\User', 3, 'admin-token', 'b891d98329135b590c1c676d51a8215579a7796375e94a2147f0219b4d6e2e73', '[\"admin\"]', '2026-09-08 05:03:19', NULL, '2026-09-08 05:03:19', '2026-09-08 05:03:19'),
(23, 'App\\Models\\Customer', 5, 'customer-token', '64a3cbd056c603f902537dc2d6ebffec20bc208b3a69773dcb83c8e62ec32bde', '[\"customer\"]', NULL, NULL, '2026-09-09 03:18:30', '2026-09-09 03:18:30'),
(24, 'App\\Models\\Customer', 6, 'customer-token', '9576eaef19764521e323989baa763f0b914f4b35430bac92366dc076c5aed2c2', '[\"customer\"]', '2026-09-09 03:57:03', NULL, '2026-09-09 03:19:56', '2026-09-09 03:57:03');

-- --------------------------------------------------------

--
-- Table structure for table `print_options`
--

CREATE TABLE `print_options` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `group_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `price_type` varchar(20) NOT NULL DEFAULT 'none',
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `order` int(11) NOT NULL DEFAULT 0,
  `translations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`translations`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `print_options`
--

INSERT INTO `print_options` (`id`, `group_id`, `name`, `description`, `price`, `price_type`, `is_default`, `order`, `translations`, `created_at`, `updated_at`) VALUES
(1, 1, 'I have my own print-ready design', NULL, 0.00, 'one_time', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(2, 1, 'Upload design, GURGURE checks it', NULL, 300.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(3, 1, 'Standard GURGURE design', NULL, 800.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(4, 1, 'Premium custom design', NULL, 2500.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(5, 2, '250 gsm Art Card', NULL, 0.00, 'per_unit', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(6, 2, '300 gsm Art Card', NULL, 0.20, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(7, 2, '350 gsm Art Card', NULL, 0.30, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(8, 2, '400 gsm Art Card', NULL, 0.50, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(9, 2, 'Kraft (recycled)', NULL, 0.20, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(10, 2, 'PVC Plastic', NULL, 0.80, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(11, 3, '1/0 — Black front only', NULL, 0.00, 'per_unit', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(12, 3, '1/1 — Black both sides', NULL, 0.10, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(13, 3, '4/0 — Full colour front', NULL, 0.15, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(14, 3, '4/4 — Full colour both sides', NULL, 0.25, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(15, 4, 'Matte lamination', NULL, 400.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(16, 4, 'Gloss lamination', NULL, 400.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(17, 4, 'Soft-touch lamination', NULL, 600.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(18, 4, 'Spot UV', NULL, 700.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(19, 4, 'Gold / silver foil', NULL, 1200.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(20, 4, 'Rounded corners', NULL, 200.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(21, 5, 'I have print-ready artwork', NULL, 0.00, 'one_time', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(22, 5, 'Standard GURGURE design', NULL, 800.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(23, 5, 'Premium custom design', NULL, 2000.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(24, 6, '90 gsm Offset', NULL, 0.00, 'per_unit', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(25, 6, '120 gsm Offset', NULL, 0.10, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(26, 6, '150 gsm Silk', NULL, 0.20, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(27, 6, '250 gsm Art Card', NULL, 0.40, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(28, 7, '1/1 — Black both sides', NULL, 0.00, 'per_unit', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(29, 7, '4/0 — Full colour front', NULL, 0.15, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(30, 7, '4/4 — Full colour both sides', NULL, 0.20, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(31, 8, 'Folding', NULL, 200.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(32, 8, 'Matte lamination', NULL, 500.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(33, 8, 'Die cutting', NULL, 900.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(34, 9, '85 × 200 cm', NULL, 0.00, 'per_unit', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(35, 9, '80 × 200 cm', NULL, 0.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(36, 9, '90 × 200 cm', NULL, 50.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(37, 10, 'Standard', NULL, 0.00, 'per_unit', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(38, 10, 'Premium satin', NULL, 100.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(39, 11, 'I have print-ready artwork', NULL, 0.00, 'one_time', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(40, 11, 'Standard GURGURE design', NULL, 800.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(41, 11, 'Premium custom design', NULL, 2000.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(42, 12, 'Economy', NULL, 0.00, 'per_unit', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(43, 12, 'Standard', NULL, 50.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(44, 12, 'Premium', NULL, 120.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(45, 13, 'Screen print', NULL, 30.00, 'per_unit', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(46, 13, 'UV / digital print', NULL, 40.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(47, 13, 'Embroidery', NULL, 80.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(48, 14, 'Front', NULL, 0.00, 'per_unit', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(49, 14, 'Back', NULL, 25.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(50, 14, 'Left sleeve', NULL, 15.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(51, 15, 'Standard', NULL, 0.00, 'per_unit', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(52, 15, 'Click / retractable', NULL, 20.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(53, 15, 'Metal body', NULL, 60.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(54, 16, 'Screen print', NULL, 15.00, 'per_unit', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(55, 16, 'UV print', NULL, 20.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(56, 16, 'Pad print', NULL, 25.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(57, 16, 'Laser engraving', NULL, 30.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(58, 17, '160 gsm Silk', NULL, 0.00, 'per_unit', 1, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(59, 17, '250 gsm Art Card', NULL, 10.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(60, 17, '300 gsm Art Card', NULL, 18.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(61, 17, 'Glossy photo stock', NULL, 25.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(62, 18, 'I have print-ready artwork', NULL, 0.00, 'one_time', 1, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(63, 18, 'Standard GURGURE design', NULL, 600.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(64, 18, 'Premium custom design', NULL, 1500.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(65, 19, '30 × 20 cm', NULL, 0.00, 'per_unit', 1, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(66, 19, '40 × 30 cm', NULL, 400.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(67, 19, '60 × 40 cm', NULL, 900.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(68, 20, '3 mm', NULL, 0.00, 'per_unit', 1, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(69, 20, '5 mm', NULL, 200.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(70, 21, 'Flat print', NULL, 0.00, 'per_unit', 1, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(71, 21, 'Raised / 3D letters', NULL, 800.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(72, 22, '3 × 3 m', NULL, 0.00, 'per_unit', 1, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(73, 22, '3 × 6 m', NULL, 25000.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(74, 22, '6 × 6 m', NULL, 60000.00, 'per_unit', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(75, 23, 'Backdrop', NULL, 15000.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(76, 23, 'Counters', NULL, 12000.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(77, 23, 'Roll-up banners', NULL, 9000.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(78, 23, 'Lighting', NULL, 10000.00, 'one_time', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45');

-- --------------------------------------------------------

--
-- Table structure for table `print_option_groups`
--

CREATE TABLE `print_option_groups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(20) NOT NULL DEFAULT 'radio',
  `required` tinyint(1) NOT NULL DEFAULT 0,
  `order` int(11) NOT NULL DEFAULT 0,
  `translations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`translations`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `print_option_groups`
--

INSERT INTO `print_option_groups` (`id`, `product_id`, `name`, `type`, `required`, `order`, `translations`, `created_at`, `updated_at`) VALUES
(1, 2, 'Design', 'radio', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(2, 2, 'Material', 'radio', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(3, 2, 'Colours', 'radio', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(4, 2, 'Finishing', 'checkbox', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(5, 3, 'Design', 'radio', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(6, 3, 'Paper', 'radio', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(7, 3, 'Colours', 'radio', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(8, 3, 'Extras', 'checkbox', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(9, 4, 'Size', 'radio', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(10, 4, 'Material', 'radio', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(11, 4, 'Design', 'radio', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(12, 5, 'Quality', 'radio', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(13, 5, 'Branding method', 'radio', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(14, 5, 'Print positions', 'checkbox', 0, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(15, 6, 'Model', 'radio', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(16, 6, 'Branding', 'radio', 1, 0, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(17, 7, 'Paper', 'radio', 1, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(18, 7, 'Design', 'radio', 1, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(19, 8, 'Size', 'radio', 1, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(20, 8, 'Thickness', 'radio', 1, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(21, 8, 'Finish', 'radio', 1, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(22, 9, 'Booth size', 'radio', 1, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(23, 9, 'Includes', 'checkbox', 0, 0, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45');

-- --------------------------------------------------------

--
-- Table structure for table `print_orders`
--

CREATE TABLE `print_orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_no` varchar(255) NOT NULL,
  `customer_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`items`)),
  `subtotal` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total` decimal(12,2) NOT NULL DEFAULT 0.00,
  `status` varchar(30) NOT NULL DEFAULT 'pending',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `print_orders`
--

INSERT INTO `print_orders` (`id`, `order_no`, `customer_id`, `name`, `email`, `phone`, `address`, `items`, `subtotal`, `total`, `status`, `notes`, `created_at`, `updated_at`) VALUES
(2, 'GR-260909-0001', 3, 'Said Yaqub Sadat', 'sadat@gmail.com', '0789622113', NULL, '[{\"product_id\":2,\"slug\":\"business-cards\",\"name\":\"Business Cards\",\"qty\":103,\"mode\":\"instant\",\"options\":[],\"unit_price\":3.5,\"effective_per_unit\":3.5,\"line_items\":[{\"label\":\"Business Cards (103 \\u00d7 AFN 3.50)\",\"amount\":360.5,\"type\":\"printing\"}],\"total\":360.5,\"estimate_low\":null,\"estimate_high\":null}]', 360.50, 360.50, 'quality_check', NULL, '2026-09-09 02:22:43', '2026-09-09 03:53:51');

-- --------------------------------------------------------

--
-- Table structure for table `print_price_rules`
--

CREATE TABLE `print_price_rules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `min_qty` int(11) NOT NULL,
  `max_qty` int(11) DEFAULT NULL,
  `unit_price` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `print_price_rules`
--

INSERT INTO `print_price_rules` (`id`, `product_id`, `min_qty`, `max_qty`, `unit_price`, `created_at`, `updated_at`) VALUES
(1, 2, 100, 250, 3.50, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(2, 2, 250, 500, 2.80, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(3, 2, 500, 1000, 2.40, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(4, 2, 1000, 2000, 2.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(5, 2, 2000, 5000, 1.60, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(6, 2, 5000, NULL, 1.20, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(7, 3, 100, 500, 8.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(8, 3, 500, 1000, 5.50, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(9, 3, 1000, 2000, 4.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(10, 3, 2000, 5000, 3.20, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(11, 3, 5000, 10000, 2.60, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(12, 3, 10000, NULL, 2.20, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(13, 4, 1, 2, 850.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(14, 4, 2, 5, 800.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(15, 4, 5, 10, 750.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(16, 4, 10, NULL, 700.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(17, 5, 1, 10, 400.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(18, 5, 10, 25, 320.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(19, 5, 25, 50, 280.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(20, 5, 50, 100, 250.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(21, 5, 100, NULL, 210.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(22, 6, 50, 100, 25.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(23, 6, 100, 250, 18.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(24, 6, 250, 500, 14.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(25, 6, 500, 1000, 11.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(26, 6, 1000, NULL, 9.00, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(27, 7, 10, 50, 120.00, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(28, 7, 50, 100, 90.00, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(29, 7, 100, 250, 70.00, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(30, 7, 250, 500, 55.00, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(31, 7, 500, NULL, 45.00, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(32, 8, 1, 5, 1500.00, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(33, 8, 5, 10, 1300.00, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(34, 8, 10, NULL, 1200.00, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(35, 9, 1, NULL, 50000.00, '2026-09-08 04:31:45', '2026-09-08 04:31:45');

-- --------------------------------------------------------

--
-- Table structure for table `print_products`
--

CREATE TABLE `print_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `short_description` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price_mode` varchar(20) NOT NULL DEFAULT 'instant',
  `base_price` decimal(12,2) DEFAULT NULL,
  `setup_cost` decimal(12,2) NOT NULL DEFAULT 0.00,
  `min_quantity` int(11) NOT NULL DEFAULT 1,
  `unit_label` varchar(50) DEFAULT NULL,
  `turnaround` varchar(255) DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `order` int(11) NOT NULL DEFAULT 0,
  `translations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`translations`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `print_products`
--

INSERT INTO `print_products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `image`, `price_mode`, `base_price`, `setup_cost`, `min_quantity`, `unit_label`, `turnaround`, `is_published`, `order`, `translations`, `created_at`, `updated_at`) VALUES
(2, 'business-cards', 'Business Cards', 'Business Stationery', 'Premium business cards with instant pricing. Choose size, paper, colour and finishing.', NULL, NULL, 'instant', 3.50, 0.00, 100, 'card', '2–4 days', 1, 1, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(3, 'a5-flyers', 'Flyers (A5)', 'Marketing', 'High-impact A5 flyers for promotions, events and campaigns.', NULL, NULL, 'instant', 8.00, 0.00, 100, 'flyer', '2–3 days', 1, 2, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(4, 'roll-up-banner', 'Roll-up Banner', 'Large Format', 'Professional roll-up banners for exhibitions, offices and events.', NULL, NULL, 'instant', 850.00, 0.00, 1, 'banner', '3–5 days', 1, 3, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(5, 'custom-t-shirts', 'Custom T-Shirts', 'Apparel', 'Printed t-shirts for teams, promotions and uniforms.', NULL, NULL, 'instant', 400.00, 0.00, 1, 't-shirt', '5–7 days', 1, 4, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(6, 'promotional-pens', 'Promotional Pens', 'Promotional', 'Branded pens for giveaways, offices and events.', NULL, NULL, 'instant', 25.00, 0.00, 50, 'pen', '4–6 days', 1, 5, NULL, '2026-09-08 04:31:44', '2026-09-08 04:31:44'),
(7, 'certificates', 'Certificates', 'Paper', 'Certificates and awards on premium stock with optional framing designs.', NULL, NULL, 'instant', 120.00, 0.00, 10, 'certificate', '2–3 days', 1, 6, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(8, 'acrylic-office-sign', 'Acrylic Office Sign', 'Signage', 'Elegant acrylic signs for offices, reception areas and rooms.', NULL, NULL, 'estimated', 1500.00, 0.00, 1, 'sign', '5–8 days', 1, 7, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45'),
(9, 'event-exhibition-booth', 'Exhibition Booth', 'Exhibition Events', 'Complete exhibition / event stand design and production.', NULL, NULL, 'quote', 50000.00, 0.00, 1, 'booth', '10–20 days', 1, 8, NULL, '2026-09-08 04:31:45', '2026-09-08 04:31:45');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `client` varchar(255) DEFAULT NULL,
  `sector` varchar(255) DEFAULT NULL,
  `service` varchar(255) DEFAULT NULL,
  `challenge` text DEFAULT NULL,
  `solution` text DEFAULT NULL,
  `outcome` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `translations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`translations`))
) ;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `slug`, `client`, `sector`, `service`, `challenge`, `solution`, `outcome`, `image`, `images`, `order`, `is_published`, `created_at`, `updated_at`, `translations`) VALUES
(2, 'Corporate Branding System', 'corporate-branding-system', 'Various Clients', 'Cross-sector', 'Creative Design & Media Solutions', 'The organization lacked a cohesive visual identity across platforms, resulting in inconsistent brand communication and weak market recognition.', 'Designed a complete brand identity system including logo, color palette, typography, visual guidelines, and application templates for digital and print.', 'Consistent and recognizable brand presence across all touchpoints, with a comprehensive brand guidelines document for ongoing use.', NULL, NULL, 2, 1, '2026-05-14 03:15:05', '2026-05-24 14:24:34', NULL),
(3, 'Custom LMS for Educational Institution', 'custom-lms-educational', 'Educational Institution', 'Education', 'Digital Systems & Software Development', 'Needed a digital platform for remote learning and course management.', 'Built a custom Learning Management System with user training.', 'Successful deployment with ongoing support and adoption.', NULL, NULL, 3, 1, '2026-05-14 03:15:05', '2026-05-14 03:15:05', NULL),
(4, 'Investor Pitch Deck', 'investor-pitch-deck', 'Startup Client', 'Entrepreneurship', 'Corporate Communication & Presentation Design', 'Required a compelling narrative for investor fundraising.', 'Developed professional slide deck with visual storytelling.', 'Investor-ready documentation with clear value proposition.', NULL, NULL, 4, 1, '2026-05-14 03:15:05', '2026-05-14 03:15:05', NULL),
(5, 'Enterprise Network Infrastructure', 'enterprise-network-infrastructure', 'Corporate Client', 'Enterprise', 'ICT Infrastructure & Consulting', 'Outdated network infrastructure affecting operations.', 'Designed and implemented LAN/WAN network architecture.', 'Improved network performance, security, and scalability.', NULL, NULL, 5, 1, '2026-05-14 03:15:05', '2026-05-14 03:15:05', NULL),
(6, '360° Virtual Tour & Product Photography', '360-virtual-tour-photography', 'Real Estate & Retail Clients', 'Real Estate / Retail', 'Creative Design & Media Solutions', 'Needed immersive visual content for marketing.', 'Produced high-resolution photography and interactive virtual tours.', 'Enhanced online presence and client engagement.', NULL, NULL, 6, 1, '2026-05-14 03:15:05', '2026-05-14 03:15:05', NULL),
(7, 'NGO Digital Transformation', 'ngo-digital-transformation', 'Confidential NGO', 'Nonprofit', 'Digital Systems & Software Development', 'Fragmented manual systems across departments with no integration, causing delays in donor reporting', 'Implemented full ERP system with finance, HR, procurement, and program management modules with team training', '40% faster donor reporting and real-time financial control across all departments', NULL, NULL, 7, 1, '2026-05-24 14:24:34', '2026-05-24 14:24:34', NULL),
(8, 'Retail Rebrand & Web Overhaul', 'retail-rebrand-web', 'Retail Client', 'Retail', 'Creative Design & Media Solutions', 'Outdated brand identity and slow, non-responsive website losing customer engagement', 'Complete rebrand with new visual identity, responsive website, and integrated social media campaign', '3x website traffic + 150% engagement on social media within 4 months', NULL, NULL, 8, 1, '2026-05-24 14:24:34', '2026-05-24 14:24:34', NULL),
(9, 'Startup Strategic Plan & Pitch Deck', 'startup-strategic-plan', 'Tech Startup', 'Entrepreneurship', 'Corporate Communication & Presentation Design', 'Needed comprehensive business plan and compelling investor pitch to secure funding', 'Developed strategic plan with financial modeling and designed investor pitch deck with visual storytelling', 'Secured $200k seed funding after GURGURE-led investor narrative', NULL, NULL, 9, 1, '2026-05-24 14:24:34', '2026-05-24 14:24:34', NULL),
(10, 'Strategic Plan for Emerging Business', 'strategic-plan-emerging-business', 'Private Enterprise (Confidential)', 'Private Enterprise', 'Strategic Management & Advisory', 'The business needed a comprehensive growth roadmap and detailed feasibility study to secure investor confidence and guide expansion.', 'Developed a full strategic plan including market analysis, financial modeling, competitive positioning, and a 3-year implementation roadmap with KPIs.', 'Clear 3-year strategic roadmap, investor-ready documentation, and a structured growth framework adopted across all departments.', NULL, NULL, 1, 1, '2026-05-31 03:22:21', '2026-05-31 03:22:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `quotations`
--

CREATE TABLE `quotations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quotation_no` varchar(255) NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `subtotal` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `tax` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` varchar(255) NOT NULL DEFAULT 'draft' COMMENT 'draft, sent, accepted, rejected, expired, converted_to_invoice',
  `valid_until` date DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `quotations`
--

INSERT INTO `quotations` (`id`, `quotation_no`, `customer_id`, `subtotal`, `discount`, `tax`, `total`, `status`, `valid_until`, `notes`, `created_at`, `updated_at`) VALUES
(1, 'Q-20260627-0001', 1, 2000.00, 0.00, 0.00, 2000.00, 'converted_to_invoice', '2026-07-27', NULL, '2026-06-27 12:09:23', '2026-08-17 07:14:32'),
(2, 'Q-20260708-0001', 1, 800.00, 0.00, 0.00, 800.00, 'converted_to_invoice', '2026-08-07', NULL, '2026-07-08 05:48:50', '2026-08-17 07:09:29'),
(3, 'Q-20260817-0001', 3, 3500.00, 0.00, 0.00, 3500.00, 'accepted', '2026-09-16', NULL, '2026-08-17 05:16:50', '2026-08-17 07:08:38'),
(4, 'Q-20260817-0002', 3, 2000.00, 0.00, 0.00, 2000.00, 'converted_to_invoice', '2026-09-16', NULL, '2026-08-17 07:08:51', '2026-08-17 07:09:47'),
(5, 'Q-20260817-0003', 3, 800.00, 0.00, 0.00, 800.00, 'sent', '2026-09-16', NULL, '2026-08-17 07:16:30', '2026-08-22 02:48:59'),
(6, 'Q-20260908-0001', 3, 2000.00, 0.00, 0.00, 2000.00, 'draft', '2026-10-08', NULL, '2026-09-08 01:42:14', '2026-09-08 01:42:14'),
(7, 'Q-20260908-0002', 3, 2000.00, 0.00, 0.00, 2000.00, 'draft', '2026-10-08', NULL, '2026-09-08 01:54:12', '2026-09-08 01:54:12');

-- --------------------------------------------------------

--
-- Table structure for table `quotation_items`
--

CREATE TABLE `quotation_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quotation_id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED DEFAULT NULL,
  `package_id` bigint(20) UNSIGNED DEFAULT NULL,
  `package_item_id` bigint(20) UNSIGNED DEFAULT NULL,
  `item_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `unit_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `quotation_items`
--

INSERT INTO `quotation_items` (`id`, `quotation_id`, `service_id`, `package_id`, `package_item_id`, `item_name`, `description`, `quantity`, `unit_price`, `total_price`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 1, 'Strategic Planning', 'Basic strategic plan (3-year)', 1, 1500.00, 1500.00, '2026-06-27 12:09:23', '2026-06-27 12:09:23'),
(2, 1, 1, 1, 2, 'Business Planning', 'Standard business plan', 1, 0.00, 0.00, '2026-06-27 12:09:23', '2026-06-27 12:09:23'),
(3, 1, 1, 1, 3, 'Feasibility Studies', 'Basic feasibility assessment', 1, 0.00, 0.00, '2026-06-27 12:09:23', '2026-06-27 12:09:23'),
(4, 1, 1, 1, 4, 'Proposal Writing', 'Technical narrative only', 1, 0.00, 0.00, '2026-06-27 12:09:23', '2026-06-27 12:09:23'),
(5, 1, 1, 1, 5, 'Market Research', 'Secondary research only', 1, 0.00, 0.00, '2026-06-27 12:09:23', '2026-06-27 12:09:23'),
(6, 1, 1, 1, 6, 'Financial Modeling', '3-year projection', 1, 0.00, 0.00, '2026-06-27 12:09:23', '2026-06-27 12:09:23'),
(7, 1, 1, 1, 7, 'Advisory Support', '5 hours/month', 1, 0.00, 0.00, '2026-06-27 12:09:23', '2026-06-27 12:09:23'),
(8, 1, 1, 1, 8, 'Annual Operating Plans', 'Basic AOP', 1, 500.00, 500.00, '2026-06-27 12:09:23', '2026-06-27 12:09:23'),
(9, 2, 2, 5, NULL, 'Basic', 'Basic (Standard)', 1, 800.00, 800.00, '2026-07-08 05:48:50', '2026-07-08 05:48:50'),
(10, 3, 1, 2, NULL, 'Silver', 'Silver (Economy)', 1, 3500.00, 3500.00, '2026-08-17 05:16:50', '2026-08-17 05:16:50'),
(11, 4, 2, 6, NULL, 'Silver', 'Silver (Economy)', 1, 2000.00, 2000.00, '2026-08-17 07:08:51', '2026-08-17 07:08:51'),
(12, 5, 2, 5, 38, 'Brand Audit', 'Basic audit (internal only)', 1, 800.00, 800.00, '2026-08-17 07:16:30', '2026-08-17 07:16:30'),
(13, 5, 2, 5, 39, 'Logo Design', '2 initial concepts, 2 rounds of revision', 1, 0.00, 0.00, '2026-08-17 07:16:30', '2026-08-17 07:16:30'),
(14, 5, 2, 5, 40, 'Visual Identity', 'Basic color palette + 2 fonts', 1, 0.00, 0.00, '2026-08-17 07:16:30', '2026-08-17 07:16:30'),
(15, 5, 2, 5, 41, 'Brand Guidelines', 'Basic 10-page PDF', 1, 0.00, 0.00, '2026-08-17 07:16:30', '2026-08-17 07:16:30'),
(16, 5, 2, 5, 42, 'Corporate Collateral', 'Business cards only', 1, 0.00, 0.00, '2026-08-17 07:16:30', '2026-08-17 07:16:30'),
(17, 5, 2, 5, 43, 'Social Media Assets', 'Profile images only', 1, 0.00, 0.00, '2026-08-17 07:16:30', '2026-08-17 07:16:30'),
(18, 6, 1, 1, NULL, 'Basic', 'Basic (Standard)', 1, 1500.00, 1500.00, '2026-09-08 01:42:14', '2026-09-08 01:42:14'),
(19, 6, 1, 1, 8, 'Annual Operating Plans', 'Basic AOP', 1, 500.00, 500.00, '2026-09-08 01:42:14', '2026-09-08 01:42:14'),
(20, 7, 2, 6, NULL, 'Silver', 'Silver (Economy)', 1, 2000.00, 2000.00, '2026-09-08 01:54:12', '2026-09-08 01:54:12');

-- --------------------------------------------------------

--
-- Table structure for table `receipts`
--

CREATE TABLE `receipts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `receipt_no` varchar(255) NOT NULL,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `payment_id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `issued_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `translations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`translations`))
) ;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `slug`, `description`, `icon`, `category`, `image`, `items`, `order`, `is_published`, `created_at`, `updated_at`, `translations`) VALUES
(1, 'Strategic Management & Advisory', 'strategic-management-advisory', 'Strategic planning, business planning, feasibility studies, proposal development, and institutional assessments.', '📊', 'development', NULL, '[\"Strategic planning & organizational development\",\"Business planning & feasibility studies\",\"Proposal development & technical narratives\",\"Institutional assessments & roadmaps\",\"Web & professional content writing\"]', 1, 1, '2026-05-14 03:15:05', '2026-05-31 03:29:37', NULL),
(2, 'Creative Design & Media Solutions', 'creative-design-media', 'Branding, visual identity, graphic design, photography, virtual tours, and media production.', '🎨', 'branding', NULL, '[\"Branding & corporate identity development\",\"Logo design & visual systems\",\"Graphic design for promotional materials\",\"2D & 3D design services\",\"Professional product photography\",\"360\\u00b0 virtual tours\",\"Media conversion & digital content production\",\"Social media campaigns & sponsorship activation\"]', 2, 1, '2026-05-14 03:15:05', '2026-05-31 03:29:37', NULL),
(3, 'Digital Systems & Software Development', 'digital-systems-software', 'Custom web platforms, LMS, database design, ERP solutions, and system integration.', '💻', 'digital', NULL, '[\"Website design & development\",\"Learning Management Systems (LMS)\",\"Database design & development\",\"Custom system design & development\",\"Enterprise Resource Planning (ERP) solutions\"]', 3, 1, '2026-05-14 03:15:05', '2026-05-31 03:29:37', NULL),
(4, 'ICT Infrastructure & Consulting', 'ict-infrastructure-consulting', 'Network design, system architecture, implementation, and enterprise-level infrastructure planning.', '🌐', 'digital', NULL, '[\"LAN & WAN network design\",\"ICT consulting & system architecture\",\"Network implementation & optimization\",\"Enterprise-level digital infrastructure planning\"]', 4, 1, '2026-05-14 03:15:05', '2026-05-31 03:29:37', NULL),
(5, 'Hosting & Digital Infrastructure', 'hosting-digital-infrastructure', 'Shared hosting, VPS solutions, server deployment, platform maintenance and support.', '☁️', 'digital', NULL, '[\"Shared hosting & VPS solutions\",\"Server deployment & management\",\"Platform maintenance & support\"]', 5, 1, '2026-05-14 03:15:05', '2026-05-31 03:29:37', NULL),
(6, 'Corporate Communication & Presentation Design', 'corporate-communication-presentation', 'Professional pitch decks, investor presentations, and visual storytelling for corporate communications.', '📋', 'branding', NULL, '[\"Corporate pitch development\",\"Investor decks & presentations\",\"Professional slide design & storytelling\"]', 6, 1, '2026-05-14 03:15:05', '2026-05-31 03:29:37', NULL),
(7, 'Trainings & Capacity Building', 'trainings-capacity-building', 'Leadership development, digital skills training, and institutional capacity building seminars.', '📚', 'training', NULL, '[\"Leadership & management training programs\",\"Digital skills & technology workshops\",\"Institutional capacity building\",\"Custom training curriculum development\",\"Seminar & workshop facilitation\"]', 7, 1, '2026-05-24 13:09:00', '2026-05-31 03:29:37', NULL),
(8, 'Digital Marketing', 'digital-marketing', 'Strategic communication, social media management, SEO, and campaign management for digital growth.', '📈', 'branding', NULL, '[\"Strategic communication planning\",\"Social media management & content strategy\",\"Search Engine Optimization (SEO)\",\"Paid advertising campaign management\",\"Brand awareness & digital growth strategies\",\"Analytics & performance reporting\"]', 8, 1, '2026-05-24 13:09:00', '2026-05-31 03:29:37', NULL),
(10, 'Logo Audit Services', 'logo-audit', 'Logo and Brand Audit', NULL, 'branding', NULL, '[]', 5, 1, '2026-05-31 03:48:12', '2026-05-31 03:48:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0aSuYdXnTnHlMBVnDYPfDyEe3R19XwKDCirnYEbs', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVkl6b1JxbllhZFp6RGRCVHRIaHp1Um9MUTlGSGdSQ0pxRlFiVkRFViI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJpbnQtcHJvZHVjdHMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788935724),
('4TKBqzOZ51i3I7zBEGLLjc7eoNDVx9iOBsXCWQdf', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRkZFb3dwcWFKRW1hSTNnR0pBSUtSdXg3b1lVNFoxM3BTczc0QVFFMSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJpbnQtcHJvZHVjdHMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788936752),
('8uEaA8AbqX2A4zYrAAkKHFoWcmaVXnhb8SiIGfYF', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWGVsSHdqanU4b2ZJZTlvcDdVdlpxMm1vRlFOZkN3M2JjYkt4V3NHTiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJpbnQtcHJvZHVjdHMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788935724),
('AzgyH8Ggwd7jeSsBCIGKQg1d8DBpUhQI27Bvt3a1', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicmljbE5vOXN6SXZDQkdnVDJCa2ZFblRGTHdtOWhORW1yVWJZdXRIeCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvY2xpZW50cyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1788935999),
('dxNrD275e00G3hliKAlsRnSfnt1D4R7Gk9OtjWva', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUTlWR3pLbWp1TG5zSmF3VThBc1hzdTl3eUMxem5XbEFiN1phNWNqaiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzQ6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvc2VydmljZXMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788935999),
('eRiGl0iuBUTM5bPJ3FT2hJCqnRSbBVKM5Z6HIqVL', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiREZFQWs5UENBTkNISWZRaFp5MjNZZzh3UUlFZE1VZVdkeFpOdFBEMyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJpbnQtcHJvZHVjdHMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788936466),
('fxoPA7VRnBy1E97S97A4m9FAVno4tM60nRv74QK1', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYmFwMjZUSHcxdUdCTzNBZEZCa1ZhOVJ2S09ROTE3dDAzaVdWTVB4TyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJpbnQtcHJvZHVjdHMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788935784),
('G3iFXGkhLyXrD7qb1aL9wD42KeddPzQnHOVWRKIs', 6, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVFh1d1I0cjlvMTVqZDRBV29uMG1rdXQwZnV6ZVJEcnd6UHdheUhLbyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvY3VzdG9tZXIvcG9ydGFsIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788942423),
('i2IX2RhnK4dYvzUoLT7Ie9VauwkbCjVmQ3HGsVUO', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNG5EU2RNZTdaaWhoZXpraTJ0NkNscUFYV1RSNlU2bjVVelRybUl4RSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJpbnQtcHJvZHVjdHMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788936778),
('iDe4EQMgUeKkvSaNYYveWSnj4oL3A1WoygcfJBzt', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibUFMaVppa25QdHZ2OTJSaWg2QXBSTTNJNUgxNE9zWHpNSUtRR05ZSSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJpbnQtcHJvZHVjdHMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788936096),
('Iv9jgFd0yg3lygW06ZPZJ5dlsb7XAEGpONKHtoDO', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieXRKcTNMRlRhOHBZNFY2alRwS2NOUkpnb2F2ZlMyS2x0cGlZclRwdSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJpbnQtcHJvZHVjdHMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788935768),
('JqiP2XFhZ7IHvPQbbBwBn9jHZcoCepbmvVBeDfP0', NULL, '127.0.0.1', 'curl/8.21.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMWRLNnBOdGVIZEl6T1R5aDdocjNPUlJvZDA4Y21IZlBKN1pwVmwzbyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvc29mdHdhcmUtcHJvZHVjdHMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788940677),
('mptLxmI4h5GKI9hZib03532YAqCXatU359I2dx7s', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRnE3b29rMzdEdDF0OG9ycHFISE91SG9XZ2pjS0Z5cW9YbU10MVhiYyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdGVzdGltb25pYWxzIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788935999),
('paC8k0xyHIBl855SH6v2zIC5CY5vgK1Kyy6v19ns', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNUw5SVY1UTZic1p6S0JsZ3NpVFNIZGdnVWtVdHcwODhNa0ZseERGSyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzQ6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJvamVjdHMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788935999),
('PpD3XBHiOJnOSQjbr4AtbJ0a0sgQ9sETsa4nNoCn', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaW5GZm5rNTdkOTBObjRNeDlpbnMyN1cxbjJpaUdoZVByNzN0bkJZcyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJpbnQtcHJvZHVjdHMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788936778),
('r2uFvuIrmghSQLrDcV92EAuoqOVnYJdvbPReGNcb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoienM5d1lrRzhrYkhRMERpdDhzc1RWRGJkWXFGNWo3SHJDeGhSUnl4SCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJpbnQtcHJvZHVjdHMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788936038),
('REVJ3lVUJjRSLdTrvli2b7S3EG3882HwdSwtc0NH', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUDliczZTMlFkdEJWWHNvRE5pWElNUXo4bWhGVHlYVXlqYnozRjc2WCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzQ6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvc2V0dGluZ3MiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788935782),
('RlLkw1VqDl26a5QjheHoyXilrqqlnh9Q7wXXruy1', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUXc2WmVhaWRjckFWMlpLWXpMS2p2VnV1dVprR2VYVXg5OUcyNjF1byI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzQ6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvc2V0dGluZ3MiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788935998),
('T2LdiG2AWktOMj4i6Fk6VOqZ1M3WzDDyiJDcheLX', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZUMzUVoxTzV1ZG5hTUZyYmlrWHgzTzAyTkU5c3hqNnkzTXlkOUdaRCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzQ6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvc2VydmljZXMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788935782),
('tGb0Fg1EYM5IDadh9HR7pXtyXU6VumEUUdKl0No0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoic0cyRGludGxiYlFmYUpOdzJESFh4ZGhxSlRoZkNQczJ5cWtTNzkxMCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzQ6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvc2V0dGluZ3MiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788935996),
('U9cAANQu1MfXhyl08ObNKOp6H0FfQc7HL9F1QRTh', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSU9XMkdWaExXbHYybk9FTXI2bmJVaTVIcEF4ampJUTFJWkdsT3A2SiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJpbnQtcHJvZHVjdHMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788935573),
('vFAE6SECqTS6JhiD4z4PYjkWQ7EtvQTRHXop9yHI', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTU9OV1BQYjJ6RHZvdHh2a2NIQ3BBVHBETlB5Nk85QXBQWG9yNjMzRiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJpbnQtcHJvZHVjdHMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788935690),
('wyiyfSjjV9Qs5bvDrOiBKwLU5MLHokExRPgZmiEL', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSE10V2ptWDZnaktibnVWdEZsNVFaMDc3eTJ1WXR6NW1UWktEak5peSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvcHJpbnQtcHJvZHVjdHMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788936486),
('y4FYX2AOFL549wSxo3WvI8pbKzwSosK3QFWyhSxQ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiR0lDa2lxYnNBRGNXWmdQbkRuc3A1VThVNXhhTzZBQ0o2VjMzSzNxQSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzQ6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvc2VydmljZXMiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788935996);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'site_name', 'GURGURE', '2026-05-14 03:15:05', '2026-05-14 03:15:05'),
(2, 'site_tagline', 'Integrated Strategy. Creative Vision. Digital Reality.', '2026-05-14 03:15:05', '2026-05-24 14:24:11'),
(3, 'email', 'info@gurgure.com', '2026-05-14 03:15:05', '2026-05-14 03:15:05'),
(4, 'phone', '+93 700 777 480', '2026-05-14 03:15:05', '2026-05-14 03:15:05'),
(5, 'kabul_address', 'Afshare, Kabul, Afghanistan', '2026-05-14 03:15:05', '2026-05-14 03:15:05'),
(6, 'kandahar_address', 'Shaheedano Chowk, Etemad Market, 2nd Floor, Kandahar, Afghanistan', '2026-05-14 03:15:05', '2026-05-14 03:15:05'),
(7, 'linkedin', '#', '2026-05-14 03:15:05', '2026-05-14 03:15:05'),
(8, 'facebook', '#', '2026-05-14 03:15:05', '2026-05-14 03:15:05'),
(9, 'instagram', '#', '2026-05-14 03:15:05', '2026-05-14 03:15:05'),
(10, 'site_description', NULL, '2026-05-14 04:35:06', '2026-05-14 05:56:37'),
(11, 'logo', '/storage/uploads/U0C6WPr1RbFdAVc53wGH8eiVp2JwMvkJV81TYDkU.png', '2026-05-14 05:56:37', '2026-05-24 00:34:21'),
(12, 'twitter', '#', '2026-05-14 05:56:37', '2026-05-14 05:56:37'),
(13, 'youtube', '#', '2026-05-14 05:56:37', '2026-05-14 05:56:37'),
(14, 'about_vision', 'To be the leading catalyst for transformative change, empowering businesses and communities through innovative strategies, creative excellence, and technological advancement.', '2026-05-14 05:56:37', '2026-05-24 14:24:11'),
(15, 'about_mission', 'To empower organizations with integrated strategies, powerful brands, smart systems, and capable teams — so they can grow with clarity and confidence.', '2026-05-14 05:56:37', '2026-05-24 14:24:11'),
(16, 'about_history', 'GURGURE Company was founded with a single conviction: organizations need more than isolated services. They need integrated solutions that connect strategy, branding, technology, communication, and organizational growth. Today, we are a multidisciplinary consultancy and digital solutions firm dedicated to helping businesses, institutions, NGOs, educational organizations, and entrepreneurs turn ideas into structured systems, visible brands, and sustainable growth models. We work at the intersection of Business Development, Strategic Management, Creative Design, Digital Transformation, and Capacity Building — providing modern, tailored solutions for today\'s competitive, technology-driven environment.', '2026-05-14 05:56:37', '2026-05-24 14:24:11'),
(17, 'hero_title', 'Integrated Strategy. Creative Vision. Digital Reality.', '2026-05-14 05:56:37', '2026-05-24 14:24:11'),
(18, 'hero_subtitle', 'Kabul-based multidisciplinary consultancy delivering end-to-end solutions in management consulting, creative design, and ICT engineering.', '2026-05-14 05:56:37', '2026-05-24 14:24:11'),
(19, 'hero_images', '[\"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80\",\"https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80\",\"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80\",\"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80\"]', '2026-05-24 00:34:21', '2026-08-22 05:07:00'),
(20, 'home_stats', '[{\"label\":\"Projects Completed\",\"end\":450,\"suffix\":\"+\"},{\"label\":\"Clients Served\",\"end\":500,\"suffix\":\"+\"},{\"label\":\"Years Experience\",\"end\":20,\"suffix\":\"+\"},{\"label\":\"Team Members\",\"end\":50,\"suffix\":\"+\"}]', '2026-05-24 00:34:21', '2026-05-24 14:24:11'),
(21, 'nav_links', '[{\"path\":\"\\/\",\"label\":\"Home\"},{\"path\":\"\\/solutions\",\"label\":\"Solutions\"},{\"path\":\"\\/services\",\"label\":\"Services\"},{\"path\":\"\\/software\",\"label\":\"Software\"},{\"path\":\"\\/marketplace\",\"label\":\"Marketplace\"},{\"path\":\"\\/portfolio\",\"label\":\"Work\"},{\"path\":\"\\/blog\",\"label\":\"Insights\"},{\"path\":\"\\/about\",\"label\":\"About\"},{\"path\":\"\\/contact\",\"label\":\"Contact\"},{\"path\":\"\\/portal\",\"label\":\"My GURGURE\"}]', '2026-05-24 00:34:21', '2026-09-09 03:21:56'),
(22, 'footer_services', '[\"Strategic Management & Advisory\",\"Creative Design & Media Solutions\",\"Digital Systems & Software Development\",\"ICT Infrastructure & Consulting\",\"Hosting & Digital Infrastructure\",\"Corporate Communication & Presentation Design\",\"Digital Marketing\",\"Trainings & Capacity Building\"]', '2026-05-24 00:34:21', '2026-05-24 14:24:11'),
(23, 'approach_steps', '[{\"title\":\"Discover\",\"description\":\"Needs assessment & discovery workshops; Current state analysis; Stakeholder interviews & market research; Opportunity identification\"},{\"title\":\"Design\",\"description\":\"Strategic roadmap development; Brand identity & creative direction; System architecture & technical design; Communication & marketing strategy\"},{\"title\":\"Build\",\"description\":\"Brand asset creation & guidelines; System development; Content & campaign production; Training material development\"},{\"title\":\"Activate\",\"description\":\"Implementation & go-live support; Training & capacity building; Campaign launches & brand rollouts; Change management\"},{\"title\":\"Scale\",\"description\":\"Performance monitoring & reporting; Iterative improvements; Ongoing advisory; Strategic pivots & scaling support\"}]', '2026-05-24 00:34:21', '2026-05-24 14:24:11'),
(24, 'page_hero_data', '{\"home\":{\"title\":\"\",\"subtitle\":\"\"},\"about\":{\"title\":\"About {site_name}\",\"subtitle\":\"Learn about our journey, mission, and the team behind our success.\"},\"services\":{\"title\":\"What We Do\",\"subtitle\":\"End-to-end solutions in management consulting, creative design, and ICT engineering.\"},\"portfolio\":{\"title\":\"Our Work\",\"subtitle\":\"Explore our portfolio of successful projects across various sectors.\"},\"clients\":{\"title\":\"Our Clients & Partners\",\"subtitle\":\"Trusted by leading organizations across Afghanistan and beyond.\"},\"blog\":{\"title\":\"Insights & Articles\",\"subtitle\":\"Thoughts, insights, and stories from our team.\"},\"contact\":{\"title\":\"Let\'s Connect\",\"subtitle\":\"Have a project in mind? We\'d love to hear from you.\"},\"team\":{\"title\":\"Our Team\",\"subtitle\":\"Meet the passionate people behind {site_name}.\"},\"faq\":{\"title\":\"Frequently Asked Questions\",\"subtitle\":\"Find answers to common questions about our services.\"}}', '2026-05-24 00:34:21', '2026-05-24 00:43:50'),
(25, 'cta_data', '{\"home\":{\"title\":\"Ready to Start Your Project?\",\"subtitle\":\"Let\'s discuss how GURGURE can help bring your vision to life.\",\"button_text\":\"Get in Touch\",\"button_link\":\"\\/contact\"},\"about\":{\"title\":\"Want to Work With Us?\",\"subtitle\":\"Let\'s discuss how we can help your organization grow.\",\"button_text\":\"Get in Touch\",\"button_link\":\"\\/contact\"},\"services\":{\"title\":\"Need a Custom Solution?\",\"subtitle\":\"We tailor our services to meet your unique business requirements.\",\"button_text\":\"Contact Us\",\"button_link\":\"\\/contact\"},\"portfolio\":{\"title\":\"Have a Project in Mind?\",\"subtitle\":\"Let\'s create something amazing together.\",\"button_text\":\"Start a Project\",\"button_link\":\"\\/contact\"}}', '2026-05-24 00:34:21', '2026-05-24 00:43:50'),
(26, 'phone2', '+93 790686467', '2026-05-24 14:24:11', '2026-05-24 14:24:11'),
(27, 'phone3', '+93 781777304', '2026-05-24 14:24:11', '2026-05-24 14:24:11'),
(28, 'site_name_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(29, 'site_name_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(30, 'site_tagline_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(31, 'site_tagline_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(32, 'site_description_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(33, 'site_description_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(34, 'kabul_address_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(35, 'kabul_address_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(36, 'kandahar_address_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(37, 'kandahar_address_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(38, 'about_vision_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(39, 'about_vision_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(40, 'about_mission_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(41, 'about_mission_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(42, 'about_history_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(43, 'about_history_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(44, 'hero_title_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(45, 'hero_title_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(46, 'hero_subtitle_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(47, 'hero_subtitle_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(48, 'hero_images_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(49, 'hero_images_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(50, 'home_stats_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(51, 'home_stats_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(52, 'nav_links_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(53, 'nav_links_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(54, 'footer_services_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(55, 'footer_services_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(56, 'approach_steps_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(57, 'approach_steps_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(58, 'page_hero_data_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(59, 'page_hero_data_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(60, 'cta_data_fa', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00'),
(61, 'cta_data_ps', NULL, '2026-08-22 05:07:00', '2026-08-22 05:07:00');

-- --------------------------------------------------------

--
-- Table structure for table `software_products`
--

CREATE TABLE `software_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `tagline` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `problem` text DEFAULT NULL,
  `solution` text DEFAULT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `screenshots` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`screenshots`)),
  `demo_url` varchar(255) DEFAULT NULL,
  `pricing_mode` varchar(20) NOT NULL DEFAULT 'quote',
  `price` decimal(12,2) DEFAULT NULL,
  `price_unit` varchar(20) DEFAULT NULL,
  `setup_fee` decimal(12,2) NOT NULL DEFAULT 0.00,
  `image` varchar(255) DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `order` int(11) NOT NULL DEFAULT 0,
  `translations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`translations`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `software_products`
--

INSERT INTO `software_products` (`id`, `slug`, `name`, `category`, `tagline`, `description`, `problem`, `solution`, `features`, `screenshots`, `demo_url`, `pricing_mode`, `price`, `price_unit`, `setup_fee`, `image`, `is_published`, `order`, `translations`, `created_at`, `updated_at`) VALUES
(1, 'gurgure-erp', 'GURGURE ERP', 'Business Systems', 'End-to-end enterprise resource planning for growing organizations.', 'A modular ERP platform covering financials, operations, inventory, procurement and reporting — configurable to the way your organization already works.', 'Organizations manage operations across scattered spreadsheets, disconnected tools and paper records. Data is inconsistent, approvals are slow, and there is no single source of truth for decision making.', 'GURGURE ERP unifies finance, inventory, procurement and HR in one secure system with role-based access, approval workflows and real-time reports — deployed, hosted and supported by GURGURE itself.', '[\"Accounting & financials\",\"Inventory management\",\"Procurement & purchase orders\",\"Payroll & HR records\",\"Approval workflows\",\"Real-time dashboards & reports\"]', NULL, NULL, 'quote', NULL, NULL, 0.00, NULL, 1, 1, NULL, '2026-09-08 05:02:36', '2026-09-08 05:02:36'),
(2, 'gurgure-crm', 'GURGURE CRM', 'Business Systems', 'Manage leads, customers and follow-ups in one place.', 'A customer relationship management system for tracking leads, managing pipelines, scheduling follow-ups and keeping every client interaction organized.', 'Sales teams rely on memory, notebooks and personal devices to track leads, losing opportunities when communication slips through the cracks.', 'GURGURE CRM gives every team a shared view of customers, pipelines, tasks and appointments — so no lead is forgotten and every follow-up is on time.', '[\"Lead & contact management\",\"Sales pipeline stages\",\"Task & follow-up reminders\",\"Activity history\",\"Team assignment\",\"Basic reporting\"]', NULL, NULL, 'subscription', 500.00, 'monthly', 150.00, NULL, 1, 2, NULL, '2026-09-08 05:02:36', '2026-09-08 05:02:36'),
(3, 'gurgure-lms', 'GURGURE LMS', 'Education Systems', 'Learning management for training centers, universities and enterprises.', 'A learning management system with courses, lessons, assignments, assessments and certificates — built on GURGURE\'s proven LMS experience.', 'Training providers struggle to deliver, track and certify learning at scale using manual registrations, paper tests and email attachments.', 'GURGURE LMS digitizes the full learning cycle — enrollment, content delivery, quizzes, progress tracking and digital certificates — in one familiar platform.', '[\"Course & lesson management\",\"Enrollment & student groups\",\"Quizzes & assessments\",\"Progress tracking\",\"Digital certificates\",\"Instructor & student dashboards\"]', NULL, NULL, 'quote', NULL, NULL, 0.00, NULL, 1, 3, NULL, '2026-09-08 05:02:36', '2026-09-08 05:02:36'),
(4, 'gurgure-sis', 'GURGURE SIS', 'Education Systems', 'Student information and examination management for schools.', 'A student information system for registration, attendance, grading, examinations and report cards.', 'Schools manage student records, attendance and results on paper, making it hard to track performance or produce consistent report cards.', 'GURGURE SIS centralizes student data, attendance and exam scores, and generates standardized report cards and transcripts automatically.', '[\"Student registration & profiles\",\"Class & section management\",\"Attendance tracking\",\"Examination & grading\",\"Report cards & transcripts\",\"Teacher access\"]', NULL, NULL, 'quote', NULL, NULL, 0.00, NULL, 1, 4, NULL, '2026-09-08 05:02:36', '2026-09-08 05:02:36'),
(5, 'gurgure-mis-meal', 'GURGURE MIS / MEAL', 'Institutional Systems', 'Monitoring, evaluation and data management for NGOs and programs.', 'A management information system with MEAL workflows for projects, indicators, activity tracking, beneficiary data and donor reporting.', 'NGOs and program teams scatter beneficiary records and indicator data across Excel files, making donor reporting slow and error-prone.', 'GURGURE MIS/MEAL keeps projects, activities, beneficiaries and indicators in one database with clear data-entry forms and export-ready reports.', '[\"Project & activity tracking\",\"Indicator & target management\",\"Beneficiary database\",\"Data entry forms\",\"Donor report exports\",\"User roles & permissions\"]', NULL, NULL, 'quote', NULL, NULL, 0.00, NULL, 1, 5, NULL, '2026-09-08 05:02:36', '2026-09-08 05:02:36'),
(6, 'gurgure-ecommerce', 'GURGURE E-Commerce', 'Digital Platforms', 'Online stores and client portals for businesses.', 'A customizable e-commerce platform with product catalogs, cart, checkout and order tracking — ideal for retail businesses and service organizations.', 'Businesses without a storefront struggle to sell online or give clients a place to browse products and track their orders.', 'GURGURE E-Commerce delivers a branded online store with catalog management, customer accounts and order history, hosted and maintained by GURGURE.', '[\"Product catalog\",\"Shopping cart & checkout\",\"Customer accounts\",\"Order tracking\",\"Order management dashboard\",\"Local payment flows\"]', NULL, NULL, 'quote', NULL, NULL, 0.00, NULL, 1, 6, NULL, '2026-09-08 05:02:36', '2026-09-08 05:02:36'),
(7, 'gurgure-database-solutions', 'GURGURE Database Solutions', 'Database Solutions', 'Structured databases for employees, customers, projects, beneficiaries and research.', 'Tailored database systems designed around your data — from employee records to beneficiary registries and research data, with secure access and reporting.', 'Organizations collect valuable data but cannot retrieve, analyze or secure it, because it lives in unstructured files and personal stores.', 'GURGURE designs a structured database matching your exact fields, with controlled access, validation, search and the exports your team needs.', '[\"Custom schema design\",\"Secure role-based access\",\"Data validation & import\",\"Search & filters\",\"Excel\\/CSV exports\",\"Ongoing hosting & support\"]', NULL, NULL, 'quote', NULL, NULL, 0.00, NULL, 1, 7, NULL, '2026-09-08 05:02:36', '2026-09-08 05:02:36'),
(8, 'gurgure-portal', 'GURGURE Client & Membership Portals', 'Digital Platforms', 'Member, client and service portals that connect your organization with its audience.', 'Web portals for members, clients and service beneficiaries — with accounts, requests, documents and activity in one branded space.', 'Organizations serve members and clients through email and phone, with no central way for them to view status, documents or their own activity.', 'GURGURE Portals give each user a personal account to submit requests, view documents and track status — reducing staff workload and improving service.', '[\"User accounts & profiles\",\"Request & service submission\",\"Document upload & viewing\",\"Status tracking\",\"Admin management panel\",\"Notifications\"]', NULL, NULL, 'quote', NULL, NULL, 0.00, NULL, 1, 8, NULL, '2026-09-08 05:02:36', '2026-09-08 05:02:36');

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

CREATE TABLE `team_members` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `position` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `translations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`translations`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `team_members`
--

INSERT INTO `team_members` (`id`, `name`, `slug`, `position`, `bio`, `photo`, `email`, `phone`, `order`, `is_published`, `created_at`, `updated_at`, `translations`) VALUES
(1, 'Gh. Mustafa Baedaar', 'john-doe', 'Founder & Managing Director', '25+ years in strategic management, organizational development, business transformation. Leads vision and client partnerships across Afghanistan and beyond.', NULL, NULL, NULL, 1, 1, '2026-05-14 04:35:06', '2026-05-24 14:24:11', NULL),
(2, 'Head of Strategy', 'jane-smith', 'Head of Strategy & Business Development', 'Former consultant for international NGOs. Specializes in feasibility studies, donor proposals, institutional roadmaps.', NULL, NULL, NULL, 2, 1, '2026-05-14 04:35:06', '2026-05-24 14:24:11', NULL),
(3, 'Creative Director', 'ali-ahmad', 'Creative Director', 'Award-winning designer. Expertise in branding, visual identity, campaign development. Leads creative strategy and visual innovation.', NULL, NULL, NULL, 3, 1, '2026-05-14 04:35:06', '2026-05-24 14:24:11', NULL),
(4, 'SAID YAQUB SADAT', 'SAID-YAQUB-SADAT', 'WEB DEVOLOPER', 'Expert in Website & Database Development**\nI am a dedicated IT professional and developer specializing in building high-performance digital solutions that help businesses scale. With a strong foundation in modern technologies like React.js, Laravel, and MySQL, I focus on creating systems where quality, security, and performance  are the top priorities.\n\nMy expertise covers the full spectrum of software development, from designing intuitive front-end interfaces to architecting complex back-end databases. I am passionate about bridging the gap between technical complexity and user-friendly design, ensuring that every project—whether a simple website or an advanced enterprise system—is built smart and scales fast.\nCore Expertise:\nFront-end Development:** Crafting responsive UIs using **React.js, Tailwind CSS, and JavaScript**.\nBack-end Engineering:Developing robust server-side logic with Laravel and PHP.\nDatabase Architecture:** Designing and managing efficient\nMySQL databases and custom data solutions.\nSystem Specializations: Building specialized systems for **E-commerce, Pharmacies, Currency Exchange (Sarafi), and Educational Institutions**.\nCMS & Programming: Experienced in ,WordPress,development and proficient in Java and C++...\n\nMy mission is to help organizations grow digitally by providing reliable, professional, and secure technology services.\n\n🌐 Build Smart. Scale Fast. Grow Digitally.\n📩 Contact: 07744349034', '/storage/uploads/Ok8f2FIbE0yGnqjsJEGNNQJWQw8i9S7QVR8JY8Lo.png', 'saidyaqubsadat15@gmail.com', '0789622113', 1, 1, '2026-05-14 06:19:00', '2026-05-24 00:12:48', NULL),
(5, 'Eng Nizam Zaland', 'nizam-zaland', 'Admin Officer', 'Engineer Zaland is Graduated from Nangarhar University in Civil Engineering.', NULL, 'zaland@gurgure.com', '+93700777480', 5, 1, '2026-05-24 13:47:24', '2026-05-24 13:47:24', NULL),
(6, 'Head of Digital Transformation', 'head-digital-transformation', 'Head of Digital Transformation & ICT', 'Full-stack engineer, systems architect. Leads custom ERP, MIS, automation for enterprises and NGOs.', NULL, NULL, NULL, 4, 1, '2026-05-24 14:24:11', '2026-05-24 14:24:11', NULL),
(7, 'Marketing Lead', 'marketing-lead', 'Digital Marketing & Communications Lead', 'Data-driven marketer specializing in social media strategy, content marketing, campaign management.', NULL, NULL, NULL, 5, 1, '2026-05-24 14:24:11', '2026-05-24 14:24:11', NULL),
(8, 'Learning Manager', 'learning-manager', 'Learning & Development Manager', 'Certified trainer with 10+ years in leadership development, digital skills, institutional capacity building.', NULL, NULL, NULL, 6, 1, '2026-05-24 14:24:11', '2026-05-24 14:24:11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `translations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`translations`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `position`, `company`, `content`, `avatar`, `rating`, `is_published`, `created_at`, `updated_at`, `translations`) VALUES
(1, 'Senior Manager', 'Senior Manager', 'Estedaad', 'The training delivered by GURGURE transformed how our team approaches project management. The combination of theory, practical exercises, and real examples from our context made all the difference.', NULL, 5, 1, '2026-05-14 04:35:06', '2026-05-24 14:24:12', NULL),
(2, 'CEO', 'CEO', 'Qasemi Group', 'GURGURE delivered a complete digital transformation that exceeded our expectations. Our reporting efficiency improved by 40% and we now have real-time financial control.', NULL, 5, 1, '2026-05-14 04:35:06', '2026-05-24 14:24:12', NULL),
(3, 'Founder', 'Founder', 'Startup Client', 'The strategic plan and pitch deck GURGURE developed helped us secure $200k in seed funding. Their understanding of our vision was remarkable.', NULL, 5, 1, '2026-05-14 04:35:06', '2026-05-24 14:24:12', NULL),
(4, 'Director', 'Academic Director', 'Moraa Educational Complex', 'Our brand identity and LMS system have completely transformed how students and parents perceive our institution. Professional, modern, and effective.', NULL, 5, 1, '2026-05-24 14:24:12', '2026-05-24 14:24:12', NULL),
(5, 'Senior Manager', 'Senior Manager', 'Estedaad', 'The training delivered by GURGURE transformed how our team approaches project management. The combination of theory, practical exercises, and real examples from our context made all the difference.', NULL, 5, 1, '2026-05-24 14:24:34', '2026-05-24 14:24:34', NULL),
(6, 'CEO', 'CEO', 'Qasemi Group', 'GURGURE delivered a complete digital transformation that exceeded our expectations. Our reporting efficiency improved by 40% and we now have real-time financial control.', NULL, 5, 1, '2026-05-24 14:24:34', '2026-05-24 14:24:34', NULL),
(7, 'Founder', 'Founder', 'Startup Client', 'The strategic plan and pitch deck GURGURE developed helped us secure $200k in seed funding. Their understanding of our vision was remarkable.', NULL, 5, 1, '2026-05-24 14:24:34', '2026-05-24 14:24:34', NULL),
(8, 'Senior Manager', 'Senior Manager', 'Estedaad', 'The training delivered by GURGURE transformed how our team approaches project management. The combination of theory, practical exercises, and real examples from our context made all the difference.', NULL, 5, 1, '2026-05-31 03:22:21', '2026-05-31 03:22:21', NULL),
(9, 'CEO', 'CEO', 'Qasemi Group', 'GURGURE delivered a complete digital transformation that exceeded our expectations. Our reporting efficiency improved by 40% and we now have real-time financial control.', NULL, 5, 1, '2026-05-31 03:22:21', '2026-05-31 03:22:21', NULL),
(10, 'Founder', 'Founder', 'Startup Client', 'The strategic plan and pitch deck GURGURE developed helped us secure $200k in seed funding. Their understanding of our vision was remarkable.', NULL, 5, 1, '2026-05-31 03:22:21', '2026-05-31 03:22:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `avatar`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `is_admin`) VALUES
(1, 'Admin', 'admin@gurgure.com', NULL, NULL, '$2y$12$.6ju5uNlFK3BZuG3rS41SuGFXJLKp9nxmJ9IE6CYNCs6FKgTB3wDm', 'PXfPIOypW4247mj7TqfVvmaE5JMdxGZW9jRSp9irKY9KkNN8wMWp3rz0q56W', '2026-05-14 03:15:05', '2026-05-14 03:15:05', 1),
(3, 'sadat', 'sadat@gmail.com', '/storage/uploads/IEXrraTKjzlFBAFoHS923PhoCCN0NIfOV0l5R7fp.png', NULL, '$2y$12$iS2TUprRch9iZtm21qrVtuCVw0zuwLl5iR.bD4TbZNKq/wrg.ITAK', NULL, '2026-05-14 05:17:32', '2026-09-08 03:48:13', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blogs_slug_unique` (`slug`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `case_studies`
--
ALTER TABLE `case_studies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `case_studies_slug_unique` (`slug`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clients_slug_unique` (`slug`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invoices_invoice_no_unique` (`invoice_no`),
  ADD KEY `invoices_quotation_id_foreign` (`quotation_id`),
  ADD KEY `invoices_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_items_invoice_id_foreign` (`invoice_id`),
  ADD KEY `invoice_items_service_id_foreign` (`service_id`),
  ADD KEY `invoice_items_package_id_foreign` (`package_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `newsletter_subscribers_email_unique` (`email`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `packages_service_id_foreign` (`service_id`);

--
-- Indexes for table `package_items`
--
ALTER TABLE `package_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `package_items_package_id_foreign` (`package_id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pages_slug_unique` (`slug`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_invoice_id_foreign` (`invoice_id`),
  ADD KEY `payments_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `print_options`
--
ALTER TABLE `print_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `print_options_group_id_foreign` (`group_id`);

--
-- Indexes for table `print_option_groups`
--
ALTER TABLE `print_option_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `print_option_groups_product_id_foreign` (`product_id`);

--
-- Indexes for table `print_orders`
--
ALTER TABLE `print_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `print_orders_order_no_unique` (`order_no`),
  ADD KEY `print_orders_customer_id_foreign` (`customer_id`),
  ADD KEY `print_orders_status_index` (`status`);

--
-- Indexes for table `print_price_rules`
--
ALTER TABLE `print_price_rules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `print_price_rules_product_id_min_qty_index` (`product_id`,`min_qty`);

--
-- Indexes for table `print_products`
--
ALTER TABLE `print_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `print_products_slug_unique` (`slug`),
  ADD KEY `print_products_category_index` (`category`),
  ADD KEY `print_products_price_mode_index` (`price_mode`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `projects_slug_unique` (`slug`);

--
-- Indexes for table `quotations`
--
ALTER TABLE `quotations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `quotations_quotation_no_unique` (`quotation_no`),
  ADD KEY `quotations_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `quotation_items`
--
ALTER TABLE `quotation_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quotation_items_quotation_id_foreign` (`quotation_id`),
  ADD KEY `quotation_items_service_id_foreign` (`service_id`),
  ADD KEY `quotation_items_package_id_foreign` (`package_id`),
  ADD KEY `quotation_items_package_item_id_foreign` (`package_item_id`);

--
-- Indexes for table `receipts`
--
ALTER TABLE `receipts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `receipts_receipt_no_unique` (`receipt_no`),
  ADD KEY `receipts_invoice_id_foreign` (`invoice_id`),
  ADD KEY `receipts_payment_id_foreign` (`payment_id`),
  ADD KEY `receipts_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `services_slug_unique` (`slug`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`);

--
-- Indexes for table `software_products`
--
ALTER TABLE `software_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `software_products_slug_unique` (`slug`),
  ADD KEY `software_products_category_index` (`category`),
  ADD KEY `software_products_pricing_mode_index` (`pricing_mode`);

--
-- Indexes for table `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `team_members_slug_unique` (`slug`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `case_studies`
--
ALTER TABLE `case_studies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `invoice_items`
--
ALTER TABLE `invoice_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `package_items`
--
ALTER TABLE `package_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=301;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `print_options`
--
ALTER TABLE `print_options`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `print_option_groups`
--
ALTER TABLE `print_option_groups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `print_orders`
--
ALTER TABLE `print_orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `print_price_rules`
--
ALTER TABLE `print_price_rules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `print_products`
--
ALTER TABLE `print_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quotations`
--
ALTER TABLE `quotations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `quotation_items`
--
ALTER TABLE `quotation_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `receipts`
--
ALTER TABLE `receipts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `software_products`
--
ALTER TABLE `software_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `team_members`
--
ALTER TABLE `team_members`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `invoices_quotation_id_foreign` FOREIGN KEY (`quotation_id`) REFERENCES `quotations` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD CONSTRAINT `invoice_items_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `invoice_items_package_id_foreign` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `invoice_items_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `packages`
--
ALTER TABLE `packages`
  ADD CONSTRAINT `packages_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `package_items`
--
ALTER TABLE `package_items`
  ADD CONSTRAINT `package_items_package_id_foreign` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `payments_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `print_options`
--
ALTER TABLE `print_options`
  ADD CONSTRAINT `print_options_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `print_option_groups` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `print_option_groups`
--
ALTER TABLE `print_option_groups`
  ADD CONSTRAINT `print_option_groups_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `print_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `print_orders`
--
ALTER TABLE `print_orders`
  ADD CONSTRAINT `print_orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `print_price_rules`
--
ALTER TABLE `print_price_rules`
  ADD CONSTRAINT `print_price_rules_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `print_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `quotations`
--
ALTER TABLE `quotations`
  ADD CONSTRAINT `quotations_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `quotation_items`
--
ALTER TABLE `quotation_items`
  ADD CONSTRAINT `quotation_items_package_id_foreign` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `quotation_items_package_item_id_foreign` FOREIGN KEY (`package_item_id`) REFERENCES `package_items` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `quotation_items_quotation_id_foreign` FOREIGN KEY (`quotation_id`) REFERENCES `quotations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `quotation_items_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `receipts`
--
ALTER TABLE `receipts`
  ADD CONSTRAINT `receipts_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `receipts_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `receipts_payment_id_foreign` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
