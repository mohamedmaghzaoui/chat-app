# 🗨️ Chat Application - Laravel and React

![Laravel](https://img.shields.io/badge/Laravel-8.x-red?style=for-the-badge&logo=laravel) ![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)

## 📄 Project Overview
A real-time chat application built with Laravel for the backend and React for the frontend. The project is containerized using Docker for seamless development and deployment.

---

## ⚙️ Installation & Setup

### 🔧 Prerequisites
- Docker 🐳
- Docker Compose 📦
- Node.js (for frontend) 🟦
- Composer (for backend) 🎵

### 🛠️ Setup
```bash
# Clone the repository
git clone <repo-url>
cd project-directory

# Start services
docker-compose up -d

# Install dependencies
# Backend
docker-compose exec backend composer install

# Frontend
docker-compose exec frontend npm install
```

---

## 📂 Project Structure
```
.
├── backend/               # Laravel API
│   ├── app/
│   ├── database/
│   └── routes/
├── frontend/              # React Frontend
│   ├── src/
│   └── public/
└── docker-compose.yml
```

## 📄 Managing .env Files

The `.env` files are used to configure environment variables for both the **Laravel** backend and the **React** frontend.

### 📂 Backend: Environment Variable Configuration with Laravel

In the backend folder, the `.env` file is used to configure essential variables for the **Laravel** application.

```bash
# The .env files allow configuring environment variables for different scenarios:
# 1. .env: Default file containing main values.
# 2. .env.local: Local file not versioned for specific overrides.
# 3. .env.$APP_ENV: File for environment-specific configurations (local, production, etc.).
# 4. .env.$APP_ENV.local: Specific overrides for each environment (non-versioned).

# DO NOT store production secrets in this file or any other versioned file.
# Use appropriate secrets management tools, such as cloud services or local solutions.

###> Laravel Application Settings ###
# Application name
APP_NAME=Laravel
# Application environment (local, production, etc.)
APP_ENV=local
# Secret key for the application, to be generated for each project
APP_KEY=base64:your_generated_key_here
# Application debug mode (true or false)
APP_DEBUG=true
# Application URL for redirections, etc.
APP_URL=http://localhost
###< Laravel Application Settings ###

###> Database Configuration ###
# Database connection type
DB_CONNECTION=sqlite
# Database file used for development
DB_DATABASE=/var/www/database/database.sqlite

# Configuration for the test database
TEST_DB_CONNECTION=sqlite
TEST_DB_DATABASE=/var/www/database/database_test.sqlite
###< Database Configuration ###
```
#### 📂 Frontend: Configuration with React
In the frontend folder, the .env file contains variables specific to the React.js application with Vite
```bash
# URL for the Backend API (Laravel)
REACT_APP_API_URL=http://localhost:8000/api
```
## 🛠️ Technologies Used

![Apache](https://img.shields.io/badge/Apache-D22128?style=for-the-badge&logo=apache&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)

![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Composer](https://img.shields.io/badge/Composer-885630?style=for-the-badge&logo=composer&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## 🔌 API Endpoints

### 🗣️ Conversations
- **POST** `/api/conversations` – Start a new conversation
- **DELETE** `/api/conversations/{id}` – Delete a conversation

### 💬 Messages
- **GET** `/api/conversations/{id}/messages` – Retrieve all messages in a conversation
- **POST** `/api/conversations/{id}/messages` – Send a new message
- **PUT** `/api/messages/{id}` – Edit an existing message
- **DELETE** `/api/messages/{id}` – Remove a message

### 👤 Users
- **POST** `/api/register` – Register a new user
- **POST** `/api/login` – Authenticate and log in
- **GET** `/api/users` – Retrieve list of all users (Admin only)
- **GET** `/api/user` – Get currently authenticated user
- **DELETE** `/api/user` – Delete user account

---


## 🌟 Features
- 🔐 **Secure Authentication** – Sessions-based login and registration
- 🗨️ **Real-time Private Messaging** – Start one-on-one conversations
- 🗄️ **Database with Migrations** – Automate database creation and seeding
- 🖥️ **React Frontend** – Responsive and dynamic SPA for chat
- 📡 **WebSockets Integration** – Real-time message updates

---

## 🚀 Running Tests
```bash
# Backend tests
docker-compose exec backend php artisan test

# Frontend build verification
docker-compose exec frontend npm run build
```

---

## 🧹 Tear Down
```bash
docker-compose down
```

---

## 🛠️ Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

# About Me 👨‍💻

Hi, I'm Mohamed Maghzaoui, a passionate software engineer with a wide range of expertise spanning from web development to IoT, cloud, and networking technologies. You can explore my work and projects online:

- 🌐 [My Website](https://mohamedmaghzaoui.online/)
- 🔗 [LinkedIn Profile](https://www.linkedin.com/in/mohamed-maghzaoui-577044256/)