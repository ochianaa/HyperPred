import React from 'react';

const HomePage = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo Kiri */}
            <div className="flex items-center gap-2">
              <div className="text-blue-600">
                {/* Icon Jantung Simple */}
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-blue-900 tracking-tight">HyperPred</span>
            </div>
            {/* Teks Kanan (DIHAPUS SESUAI REQUEST) */}
            {/* <div className="text-xs md:text-sm text-gray-500 font-medium">
              Skripsi Teknik Informatika 2024
            </div> */}
          </div>
        </div>
      </nav>

      {/* --- 1. HERO SECTION --- */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Kolom Kiri: Teks */}
          <div className="text-left space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Sistem Cerdas Deteksi Dini <br />
              <span className="text-blue-600">Risiko Hipertensi</span>
            </h1>
            
            {/* KALIMAT HERO BARU (LEBIH MENARIK & SINGKAT) */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Ketahui risiko kesehatan Anda hanya dalam hitungan menit. 
              Didukung teknologi AI presisi tinggi dan standar medis terpercaya. 
              Cek sekarang, cegah lebih awal.
            </p>
            
            <button 
              onClick={onStart}
              className="inline-flex items-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Mulai Prediksi Sekarang
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Kolom Kanan: Ilustrasi */}
          <div className="relative">
            {/* Lingkaran Background */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            
            {/* Gambar Vektor Placeholder */}
            <div className="relative z-10 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100">
               {/* Simulasi Gambar Dashboard Medis */}
               <div className="bg-blue-50 rounded-xl h-64 flex items-center justify-center flex-col text-blue-300">
                  <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  <span className="text-sm font-bold uppercase tracking-widest text-blue-400">Medical Illustration Area</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. TENTANG KAMI (JUDUL & FONT DIPERBESAR) --- */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Judul Diubah dan Diperbesar (text-3xl ke text-4xl) */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8">Tentang Kami</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden">
             {/* Dekorasi Background Tipis */}
             <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
             
             <p className="text-gray-700 leading-relaxed text-lg">
               Aplikasi ini dikembangkan sebagai bagian dari penelitian <strong>skripsi Teknologi Informasi</strong>. 
               Tujuan utamanya adalah menguji efektivitas optimasi algoritma <strong>XGBoost</strong> menggunakan 
               <strong> PSO (Particle Swarm Optimization)</strong>, yang kemudian diintegrasikan dalam sistem pendukung keputusan medis 
               berbasis aturan pakar <strong>(JNC 7)</strong>.
             </p>
          </div>
        </div>
      </section>

      {/* --- 3. CARA PENGGUNAAN --- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Cara Penggunaan</h2>
            <p className="text-gray-500 mt-2">Tiga langkah mudah untuk melakukan deteksi dini</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">1. Isi Data Diri</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Masukkan data kesehatan Anda secara lengkap seperti tekanan darah sistole/diastole, usia, dan pola gaya hidup.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-200">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">2. Analisis Sistem</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Sistem memproses data menggunakan algoritma XGBoost yang telah dioptimasi dengan PSO serta aturan pakar medis.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 text-green-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">3. Dapatkan Hasil</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Terima laporan risiko kesehatan instan beserta status klasifikasi JNC dan saran pencegahan dini.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. MENGAPA BERBEDA? --- */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">
              Mengapa <span className="text-blue-600">HyperPred</span> Berbeda?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Kiri */}
            <div className="flex p-6 border border-gray-100 rounded-xl bg-gray-50 items-start hover:border-blue-200 transition">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 text-xl">
                  🧪
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">Integrasi Expert System (JNC 7)</h4>
                <p className="text-sm text-gray-600">Menggunakan standar medis resmi internasional sebagai dasar <em>rule-based decision</em> untuk memastikan validitas medis.</p>
              </div>
            </div>

            {/* Card Kanan */}
            <div className="flex p-6 border border-gray-100 rounded-xl bg-gray-50 items-start hover:border-blue-200 transition">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-yellow-500 text-xl">
                  ⚡
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">Optimasi PSO pada XGBoost</h4>
                <p className="text-sm text-gray-600">Parameter model Machine Learning dioptimasi secara otomatis menggunakan <em>Particle Swarm Optimization</em> untuk akurasi tertinggi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER (DIUBAH) --- */}
      <footer className="bg-slate-50 border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 mb-2">
            © 2026 <strong>Ochiana</strong>. Skripsi Teknologi Informasi.
          </p>
          <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Disclaimer: Sistem ini merupakan luaran penelitian skripsi dan hanya berfungsi sebagai alat bantu analisis, 
            bukan pengganti diagnosa medis profesional. Selalu konsultasikan hasil dengan tenaga medis.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;