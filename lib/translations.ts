export const translations = {
  // Header
  "header.buy": { en: "Buy", id: "Beli" },
  "header.rent": { en: "Rent", id: "Sewa" },
  "header.newProjects": { en: "New Projects", id: "Proyek Baru" },
  "header.agents": { en: "Agents", id: "Agen" },
  "header.login": { en: "Login", id: "Masuk" },
  "header.logout": { en: "Logout", id: "Keluar" },

  // Property List
  "propertyList.heroTitle": { en: "Find Your Dream Home Today", id: "Temukan Rumah Impian Anda Hari Ini" },
  "propertyList.searchPlaceholder": { en: "e.g., 'Jakarta', 'Canggu', 'Modern Villa'", id: "cth., 'Jakarta', 'Canggu', 'Vila Modern'" },
  "propertyList.locationLabel": { en: "Location or Title", id: "Lokasi atau Judul" },
  "propertyList.typeLabel": { en: "Property Type", id: "Tipe Properti" },
  "propertyList.allTypes": { en: "All Types", id: "Semua Tipe" },
  "propertyList.searchButton": { en: "Search", id: "Cari" },
  "propertyList.showingResults": { en: (count: number) => `Showing ${count} results`, id: (count: number) => `Menampilkan ${count} hasil` },
  "propertyList.featured": { en: "Featured Properties", id: "Properti Unggulan" },
  "propertyList.forRent": { en: "Properties for Rent", id: "Properti untuk Disewa" },
  "propertyList.newProjectsList": { en: "New Housing Projects", id: "Proyek Perumahan Baru" },
  "propertyList.noResultsTitle": { en: "No Properties Found", id: "Properti Tidak Ditemukan" },
  "propertyList.noResultsSubtitle": { en: "Try adjusting your search filters to find what you're looking for.", id: "Coba sesuaikan filter pencarian Anda untuk menemukan yang Anda cari." },

  // Property Card
  "propertyCard.featured": { en: "FEATURED", id: "UNGGULAN" },
  "propertyCard.bedrooms": { en: "Bedrooms", id: "Kamar Tidur" },
  "propertyCard.bathrooms": { en: "Bathrooms", id: "Kamar Mandi" },
  "propertyCard.area": { en: "Area", id: "Luas" },

  // Prices
  "price.perDay": { en: "/day", id: "/hari" },
  "price.perMonth": { en: "/month", id: "/bulan" },
  "price.perYear": { en: "/year", id: "/tahun" },

  // Property Detail
  "propertyDetail.back": { en: "Back to Listings", id: "Kembali ke Daftar" },
  "propertyDetail.exploreRooms": { en: "Explore Rooms", id: "Jelajahi Ruangan" },
  "propertyDetail.description": { en: "Description", id: "Deskripsi" },
  "propertyDetail.beds": { en: "Beds", id: "K. Tidur" },
  "propertyDetail.baths": { en: "Baths", id: "K. Mandi" },
  "propertyDetail.contactAgent": { en: "Contact Agent", id: "Hubungi Agen" },
  "propertyDetail.saveProperty": { en: "Save Property", id: "Simpan Properti" },
  "propertyDetail.loadingTour": { en: "Loading 360° View...", id: "Memuat Tampilan 360°..." },
  "propertyDetail.tourDrag": { en: "Click and drag to look around", id: "Klik dan seret untuk melihat sekeliling" },

  // Chat View
  "chat.title": { en: "Chat with Agent", id: "Chat dengan Agen" },
  "chat.regarding": { en: "Regarding", id: "Mengenai" },
  "chat.backToProperty": { en: "Back to Property", id: "Kembali ke Properti" },
  "chat.inputPlaceholder": { en: "Type your message...", id: "Ketik pesan Anda..." },
  "chat.sendButton": { en: "Send", id: "Kirim" },
  "chat.agentWelcome": { en: (title: string) => `Hello! I'm the agent for "${title}". How can I help you today?`, id: (title: string) => `Halo! Saya agen untuk properti "${title}". Ada yang bisa saya bantu hari ini?` },
  "chat.agentResponse": { en: "Thank you for your message. I am checking the details now and will get back to you shortly.", id: "Terima kasih atas pesan Anda. Saya sedang memeriksa detailnya dan akan segera menghubungi Anda kembali." },
  "chat.typing": { en: "Agent is typing...", id: "Agen sedang mengetik..." },

  // Auth Flow
  "auth.backToListings": { en: "Back to Listings", id: "Kembali ke Daftar" },
  "auth.welcome": { en: "Welcome to Est Tech", id: "Selamat Datang di Est Tech" },
  "auth.getStarted": { en: "How would you like to get started?", id: "Bagaimana Anda ingin memulai?" },
  "auth.iamBuyer": { en: "I am a Buyer", id: "Saya seorang Pembeli" },
  "auth.buyerDesc": { en: "Browse listings, save your favorites, and explore virtual tours.", id: "Jelajahi properti, simpan favorit, dan nikmati tur virtual." },
  "auth.iamAgent": { en: "I am a Selling Agent", id: "Saya seorang Agen Penjual" },
  "auth.agentDesc": { en: "List properties, manage your profile, and connect with clients.", id: "Pasang properti, kelola profil, dan terhubung dengan klien." },
  "auth.backToSelection": { en: "Back to Role Selection", id: "Kembali ke Pilih Peran" },
  "auth.portalAccess": { en: (role: string) => `${role.charAt(0).toUpperCase() + role.slice(1)} Portal Access`, id: (role: string) => `Akses Portal ${role === 'buyer' ? 'Pembeli' : 'Agen'}` },
  "auth.signInContinue": { en: "Sign in or create an account to continue.", id: "Masuk atau buat akun untuk melanjutkan." },
  "auth.signIn": { en: "Sign In", id: "Masuk" },
  "auth.createAccount": { en: "Create Account", id: "Buat Akun" },
  "auth.becomeAgent": { en: "Become an Agent", id: "Menjadi Agen" },
  "auth.fullName": { en: "Full Name", id: "Nama Lengkap" },
  "auth.email": { en: "Email Address", id: "Alamat Email" },
  "auth.phone": { en: "Phone Number", id: "Nomor Telepon" },
  "auth.password": { en: "Password", id: "Kata Sandi" },
  "auth.loginSuccess": { en: (role: string) => `Login as ${role} successful!`, id: (role: string) => `Berhasil masuk sebagai ${role}!` },
  "auth.signupSuccess": { en: (role: string) => `Signup as ${role} successful!`, id: (role: string) => `Berhasil mendaftar sebagai ${role}!` },


  // Agent Center
  "agent.title": { en: "Agent Verification Center", id: "Pusat Verifikasi Agen" },
  "agent.subtitle": { en: "Upload your documents to get your agent account verified.", id: "Unggah dokumen Anda untuk memverifikasi akun agen Anda." },
  "agent.requiredDocs": { en: "Required Documents", id: "Dokumen yang Diperlukan" },
  "agent.docsDesc": { en: "To ensure the quality and validity of our listings, please upload the necessary verification documents. Your information will be kept confidential.", id: "Untuk memastikan kualitas dan validitas daftar kami, harap unggah dokumen verifikasi yang diperlukan. Informasi Anda akan dijaga kerahasiaannya." },
  "agent.doc1": { en: "KTP (ID Card)", id: "KTP (Kartu Tanda Penduduk)" },
  "agent.doc2": { en: "Company's SIU-P4 (Surat Izin Usaha Perusahaan Perantara Perdagangan Properti)", id: "SIU-P4 Perusahaan (Surat Izin Usaha Perusahaan Perantara Perdagangan Properti)" },
  "agent.doc3": { en: "Certificate of Property Ownership for each listing", id: "Sertifikat Kepemilikan Properti untuk setiap listing" },
  "agent.submitButton": { en: "Submit for Verification", id: "Kirim untuk Verifikasi" },
  "agent.submitAlert": { en: "Documents submitted for verification! (Simulation)", id: "Dokumen dikirim untuk verifikasi! (Simulasi)" },


  // File Upload
  "fileUpload.dropzone": { en: "Drag & drop files here, or click to select", id: "Seret & letakkan file di sini, atau klik untuk memilih" },
  "fileUpload.supported": { en: "PDF, DOCX, PNG, JPG supported", id: "Mendukung PDF, DOCX, PNG, JPG" },
  "fileUpload.selected": { en: (count: number) => `Selected Files (${count}):`, id: (count: number) => `File Terpilih (${count}):` },
  
  // Footer
  "footer.motto": { en: "Find your next dream home with immersive virtual tours.", id: "Temukan rumah impian Anda berikutnya dengan tur virtual yang imersif." },
  "footer.quickLinks": { en: "Quick Links", id: "Tautan Cepat" },
  "footer.about": { en: "About Us", id: "Tentang Kami" },
  "footer.contact": { en: "Contact Us", id: "Hubungi Kami" },
  "footer.careers": { en: "Careers", id: "Karir" },
  "footer.tos": { en: "Terms of Service", id: "Ketentuan Layanan" },
  "footer.discover": { en: "Discover", id: "Temukan" },
  "footer.jakarta": { en: "Properties in Jakarta", id: "Properti di Jakarta" },
  "footer.bali": { en: "Properties in Bali", id: "Properti di Bali" },
  "footer.bandung": { en: "Properties in Bandung", id: "Properti di Bandung" },
  "footer.newApts": { en: "New Apartments", id: "Apartemen Baru" },
  "footer.follow": { en: "Follow Us", id: "Ikuti Kami" },
  "footer.copyright": { en: (year: number) => `© ${year} Est Tech. All rights reserved.`, id: (year: number) => `© ${year} Est Tech. Hak cipta dilindungi undang-undang.` },
};
