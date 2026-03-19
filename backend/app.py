from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import xgboost as xgb

app = Flask(__name__)
CORS(app)  # Agar bisa diakses dari React

# ==========================================
# 1. LOGIKA EXPERT SYSTEM (JNC 7/8 Guidelines)
# ==========================================
def expert_system_jnc(sistole, diastole):
    """
    Aturan JNC untuk klasifikasi Hipertensi berdasarkan Sistole/Diastole.
    """
    try:
        sistole = int(sistole)
        diastole = int(diastole)
    except ValueError:
        return "Tidak Terdefinisi" # Jika input bukan angka

    # 1. CEK DATA VALID / TIDAK TERDEFINISI
    # Secara medis, sistole < 60 atau > 300 itu sangat kritis/mustahil untuk pengecekan mandiri
    if sistole < 60 or sistole > 300 or diastole < 30 or diastole > 200:
        return "Tidak Terdefinisi"

    # 2. CEK JNC (Dari Terparah ke Terringan) - Sesuai Colab
    if sistole >= 160 or diastole >= 100:
        return "Hipertensi Tingkat 2"
    
    elif sistole >= 140 or diastole >= 90:
        return "Hipertensi Tingkat 1"
        
    elif sistole >= 120 or diastole >= 80:
        return "Pre-Hipertensi"
        
    # 3. NORMAL
    # Syarat mutlak normal: Sistole < 120 DAN Diastole < 80
    elif sistole < 120 and diastole < 80:
        return "Normal"
        
    # 4. SAFETY NET
    # Menangkap angka yang lolos dari logika diatas (sangat jarang terjadi jika logika benar)
    else:
        return "Tidak Terdefinisi"

# ==========================================
# 2. SIMULASI MODEL XGBOOST-PSO
# ==========================================
# Catatan untuk Skripsi:
# Dalam implementasi nyata, "params" di bawah ini adalah HASIL TERBAIK
# yang ditemukan oleh algoritma PSO Anda. Disini kita hardcode dulu.
model = None

def train_dummy_model():
    global model
    # Membuat data dummy agar kode bisa jalan (Ganti ini dengan load model .pkl nanti)
    # Fitur sesuai variabel Anda
    feature_names = [
        'jenis_kelamin', 'umur', 'merokok', 'alkohol', 'kurang_sayur',
        'rpd', 'tinggi', 'berat', 'imt', 'sistole', 'diastole', 
        'nafas', 'nadi'
    ]
    
    # Data dummy random (hanya untuk inisialisasi struktur)
    X_dummy = pd.DataFrame(np.random.rand(10, 13), columns=feature_names)
    y_dummy = np.random.randint(0, 4, 10) # 4 Kelas output (0,1,2,3)

    # Hyperparameter (Anggap ini hasil optimasi PSO)
    params = {
        'objective': 'multi:softmax',
        'num_class': 4,
        'max_depth': 6,          # Misal ini hasil PSO
        'learning_rate': 0.1,    # Misal ini hasil PSO
        'n_estimators': 100
    }

    model = xgb.XGBClassifier(**params)
    model.fit(X_dummy, y_dummy)
    print("Model Dummy XGBoost Berhasil Dilatih.")

# Latih model saat aplikasi start
train_dummy_model()

# ==========================================
# 3. API ENDPOINT
# ==========================================
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    # 1. Ambil Data Input
    try:
        # Hitung IMT (UX: Hitung di backend juga untuk validasi)
        tb_m = float(data['tinggi']) / 100
        bb_kg = float(data['berat'])
        imt = bb_kg / (tb_m ** 2)
        
        # Mapping kelas JNC untuk referensi output model ML
        kelas_label = {
            0: "Normal",
            1: "Pre-Hipertensi",
            2: "Hipertensi Tingkat 1",
            3: "Hipertensi Tingkat 2"
        }

        # 2. Proses Prediksi EXPERT SYSTEM
        hasil_pakar = expert_system_jnc(data['sistole'], data['diastole'])

        # 3. Proses Prediksi XGBOOST
        # Siapkan array input sesuai urutan training
        input_data = pd.DataFrame([[
            int(data['jenis_kelamin']), # 0: Pria, 1: Wanita
            int(data['umur']),
            int(data['merokok']),       # 0: Tidak, 1: Ya
            int(data['alkohol']),
            int(data['kurang_sayur']),
            int(data['rpd']),           # Riwayat Penyakit Dahulu
            float(data['tinggi']),
            float(data['berat']),
            imt,
            int(data['sistole']),
            int(data['diastole']),
            int(data['nafas']),
            int(data['nadi'])
        ]], columns=model.feature_names_in_)

        prediksi_index = model.predict(input_data)[0]
        hasil_xgboost = kelas_label[prediksi_index]

        return jsonify({
            "status": "success",
            "imt_kalkulasi": round(imt, 2),
            "prediksi_pakar": hasil_pakar,
            "prediksi_xgboost": hasil_xgboost, # Nanti ini akan random krn model dummy
            "note": "XGBoost menggunakan parameter hasil optimasi PSO"
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)