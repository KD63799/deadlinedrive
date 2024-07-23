# MVC Express Backend

This repository contains a simple Express MVC framework designed to facilitate rapid development of web applications. Follow the steps below to set up and run the server.

## Setup

**Clone the Repository**
   ```bash
   git clone <repository-url>
Install Dependencies
   ```
```bash
npm install
```

Environment Setup
**Create a .env file based on the .env.sample provided. Fill in your database parameters:**

```bash
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

Database Setup

**Adapt the database.sql script to include your own tables. You can import this script into your SQL server manually or run a migration script:**

   ```bash
npm run migrate
Start the Server
```
**Run the server in development mode:**

```bash
npm run dev
```

Access the Application
**Open your browser and go to http://localhost:5000 to start using the application.**

# API Endpoints

Below are the available API endpoints grouped by functionality. Ensure you have set up your .env and database configurations properly to use these endpoints.

# User Management

* List Users
* GET /users
* Get User
* GET /users/:id
* Create User
* POST /users
* Middleware: hashPassword
* Update User
* PUT /users/:id
* Middleware: verifyToken, verifyId
* Delete User
* DELETE /users/:id
* User Login
* POST /users/login
* Validations: Checks for email and name formats.

# Quotes Management

* List Quotes
* GET /quotes
* Get Quote
* GET /quotes/:id
* Create Quote
* POST /quotes
* Update Quote
* PUT /quotes/:id
* Delete Quote
* DELETE /quotes/:id

# Categories Management

* List Categories
* GET /categories
* Get Category
* GET /categories/:id
* Create Category
* POST /categories
* Update Category
* PUT /categories/:id
* Delete Category
* DELETE /categories/:id

# List Tasks

* GET /tasks
* Get Task
* GET /tasks/:id
* Create Task
* POST /tasks
* Update Task
* PUT /tasks/:id
* Delete Task
* DELETE /tasks/:id

# List Deadlines

* GET /deadlines
* Get Deadline
* GET /deadlines/:id
* Create Deadline
* POST /deadlines
* Update Deadline
* PUT /deadlines/:id
* Delete Deadline
* DELETE /deadlines/:id

## Additional Features

* Manage Favorites
* Add, view, and delete favorite quotes.
* User Votes
* Users can upvote or downvote quotes.
* Notifications
* Manage user notifications.
* Development Notes

## Windows Users: Set Git to handle line endings correctly for your platform:

```bash
git config --global core.autocrlf true
For more detailed API documentation, including request and response formats, refer to the inline comments in the router.js and controller files. Ensure your database and .env settings are configured correctly to avoid connection issues.
```

This documentation is organized and provides an overview of the setup process, as well as detailed descriptions of the API endpoints. You can adapt the details as necessary to match your specific configurations and setup.

## Controllers
* userManager : Handles user-related operations.
* quoteManager: Handles quote-related operations.
* commentManager: Handles comment-related operations.
* categoryManager: Handles category-related operations.
* deadlineManager: Handles deadline-related operations.
* quote_categoryManager: Handles operations related to the   association 
* between quotes and categories.
* taskManager: Handles task-related operations.

## Middleware
How the verifyToken Middleware Works
Retrieve the Authorization Header:

* The middleware starts by retrieving the authorization 
 header from the request.
* If this header is missing, an error is thrown indicating that the authorization header is absent.

### Extract and Verify the Token:

* The authorization header is then split into two parts: the authorization type (which must be "Bearer") and the JWT token itself.
* If the authorization type is not "Bearer," an error is thrown indicating the incorrect authorization type.

### Verify the JWT Token:

* The JWT token is verified using the secret defined in the environment variables (process.env.JWT_SECRET).
* If the verification fails, an error is thrown, and a 401 Unauthorized response is sent to the client.

### Attach the Payload and Verify the User:

* If the token is valid, the payload (data contained in the token) is attached to the request (req.payload).
* The middleware then uses the user ID (contained in the payload) to find the corresponding user in the database.
* If the user is not found, a 404 Not Found response is sent to the client.

### Proceed to the Next Middleware:

* If all checks pass, the middleware calls the next() function to proceed to the next middleware or route handler.

```jsx import jwt from "jsonwebtoken";
import models from "./models"; // Ensure you have configured your Mongoose models

// Middleware to verify the JWT token and attach user to the request
const verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization"); // Get the Authorization header from the request

    if (!authorizationHeader) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" "); // Split the Authorization header to get type and token

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token using the secret
    req.payload = payload;
    console.log('Payload:', payload); // Debugging log to check the payload

    const user = await models.user.findById(payload.sub); // Use payload to get the user ID
    if (!user) {
      return res.status(404).send('User not found');
    }

    next(); // Call the next middleware function
  } catch (err) {
    console.error('Error verifying token:', err);
    res.sendStatus(401); // Send a 401 Unauthorized status if token verification fails
  }
};

export default verifyToken;
```

### NodeCron Integration

### Overview

In the backend of this project, we utilize NodeCron to schedule and manage recurring tasks. NodeCron is a popular Node.js module that allows you to run scheduled jobs or tasks at specified intervals or cron expressions. This is particularly useful for tasks that need to be performed periodically, such as sending notifications, cleaning up data, or generating reports.

### Installation

To use NodeCron in your Node.js application, you need to install it via npm:

```bash 
npm install node-cron
```
## Basic Usage
Below is an example of how NodeCron can be integrated into your backend application to run scheduled tasks.

### Import NodeCron

Import the NodeCron module into your application:

```bash 
import cron from 'node-cron';
```
Define a Scheduled Task

### Create a scheduled 
task by defining a cron expression. The cron expression determines the schedule for running the task.

```bash // Example of a cron expression to run every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running a task every day at midnight');
  // Place your task logic here, e.g., sending notifications
}); 
```
### Cron Expression Explanation:
 0 0 * * * - This expression specifies that the task should run at 00:00 (midnight) every day. The format of the cron expression is minute hour day-of-month month day-of-week.

### Important Points
* Security: The JWT secret must be secure and not exposed. Use environment variables to store it.
* Token Expiry: JWT tokens should have a limited validity period for security reasons. Ensure to handle expired tokens properly.
* Token Storage: On the client side, store tokens securely, such as in secure cookies or local storage.

# UpVote/DownVote Functionality

This document provides an overview of the UpVote and DownVote functionalities implemented in the API. These features allow users to upvote or downvote quotes, thereby influencing their popularity.

## Endpoints

### Upvote a Quote
- **Endpoint**: `POST /quotes/:quoteId/upvote`
- **Description**: Allows a user to upvote a specific quote.
- **Parameters**:
  - `quoteId`: The ID of the quote to be upvoted (in the URL path).
- **Request Headers**:
  - `Authorization`: JWT token for user authentication.
- **Responses**:
  - **200 OK**: Returns the updated quote object if the upvote operation is successful.
  - **500 Internal Server Error**: If an error occurs during the upvote operation.

**Use Case**:
- **Scenario**: A logged-in user wants to upvote a quote. The application checks if the user has already voted on this quote and updates the vote accordingly. If the user had previously upvoted, the upvote is removed and the quote’s vote count is decremented. If the user had downvoted, the vote is switched to upvote.

### Downvote a Quote
- **Endpoint**: `POST /quotes/:quoteId/downvote`
- **Description**: Allows a user to downvote a specific quote.
- **Parameters**:
  - `quoteId`: The ID of the quote to be downvoted (in the URL path).
- **Request Headers**:
  - `Authorization`: JWT token for user authentication.
- **Responses**:
  - **200 OK**: Returns the updated quote object if the downvote operation is successful.
  - **500 Internal Server Error**: If an error occurs during the downvote operation.

**Use Case**:
- **Scenario**: A logged-in user wants to downvote a quote. The application checks if the user has already voted on this quote and updates the vote accordingly. If the user had previously downvoted, the downvote is removed and the quote’s vote count is incremented. If the user had upvoted, the vote is switched to downvote.

## Functionality

### Upvote Process
1. **User Authentication**: The request must include a valid JWT token. The user ID is extracted from the token.
2. **Check Existing Vote**: The system checks if the user has already voted on the quote.
3. **Update Vote**:
   - If the user had previously upvoted, the upvote is removed.
   - If the user had downvoted, the vote is switched from downvote to upvote.
   - If there is no previous vote, a new upvote is recorded.
4. **Update Quote**: The vote count of the quote is updated in the database.
5. **Response**: The updated quote object is returned.

### Downvote Process
1. **User Authentication**: The request must include a valid JWT token. The user ID is extracted from the token.
2. **Check Existing Vote**: The system checks if the user has already voted on the quote.
3. **Update Vote**:
   - If the user had previously downvoted, the downvote is removed.
   - If the user had upvoted, the vote is switched from upvote to downvote.
   - If there is no previous vote, a new downvote is recorded.
4. **Update Quote**: The vote count of the quote is updated in the database.
5. **Response**: The updated quote object is returned.

## Error Handling
- **500 Internal Server Error**: Returned when an error occurs during the upvote or downvote process, such as database issues or invalid operations.

## Authentication
- **JWT Token**: Required for authenticating the user making the vote. The token must be included in the `Authorization` header of the request.

# Comments Feature

## Overview

The Comments feature allows users to create, read, update, and delete comments on quotes. It provides the functionality to manage comments associated with specific quotes and includes validation for data integrity.

## API Endpoints

### Fetch All Comments
- **Endpoint**: `GET /comments`
- **Description**: Retrieves all comments from the database.
- **Responses**:
  - **200 OK**: Returns an array of all comments.
  - **500 Internal Server Error**: Returns an error if the operation fails.

### Fetch a Single Comment
- **Endpoint**: `GET /comments/:id`
- **Description**: Retrieves a single comment by its ID.
- **Parameters**:
  - `id`: The ID of the comment to retrieve.
- **Responses**:
  - **200 OK**: Returns the comment object if found.
  - **404 Not Found**: Returns if no comment is found with the specified ID.
  - **500 Internal Server Error**: Returns an error if the operation fails.

### Fetch Comments by Quote ID
- **Endpoint**: `GET /comments/quote/:quoteId`
- **Description**: Retrieves all comments associated with a specific quote.
- **Parameters**:
  - `quoteId`: The ID of the quote to retrieve comments for.
- **Responses**:
  - **200 OK**: Returns an array of comments related to the specified quote.
  - **500 Internal Server Error**: Returns an error if the operation fails.

### Add a New Comment
- **Endpoint**: `POST /comments`
- **Description**: Creates a new comment.
- **Request Body**:
  - `content`: The text content of the comment.
  - `id_user`: The ID of the user who created the comment.
  - `id_quote`: The ID of the quote the comment is associated with.
- **Responses**:
  - **201 Created**: Returns a location header with the URL of the newly created comment.
  - **400 Bad Request**: Returns validation errors if the input is invalid.

### Update an Existing Comment
- **Endpoint**: `PUT /comments/:id`
- **Description**: Updates an existing comment by its ID.
- **Parameters**:
  - `id`: The ID of the comment to update.
- **Request Body**:
  - `content`: The updated text content of the comment.
  - `id_user`: The ID of the user who created the comment.
  - `id_quote`: The ID of the quote the comment is associated with.
- **Responses**:
  - **204 No Content**: Indicates the comment was successfully updated.
  - **400 Bad Request**: Returns validation errors if the input is invalid.
  - **500 Internal Server Error**: Returns an error if the operation fails.

### Delete a Comment
- **Endpoint**: `DELETE /comments/:id`
- **Description**: Deletes a comment by its ID.
- **Parameters**:
  - `id`: The ID of the comment to delete.
- **Responses**:
  - **204 No Content**: Indicates the comment was successfully deleted.
  - **404 Not Found**: Returns if no comment is found with the specified ID.
  - **500 Internal Server Error**: Returns an error if the operation fails.

## Functionality

### Fetch All Comments
- **Function**: `browse()`
- **Description**: Retrieves and sends all comments stored in the database.

### Fetch a Single Comment
- **Function**: `read(req, res)`
- **Description**: Retrieves and sends a specific comment based on the provided ID.

### Fetch Comments by Quote ID
- **Function**: `findByQuote(req, res)`
- **Description**: Retrieves and sends all comments associated with a specific quote ID.

### Add a New Comment
- **Function**: `add(req, res)`
- **Description**: Validates and inserts a new comment into the database. Returns the URL of the newly created comment if successful.

### Update an Existing Comment
- **Function**: `edit(req, res)`
- **Description**: Validates and updates an existing comment in the database.

### Delete a Comment
- **Function**: `destroy(req, res)`
- **Description**: Deletes a comment from the database based on the provided ID.

## CommentManager Class

### Methods

- **`insert(comment)`**: Inserts a new comment into the database.
- **`update(comment)`**: Updates an existing comment.
- **`delete(id)`**: Deletes a comment by ID.
- **`findByQuoteId(quoteId)`**: Fetches comments associated with a specific quote ID.
- **`validateComment(comment)`**: Validates the comment object for required fields and formats.

### Usage
- **Insert**: To add a new comment to the database.
- **Update**: To modify an existing comment.
- **Delete**: To remove a comment by its ID.
- **Find By Quote**: To retrieve all comments related to a specific quote.

## Validation

- **`validateComment(comment)`**: Ensures that the `content`, `id_user`, and `id_quote` fields are properly formatted and not empty.

## Error Handling
- **500 Internal Server Error**: Returned for unexpected issues or database errors.
- **400 Bad Request**: Returned for validation errors or missing required fields.

## Example Requests

### Add Comment
```http
POST /comments
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "content": "This is a comment",
  "id_user": 1,
  "id_quote": 123
}
```

```jsx PUT /comments/1
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "content": "This is an updated comment",
  "id_user": 1,
  "id_quote": 123
}
```

```jsx DELETE /comments/1
Authorization: Bearer <your_jwt_token>
```
link for web site https://deadlinedrive-p8op.onrender.com/

This README provides a concise overview of how the upvote and downvote functionalities are implemented and used in your application. It covers the API endpoints, processes involved, error handling, and authentication requirements.

This Markdown version uses the bash code block syntax to format commands and route examples appropriately. You can use it directly in your README.md documentation.

