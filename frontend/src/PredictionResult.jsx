import React from 'react';
import { Download, RefreshCcw, CheckCircle, AlertTriangle, AlertOctagon, Activity, Heart } from "lucide-react";

const PredictionResult = ({ data, onReset }) => {
  const getJNCStatus = (label) => {
    const l = label ? label.toLowerCase() : "";
    if (l.includes("normal")) 
      return { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-500", icon: CheckCircle, level: 1 };
    if (l.includes("pre")) 
      return { color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-500", icon: Activity, level: 2 };
    if (l.includes("tingkat 1") || l.includes("stage 1")) 
      return { color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-500", icon: AlertTriangle, level: 3 };
    if (l.includes("tingkat 2") || l.includes("stage 2")) 
      return { color: "text-red-600", bg: "bg-red-50", border: "border-red-600", icon: AlertOctagon, level: 4 };
    return { color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200", icon: Activity, level: 0 };
  };

  const statusStyle = getJNCStatus(data.prediksi_xgboost);
  const StatusIcon = statusStyle.icon;

  // Dictionary for translating results from Backend
  const displayLabels = {
    "Normal": "Normal",
    "Pre-Hipertensi": "Pre-Hypertension",
    "Hipertensi Tingkat 1": "Hypertension Stage 1",
    "Hipertensi Tingkat 2": "Hypertension Stage 2"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-8">
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3 text-blue-700">
             <Heart className="w-8 h-8 fill-current" />
             <span className="font-black text-2xl tracking-tighter uppercase">HyperPred Analysis</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Examination Report</h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            Risk analysis based on clinical data and JNC 7 medical standards.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className={`p-10 text-center ${statusStyle.bg} border-b border-gray-100`}>
            <div className={`inline-flex p-5 rounded-3xl mb-6 bg-white shadow-sm ${statusStyle.color}`}>
               <StatusIcon className="w-14 h-14" />
            </div>
            <h2 className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mb-3">System Diagnosis Result</h2>
            <div className={`text-4xl md:text-5xl font-black mb-8 tracking-tight ${statusStyle.color}`}>
              {displayLabels[data.prediksi_xgboost] || data.prediksi_xgboost}
            </div>

            <div className="max-w-md mx-auto">
               <div className="flex gap-2 h-3 mb-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step} 
                      className={`flex-1 rounded-full transition-all duration-1000 ${
                        step <= statusStyle.level 
                        ? (step === 1 ? 'bg-emerald-500' : step === 2 ? 'bg-yellow-400' : step === 3 ? 'bg-orange-500' : 'bg-red-600') 
                        : 'bg-gray-200'
                      }`} 
                    />
                  ))}
               </div>
               <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <span className={statusStyle.level === 1 ? "text-emerald-600" : ""}>Normal</span>
                  <span className={statusStyle.level === 2 ? "text-yellow-600" : ""}>Pre-Hpt</span>
                  <span className={statusStyle.level === 3 ? "text-orange-600" : ""}>Stage 1</span>
                  <span className={statusStyle.level === 4 ? "text-red-600" : ""}>Stage 2</span>
               </div>
            </div>
          </div>

          <div className="p-8 md:p-12 grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
               <h3 className="font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                 <Activity className="w-5 h-5 text-blue-600" /> Clinical Summary
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  <DataBox label="Systolic" value={data.input_data?.sistole} unit="mmHg" />
                  <DataBox label="Diastolic" value={data.input_data?.diastole} unit="mmHg" />
                  <DataBox label="BMI" value={data.input_data?.imt} unit="kg/m²" />
                  <DataBox label="Age" value={data.input_data?.umur} unit="Years" />
               </div>
            </div>

            <div className="space-y-6">
               <h3 className="font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                 <Stethoscope className="w-5 h-5 text-blue-600" /> Medical Recommendations
               </h3>
               <ul className="space-y-3">
                  <AdviceItem text="Healthy lifestyle modification (DASH Diet)." />
                  <AdviceItem text="Perform physical activity at least 30 minutes/day." />
                  {statusStyle.level >= 2 && <AdviceItem text="Monitor blood pressure regularly." color="text-amber-700" />}
                  {statusStyle.level >= 3 && <AdviceItem text="Immediately contact a medical professional." color="text-red-700" />}
               </ul>
            </div>
          </div>
          
          <div className="px-8 pb-8">
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center justify-between text-xs md:text-sm">
              <div className="text-blue-800 font-bold uppercase tracking-tight">System Verification:</div>
              <div className="flex gap-4">
                <span className="text-gray-500">Expert (JNC): <strong className="text-blue-700">{displayLabels[data.prediksi_pakar] || data.prediksi_pakar}</strong></span>
                <span className="text-gray-500">AI (XGBoost): <strong className="text-blue-700">{displayLabels[data.prediksi_xgboost] || data.prediksi_xgboost}</strong></span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button 
            onClick={onReset}
            className="flex items-center justify-center gap-2 px-10 py-4 bg-white border-2 border-gray-200 text-gray-600 font-bold rounded-2xl hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm"
          >
            <RefreshCcw className="w-5 h-5" /> Analyze Again
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-10 py-4 bg-blue-700 text-white font-bold rounded-2xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-200"
          >
            <Download className="w-5 h-5" /> Save Report
          </button>
        </div>

        <p className="text-center text-gray-400 text-[10px] leading-relaxed max-w-lg mx-auto italic">
          Disclaimer: This system was developed by Ochiana (2026) as an early risk analysis tool and is not a replacement for a doctor's medical diagnosis. Always consult results with professional medical personnel.
        </p>
      </div>
    </div>
  );
};

const DataBox = ({ label, value, unit }) => (
  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
    <div className="text-[10px] font-bold text-gray-400 uppercase">{label}</div>
    <div className="text-lg font-black text-gray-700">{value || '--'} <span className="text-[10px] font-medium text-gray-400">{unit}</span></div>
  </div>
);

const AdviceItem = ({ text, color = "text-gray-600" }) => (
  <li className={`flex items-start gap-2 text-xs font-semibold ${color}`}>
    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
    {text}
  </li>
);

export default PredictionResult;