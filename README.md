# KBTU Lost & Found Map

A web application designed to help students find lost items and return found belongings using an interactive map.

---

## 📌 Overview

The Lost & Found Map system allows users to report lost or found items, browse posts, and interact through comments.  
It provides a clean interface and integrates mapping functionality for better location tracking.

---

## 🚀 Features

🔐 Authentication  
- User registration and login using JWT  
- Secure API requests  

📦 Posts Management  
- Create, view, and delete posts  
- Mark items as **lost** or **found**  
- Update status to **resolved**  

🗺 Map Integration  
- Display all posts on a map  
- Select **exact location** by clicking on the map  
- Supports both approximate and precise coordinates  

💬 Comments  
- Users can leave comments on posts  
- Enables communication between users  

👤 User Dashboard  
- “My Posts” page  
- Manage personal posts  

---

## 🛠 Tech Stack

Frontend  
- Angular  
- TypeScript  
- CSS  

Backend  
- Django  
- Django REST Framework  

Other  
- Leaflet (map integration)  
- JWT authentication  

---

## 📡 API Endpoints

/api/auth/login/  
/api/auth/register/  
/api/posts/  
/api/posts/:id/  
/api/posts/my/  
/api/posts/:id/comments/  

---

## ⚙️ Installation

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Frontend

cd frontend
npm install
ng serve


⸻

🎯 Usage
	1.	Register or log in
	2.	Create a post (lost or found item)
	3.	Select a location on the map
	4.	Browse posts and view details
	5.	Add comments or mark items as resolved

⸻

👥 Team
	•	👩🏻‍💻 Ospanova Zarina
	•	👩🏻‍💻 Zharylkassyn Tomiris
	•	👨🏻‍💻 Kulakhmetov Askar

⸻

🏁 Conclusion

This project demonstrates a full-stack web application with real-world functionality, combining Angular frontend and Django REST backend with interactive map features.

