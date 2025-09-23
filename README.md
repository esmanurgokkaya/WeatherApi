🌦 Weather API 

A minimal Node.js + Express boilerplate for building a weather service API.
Currently includes only a health check endpoint and project setup.

📦 Setup
git clone https://github.com/esmanurgokkaya/WeatherApi.git
cd weather-api
npm install
cp .env.example .env


Edit .env:

NODE_ENV=
PORT=
JWT_SECRET=
DB_URI=

▶️ Run
npm run dev   # development with nodemon
npm start     # production


npx prisma db push 

npx prisma migrate deploy

