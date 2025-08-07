 Brain Tumor Detection Web App:
 
This is a full-stack AI web application that detects the presence of a brain tumor from an MRI scan using a deep learning model.

Tech Stack

- **Frontend:** React + Vite
- **Backend:** Flask + TensorFlow
- **Model:** CNN-based image classification
- **Hosting:** Netlify (frontend), Render (backend)
- 
Features

- Upload MRI scan (JPEG/PNG)
- Predicts presence of tumor with confidence %
- Gives medical advice based on the result
- Clean and responsive UI
- Live deployed and ready to use

Project Structure

Brain_Tumor_Project/
│
├── backend/
│ ├── app.py # Flask backend
│ ├── models/best_model.h5 # Trained tumor detection model
│ └── utils/predict.py # Image preprocessing + prediction
│
├── frontend/
│ └── brain-tumor-frontend/
│ ├── src/
│ ├── public/
│ └── dist/ # Built files after npm run build

Backend Setup (Flask)

Move to folder : cd backend
Requirements : pip install -r requirements.txt
Run : python app.py
Flask will run at: http://localhost:5000

 Frontend Setup (React + Vite)

Move to folder : cd frontend/brain-tumor-frontend
npm install
npm run dev
Frontend will run at: http://localhost:5173

