# Setup & Use
## Project Initialization
Clone the repository and navigate into it:

```bash
git clone <repository_url>
cd <repository_name>
```
Install dependencies using npm:

```bash
npm install
Backend Server Setup:
```

The backend is hosted on port 5000, and the frontend on port 5173.
Configure the backend .env file with your database credentials for AlwaysData.
plaintext

# backend/.env

```bash DB_HOST=<database_host>
DB_USER=<database_username>
DB_PASSWORD=<database_password>
DB_NAME=<database_name>
PORT=5000
```
Available Commands
migrate: Run database migration scripts.

```bash
npm run migrate
dev: Start both frontend and backend servers concurrently.
```

```bash
npm run dev
```
dev-front: Start only the React frontend server.

```bash
npm run dev-front
```
dev-back: Start only the Express backend server.

```bash
npm run dev-back
```
# Backend Details
## Database: 
Uses AlwaysData for database hosting.

## Middleware: 
Includes authentication middleware using Argon2 for password hashing.

## Controllers: Handles application logic and interacts with models.

## Models: 
Defines database schemas and interacts with the database.
Frontend Details

# Frontend Details

## Framework: 
Built with React for the frontend user interface.

## Tooling: 
Uses Vite for fast development and building.

## Concurrently: 
Manages multiple commands in a single CLI window.

## Nodemon: 
Monitors file changes and restarts the server automatically.
Features Overview

# Features Overview

## Deadlines Management: 
Users can create and track deadlines using a calendar interface.

## Favorite Quotes: 
Users can search and add quotes to their favorites list or create new ones.

## User Account Management: 
Includes user profile editing, password changes, and account deletion.

## Notifications: 
Users can receive periodic notifications about quotes.
Contact Admins: Via a Formik-based contact form for user inquiries.

## Legal Information:
Access to privacy policy and terms of use.

# Tools Used

## React: 
Frontend framework for building user interfaces.

## Express: Backend framework for handling API requests and business logic.

## Argon2: 
Used for secure password hashing.

## AlwaysData: Hosting service for database management.

## Vite: Fast build tool for React applications.

## Nodemon: Automatically restarts the server on file changes, enhancing development workflow.

This manual now includes details about the backend setup, server configurations, middleware usage, and additional information about controllers and models related to the database. Adjust the content further based on specific functionalities and configurations unique to your project.

# Additional Details

## Backend Structure

## Authentication: 
Middleware using Argon2 for secure password hashing and authentication handling.

## Controllers: 
Responsible for handling application logic and interacting with models.

## Models: 
Defines schemas and interacts with the database using ORM (Object-Relational Mapping).

# Frontend Features

## User Interface: 
Built with React for a responsive and interactive user experience.

## State Management: 
Utilizes React hooks and context API for state management.
Component Library: Tailwind CSS for styling components and UI elements.

## Component Library
Tailwind CSS for styling components and UI elements.

# Project Architecture

## Client-Server Interaction: 
Communicates via RESTful APIs between frontend and backend.

## Database Management: 
Utilizes MySQL database hosted on AlwaysData, configured in the backend .env file.

# Deployment

Local Development: Use npm run dev to run both frontend and backend servers concurrently for local development.

## Production Deployment: 
Deploy frontend and backend separately, ensuring backend is configured with correct environment variables for database connectivity.

## Folder Structure

## plaintext

```bash
project-root/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── auth/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── .gitignore
├── README.md
└── package.json
```

Technologies Used

## React: 
Frontend framework for building single-page applications.

## Express: 
Backend framework for handling API requests and business logic.

## MySQL: 
Database management system for storing application data.

## Argon2: 
Secure password hashing algorithm for user authentication.

## Vite: 
Fast build tool that provides a modern development experience for frontend development.

## Tailwind CSS: 
Utility-first CSS framework for styling components.
Support and Contact

## Formik and Yup: 
For form management and validation.

## Ant Design: 
A component library beneficial for our project.

## Axios:
For making API requests.

## jwt-decode:
For generating and managing tokens.

## anime.js:
For adding stylized animations to the site.

## React Router DOM: 
For component and page routing.

## jsonwebtoken:
For JWT token management.

## FullCalendar:
For implementing our task calendar.

## Heroicons:
For icons used across the site.

## Framer Motion:
For additional animations.

## Swiper:
For carousel components useful on the quote page.

## Database management :

For database management, we utilized phpMyAdmin, and for hosting, we selected Alwaysdata, ensuring a reliable and high-performance infrastructure.

# API Use Cases

## Home Page
- **GET `localhost:5000/`**
  - **Use Case**: Access the home page of the application. Typically used to display an overview or general information.

## Users
- **GET `localhost:5000/users`**
  - **Use Case**: Retrieve the list of all users. Useful for displaying all users in a table or list.
  
- **GET `localhost:5000/users/:id`**
  - **Use Case**: Get details of a specific user by their ID. Used to display information about a particular user on a profile page.
  
- **PUT `localhost:5000/users/:id`**
  - **Use Case**: Update information of a specific user. Used to modify user profile details.
  
- **POST `localhost:5000/users`**
  - **Use Case**: Create a new user. Used when registering a new user or adding a new user to the application.
  
- **DELETE `localhost:5000/users/:id`**
  - **Use Case**: Delete a specific user by their ID. Used to remove a user from the application.

## Quotes
- **GET `localhost:5000/quotes`**
  - **Use Case**: Retrieve the list of all quotes. Useful for displaying available quotes in the application.
  
- **GET `localhost:5000/quotes/:id`**
  - **Use Case**: Get details of a specific quote by its ID. Used to display detailed information about a quote.
  
- **PUT `localhost:5000/quotes/:id`**
  - **Use Case**: Update information of a specific quote. Used to modify the text or other attributes of an existing quote.
  
- **POST `localhost:5000/quotes`**
  - **Use Case**: Add a new quote. Used to create a new quote in the database.
  
- **DELETE `localhost:5000/quotes/:id`**
  - **Use Case**: Delete a specific quote by its ID. Used to remove a quote from the database.

## Comments
- **GET `localhost:5000/comments`**
  - **Use Case**: Retrieve the list of all comments. Useful for displaying all comments in the application.
  
- **GET `localhost:5000/comments/:id`**
  - **Use Case**: Get details of a specific comment by its ID. Used to display information about a particular comment.
  
- **PUT `localhost:5000/comments/:id`**
  - **Use Case**: Update details of a specific comment. Used to modify the text or other attributes of an existing comment.
  
- **POST `localhost:5000/comments`**
  - **Use Case**: Add a new comment. Used to post a comment on a quote or another entity.
  
- **DELETE `localhost:5000/comments/:id`**
  - **Use Case**: Delete a specific comment by its ID. Used to remove a comment from the database.

## Categories
- **GET `localhost:5000/categories`**
  - **Use Case**: Retrieve the list of all categories. Useful for displaying available categories.
  
- **GET `localhost:5000/categories/:id`**
  - **Use Case**: Get details of a specific category by its ID. Used to display information about a particular category.
  
- **PUT `localhost:5000/categories/:id`**
  - **Use Case**: Update details of a specific category. Used to modify the name or other attributes of an existing category.
  
- **POST `localhost:5000/categories`**
  - **Use Case**: Add a new category. Used to create a new category in the application.
  
- **DELETE `localhost:5000/categories/:id`**
  - **Use Case**: Delete a specific category by its ID. Used to remove a category from the database.

## Deadlines
- **GET `localhost:5000/deadlines`**
  - **Use Case**: Retrieve the list of all deadlines. Useful for displaying all scheduled deadlines.
  
- **GET `localhost:5000/deadlines/:id`**
  - **Use Case**: Get details of a specific deadline by its ID. Used to display detailed information about a deadline.
  
- **PUT `localhost:5000/deadlines/:id`**
  - **Use Case**: Update details of a specific deadline. Used to modify the information of an existing deadline.
  
- **POST `localhost:5000/deadlines`**
  - **Use Case**: Add a new deadline. Used to schedule a new deadline in the application.
  
- **DELETE `localhost:5000/deadlines/:id`**
  - **Use Case**: Delete a specific deadline by its ID. Used to remove a deadline from the database.

## Quote-Categories
- **GET `localhost:5000/quote_categories`**
  - **Use Case**: Retrieve the list of all quote-category associations. Useful for displaying existing relationships.
  
- **GET `localhost:5000/quote_categories/:id`**
  - **Use Case**: Get details of a specific quote-category association by its ID. Used to display relationships between quotes and categories.
  
- **PUT `localhost:5000/quote_categories/:id`**
  - **Use Case**: Update details of a specific quote-category association. Used to modify the relationship between a quote and a category.
  
- **POST `localhost:5000/quote_categories`**
  - **Use Case**: Add a new association between a quote and a category. Used to establish a new relationship.
  
- **DELETE `localhost:5000/quote_categories/:id`**
  - **Use Case**: Delete a specific quote-category association by its ID. Used to remove a relationship between a quote and a category.

## Tasks
- **GET `localhost:5000/tasks`**
  - **Use Case**: Retrieve the list of all tasks. Useful for displaying all ongoing tasks.
  
- **GET `localhost:5000/tasks/:id`**
  - **Use Case**: Get details of a specific task by its ID. Used to display information about a particular task.
  
- **PUT `localhost:5000/tasks/:id`**
  - **Use Case**: Update details of a specific task. Used to modify information about an existing task.
  
- **POST `localhost:5000/tasks`**
  - **Use Case**: Add a new task. Used to create a new task in the application.
  
- **DELETE `localhost:5000/tasks/:id`**
  - **Use Case**: Delete a specific task by its ID. Used to remove a task from the list.

## Favorites
- **POST `localhost:5000/favorites`**
  - **Use Case**: Add an item to the user's list of favorites. Used to mark a quote or other entity as a favorite.
  
- **GET `localhost:5000/favorites/:id`**
  - **Use Case**: Retrieve the list of favorites for a specific user by ID. Useful for displaying all favorited items.
  
- **DELETE `localhost:5000/favorites/:quoteId`**
  - **Use Case**: Remove a quote from the user's list of favorites. Used to unmark a quote from the list of favorites.

## Notifications
- **GET `localhost:5000/notifications`**
  - **Use Case**: Retrieve the list of all notifications. Useful for displaying all available notifications.
  
- **GET `localhost:5000/notifications/:id`**
  - **Use Case**: Get details of a specific notification by its ID. Used to display information about a particular notification.
  
- **POST `localhost:5000/notifications`**
  - **Use Case**: Create a new notification. Used to add a new notification to the system.
  
- **PUT `localhost:5000/notifications/:id/read`**
  - **Use Case**: Mark a notification as read. Used to indicate that the user has seen the notification.
  
- **DELETE `localhost:5000/notifications/:id`**
  - **Use Case**: Delete a specific notification by its ID. Used to remove a notification from the database.
  
- **GET `localhost:5000/notifications/user/:userId`**
  - **Use Case**: Retrieve all notifications for a specific user by ID. Useful for displaying notifications associated with a particular user.


Here's a structured section for the README file that describes the target audience for your application. This section will outline how different user groups interact with and benefit from your app.

## Target Audience

Our application is designed to cater to a diverse set of users, each with unique needs and goals. Below is an overview of the primary user groups and how they benefit from the features offered by our platform:

### Students

**Goals:**
- **Organize Studies**: Students use our tools to plan and track their academic work, manage study schedules, and ensure they meet their academic goals.
- **Manage Academic Projects**: They can create and manage tasks related to their academic projects and assignments.
- **Combat Procrastination**: By accessing daily inspirational quotes and setting reminders, students are motivated to stay on track with their studies.
- **Community Engagement**: Active participation in forums to exchange tips, seek advice, and receive support from peers.

**Features Used:**
- **Tasks**: To track and manage assignments and study sessions.
- **Quotes**: For daily inspiration and motivation.
- **Comments**: To engage in discussions and share insights on the forum.

### Professionals

**Goals:**
- **Manage Deadlines**: Professionals utilize our tools to keep track of important deadlines and project milestones.
- **Improve Productivity**: The interactive calendar and task lists help in optimizing work schedules and boosting efficiency.
- **Develop Skills**: They can access resources and inspirational quotes to enhance personal and professional development.

**Features Used:**
- **Deadlines**: To manage and track work deadlines.
- **Tasks**: For organizing and prioritizing work activities.
- **Quotes**: To gain inspiration and encouragement.
- **Calendar**: To view and manage schedules and deadlines.

### Entrepreneurs

**Goals:**
- **Project Planning**: Entrepreneurs use our tools to plan and oversee various business projects and initiatives.
- **Track Deadlines**: Keeping track of project deadlines and deliverables is crucial for success.
- **Motivation and Creativity**: Inspirational quotes help in maintaining motivation and stimulating creativity.
- **Community Engagement**: Active participation in trending quotes and discussions to share experiences and gain new perspectives.

**Features Used:**
- **Tasks**: To manage project-related tasks and activities.
- **Deadlines**: To keep track of key deadlines and milestones.
- **Quotes**: To inspire and motivate throughout the entrepreneurial journey.
- **Trending Quotes**: To share and discover impactful quotes and insights.

## Summary

Our application is crafted to support a wide range of users by offering tools and features that address their specific needs. Whether you are a student striving to stay organized, a professional aiming to boost productivity, or an entrepreneur seeking inspiration and effective project management, our platform provides the necessary resources to achieve your goals.

This section succinctly addresses the needs and benefits for each target audience, making it clear how the application can be utilized by students, professionals, and entrepreneurs.

Here's a section for your README file that describes the tools and libraries used in your project. This section will explain the purpose of each tool and how it contributes to the functionality of your application.

## Tools Used

Our project leverages a variety of tools and libraries to deliver a robust and user-friendly application. Below is a list of the key technologies used and their roles:

### Tailwind CSS

- **Purpose**: For designing and styling the website.
- **Description**: Tailwind CSS is a utility-first CSS framework that allows for rapid and flexible design. It helps in creating a consistent and responsive UI with minimal custom CSS.

### Formik and Yup

- **Purpose**: For form management and validation.
- **Description**: Formik simplifies handling complex form logic, including validation, while Yup provides schema-based validation for Formik forms, ensuring accurate and reliable data entry.

### Ant Design

- **Purpose**: A component library for user interface elements.
- **Description**: Ant Design is a comprehensive design system and component library that provides a set of high-quality React components for building rich and interactive UIs.

### Axios

- **Purpose**: For making API requests.
- **Description**: Axios is a promise-based HTTP client for the browser and Node.js. It simplifies sending HTTP requests and handling responses, making it easier to interact with APIs.

### jwt-decode

- **Purpose**: For decoding JWT tokens.
- **Description**: jwt-decode is a library for decoding JSON Web Tokens (JWT) to extract useful information, such as user data and token expiration, without verifying the signature.

### anime.js

- **Purpose**: For adding stylized animations.
- **Description**: Anime.js is a lightweight JavaScript animation library that provides a simple and flexible API for creating complex animations, enhancing the user experience with smooth and engaging visual effects.

### React Router DOM

- **Purpose**: For routing components and pages.
- **Description**: React Router DOM is a library for routing in React applications, allowing the navigation between different views or pages without reloading the page.

### jsonwebtoken

- **Purpose**: For managing JWT tokens.
- **Description**: jsonwebtoken is a library for signing, verifying, and decoding JSON Web Tokens. It is used for handling authentication and authorization securely.

### FullCalendar

- **Purpose**: For creating a calendar of tasks.
- **Description**: FullCalendar is a powerful library for creating interactive and customizable calendars, ideal for displaying and managing scheduled tasks and deadlines.

### Heroicons

- **Purpose**: For providing icons on the site.
- **Description**: Heroicons is a set of free, MIT-licensed high-quality SVG icons for use in web projects, helping to enhance the visual appeal and usability of the application.

### Framer Motion

- **Purpose**: For additional animations.
- **Description**: Framer Motion is a React library for animations, providing a simple and powerful API for creating animations and transitions with high performance and ease.

### Argon2

- **Purpose**: For password hashing.
- **Description**: Argon2 is a modern cryptographic hashing algorithm designed to securely hash passwords, providing resistance against brute-force and other attacks, ensuring the security of user credentials.

## Summary

These tools and libraries have been chosen to provide a seamless and efficient development experience, enhance the application's performance and security, and deliver a high-quality user experience. Each component plays a crucial role in the functionality and aesthetics of the application, contributing to its overall success.

This section provides a clear overview of each tool's purpose and how it fits into the project's ecosystem, giving readers an understanding of the technologies that power your application.

All these technological choices were made in consultation with our Scrum Master and the rest of the team, ensuring maximum cohesion and efficiency. These dependencies were installed to create a high-performance and enjoyable application to use, meeting the needs of our Deadline Drive project.

link for web site https://deadlinedrive-p8op.onrender.com/

For any issues or questions related to the application, please contact us at support@example.com or visit our support page for more information.