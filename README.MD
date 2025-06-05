# Portfolio Project

A full-stack web application showcasing professional experience, projects, and skills with an interactive user interface.

## Overview

This portfolio application features a React frontend with TypeScript and a Node.js backend. It includes accomplishment stories, resume details, and interactive demos of projects.

## Features

- Interactive Resume: Detailed work history with accomplishments and references
- Project Showcase: Demonstrations of completed projects with video tutorials
- Accomplishment Stories: STAR-format descriptions of key professional achievements
- Responsive Design: Optimized for both desktop and mobile viewing experiences

## Tech Stack

### Frontend

- React with TypeScript
- Styled Components for styling
- React Router for navigation
- Carousel components for media presentation

### Backend

- Node.js
- Express for API routing
- MongoDB for data storage (optional)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

- Clone the Repository

  ```bash
  git clone https://github.com/beschuetzer/Portfolio.git
  cd Portfolio
  ```

- Install the dependencies

  ```bash
  npm install
  cd frontend
  npm install
  ```

### Running the Application

#### Full Stack (Frontend + Backend)

```bash
npm run start:dev
```

#### Frontend Only

```bash
cd frontend
npm start
```

#### Backend Only

```bash
cd backend  # Not ./frontend as mentioned in the original README
npm start
```

### Deployment
The application can be deployed using services like Heroku, Vercel, or Netlify. The `heroku-postbuild` script is included for Heroku deployment.

Live Project Link: https://www.adammajor.com