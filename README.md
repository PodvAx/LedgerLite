# 📊 LedgerLite – Accounting REST API

**LedgerLite** is a simple and clean RESTful API server built with Node.js, Express, and PostgreSQL for managing financial records. It allows you to perform full CRUD operations on income and expense data, making it a lightweight foundation for personal or small business finance applications.

---

## 🛠 Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- dotenv
- CORS

---

## ⚙️ Getting Started

To run this project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ledgerlite.git
cd LedgerLite
```

###2. Install Dependencies

```bash
npm install
```

###3. Set Up Environment Variables
Create a .env file in the root directory and add:

```env
POSTGRESS_HOST = your_db_host
POSTGRESS_DB = your_db_name
POSTGRESS_PASSWORD = your_db_password
POSTGRESS_USER = your_db_user
POSTGRESS_PORT = your_db_port
```

###4. Run the Server

```bash
npm start
```


## ✨ Features

- 📥 Create, read, update, and delete (CRUD) accounting records
- 🔄 Organize records by category (income, expense, etc.)
- 🗃 Connects to a PostgreSQL database using Sequelize
- 🧱 Clean architecture with controllers, services, and routes
- 🌐 CORS-enabled for cross-origin use

Use this API as a base for personal finance tools, dashboards, or full-stack apps. Contributions are welcome!
