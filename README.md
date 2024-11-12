Project Setup
1. Clone the Repository
Clone the repository to your local machine by using the command - git clone <repo_url>

Running the Backend:
The backend code is in the backend folder.
1.Open the backend folder in VS Code.
2.In the terminal, run the following command to install dependencies:
- npm install
3.Start the backend server, run the following command:
- npm start
4.If successful, you'll see the following phrases on the console:
db connected
server running at port 3000

Running the Frontend:
The frontend code is in the frontend folder.
1.Open the frontend folder in VS Code.
2.In the terminal, run the following command to install dependencies:
-npm install
3.Start the frontend application:, run the following command:
- npm start
4.The frontend will run at http://localhost:3001/.

Project Overview:
Once the project is running, visit http://localhost:3001/ in your browser. You’ll see a signup form allowing users to register. Here’s a quick rundown of the main features:
- Signup/Login: New users can register, and existing users can log in.
- Home Page: Displays all registered users. A greeting displays the logged-in user's name in the header, allowing them to update their profile by clicking on it.
- Update Details: Users can update their information.
- Delete Users: Users can delete other users' profiles.

Routes:
Signup/Login Page: http://localhost:3001/
Home Page: http://localhost:3001/home
Update Page: http://localhost:3001/update
