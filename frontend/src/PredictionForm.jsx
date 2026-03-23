import React, { useState, useEffect } from 'react';
import { HeartPulse, Activity, ArrowLeft, Thermometer, ShieldCheck } from "lucide-react";

const PredictionForm = ({ onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    jenis_kelamin: '0', 
    umur: '',
    merokok: '0',
    tinggi: '',
    berat: '',
    sistole: '',
    diastole: '',
    imt_category: '' // Akan terisi otomatis
  });

  const [loading, setLoading] = useState(false);

  // Fungsi hitung IMT angka
  const calculateIMTValue = () => {
    if (formData.tinggi && formData.berat) {
      const tinggiMeter = formData.tinggi / 100;
      return (formData.berat / (tinggiMeter * tinggiMeter)).toFixed(2);
    }
    return "0.00";
  };

  // LOGIKA OTOMATISASI: Menentukan kategori berdasarkan angka IMT
  useEffect(() => {
    const imt = parseFloat(calculateIMTValue());
    if (imt > 0) {
      let category = '';
      if (imt < 18.5) category = '0';      // Underweight
      else if (imt < 25) category = '1';   // Normal
      else if (imt < 30) category = '2';   // Overweight
      else category = '3';                // Obese
      
      setFormData(prev => ({ ...prev, imt_category: category }));
    }
  }, [formData.tinggi, formData.berat]); // Berjalan setiap kali tinggi/berat berubah

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const getCategoryName = (val) => {
    const names = { '0': 'Underweight', '1': 'Normal Weight', '2': 'Overweight', '3': 'Obese' };
    return names[val] || 'Waiting for data...';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      imt: calculateIMTValue()
    };

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.status === "success") onSuccess(result);
      else alert("Error: " + result.message);
    } catch (error) {
      alert("Backend not running. Please start app.py");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 font-sans">
      <div className="bg-gradient-to-br from-blue-700 to-indigo-700 p-10 text-white">
        <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
          <HeartPulse className="w-10 h-10" /> CLINICAL DATA
        </h1>
        <p className="text-blue-100 opacity-80">Automated risk analysis with XGBoost-PSO algorithm.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ToggleButton label="Gender" name="jenis_kelamin" value={formData.jenis_kelamin} options={[{val:'0', label:'Male'}, {val:'1', label:'Female'}]} onSelect={handleSelect} />
          <ToggleButton label="Smoking" name="merokok" value={formData.merokok} options={[{val:'0', label:'No'}, {val:'1', label:'Yes'}]} onSelect={handleSelect} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InputGroup label="Age" name="umur" value={formData.umur} onChange={handleChange} placeholder="45" />
          <InputGroup label="Height (cm)" name="tinggi" value={formData.tinggi} onChange={handleChange} placeholder="170" />
          <InputGroup label="Weight (kg)" name="berat" value={formData.berat} onChange={handleChange} placeholder="70" />
        </div>

        {/* BAGIAN OTOMATIS: BMI & Category ditampilkan sebagai read-only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="text-blue-600 w-6 h-6" />
              <span className="text-sm font-black text-blue-900 uppercase">BMI Score</span>
            </div>
            <span className="text-3xl font-black text-blue-700">{calculateIMTValue()}</span>
          </div>

          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-emerald-600 w-6 h-6" />
              <span className="text-sm font-black text-emerald-900 uppercase">Category</span>
            </div>
            <span className="text-xl font-black text-emerald-700 uppercase tracking-tight">
              {getCategoryName(formData.imt_category)}
            </span>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-xs font-black text-red-500 uppercase tracking-widest px-1">Systolic (mmHg)</label>
            <input required type="number" name="sistole" value={formData.sistole} onChange={handleChange} className="w-full p-5 bg-red-50/30 border-2 border-red-100 rounded-2xl focus:border-red-500 outline-none text-2xl font-black text-red-700" placeholder="120" />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black text-red-500 uppercase tracking-widest px-1">Diastolic (mmHg)</label>
            <input required type="number" name="diastole" value={formData.diastole} onChange={handleChange} className="w-full p-5 bg-red-50/30 border-2 border-red-100 rounded-2xl focus:border-red-500 outline-none text-2xl font-black text-red-700" placeholder="80" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <button type="button" onClick={onBack} className="flex-1 py-5 text-lg font-bold text-gray-400 hover:text-blue-600 transition flex items-center justify-center gap-2">
            <ArrowLeft /> BACK
          </button>
          <button type="submit" disabled={loading} className="flex-[2] py-5 bg-blue-600 text-white text-xl font-black rounded-3xl shadow-xl hover:bg-blue-700 transition transform hover:-translate-y-1">
            {loading ? "ANALYZING..." : "PREDICT NOW"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Helper Components tetap sama
const ToggleButton = ({ label, name, value, options, onSelect }) => (
  <div className="space-y-3">
    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest px-1">{label}</label>
    <div className="flex gap-3">
      {options.map((opt) => (
        <button key={opt.val} type="button" onClick={() => onSelect(name, opt.val)} className={`flex-1 py-4 rounded-2xl border-2 text-lg font-bold transition-all ${value === opt.val ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "bg-gray-50 border-gray-200 text-gray-400 hover:border-blue-200"}`}>{opt.label}</button>
      ))}
    </div>
  </div>
);

const InputGroup = ({ label, name, value, onChange, placeholder }) => (
  <div className="space-y-3">
    <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">{label}</label>
    <input required type="number" name={name} value={value} onChange={onChange} className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-500 outline-none text-xl font-bold text-gray-700" placeholder={placeholder} />
  </div>
);

export default PredictionForm;