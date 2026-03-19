import React, { useRef } from 'react';
import { Download, RefreshCcw, CheckCircle, AlertTriangle, AlertOctagon, Activity } from "lucide-react";

const PredictionResult = ({ data, onReset }) => {
  // Mapping Warna & Icon berdasarkan hasil prediksi string
  const getResultStatus = (label) => {
    const l = label ? label.toLowerCase() : "";
    if (l.includes("normal")) return { color: "text-green-600", bg: "bg-green-100", border: "border-green-500", icon: CheckCircle, level: 1 };
    if (l.includes("pre")) return { color: "text-yellow-600", bg: "bg-yellow-100", border: "border-yellow-500", icon: Activity, level: 2 };
    if (l.includes("tingkat 1")) return { color: "text-orange-600", bg: "bg-orange-100", border: "border-orange-500", icon: AlertTriangle, level: 3 };
    if (l.includes("tingkat 2")) return { color: "text-red-600", bg: "bg-red-100", border: "border-red-600", icon: AlertOctagon, level: 4 };
    return { color: "text-gray-600", bg: "bg-gray-100", border: "border-gray-500", icon: Activity, level: 0 };
  };

  // Ambil style berdasarkan hasil XGBoost (atau bisa diganti Expert System jika mau prioritas itu)
  const statusStyle = getResultStatus(data.prediksi_xgboost);
  const StatusIcon = statusStyle.icon;

  // Cek apakah hasil konsisten antara AI dan Pakar
  const isConsistent = data.prediksi_xgboost === data.prediksi_pakar;

  // Fungsi Cetak
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans flex items-center justify-center">
      <div className="max-w-3xl w-full">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2 text-blue-700">
             <Activity className="w-6 h-6" />
             <span className="font-bold text-lg tracking-tight">HyperPred Result</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Hasil Prediksi Risiko Hipertensi Anda</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Berdasarkan data kesehatan yang Anda masukkan, berikut adalah analisis risiko dini.
          </p>
        </div>

        {/* --- MAIN CARD --- */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative">
          
          {/* Header Card */}
          <div className="bg-blue-50/50 p-6 border-b border-blue-100 text-center">
             <h2 className="text-gray-700 font-semibold flex items-center justify-center gap-2">
               <Activity className="w-5 h-5 text-blue-600" />
               Status Risiko Hipertensi
             </h2>
          </div>

          <div className="p-8 text-center">
            
            {/* HASIL BESAR */}
            <div className={`text-4xl md:text-5xl font-extrabold mb-2 ${statusStyle.color}`}>
              {data.prediksi_xgboost}
            </div>
            <p className="text-gray-400 text-sm mb-8 uppercase tracking-widest font-semibold">
              Kategori Klasifikasi
            </p>

            {/* --- VISUAL METER BAR (Sesuai Gambar Referensi) --- */}
            <div className="max-w-lg mx-auto mb-8">
               {/* Bar Container */}
               <div className="h-4 w-full rounded-full bg-gray-200 flex overflow-hidden relative">
                  {/* Segment 1: Normal */}
                  <div className={`flex-1 h-full ${statusStyle.level >= 1 ? 'bg-green-500' : 'bg-gray-300'} opacity-80`}></div>
                  {/* Segment 2: Pre */}
                  <div className={`flex-1 h-full ${statusStyle.level >= 2 ? 'bg-yellow-400' : 'bg-gray-300'} opacity-80`}></div>
                  {/* Segment 3: Stage 1 */}
                  <div className={`flex-1 h-full ${statusStyle.level >= 3 ? 'bg-orange-500' : 'bg-gray-300'} opacity-80`}></div>
                  {/* Segment 4: Stage 2 */}
                  <div className={`flex-1 h-full ${statusStyle.level >= 4 ? 'bg-red-600' : 'bg-gray-300'} opacity-80`}></div>
               </div>
               
               {/* Label di Bawah Bar */}
               <div className="flex justify-between text-[10px] md:text-xs font-bold text-gray-400 mt-2">
                  <span className={statusStyle.level === 1 ? "text-green-600" : ""}>Normal</span>
                  <span className={statusStyle.level === 2 ? "text-yellow-600" : ""}>Pre-Hipertensi</span>
                  <span className={statusStyle.level === 3 ? "text-orange-600" : ""}>Tingkat 1</span>
                  <span className={statusStyle.level === 4 ? "text-red-600" : ""}>Tingkat 2</span>
               </div>
            </div>

            {/* --- PENJELASAN TEXT --- */}
            <div className="bg-gray-50 rounded-xl p-6 text-left max-w-2xl mx-auto border border-gray-100">
               <p className="text-gray-700 leading-relaxed mb-4">
                 Berdasarkan standar <strong>Joint National Committee (JNC 7)</strong> dan analisis model AI, 
                 kategori tekanan darah Anda tergolong <strong>{data.prediksi_xgboost}</strong>.
               </p>

               {/* REKOMENDASI DINAMIS */}
               <div className="text-sm text-gray-600 space-y-2">
                 <strong>Saran Tindakan:</strong>
                 <ul className="list-disc pl-5 space-y-1">
                    {statusStyle.level === 1 && <li>Pertahankan gaya hidup sehat Anda. Cek rutin 1 tahun sekali.</li>}
                    {statusStyle.level === 2 && <li>Mulai kurangi garam, rutin berolahraga, dan pantau tekanan darah setiap bulan.</li>}
                    {statusStyle.level >= 3 && (
                        <>
                            <li>Segera konsultasikan dengan dokter untuk pemeriksaan lebih lanjut.</li>
                            <li>Perbaiki pola makan (Diet DASH) dan hindari stres berlebih.</li>
                        </>
                    )}
                 </ul>
               </div>
            </div>

            {/* --- DETAIL TEKNIS (PENTING BUAT SKRIPSI) --- */}
            {/* Bagian ini menunjukkan "Integrasi" yang ada di judul skripsi */}
            <div className={`mt-6 p-3 rounded-lg text-xs md:text-sm inline-block border ${isConsistent ? "bg-blue-50 border-blue-200 text-blue-800" : "bg-orange-50 border-orange-200 text-orange-800"}`}>
               <span className="font-bold block mb-1">🔍 Detail Analisis Sistem:</span>
               <div className="flex gap-4 justify-center">
                  <span>Pakar (JNC): <strong>{data.prediksi_pakar}</strong></span>
                  <span>•</span>
                  <span>AI (XGBoost): <strong>{data.prediksi_xgboost}</strong></span>
               </div>
               {!isConsistent && <span className="block mt-1 font-bold">(Terdapat perbedaan hasil, disarankan merujuk hasil Pakar/JNC)</span>}
            </div>

          </div>
        </div>

        {/* --- FOOTER BUTTONS --- */}
        <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center">
          <button 
            onClick={onReset}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition shadow-sm"
          >
            <RefreshCcw className="w-5 h-5" />
            Kembali Isi Data
          </button>

          <button 
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-1 transition shadow-md"
          >
            <Download className="w-5 h-5" />
            Unduh Laporan PDF
          </button>
        </div>

        <p className="text-center text-gray-400 text-xs mt-8 max-w-lg mx-auto">
          Ingat! Prediksi ini adalah alat bantu komputasi skripsi dan tidak menggantikan diagnosa medis profesional. 
          Selalu konsultasikan hasilnya dengan dokter Anda.
        </p>

      </div>
    </div>
  );
};

export default PredictionResult;