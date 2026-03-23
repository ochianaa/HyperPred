import React from 'react';
import { Download, RefreshCcw, CheckCircle, AlertTriangle, AlertOctagon, Activity, Heart, ClipboardCheck } from "lucide-react";

const PredictionResult = ({ data, onReset }) => {
  // Fungsi untuk menentukan gaya visual berdasarkan teks prediksi AI (English)
  const getJNCStatus = (label) => {
    // Ubah ke huruf kecil semua agar pengecekan lebih fleksibel terhadap output model
    const l = label ? label.toLowerCase() : "";
    
    // Logika pengecekan status berdasarkan standar JNC 7
    if (l.includes("normal")) 
      return { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-500", icon: CheckCircle, level: 1 };
    if (l.includes("pre")) 
      return { color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-500", icon: Activity, level: 2 };
    if (l.includes("stage 1")) 
      return { color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-500", icon: AlertTriangle, level: 3 };
    if (l.includes("stage 2")) 
      return { color: "text-red-600", bg: "bg-red-50", border: "border-red-600", icon: AlertOctagon, level: 4 };
    
    // Status Default (Unknown)
    return { color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200", icon: Activity, level: 0 };
  };

  const statusStyle = getJNCStatus(data.prediksi_xgboost);
  const StatusIcon = statusStyle.icon;

  // Mapping Kategori IMT untuk tampilan yang lebih mudah dibaca
  const getBMICategoryLabel = (val) => {
    const map = { "0": "Underweight", "1": "Normal", "2": "Overweight", "3": "Obese" };
    return map[val] || "Unknown";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans flex flex-col items-center">
      {/* --- CSS KHUSUS UNTUK CETAK PDF SATU HALAMAN --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
          }
          /* Hilangkan tombol navigasi saat cetak */
          .no-print {
            display: none !important;
          }
          /* Maksa konten agar muat di satu halaman */
          .min-h-screen {
            min-height: auto !important;
            padding: 0 !important;
            background: white !important;
          }
          .max-w-4xl {
            max-width: 100% !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            transform: scale(0.98);
            transform-origin: top center;
          }
          /* Hilangkan padding berlebih pada card saat cetak */
          .shadow-2xl {
            box-shadow: none !important;
            border: 1px solid #f3f4f6 !important;
          }
        }
      `}} />

      <div className="max-w-4xl w-full space-y-8">
        
        {/* --- Header Laporan --- */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-1 text-blue-700">
             <Heart className="w-8 h-8 fill-current" />
             <span className="font-black text-2xl tracking-tighter uppercase">HyperPred Analysis</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Examination Report</h1>
          <p className="text-gray-500 text-sm font-medium max-w-lg mx-auto leading-relaxed">
            Risk analysis results from the application of the XGBoost-PSO algorithm integrated with JNC clinical standards.
          </p>
        </div>

        {/* --- Card Utama Hasil Prediksi --- */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Bagian Atas: Status Diagnosis */}
          <div className={`p-12 text-center ${statusStyle.bg} border-b border-gray-100 relative`}>
            <div className={`inline-flex p-6 rounded-[2rem] mb-6 bg-white shadow-xl ${statusStyle.color}`}>
               <StatusIcon className="w-16 h-16" />
            </div>
            <h2 className="text-gray-400 font-bold uppercase tracking-[0.3em] text-xs mb-3">System Diagnosis Result</h2>
            <div className={`text-5xl md:text-6xl font-black mb-10 tracking-tighter ${statusStyle.color}`}>
              {data.prediksi_xgboost || "Unknown"}
            </div>

            {/* Visualisasi Progress Bar Tingkat Risiko */}
            <div className="max-w-md mx-auto relative px-4">
               <div className="flex gap-3 h-4 mb-5">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step} 
                      className={`flex-1 rounded-full transition-all duration-1000 shadow-sm ${
                        step <= statusStyle.level 
                        ? (step === 1 ? 'bg-emerald-500' : step === 2 ? 'bg-yellow-400' : step === 3 ? 'bg-orange-500' : 'bg-red-600') 
                        : 'bg-gray-200'
                      }`} 
                    />
                  ))}
               </div>
               <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">
                  <span className={statusStyle.level === 1 ? "text-emerald-600" : ""}>Normal</span>
                  <span className={statusStyle.level === 2 ? "text-yellow-600" : ""}>Pre-Hpt</span>
                  <span className={statusStyle.level === 3 ? "text-orange-600" : ""}>Stage 1</span>
                  <span className={statusStyle.level === 4 ? "text-red-600" : ""}>Stage 2</span>
               </div>
            </div>
          </div>

          {/* Bagian Tengah: Ringkasan Klinis */}
          <div className="p-10 md:p-14 border-b border-gray-100">
            <div className="space-y-8">
               <h3 className="font-black text-gray-800 text-xl flex items-center gap-3 border-l-4 border-blue-600 pl-4 uppercase tracking-tight">
                 <ClipboardCheck className="w-6 h-6 text-blue-600" /> Clinical Summary
               </h3>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <DataBox label="Systolic" value={data.input_data?.sistole} unit="mmHg" color="text-red-600" />
                  <DataBox label="Diastolic" value={data.input_data?.diastole} unit="mmHg" color="text-red-600" />
                  <DataBox label="BMI Value" value={data.input_data?.imt} unit="kg/m²" color="text-blue-700" />
                  <DataBox label="Age" value={data.input_data?.umur} unit="Yrs" color="text-gray-700" />
               </div>

               {/* Menampilkan BMI Category yang dikirim dari form */}
               <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100 flex items-center justify-between">
                  <span className="text-xs font-black text-blue-800 uppercase tracking-widest">BMI Classification:</span>
                  <span className="text-lg font-black text-blue-700">{getBMICategoryLabel(data.input_data?.imt_category)}</span>
               </div>
            </div>
          </div>
          
          {/* --- Bagian Verifikasi Sistem (Hybrid) --- */}
          <div className="px-10 py-8 bg-gray-50/50">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col md:flex-row md:items-center justify-between text-xs md:text-sm gap-4 shadow-sm">
              <div className="text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                System Verification:
              </div>
              <div className="flex gap-8">
                <span className="text-gray-500 font-bold uppercase">Expert (JNC): <strong className="text-blue-700 ml-1">{data.prediksi_pakar || "--"}</strong></span>
                <span className="text-gray-500 font-bold uppercase">AI (XGBoost): <strong className="text-blue-700 ml-1">{data.prediksi_xgboost || "--"}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Tombol Aksi (no-print) --- */}
        <div className="flex flex-col md:flex-row gap-5 justify-center pt-4 no-print">
          <button 
            onClick={onReset}
            className="group flex items-center justify-center gap-3 px-12 py-5 bg-white border-2 border-gray-200 text-gray-600 font-black rounded-[2rem] hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm active:scale-95"
          >
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" /> ANALYZE AGAIN
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center justify-center gap-3 px-12 py-5 bg-blue-700 text-white font-black rounded-[2rem] hover:bg-blue-800 transition-all shadow-xl shadow-blue-200 active:scale-95"
          >
            <Download className="w-5 h-5" /> SAVE REPORT
          </button>
        </div>

        {/* --- Footer Disclaimer --- */}
        <div className="text-center space-y-2 pb-10">
          <p className="text-gray-400 text-[10px] leading-relaxed max-w-2xl mx-auto italic font-medium">
            Disclaimer: This system was developed by Ochiana (2026) as an undergraduate thesis prototype. It serves as an early risk analysis support tool based on the PSO-optimized XGBoost algorithm and is NOT a replacement for a professional medical diagnosis.
          </p>
          <div className="text-[9px] font-black text-blue-200 uppercase tracking-[0.4em]">
            XGBoost-PSO Algorithm Integration • JNC 7 Standards
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen Helper DataBox
const DataBox = ({ label, value, unit, color }) => (
  <div className="bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center transition-hover hover:shadow-md">
    <div className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">{label}</div>
    <div className={`text-2xl font-black ${color} flex items-baseline gap-1 tracking-tight`}>
      {value || '--'} 
      <span className="text-[10px] font-bold text-gray-300 uppercase">{unit}</span>
    </div>
  </div>
);

export default PredictionResult;