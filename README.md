# Todo List Web App

A simple Todo List web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This project demonstrates CRUD (Create, Read, Update, Delete) operations with tasks, task status toggling, and task management.
> https://todo-list-o0fc.onrender.com/

## Features

1. Dynamic list creation: Users can create any number of lists just by going to "home_address/<your_list_name".
2. Delete an entry: Users can delete the tasks they have done by clicking on the checkbox.
3. Deployment: The website is hosted on AWS and deployed via render.com.

## Getting Started
1. Clone this repository.

2. Install dependencies.
    ```
      npm install
    ```
4. Set up your MongoDB connection string.
    - Create a .env file in the root directory.
    - Add your MongoDB connection string:
    - Add these lines in .env
    ```
      URL=YOUR_MONGODB_CONNECTION_STRING
    ```
5. Run the application.
    ```
      nodemon app.js
    ```

## Contact

If you have any questions or want to report a bug, please feel free to contact me at rishimahiya@gmail.com.
