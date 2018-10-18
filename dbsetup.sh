#!/bin/sh

# Run the MySQL container, with a database named 'users' and credentials
# for a users-service user which can access it.
echo " => Starting the mysql container ... "
docker run --name db -d \
  -e MYSQL_ROOT_PASSWORD=123 \
  -e MYSQL_DATABASE=webmonitor-dev -e MYSQL_USER=dev -e MYSQL_PASSWORD=123 \
  -p 3306:3306 \
  mysql:latest

# Wait for the database service to start up.
echo " => Waiting for the DB service to start ... "
docker exec db mysqladmin --silent --wait=30 -udev -p123 ping || exit 1