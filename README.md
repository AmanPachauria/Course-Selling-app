# Course-Selling-App

Welcome to the Course Management System project! This application provides user and admin functionalities for managing courses.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Frontend](#frontend)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Usage](#usage)
- [Backend](#backend)
  - [Tech Stack](#tech-stack)
  - [Authentication](#authentication)
- [Wath Demo](#watchdemo)
- 
## Introduction

The Course Management System is a web application for users to sign up, sign in, and view courses. Administrators can create and update courses.

## Features

### User Pages

- **Signup:** Users can create an account by providing a username and password.
- **Signin:** Registered users can sign in using their credentials.
- **View Courses:** Users can browse and view available courses.
- **Purchased Course:** User can purchase course to learn

### Admin Pages

- **Admin Signup:** Admins can create accounts with elevated privileges.
- **Admin Signin:** Admins can sign in using their credentials.
- **Create Course:** Admins can create new courses by providing details such as title, description, price, etc.
- **Update Course:** Admins can update existing courses with new information.
- **Delete Course:** Admin can delete an existing course

## Frontend

### Tech Stack

The frontend of this application is developed using React and Vite. State management is handled by Recoil, with Atom and Selector utilized for efficient component rendering.

### Installation

To run the frontend locally:

1. Clone the repository: `git clone https://github.com/your-username/course-management-system.git`
2. Navigate to the frontend directory: `cd course-management-system/frontend`
3. Install dependencies: `npm install` or `yarn install or npm install`
4. Start the development server: `npm run dev` or `yarn dev`
5. Open your browser and go to [http://localhost:3000](http://localhost:3000)

### Usage

Provide information on how users and administrators can interact with the frontend.

## Backend

### Tech Stack

The backend of this application is developed using Node.js. JWT authentication is implemented to secure user and admin access. Zod verification is used to protect the backend from invalid inputs.

### Authentication

JWT authentication is implemented for both users and administrators. Users need to sign in to access user functionalities, while administrators have elevated privileges and can perform additional actions.

## Example 
Here you can see a video of my website: [Watch the Demo](https://drive.google.com/file/d/1M0iSWlGxZ5rpWNboaDu-9Jg1Ngz4dLnt/view?usp=sharing)

