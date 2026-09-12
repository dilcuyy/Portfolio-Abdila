export const portfolioData = {
  personal: {
    name: "ABDILA ASY SYAFIQ",
    shortName: "ABDILA",
    role: "Information Systems",
    subRole: "Information Systems Student",
    location: "Bekasi, Indonesia",
    status: "Active Student",
    year: "2026",
    tagline: "UI/UX Design • Web Development • Data Analysis • Digital Product",
    bio: "I am an Information Systems student with a strong interest in web development, UI/UX design, data analysis, and digital product development. I enjoy turning complex ideas into simple, functional, and visually engaging editorial digital experiences.",
  },

  education: {
    degree: "Sarjana Sistem Informasi (S.Kom)",
    university: "Universitas Bani Saleh",
    period: "2023 — 2027",
    gpa: "3.62",
    status: "Active Undergraduate Student",
    description: "Focused on Enterprise Information Systems, Software Architecture, User Experience Engineering, and Relational Database Design. Completing academic coursework in web development and data analytics.",
    semesters: [
      { id: "smt-1", smt: 1, label: "Smt 1", period: "2023 Ganjil", ips: "3.45", ipk: "3.45", sksSmt: 19, totalSks: 19, status: "Lulus" },
      { id: "smt-2", smt: 2, label: "Smt 2", period: "2023 Genap", ips: "3.76", ipk: "3.61", sksSmt: 19, totalSks: 38, status: "Lulus" },
      { id: "smt-3", smt: 3, label: "Smt 3", period: "2024 Ganjil", ips: "3.79", ipk: "3.67", sksSmt: 18, totalSks: 56, status: "Lulus" },
      { id: "smt-4", smt: 4, label: "Smt 4", period: "2024 Genap", ips: "3.33", ipk: "3.58", sksSmt: 18, totalSks: 74, status: "Lulus" },
      { id: "smt-5", smt: 5, label: "Smt 5", period: "2025 Ganjil", ips: "3.54", ipk: "3.58", sksSmt: 18, totalSks: 92, status: "Lulus" },
      { id: "smt-6", smt: 6, label: "Smt 6", period: "2025 Genap", ips: "3.83", ipk: "3.62", sksSmt: 18, totalSks: 110, status: "Lulus" },
      { id: "smt-7", smt: 7, label: "Smt 7", period: "2026 Ganjil", ips: "Ongoing", ipk: "3.62", sksSmt: 22, totalSks: 110, status: "Aktif Berjalan" }
    ],
    skillsLearned: [
      "Web Development",
      "Database Systems",
      "UI/UX Research & Design",
      "Data Analysis",
      "System Analysis & Design"
    ],
    image: "/images/education-photo.jpg"
  },

  skills: {
    soft: [
      { id: "01", name: "Communication & Public Speaking" },
      { id: "02", name: "Teamwork & Collaboration" },
      { id: "03", name: "Analytical Problem Solving" },
      { id: "04", name: "Time & Project Management" },
      { id: "05", name: "Adaptability & Rapid Learning" },
      { id: "06", name: "Critical Thinking & Work Ethic" }
    ],
    hard: [
      { id: "01", name: "HTML5 / CSS3 / JavaScript (ES6+)" },
      { id: "02", name: "PHP / CodeIgniter 4 (CI4)" },
      { id: "03", name: "MySQL / XAMPP Database Server" },
      { id: "04", name: "React.js / Vite / Tailwind CSS" },
      { id: "05", name: "Figma / UI & UX Prototyping" },
      { id: "06", name: "System Analysis & Relational Database Design" }
    ],
    image: "/images/skills-photo.jpg"
  },

  workExperience: [
    {
      id: "work-01",
      company: "Levi's Store Duta Mall",
      role: "Sales Promotion Girl (SPG) / Customer Representative",
      period: "2024",
      location: "Duta Mall, Indonesia",
      description: "Responsible for providing exceptional customer service, presenting high-end visual product merchandising, explaining denim features and sizing guides, supporting daily POS sales operations, and maintaining brand standards.",
      highlights: [
        "Delivered personalized consultations to 50+ customers daily.",
        "Maintained premium visual merchandising standards across key product displays.",
        "Supported inventory tracking and stock synchronization during peak retail campaigns."
      ],
      bannerImage: "/images/work-banner.jpg",
      portraitImage: "/images/work-portrait.jpg"
    }
  ],

  certificates: [
    {
      id: "cert-01",
      title: "Kuliah Umum \"Pengembangan Sistem Informasi dan Aplikasi Modern Berbasis Web dan Mobile untuk Kebutuhan Industri\"",
      issuer: "Universitas Bani Saleh",
      year: "2024",
      category: "KULIAH UMUM & WEB/MOBILE DEV",
      description: "Sertifikat Kuliah Umum mengenai arsitektur sistem informasi modern, pengembangan aplikasi web dan mobile responsif, serta integrasi kebutuhan industri digital.",
      image: "/images/certificates/cert-1.jpg",
      pdf: "/certificates/cert-1.pdf",
      tags: ["Web Dev", "Mobile Apps", "System Architecture"]
    },
    {
      id: "cert-02",
      title: "Kuliah Umum \"Digital Competency Challenge and Thriving in the Digital Era: Leveraging Communities to Shape The Future\"",
      issuer: "Universitas Bani Saleh",
      year: "2024",
      category: "KULIAH UMUM & DIGITAL COMPETENCY",
      description: "Sertifikat keikutsertaan Kuliah Umum perihal strategi kompetensi digital, pemberdayaan komunitas IT, dan transformasi ekosistem teknologi masa depan.",
      image: "/images/certificates/cert-2.jpg",
      pdf: "/certificates/cert-2.pdf",
      tags: ["Digital Competency", "IT Community", "Leadership"]
    },
    {
      id: "cert-03",
      title: "Certificate of Course Completion Cisco Networking Academy program IT Essentials",
      issuer: "Cisco Networking Academy",
      year: "2024",
      category: "CISCO NETWORKING ACADEMY",
      description: "Official Cisco Networking Academy Course Completion Certificate covering computer hardware, operating systems, networking fundamentals, and security protocols.",
      image: "/images/certificates/cert-3.jpg",
      pdf: "/certificates/cert-3.pdf",
      tags: ["IT Essentials", "Hardware & OS", "Networking", "Cisco"]
    },
    {
      id: "cert-04",
      title: "Seminar Persiapan Kerja \"Kupas Tuntas CV & Taktik Jitu Lolos Wawancara Kerja\"",
      issuer: "Pusat Karir & Pengembangan",
      year: "2024",
      category: "SEMINAR KARIR & PROFESSIONAL PREPARATION",
      description: "Sertifikat Seminar Karir mengenai penyusunan CV profesional yang menarik rekruter, strategi personal branding, dan simulasi taktik wawancara kerja.",
      image: "/images/certificates/cert-4.jpg",
      pdf: "/certificates/cert-4.pdf",
      tags: ["Career Preparation", "CV Building", "Interview Tactics"]
    },
    {
      id: "cert-05",
      title: "Seminar Literasi Digital Sektor Pendidikan SMK Bina Prestasi Bertema \"Generasi Cerdas Cakap Digital\"",
      issuer: "Kemenkominfo RI & Literasi Digital",
      year: "2024",
      category: "SEMINAR LITERASI DIGITAL SEKTOR PENDIDIKAN",
      description: "Sertifikat resmi peserta Seminar Literasi Digital Kementerian Komunikasi dan Informatika RI bertema etika digital, keamanan siber, dan kecakapan teknologi.",
      image: "/images/certificates/cert-5.jpg",
      pdf: "/certificates/cert-5.pdf",
      tags: ["Literasi Digital", "Kemenkominfo", "Cyber Safety"]
    },
    {
      id: "cert-06",
      title: "Mini Bootcamp Social Media Marketing dari Ioda Academy",
      issuer: "Ioda Academy",
      year: "2025",
      category: "MINI BOOTCAMP & DIGITAL MARKETING",
      description: "Sertifikat kelulusan Mini Bootcamp Social Media Marketing Ioda Academy memuat strategi konten kreatif, copy-writing, analitik audiens, dan kampanye digital.",
      image: "/images/certificates/cert-6.jpg",
      pdf: "/certificates/cert-6.pdf",
      tags: ["Social Media Marketing", "Content Strategy", "Ioda Academy"]
    },
    {
      id: "cert-07",
      title: "Workshop \"Public Speaking\" - Suara Kamu Berharga: Bangun Kredibilitas Lewat Public Speaking dari Ioda Academy",
      issuer: "Ioda Academy",
      year: "2025",
      category: "WORKSHOP PUBLIC SPEAKING & COMMUNICATION",
      description: "Sertifikat Workshop Public Speaking Ioda Academy memfokuskan artikulasi suara, teknik artikulasi pesan bisnis, dan peningkatan kredibilitas penyampaian presentasi.",
      image: "/images/certificates/cert-7.jpg",
      pdf: "/certificates/cert-7.pdf",
      tags: ["Public Speaking", "Communication", "Ioda Academy"]
    }
  ],

  projects: [
    {
      id: "proj-01",
      title: "JOGLO LARVA CENTER",
      category: "ENTERPRISE DASHBOARD & PREDICTION SYSTEM",
      subtitle: "01 / DASHBOARD & SALES PREDICTION",
      description: "Comprehensive executive dashboard for sales analytics, historic revenue comparison (2022–2026), and automated fresh maggot production prediction algorithms.",
      tech: ["CodeIgniter 4", "MySQL (XAMPP)", "Chart.js", "Tailwind CSS"],
      image: "/images/projects/project-1.jpg"
    },
    {
      id: "proj-02",
      title: "SDN CIMUNING III DIGITAL LIBRARY",
      category: "SCHOOL LIBRARY & CATALOG SYSTEM",
      subtitle: "02 / DIGITAL LIBRARY SYSTEM",
      description: "Interactive digital library web platform tailored for elementary students and faculty, featuring categorized book collections, loan management, and search indexing.",
      tech: ["CodeIgniter 4", "MySQL (XAMPP)", "Bootstrap", "UI Design"],
      image: "/images/projects/project-2.jpg"
    },
    {
      id: "proj-03",
      title: "SDIT TITIAN ILMU BEKASI",
      category: "INTEGRATED SCHOOL LIBRARY PORTAL",
      subtitle: "03 / SCHOOL PORTAL & LIBRARY",
      description: "Integrated school portal landing page and digital library for SDIT Titian Ilmu Bekasi, combining institutional profile, academic vision, and book borrowing capabilities.",
      tech: ["CodeIgniter 4", "MySQL (XAMPP)", "Tailwind CSS", "Figma"],
      image: "/images/projects/project-3.jpg"
    },
    {
      id: "proj-04",
      title: "CHRONOBLEND COFFEE SHOP",
      category: "E-COMMERCE & MENU ORDERING WEB APP",
      subtitle: "04 / COFFEE SHOP PLATFORM",
      description: "Modern editorial e-commerce platform for ChronoBlend specialty coffee, featuring dynamic menu showcases, online ordering, and admin inventory management.",
      tech: ["CodeIgniter 4", "MySQL (XAMPP)", "JavaScript", "Figma"],
      image: "/images/projects/project-4.jpg"
    },
    {
      id: "proj-05",
      title: "GEMINDO RENTAL GRUP",
      category: "CAR RENTAL FLEET BOOKING PLATFORM",
      subtitle: "05 / FLEET MANAGEMENT SYSTEM",
      description: "Fleet booking system and vehicle rental portal in Depok, equipped with keyless daily/monthly rental filtering, fleet availability tracking, and WhatsApp instant booking.",
      tech: ["CodeIgniter 4", "MySQL (XAMPP)", "Bootstrap", "JavaScript"],
      image: "/images/projects/project-5.jpg"
    }
  ],

  contact: {
    headline: "LET'S WORK TOGETHER.",
    subhead: "Have a project, collaboration opportunity, or just want to say hello? Drop a message below.",
    email: "abdilaasy00@gmail.com",
    phone: "+62 895 1793 9138",
    web3formsKey: "22f2b422-cafa-46ce-80f9-0c590e6348d8",
    socials: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/abdila-asy-syafiq", handle: "abdila-asy-syafiq" },
      { name: "GitHub", url: "https://github.com/dilcuyy", handle: "@dilcuyy" },
      { name: "Instagram", url: "https://www.instagram.com/a.dilasy/", handle: "@a.dilasy" },
      { name: "WhatsApp", url: "https://wa.me/6289517939138", handle: "+62 895-1793-9138" }
    ]
  }
};
