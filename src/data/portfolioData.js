export const calculateAge = (birthDateString) => {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const profile = {
  name: "Andhika Eka Santosa",
  title: "Fullstack & Mobile Developer",
  age: calculateAge("2008-06-20"),
  location: "Kudus, Jawa Tengah",
  school: "SMK Raden Umar Said Kudus",
  bio: "Seorang pengembang perangkat lunak muda yang berdedikasi tinggi dengan fokus pada pembuatan solusi digital yang efisien dan estetik. Berpengalaman dalam pengembangan Web (Laravel/React) dan Mobile (Flutter)."
};

export const projects = [
  {
    title: "GoodLife: AI-Powered Nutrition & Health Tracker",
    tech: ["Laravel", "Tailwind", "MySQL", "AI-Integration"],
    desc: "Proyek ini adalah platform kesehatan berbasis AI yang membantu pengguna memantau pola hidup sehat melalui fitur pengenalan makanan dari foto untuk menghitung kalori dan nutrisi secara otomatis. Dilengkapi dashboard statistik real-time, asisten chat “Tanya AI” untuk konsultasi kesehatan, fitur komunitas, sistem artikel edukasi (CMS), serta admin panel untuk pengelolaan dan keamanan platform.",
    image: "projects/goodlife.png",
    link: "https://goodlife.rplrus.com"
  },
  {
    title: "E-Branch Bank Jateng Syariah",
    tech: ["Laravel", "Tailwind", "MySQL", "AI-Integration"],
    desc: "Aplikasi ini memiliki fitur seperti pengajuan deposito, tabungan, layanan pembiayaan, serta manajemen artikel. Dibangun menggunakan Laravel, proyek ini bertujuan untuk membuat layanan perbankan digital menjadi lebih mudah dan efisien.",
    image: "projects/bankjateng.png",
    link: "https://github.com/andhikaeka3333333/bank_jateng"
  },
  {
    title: "Chamartin Course",
    tech: ["Laravel", "Tailwind", "MySQL"],
    desc: "Sebuah aplikasi web yang menyediakan kursus online dengan fitur interaktif. Proyek ini digunakan untuk edukasi coding bagi siswa",
    image: "projects/chamartin.png",
    link: "https://github.com/andhikaeka3333333/course_chamartin"
  },
  {
    title: "Vokasi Polytron PPDB",
    tech: ["Laravel", "Tailwind", "MySQL"],
    desc: "Sebuah aplikasi web yang menyediakan sistem pendaftaran online untuk program vokasi di Polytron. Proyek ini digunakan untuk memudahkan proses pendaftaran dan manajemen data siswa yang mendaftar ke program vokasi Polytron.",
    image: "projects/webvokasi.png",
    link: "https://vokasipolytron.rplrus.com"
  },
  {
    title: "Starindo Marketing Internal System",
    tech: ["Laravel", "Tailwind", "MySQL"],
    desc: "Sebuah aplikasi web yang menyediakan biaya perjalanan untuk tim marketing, serta fitur omset untuk membandingkan omset dengan biaya pengajuan",
    image: "projects/starindo.png",
    link: ""
  },
  {
    title: "Dchubite POS - Mobile Application",
    tech: ["Flutter", "Laravel", "MySQL"],
    desc: "Aplikasi POS berbasis Android yang berguna untuk cetak nota, manajemen produk, serta manajemen transaksi penjualan di Restoran D'chubite.",
    image: "projects/dchubite.png",
    link: "https://drive.google.com/drive/folders/1sQTtfIR0OQIbb1T758CFzpT4D8T64zYN?usp=sharing"
  },
  {
    title: "Medical Claim Internal System - R&D Polytron",
    tech: ["PHP", "Semantic UI", "MySQL", "JQuery"],
    desc: "Sebuah aplikasi web yang digunakan untuk mengelola klaim medis karyawan, termasuk pengajuan, persetujuan, dan pelacakan status klaim. Proyek ini bertujuan untuk meningkatkan efisiensi proses klaim medis di perusahaan.",
    image: "projects/medicalclaim.png",
    link: ""
  },
  {
    title: "Distribusi Surat Izin dan Lembur Karyawan - R&D Polytron",
    tech: ["PHP", "Semantic UI", "MySQL", "JQuery"],
    desc: "Sebuah aplikasi web yang digunakan untuk mengelola distribusi surat izin dan lembur karyawan, termasuk pengajuan, persetujuan, dan pelacakan status surat. Proyek ini bertujuan untuk meningkatkan efisiensi proses distribusi surat izin dan lembur di perusahaan.",
    image: "projects/suratizin.png",
    link: ""
  }
];

export const certificates = [
  { name: "Belajar Dasar AI", issuer: "Dicoding Indonesia", year: "2024", image: "/certificates/ai.png", link: "https://www.linkedin.com/in/andhika-eka-santosa-852b25281/details/certifications/" },
  { name: "Memulai Dasar Pemrograman", issuer: "Dicoding Indonesia", year: "2023", image: "/certificates/dasarpemrograman.png", link: "https://www.linkedin.com/in/andhika-eka-santosa-852b25281/details/certifications/" },
  { name: "Front-End Web untuk Pemula", issuer: "Dicoding Indonesia", year: "2024", image: "/certificates/fe.png", link: "https://www.linkedin.com/in/andhika-eka-santosa-852b25281/details/certifications/" },
  { name: "Aplikasi Flutter Pemula", issuer: "Dicoding Indonesia", year: "2024", image: "/certificates/flutter.png", link: "https://www.linkedin.com/in/andhika-eka-santosa-852b25281/details/certifications/" },
  { name: "Dasar Pemrograman JavaScript", issuer: "Dicoding Indonesia", year: "2024", image: "/certificates/js.png", link: "https://www.linkedin.com/in/andhika-eka-santosa-852b25281/details/certifications/" },
  { name: "Dasar Pemrograman Web", issuer: "Dicoding Indonesia", year: "2024", image: "/certificates/web.png", link: "https://www.linkedin.com/in/andhika-eka-santosa-852b25281/details/certifications/" },
  { name: "Web App Techcomfest 2025", issuer: "Politeknik Negeri Semarang", year: "2025", image: "/certificates/techcomfest.png", link: "https://www.linkedin.com/in/andhika-eka-santosa-852b25281/details/certifications/" },
  { name: "Web App Techcomfest 2026", issuer: "Politeknik Negeri Semarang", year: "2026", image: "/certificates/techcomfest2.png", link: "https://www.linkedin.com/in/andhika-eka-santosa-852b25281/details/certifications/" },
  { name: "Bank Jateng Syariah Web Competition", issuer: "Bank Jateng Syariah", year: "2025", image: "/certificates/bankjateng.png", link: "https://www.linkedin.com/in/andhika-eka-santosa-852b25281/details/certifications/" },
];

export const timelineData = [
  { company: "PT Starindo Jaya Packaging", role: "Software Developer", period: "Februari 2025 - Sekarang", description: "Mengembangkan aplikasi untuk mendukung sistem internal perusahaan, seperti biaya perjalanan marketing serta omset." },
  { company: "Polytron Indonesia", role: "Intern R&D Web Developer", period: "Agustus 2025 - Januari 2026", description: "Berkontribusi dalam pengembangan sistem internal untuk Medical Claim, Distribusi Surat Izin dan Lembur Karyawan, Serta PPDB Vokasi." },
  { company: "SMK Raden Umar Said", role: "Pengembangan Perangkat Lunak dan Gim", period: "Juli 2023 - Mei 2026", description: "Mempelajari fundamental pemrograman, desain sistem aplikasi, pengembangan website dengan laravel, dan pengembangan aplikasi mobile, serta perancangan database." }
];

export const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "ReactJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" }
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" }
    ]
  },
  {
    title: "Mobile",
    skills: [
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
      { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" }
    ]
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "XAMPP", icon: "https://www.apachefriends.org/images/xampp-logo-ac950edf.svg" }
    ]
  }
];