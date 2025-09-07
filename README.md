🚀 Getting Started
To launch the app locally, use the following commands:

bash
npm run dev:start
Starts the backend server and Docker-managed PostgreSQL container together. This gives you database access and logs in one console window.

bash
npm start
Run separately in a second terminal window to start the frontend (React). This keeps backend logs visible while you work, preventing npm from hijacking your console output.

Once the containers are running, you can inspect and manage the PostgreSQL database using pgAdmin at:

🔗 URL: http://localhost:5050 

Default pgAdmin Login:

Email: admin@local.com

Password: admin123

Add a New Server in pgAdmin

1. Open pgAdmin in your browser at http://localhost:5050

2. Log in using the default credentials above

3. Right-click Servers → Create → Server

4. Fill out the connection details:

🔧 General Tab
Name: Any

🌐 Connection Tab
Host name/address: postgres

Port: 5432

Username: chris

Password: secretpass

Database name: shopping_cart

Click Save — you should now see your shopping_cart database listed under the server.

To query the database, right click on it and select query tool, to inspect tables go into schemas ----> tables.

