# Real-Time Chat Application

A real-time chat application built using Node.js, Express, Socket.IO, and MySQL.

## Features

* Real-time messaging using Socket.IO
* Messages are stored in MySQL
* Old messages are loaded when the page is refreshed
* Express Router for message routes
* Separate model for database queries
* Input validation for username and messages
* Error handling
* Environment variables used for database configuration

## Technologies Used

* Node.js
* Express.js
* Socket.IO
* MySQL
* HTML
* JavaScript

## Project Structure

```text
Real time chat application/
├── config/
│   └── db.js
├── database/
│   └── schema.sql
├── models/
│   └── messageModel.js
├── routes/
│   └── messageRoutes.js
├── public/
│   └── index.html
├── .env
├── .gitignore
├── package.json
└── server.js
```

## How to Run

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:4000
```

## Database

The application uses MySQL to store chat messages.

Database connection details are stored in the `.env` file.

The `.env` file is excluded from Git using `.gitignore` to protect sensitive credentials.
