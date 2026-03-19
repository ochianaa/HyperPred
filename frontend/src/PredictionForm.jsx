import React, { useState } from 'react';
import { User, Activity, HeartPulse, Stethoscope, ArrowLeft } from "lucide-react";

// Props 'onSuccess' & 'onBack' diterima dari App.jsx
const PredictionForm = ({ onSuccess, onBack }) => {
  
  // 1. State Input Variabel (Sesuai Skripsi)
  const [formData, setFormData] = useState({
    jenis_kelamin: '0', // 0: Pria, 1: Wanita
    umur: '',
    tinggi: '',
    berat: '',
    sistole: '',
    diastole: '',
    nadi: '',
    nafas: '',
    merokok: '0',
    alkohol: '0',
    kurang_sayur: '0',
    rpd: '0'
  });

  const [loading, setLoading] = useState(false);

  // 2. Handle Perubahan Input Text/Number
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. Handle Pilihan Tombol (Untuk Gender, Merokok, dll agar UX lebih bagus)
  const handleSelect = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 4. Kalkulasi IMT Otomatis (Display Only)
  const getIMT = () => {
    if (formData.tinggi && formData.berat) {
      const h = formData.tinggi / 100;
      const imt = (formData.berat / (h * h)).toFixed(1);
      return imt;
    }
    return "--";
  };

  // 5. Submit ke Backend (MODE SIMULASI / DUMMY)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi Sederhana
    if(!formData.umur || !formData.sistole || !formData.diastole) {
        alert("Mohon lengkapi data vital (Umur & Tekanan Darah)");
        return;
    }

    setLoading(true);
    
    // KITA MATIKAN DULU KONEKSI KE BACKEND
    // DAN KITA GANTI DENGAN HASIL PURA-PURA (MOCK DATA)
    
    setTimeout(() => {
        // Ini data dummy untuk mengetes tampilan Hasil
        const dummyResult = {
            status: "success",
            // Coba ganti ini jadi: "Normal", "Pre-Hipertensi", "Hipertensi Tingkat 1", atau "Hipertensi Tingkat 2"
            // untuk melihat perubahan warna bar-nya.
            prediksi_xgboost: "Hipertensi Tingkat 2", 
            prediksi_pakar: "Hipertensi Tingkat 2",
            message: "Prediksi berhasil (Mode Simulasi)"
        };

        onSuccess(dummyResult); // Langsung pindah ke halaman hasil
        setLoading(false);
    }, 1500); // Kita kasih delay 1.5 detik biar seolah-olah mikir
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* --- HEADER --- */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-8 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Analisis Risiko Hipertensi</h1>
          <p className="text-blue-100 text-sm md:text-base">
            Lengkapi formulir klinis di bawah ini untuk memulai prediksi menggunakan metode Hybrid AI.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          
          {/* --- SECTION 1: DATA DIRI --- */}
          <div>
            <div className="flex items-center mb-4">
              <User className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-bold text-gray-800">Data Demografi & Fisik</h2>
            </div>
            <hr className="border-gray-200 mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Jenis Kelamin */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Kelamin</label>
                <div className="grid grid-cols-2 gap-3">
                  {['0', '1'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleSelect('jenis_kelamin', val)}
                      className={`py-3 rounded-lg border text-sm font-medium transition-all ${
                        formData.jenis_kelamin === val 
                        ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {val === '0' ? 'Laki-laki' : 'Perempuan'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Umur */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Umur (Tahun)</label>
                <input 
                  type="number" 
                  name="umur" 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="Contoh: 45"
                />
              </div>

              {/* Tinggi & Berat */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Tinggi (cm)</label>
                   <input type="number" name="tinggi" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500" placeholder="170" />
                </div>
                <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Berat (kg)</label>
                   <input type="number" name="berat" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500" placeholder="70" />
                </div>
              </div>

              {/* Display IMT */}
              <div className="bg-blue-50 rounded-xl p-4 flex flex-col justify-center items-center text-center border border-blue-100">
                <span className="text-sm text-blue-600 font-semibold mb-1">Indeks Massa Tubuh (IMT)</span>
                <span className="text-3xl font-bold text-blue-800">{getIMT()}</span>
                <span className="text-xs text-blue-400 mt-1">kg/m²</span>
              </div>
            </div>
          </div>

          {/* --- SECTION 2: TANDA VITAL (RED ZONE) --- */}
          <div>
            <div className="flex items-center mb-4">
              <HeartPulse className="w-6 h-6 text-red-600 mr-2" />
              <h2 className="text-lg font-bold text-gray-800">Tanda Vital (Penting)</h2>
            </div>
            <div className="bg-red-50/50 p-6 rounded-xl border border-red-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Sistole (mmHg)</label>
                  <input required type="number" name="sistole" onChange={handleChange} placeholder="120" className="w-full p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Diastole (mmHg)</label>
                  <input required type="number" name="diastole" onChange={handleChange} placeholder="80" className="w-full p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Nadi (BPM)</label>
                  <input type="number" name="nadi" onChange={handleChange} placeholder="80" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Nafas (x/mnt)</label>
                  <input type="number" name="nafas" onChange={handleChange} placeholder="20" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <p className="text-xs text-red-400 mt-3 italic">*Pastikan data tekanan darah diisi dengan akurat sesuai pengukuran terakhir.</p>
            </div>
          </div>

          {/* --- SECTION 3: GAYA HIDUP --- */}
          <div>
            <div className="flex items-center mb-4">
              <Activity className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-lg font-bold text-gray-800">Gaya Hidup & Riwayat</h2>
            </div>
            <hr className="border-gray-200 mb-6" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Helper Component untuk Tombol Yes/No */}
              <BooleanSelect 
                label="Perokok Aktif" 
                desc="Apakah Anda merokok secara rutin?"
                value={formData.merokok} 
                onClick={(val) => handleSelect('merokok', val)} 
              />
              <BooleanSelect 
                label="Konsumsi Alkohol" 
                desc="Apakah Anda mengonsumsi alkohol?"
                value={formData.alkohol} 
                onClick={(val) => handleSelect('alkohol', val)} 
              />
              <BooleanSelect 
                label="Kurang Sayur & Buah" 
                desc="Apakah diet Anda rendah serat?"
                value={formData.kurang_sayur} 
                onClick={(val) => handleSelect('kurang_sayur', val)} 
              />
              <BooleanSelect 
                label="Riwayat Keluarga (RPD)" 
                desc="Ada keluarga dengan hipertensi?"
                value={formData.rpd} 
                onClick={(val) => handleSelect('rpd', val)} 
              />
            </div>
          </div>

          {/* --- TOMBOL SUBMIT --- */}
          <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row gap-4 items-center">
             {/* Tombol Kembali (Opsional jika ingin dipakai) */}
             <button 
                type="button"
                onClick={onBack} // Panggil fungsi kembali ke Home
                className="hidden md:flex items-center text-gray-500 hover:text-blue-600 font-medium px-4"
             >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali
             </button>

            <button
              type="submit"
              disabled={loading}
              className={`w-full md:flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Memproses Data..." : "Mulai Analisis Risiko"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

// Komponen Kecil untuk Pilihan Ya/Tidak agar kodingan utama rapi
const BooleanSelect = ({ label, desc, value, onClick }) => (
  <div className="p-4 border rounded-xl hover:border-blue-200 transition bg-white">
    <div className="mb-3">
        <h3 className="font-semibold text-gray-800">{label}</h3>
        <p className="text-xs text-gray-500">{desc}</p>
    </div>
    <div className="flex gap-2">
        <button
            type="button"
            onClick={() => onClick('0')}
            className={`flex-1 py-2 text-xs font-bold rounded ${value === '0' ? 'bg-gray-200 text-gray-700' : 'bg-white border text-gray-400'}`}
        >
            Tidak
        </button>
        <button
            type="button"
            onClick={() => onClick('1')}
            className={`flex-1 py-2 text-xs font-bold rounded ${value === '1' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-white border text-gray-400'}`}
        >
            Ya
        </button>
    </div>
  </div>
);

export default PredictionForm;