# Express MongoDB Signup and Login with Nodemailer

This Node.js application demonstrates user signup and login functionality using Express.js, MongoDB with Mongoose, and email notification with Nodemailer. Users can sign up with a username, email, and password. After successful signup, an email notification is sent to the user's email address. Users can also log in with their credentials.

## Features

- **Signup Form**: Users can sign up with a username, email, and password.
- **Login Form**: Users can log in with their username and password.
- **MongoDB Integration**: User data is stored in a MongoDB database using Mongoose.
- **Nodemailer Integration**: Email notifications are sent to users upon successful signup.
- **Express Routes**: Routes are defined for signup and login endpoints.

## Project Structure

- `index.js`: Entry point of the application containing server setup, route definitions, and database connection.
- `public/signup.html`: HTML form for user signup.
- `public/login.html`: HTML form for user login.
- `package.json`: Configuration file containing project dependencies and scripts.

## Installation

1. **Clone the Repository**: Clone this repository to your local machine.

2. **Install Dependencies**: Navigate to the project directory and install the dependencies using npm.

    ```bash
    npm install
    ```

3. **Set up MongoDB**: Ensure that MongoDB is running on your local machine or update the MongoDB connection URI in `index.js` to connect to your MongoDB instance.

4. **Configure Nodemailer**: Update the email and password in the Nodemailer transporter setup in `index.js` with your Gmail credentials.

5. **Run the Server**: Start the Express server using the following command.

    ```bash
    npm start
    ```

6. **Access the Application**: Access the signup form at `http://localhost:3000/signup` and the login form at `http://localhost:3000/login` in your web browser.

## Usage

1. **Signup**: Fill out the signup form with a username, email, and password, and click the "Signup" button. Upon successful signup, you will receive an email notification.

2. **Login**: Access the login form, enter your username and password, and click the "Login" button. If the credentials are valid, you will be logged in successfully.

## Dependencies

- Express.js: Web application framework for Node.js
- Mongoose: MongoDB object modeling for Node.js
- Nodemailer: Module for sending emails from Node.js applications

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
