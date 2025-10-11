
![Logo](https://raw.githubusercontent.com/collapseeee/Motoropedia-Project/refs/heads/integratedBranch/src/frontend/public/motoropedia-logo.png)


# Motoropedia
A Database System and Design Term Project for
953212 — Database System and Database System Design, College of Arts, Media and Technology.

## Overview
Motoropedia is a web-based motorsport encyclopedia designed to help users explore detailed information about various motorsport categories, tournaments, teams, racers, cars, and staff members.
The project demonstrates database design principles, RESTful API development, and frontend-backend integration using modern web technologies.

This project was developed as part of 953212 Database System and Database System Design (Term Project) at College of Arts, Media and Technology.


## Tech Stack

| Layer             | Technology        | Description                                                          |
| ----------------- | ----------------- | -------------------------------------------------------------------- |
| **Frontend**      | React (Vite)      | Displays all motorsport data in an interactive and modular interface |
| **Backend**       | Node.js + Express | Provides RESTful APIs to handle requests between frontend and MySQL  |
| **Database**      | MySQL             | Stores all motorsport-related entities and relationships             |
| **Styling**       | CSS3              | Custom responsive styling for cards, tables, and navigation          |
| **Testing Tools** | Postman           | Used for API testing and validation                                  |



## Installation

#### Prerequisites

Before running this project, make sure you have:

- Node.js ≥ 18
- MySQL Server
- npm or yarn
- .env file configured with your database credentials
#### Example .env:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_DATABASE=motoropedia
```

### Database Setup

#### Step 1:
Open and Run SQL Script `motoropedia_table.sql` in MySQL Workbench or any tool that you prefer.

#### Step 2:
Open and Run SQL Script `motoropedia_data.sql` in MySQL Workbench or any tool that you prefer.

### Backend Setup

```bash
# Navigate to project folder
cd Motoropedia-Project

# Install dependencies
npm install

# Start the server
npm run backend
```
The backend will listen at http://localhost:3000

### Frontend Setup

```bash
# Navigate to frontend folder
cd Motoropedia-Project

# Install dependencies
npm install

# Run the application
npm run frontend
```

The frontend will run at http://localhost:5173

##OR##

```bash
cd Motoropedia-Project
npm install

# Run both in separate terminals
npm run frontend
npm run backend

```

    
## Features

- 📚 Explore different motorsport types with detailed descriptions and visuals

- 🏆 View tournaments, teams, cars, and racers under each motorsport category

- 🔍 Use a search system to look for entities across the entire database

- 🧑‍⚖️ Access details about referees, casters, and staff roles

- 📈 Dynamic and sortable data tables for every category

- 🎨 Fully responsive interface with dark-themed UI design

## Upcoming Feature: Login System for CRUD

A login authentication system will be added in the next phase, allowing administrators to:

🔑 Log in securely using username and password

➕ Add new entries (motorsport, team, car, tournament, etc.)

✏️ Update existing data through web forms

❌ Remove entities directly from the frontend

## Project Structure

```
📦 Motoropedia-Project
├─ dataset
│  ├─ motoropedia_data.sql
│  └─ motoropedia_table.sql
├─ src
│  ├─ backend
│  ├─ docs
│  └─ frontend
├─ .gitattributes
├─ .gitignore
├─ README.md
├─ package-lock.json
├─ package.json
└─ tsconfig.json
```

## Authors

- [@collapseeee](https://www.github.com/collapseeee) 672115014 Nattikorn Sae-sue
- [@KrittamethGERRY](https://github.com/KrittamethGERRY) 672115002 Krittameth Tansuwan
- [@BokiChan](https://github.com/BokiChan) 672115050 Apitawan Chirakunasin
