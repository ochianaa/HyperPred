import React, { useState, useEffect } from 'react';
import { HeartPulse, Activity, ArrowLeft, ShieldCheck } from "lucide-react";

const PredictionForm = ({ onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    jenis_kelamin: '0', 
    umur: '',
    merokok: '0',
    tinggi: '',
    berat: '',
    sistole: '',
    diastole: '',
    imt_category: '' 
  });

  const [loading, setLoading] = useState(false);

  const calculateIMTValue = () => {
    if (formData.tinggi && formData.berat) {
      const tinggiMeter = formData.tinggi / 100;
      return (formData.berat / (tinggiMeter * tinggiMeter)).toFixed(2);
    }
    return "0.00";
  };

  useEffect(() => {
    const imt = parseFloat(calculateIMTValue());
    if (imt > 0) {
      let category = '';
      if (imt < 18.5) category = '0';      
      else if (imt < 25) category = '1';   
      else if (imt < 30) category = '2';   
      else category = '3';                
      
      setFormData(prev => ({ ...prev, imt_category: category }));
    }
  }, [formData.tinggi, formData.berat]);

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
      const response = await fetch('http://127.0.0.1:5000/predict', {
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
    <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl lg:rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 font-sans my-4 lg:my-10 transition-all duration-300">
      
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-br from-blue-700 to-indigo-700 p-6 lg:p-10 text-white">
        <h1 className="text-2xl lg:text-5xl font-black mb-2 flex items-center gap-3 lg:gap-6 uppercase tracking-tight">
          <HeartPulse className="w-8 h-8 lg:w-14 lg:h-14" /> Clinical Data
        </h1>
        <p className="text-sm lg:text-xl text-blue-100 opacity-90 leading-relaxed font-medium uppercase tracking-wider">
          Input clinical parameters for hybrid risk assessment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 lg:p-12 space-y-8 lg:space-y-10">
        
        {/* ROW 1: TOGGLES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          <ToggleButton label="Gender" name="jenis_kelamin" value={formData.jenis_kelamin} options={[{val:'0', label:'Male'}, {val:'1', label:'Female'}]} onSelect={handleSelect} />
          <ToggleButton label="Smoking" name="merokok" value={formData.merokok} options={[{val:'0', label:'No'}, {val:'1', label:'Yes'}]} onSelect={handleSelect} />
        </div>

        {/* ROW 2: NUMERIC INPUTS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
          <InputGroup label="Age (Years)" name="umur" value={formData.umur} onChange={handleChange} placeholder="45" />
          <InputGroup label="Height (CM)" name="tinggi" value={formData.tinggi} onChange={handleChange} placeholder="170" />
          <InputGroup label="Weight (KG)" name="berat" value={formData.berat} onChange={handleChange} placeholder="70" />
        </div>

        {/* ROW 3: BMI STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          <div className="bg-blue-50 p-6 lg:p-8 rounded-2xl lg:rounded-[2.5rem] border border-blue-100 flex items-center gap-4 lg:gap-8 shadow-sm">
            <div className="bg-white p-3 lg:p-5 rounded-xl lg:rounded-3xl shadow-sm shrink-0">
              <Activity className="text-blue-600 w-8 h-8 lg:w-12 lg:h-12" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs lg:text-sm font-black text-blue-400 uppercase tracking-widest">BMI Score</span>
              <span className="text-2xl lg:text-5xl font-black text-blue-700 leading-none">{calculateIMTValue()}</span>
            </div>
          </div>

          <div className="bg-emerald-50 p-6 lg:p-8 rounded-2xl lg:rounded-[2.5rem] border border-emerald-100 flex items-center gap-4 lg:gap-8 shadow-sm">
            <div className="bg-white p-3 lg:p-5 rounded-xl lg:rounded-3xl shadow-sm shrink-0">
              <ShieldCheck className="text-emerald-600 w-8 h-8 lg:w-12 lg:h-12" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs lg:text-sm font-black text-emerald-400 uppercase tracking-widest">Category</span>
              <span className="text-lg lg:text-3xl font-black text-emerald-700 uppercase tracking-tight leading-tight">
                {getCategoryName(formData.imt_category)}
              </span>
            </div>
          </div>
        </div>

        {/* ROW 4: BLOOD PRESSURE */}
        <div className="pt-8 lg:pt-10 border-t-2 border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            <div className="space-y-4">
              <label className="text-xs lg:text-sm font-black text-red-500 uppercase tracking-[0.2em] px-2 block">Systolic (mmHg)</label>
              <input required type="number" name="sistole" value={formData.sistole} onChange={handleChange} className="w-full p-5 lg:p-8 bg-red-50/30 border-2 border-red-100 rounded-xl lg:rounded-3xl focus:border-red-500 outline-none text-3xl lg:text-6xl font-black text-red-700 transition-all placeholder:text-red-200" placeholder="120" />
            </div>
            <div className="space-y-4">
              <label className="text-xs lg:text-sm font-black text-red-500 uppercase tracking-[0.2em] px-2 block">Diastolic (mmHg)</label>
              <input required type="number" name="diastole" value={formData.diastole} onChange={handleChange} className="w-full p-5 lg:p-8 bg-red-50/30 border-2 border-red-100 rounded-xl lg:rounded-3xl focus:border-red-500 outline-none text-3xl lg:text-6xl font-black text-red-700 transition-all placeholder:text-red-200" placeholder="80" />
            </div>
          </div>
        </div>

        {/* ROW 5: BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 lg:gap-8 pt-4">
          <button type="button" onClick={onBack} className="order-2 md:order-1 flex-1 py-4 lg:py-6 bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-blue-600 text-lg lg:text-2xl font-black rounded-xl lg:rounded-[2rem] transition-all flex items-center justify-center gap-3 uppercase shadow-sm">
            <ArrowLeft className="w-6 h-6" /> Back to Home
          </button>
          <button type="submit" disabled={loading} className="order-1 md:order-2 flex-[2] py-4 lg:py-8 bg-blue-600 text-white text-xl lg:text-4xl font-black rounded-xl lg:rounded-[2rem] shadow-xl hover:bg-blue-700 transition transform hover:-translate-y-1 active:scale-95">
            {loading ? "Analyzing..." : "Predict Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

const ToggleButton = ({ label, name, value, options, onSelect }) => (
  <div className="space-y-3">
    <label className="block text-xs lg:text-sm font-black text-gray-400 uppercase tracking-widest px-2">{label}</label>
    <div className="flex gap-4 lg:gap-6">
      {options.map((opt) => (
        <button key={opt.val} type="button" onClick={() => onSelect(name, opt.val)} className={`flex-1 py-3 lg:py-5 rounded-xl lg:rounded-3xl border-2 text-lg lg:text-2xl font-black transition-all ${value === opt.val ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "bg-gray-50 border-gray-200 text-gray-400 hover:border-blue-200"}`}>{opt.label.toUpperCase()}</button>
      ))}
    </div>
  </div>
);

const InputGroup = ({ label, name, value, onChange, placeholder }) => (
  <div className="space-y-3">
    <label className="text-xs lg:text-sm font-black text-gray-400 uppercase tracking-widest px-2 block">{label}</label>
    <input required type="number" name={name} value={value} onChange={onChange} className="w-full p-4 lg:p-6 bg-gray-50 border-2 border-gray-100 rounded-xl lg:rounded-3xl focus:border-blue-500 outline-none text-xl lg:text-3xl font-black text-gray-700 transition-all placeholder:text-gray-200" placeholder={placeholder} />
  </div>
);

export default PredictionForm;