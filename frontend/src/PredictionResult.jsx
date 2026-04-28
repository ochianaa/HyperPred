import React from 'react';
import { HeartPulse, Download, RefreshCcw, CheckCircle, AlertTriangle, AlertOctagon, Activity, ClipboardCheck, ShieldCheck, Info, ShieldAlert, Cpu} from "lucide-react";

const PredictionResult = ({ data, onReset }) => {
  const resultData = data.data || data; 
  
  const classification = resultData.klasifikasi_jnc || "Unknown";
  const probability = resultData.probabilitas ? resultData.probabilitas.replace('%', '') : "0.00";
  const source = resultData.sumber || "Sistem";
  const input = resultData.input_data || {};

  const getJNCStatus = (label) => {
    const l = label ? label.toLowerCase() : "";
    if (l.includes("normal") || l.includes("tidak terdeteksi")) 
      return { 
        color: "text-emerald-600", 
        bg: "bg-emerald-50", 
        icon: CheckCircle, 
        level: 1, 
        desc: "Your blood pressure is within the normal range. Maintain a healthy lifestyle." 
      };
    if (l.includes("pre")) 
      return { 
        color: "text-yellow-600", 
        bg: "bg-yellow-50", 
        icon: Activity, 
        level: 2, 
        desc: "You are in the Pre-Hypertension category. Start exercise regularly." 
      };
    if (l.includes("stage 1")) 
      return { 
        color: "text-orange-600", 
        bg: "bg-orange-50", 
        icon: AlertTriangle, 
        level: 3, 
        desc: "Hypertension Stage 1 detected. It is recommended to consult with a healthcare professional soon." 
      };
    if (l.includes("stage 2")) 
      return { 
        color: "text-red-600", 
        bg: "bg-red-50", 
        icon: AlertOctagon, 
        level: 4, 
        desc: "Hypertension Stage 2 detected. Immediate medical attention is required to control your blood pressure." 
      };
    return { color: "text-gray-600", bg: "bg-gray-50", icon: Activity, level: 0, desc: "Undefined data." };
  };

  const statusStyle = getJNCStatus(classification);

  const getBMICategoryLabel = (val) => {
    const map = { "0": "Underweight", "1": "Normal", "2": "Overweight", "3": "Obese" };
    const key = String(val);
    return map[key] || "Normal";
  };

  return (
    <div className="min-h-screen bg-white py-4 lg:py-10 px-4 font-sans flex flex-col items-center justify-start">
      <style dangerouslySetInnerHTML={{ __html: `
        @media screen {
          .report-container { width: 100% !important; max-width: 900px !important; margin: 0 auto; }
        }
        @media print {
          body { 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            margin: 0 !important; 
            padding: 0 !important; 
          }
          @page { 
            margin: 0.5cm; 
            size: auto; 
          }
          .no-print { display: none !important; }
          
          .report-container { 
            width: 900px !important; 
            max-width: 900px !important; 
            margin: 0 auto !important; 
            display: block !important; 
            transform: scale(0.85);
            transform-origin: top center;
          }
          
          .avoid-break { 
            page-break-inside: avoid !important; 
            break-inside: avoid !important; 
            margin-bottom: 10px !important; 
          }
        }
      `}} />

      <div className="report-container w-full space-y-4 lg:space-y-6 print-container">
        
        {/* Navbar */}
        <div className="text-center py-4 border-b-4 border-blue-600 flex flex-col md:flex-row justify-between items-center gap-4 avoid-break">
          <div onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-blue-700 cursor-pointer hover:opacity-80 transition-all">
             <HeartPulse className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
             <span className="font-black text-2xl md:text-4xl uppercase tracking-tighter">HyperPred</span>
          </div>
          <span className="text-xs md:text-xl font-bold text-gray-400 uppercase tracking-widest text-center">Medical Assessment Report</span>
        </div>

        {/* Hero Section */}
        <div className={`rounded-2xl lg:rounded-[3rem] border-2 lg:border-4 border-gray-100 overflow-hidden shadow-sm avoid-break ${statusStyle.bg}`}>
          <div className="p-6 lg:p-10 text-center">
            <h2 className="text-gray-500 font-black uppercase tracking-widest text-[10px] md:text-lg mb-4">Based on Integrated Prediction Result</h2>
            
            <div className={`text-4xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-tight ${statusStyle.color}`}>
              {classification}
            </div>

            <div className="flex justify-center gap-3 md:gap-4 mb-8 flex-wrap">
               <div className="flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 bg-white rounded-full border-2 border-gray-100 shadow-md">
                  <ShieldCheck className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                  <span className="text-[10px] md:text-base font-black text-gray-500 uppercase">Probability:</span>
                  <span className="text-sm md:text-4xl font-black text-blue-700">
                    {probability}%
                  </span>
               </div>
               
               <div className="flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 bg-white rounded-full border-2 border-gray-100 shadow-md">
                  <Cpu className={`w-4 h-4 md:w-6 md:h-6 ${source.includes('Pakar') ? 'text-red-600' : 'text-blue-600'}`} />
                  <span className="text-[10px] md:text-base font-black text-gray-500 uppercase">Decision By:</span>
                  <span className={`text-xs md:text-2xl font-black uppercase ${source.includes('Pakar') ? 'text-red-600' : 'text-blue-600'}`}>
                    {source.includes('Pakar') ? 'Expert System' : 'XGBoost AI'}
                  </span>
               </div>
            </div>

            <div className="max-w-xl mx-auto px-4 mb-8 avoid-break">
               <div className="flex gap-2 lg:gap-4 h-3 lg:h-6 mb-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step} 
                      className={`flex-1 rounded-full ${
                        step === statusStyle.level 
                          ? (step === 1 ? 'bg-emerald-500' : 
                             step === 2 ? 'bg-yellow-400' : 
                             step === 3 ? 'bg-orange-500' : 
                             'bg-red-600') 
                          : 'bg-gray-200'
                      }`} 
                    />
                  ))}
               </div>
               <div className="grid grid-cols-4 gap-2 text-center text-[10px] md:text-base font-black text-gray-400 uppercase tracking-tighter">
                  <span className={statusStyle.level === 1 ? statusStyle.color : ""}>Normal</span>
                  <span className={statusStyle.level === 2 ? statusStyle.color : ""}>Pre-Hpt</span>
                  <span className={statusStyle.level === 3 ? statusStyle.color : ""}>Stage 1</span>
                  <span className={statusStyle.level === 4 ? statusStyle.color : ""}>Stage 2</span>
               </div>
            </div>

            <div className="bg-white/80 p-5 lg:p-8 rounded-xl lg:rounded-[2rem] border-2 border-white max-w-4xl mx-auto flex items-start gap-4 lg:gap-6 shadow-md avoid-break border-gray-200">
                <Info className={`w-6 h-6 lg:w-10 lg:h-10 flex-shrink-0 mt-1 ${statusStyle.color}`} />
                <p className="text-sm md:text-2xl font-bold text-gray-700 text-left leading-relaxed">
                    {statusStyle.desc}
                </p>
            </div>
          </div>
        </div>

        {/* Patient Data Summary */}
        <div className="bg-white rounded-2xl lg:rounded-[2.5rem] p-6 lg:p-8 border-2 border-gray-100 shadow-sm avoid-break">
           <h1 className="font-black text-gray-800 text-base md:text-xl flex items-center gap-2 mb-6 lg:mb-8 uppercase tracking-widest border-l-4 md:border-l-8 border-blue-600 pl-4">
             <ClipboardCheck className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" /> Patient Data Summary
           </h1>
           
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <DataBox label="Systolic" value={input.sistole} unit="mmHg" color="text-red-600" />
              <DataBox label="Diastolic" value={input.diastole} unit="mmHg" color="text-red-600" />
              <DataBox label="BMI Score" value={input.imt} unit="kg/m²" color="text-blue-700" />
              <DataBox label="Age" value={input.umur} unit="Years" color="text-gray-700" />
           </div>

           <div className="bg-gray-50 rounded-xl lg:rounded-3xl p-4 lg:p-6 flex flex-col md:flex-row items-center justify-between border-2 border-gray-100 gap-4 avoid-break">
              <span className="text-xs md:text-xl font-black text-gray-400 uppercase tracking-widest">Body Mass Classification:</span>
              <div className="flex items-center justify-center md:justify-end gap-4 lg:gap-8 w-full md:w-auto">
                  <span className="text-lg md:text-4xl font-black text-blue-700 uppercase tracking-tighter">
                    {getBMICategoryLabel(input.imt_category)}
                  </span>
                  <div className="hidden md:block h-10 w-[2px] bg-gray-200"></div>
                  <span className="text-[10px] md:text-sm font-bold text-gray-400 max-w-[150px] leading-tight uppercase text-center md:text-right">Based on WHO Standards</span>
              </div>
           </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 flex items-start md:items-center gap-3 avoid-break">
          <ShieldAlert className="w-5 h-5 lg:w-7 lg:h-7 text-blue-600 flex-shrink-0" />
          <p className="text-[10px] md:text-xl leading-relaxed text-blue-900 font-medium italic">
            Medical Disclaimer: This result is an initial AI-based screening. 
            Consult a physician immediately if high risk is detected or for further medical evaluation.
          </p>
        </div>

        {/* Buttons - Hidden in Print */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center no-print pt-6 pb-4">
          <button onClick={onReset} className="flex items-center justify-center gap-3 px-6 py-3 lg:px-10 lg:py-5 bg-gray-100 text-gray-500 font-black rounded-xl lg:rounded-2xl hover:bg-gray-200 transition-all text-sm lg:text-2xl uppercase shadow-sm">
            <RefreshCcw className="w-5 h-5 lg:w-6 lg:h-6" /> Analyze Again
          </button>
          <button onClick={() => window.print()} className="flex items-center justify-center gap-3 px-6 py-3 lg:px-10 lg:py-5 bg-blue-700 text-white font-black rounded-xl lg:rounded-2xl hover:bg-blue-800 shadow-xl text-sm lg:text-2xl uppercase">
            <Download className="w-5 h-5 lg:w-6 lg:h-6" /> Download PDF
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-[0.2em] pt-2 avoid-break">
            Health Is Wealth, Prevention is Power • (c) 2026 HyperPred. 
        </p>
      </div>
    </div>
  );
};

const DataBox = ({ label, value, unit, color }) => (
  <div className="bg-gray-50 p-4 lg:p-6 rounded-xl lg:rounded-2xl border-2 border-gray-100 flex flex-col items-center justify-center avoid-break">
    <span className="text-[10px] md:text-sm font-black text-gray-400 uppercase mb-1 lg:mb-2 tracking-widest text-center">{label}</span>
    <span className={`text-xl md:text-5xl font-black ${color} flex items-baseline gap-1 tracking-tighter`}>
      {value || '--'} 
      <span className="text-[10px] md:text-sm font-bold text-gray-300 uppercase ml-1">{unit}</span>
    </span>
  </div>
);

export default PredictionResult;