# WebsiteMonitor
This is a nodejs service which exposes a REST API to monitor website performance .
# How to run
1) Clone this repository.
2) Run npm install to install the dependencies.
3) Create an user on your localhost mysql instance (install if you haven't) with the name admin and password Data123 (This configuration is for demo).
4) Create a database webmonitor for this user. 
5) This project uses sequelize. So its helpful to have sequelize-cli installed locally on the system.
6) Initialize the database using sequelize db:migrate
7) Run npm start to start the service.
