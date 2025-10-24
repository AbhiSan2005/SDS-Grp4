# SDS Portal 🚀

---

## Project Overview

This project is a comprehensive web portal designed for the **Software Development Section (SDS)** club. It features a public-facing website to showcase the club's activities and an administrative backend for managing content.

The portal consists of three main parts:

1.  🌐 **Public Website:** A site for anyone to learn about SDS, view members, browse projects, see past events, and request new projects.
2.  🔒 **Admin Portal:** A secure area for authenticated administrators to manage website content, including member profiles, project details (including visibility), events, and reports. Admins can upload files and generate reports using the Gemini API.
3.  🧑‍🏫 **Faculty Advisor Portal:** A secure login area for the faculty advisor to view and download project reports.

---

## ✨ Features

### Public Website
* **Home Page:** Welcome and overview.
* **About Page:** Information on SDS goals, vision, and current members.
* **Projects Showcase:** Display selected club projects with details.
* **Events Page:** Summaries and images from past events.
* **Contact Page:** Contact information.
* **Request a Project:** Form for submitting project ideas.

### Admin Portal
* **Secure Login:** Authentication for administrators.
* **Dashboard:** Overview with key stats, quick actions, and upcoming events.
* **Members Management:** Add, view, edit, and delete member profiles (with image uploads).
* **Projects Management:** Add, view, edit, delete projects, manage visibility, and assign members (with image uploads).
* **Events Management:** Create, view, edit, and delete events (with image uploads).
* **Reports Management:** Upload reports (PDFs), generate reports using AI (Gemini API), link reports to projects/events, view, download, and delete reports. Includes status approval workflow.

### Faculty Advisor Portal
* **Secure Login:** Authentication for the faculty advisor.
* **Reports Dashboard:** View a list of project reports.
* **Download Reports:** Ability to download selected reports.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **File Storage:** Cloudinary (for images and reports)
* **AI:** Google Gemini API (for report generation)
* **Authentication:** JWT (JSON Web Tokens), bcryptjs

---

## 🚀 Getting Started

### Prerequisites
* Node.js (_v18 or later recommended_)
* npm or yarn
* MongoDB instance (local or Atlas)
* Cloudinary Account
* Google Gemini API Key



### Installation

1.  **Clone the repository:**
    ```bash
    git clone <https://github.com/AbhiSan2005/SDS-Grp4.git>
    cd <https://github.com/AbhiSan2005/SDS-Grp4.git>
    ```
2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    ```
3.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

### Environment Variables 🔑

Create a `.env` file in the **`backend`** directory:

```env
# Server Configuration
PORT=5000 # Or any port you prefer

# Database
MONGO_URI=your_mongodb_connection_string # e.g., mongodb://localhost:27017/sds_portal or Atlas URI

# Authentication
JWT_SECRET=your_super_long_random_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Google Gemini API
GEMINI_API_KEY=your_google_gemini_api_key

```
## 👩‍💻 Team Members  
| Name | Role | Description |
|------|------|--------------|
| **Dhruv Agarwal** | Developer | Public Facing Website + Admin Portal |
| **Abhiraj Sankpal** | Developer | Public Facing Website + Faculty Portal |
| **Anshul Kalmegh** | Developer | Faculty Portal |
