# itWox
# ITWox Interview App

Welcome to the ITWox Interview App. This is a coding test project that demonstrates various frontend development tasks.

## Project Overview

The ITWox Interview App is a web application built with React, Redux Toolkit, and Material-UI. It includes features such as user authentication, fetching data from an API, and pagination. The backend API provides data related to posts and comments.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

Before you begin, ensure you have the following software installed:

- Node.js: You can download it from [https://nodejs.org/](https://nodejs.org/).

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/itwox-interview-app.git
Navigate to the project directory:

bash
Copy code
cd itwox-interview-app
Install the project dependencies:

bash
Copy code
npm install
Create a .env file in the root directory and set the following environment variables:

makefile
Copy code
REACT_APP_API_URL_POSTS=your-posts-api-url
REACT_APP_API_URL_COMMENTS=your-comments-api-url
Replace your-posts-api-url and your-comments-api-url with the actual URLs of your API endpoints.

Start the development server:

bash
Copy code
npm start
Open your browser and go to http://localhost:3000/ to view the app.

Usage
Use the "Sign In" page to log in to the application. Your login state will be preserved even if you refresh the page.
Explore the "Dashboard" to see a list of posts and their associated comments.
Use the pagination buttons to navigate through the list of posts.
Testing
To run the unit tests for this project, use the following command:

bash
Copy code
npm test
