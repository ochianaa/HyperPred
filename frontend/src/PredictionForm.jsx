import React, { useState } from 'react';
import { User, HeartPulse, Activity, ArrowLeft } from "lucide-react";

const PredictionForm = ({ onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    jenis_kelamin: '0', // 0: Male, 1: Female
    umur: '',
    merokok: '0',       // 0: No, 1: Yes
    tinggi: '',
    berat: '',
    sistole: '',
    diastole: ''
  });

  const [loading, setLoading] = useState(false);

  const calculateIMT = () => {
    if (formData.tinggi && formData.berat) {
      const tinggiMeter = formData.tinggi / 100;
      return (formData.berat / (tinggiMeter * tinggiMeter)).toFixed(2);
    }
    return "0.00";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      imt: calculateIMT()
    };

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.status === "success") {
        onSuccess(result);
      } else {
        alert("An error occurred: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to backend server. Make sure app.py is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-10 text-white">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <HeartPulse className="w-8 h-8" /> Clinical Form
        </h1>
        <p className="text-blue-100 text-lg">Enter your health data for risk analysis.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-10 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-lg font-bold text-gray-700 uppercase tracking-wide">Gender</label>
            <div className="flex gap-3">
              {['0', '1'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleSelect('jenis_kelamin', val)}
                  className={`flex-1 py-4 rounded-2xl border-2 text-lg font-bold transition-all ${
                    formData.jenis_kelamin === val ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "bg-gray-50 border-gray-200 text-gray-400 hover:border-blue-200"
                  }`}
                >
                  {val === '0' ? 'Male' : 'Female'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-lg font-bold text-gray-700 uppercase tracking-wide">Smoking Status</label>
            <div className="flex gap-3">
              {['0', '1'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleSelect('merokok', val)}
                  className={`flex-1 py-4 rounded-2xl border-2 text-lg font-bold transition-all ${
                    formData.merokok === val ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "bg-gray-50 border-gray-200 text-gray-400 hover:border-blue-200"
                  }`}
                >
                  {val === '0' ? 'No' : 'Yes'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InputGroup label="Age (Yrs)" name="umur" value={formData.umur} onChange={handleChange} placeholder="45" />
          <InputGroup label="Height (cm)" name="tinggi" value={formData.tinggi} onChange={handleChange} placeholder="170" />
          <InputGroup label="Weight (kg)" name="berat" value={formData.berat} onChange={handleChange} placeholder="70" />
        </div>

        <div className="bg-blue-50 p-6 rounded-2xl flex items-center justify-between border border-blue-100 shadow-inner">
          <div className="flex items-center gap-4">
            <Activity className="text-blue-600 w-7 h-7" />
            <span className="text-lg font-bold text-blue-800">BMI Result</span>
          </div>
          <span className="text-4xl font-black text-blue-700">{calculateIMT()}</span>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-black text-red-500 uppercase tracking-widest px-1">Systolic (mmHg)</label>
              <input required type="number" name="sistole" value={formData.sistole} onChange={handleChange} 
                className="w-full p-5 bg-red-50/30 border-2 border-red-100 rounded-2xl focus:border-red-500 outline-none text-2xl font-black text-red-700 placeholder:text-red-200" placeholder="120" />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-black text-red-500 uppercase tracking-widest px-1">Diastolic (mmHg)</label>
              <input required type="number" name="diastole" value={formData.diastole} onChange={handleChange} 
                className="w-full p-5 bg-red-50/30 border-2 border-red-100 rounded-2xl focus:border-red-500 outline-none text-2xl font-black text-red-700 placeholder:text-red-200" placeholder="80" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 pt-6">
          <button type="button" onClick={onBack} className="flex-1 py-5 text-xl font-bold text-gray-400 flex items-center justify-center gap-3 hover:text-blue-600 transition">
            <ArrowLeft className="w-6 h-6" /> Back
          </button>
          <button type="submit" disabled={loading} className="flex-[2] py-5 bg-blue-600 text-white text-xl font-black rounded-[1.5rem] shadow-xl hover:bg-blue-700 transition-all transform hover:-translate-y-1">
            {loading ? "ANALYZING..." : "PREDICT NOW"}
          </button>
        </div>
      </form>
    </div>
  );
};

const InputGroup = ({ label, name, value, onChange, placeholder }) => (
  <div className="space-y-3">
    <label className="text-sm font-black text-gray-400 uppercase tracking-widest px-1">{label}</label>
    <input required type="number" name={name} value={value} onChange={onChange} placeholder={placeholder}
      className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-500 outline-none text-xl font-bold text-gray-700 transition-all" />
  </div>
);

export default PredictionForm;