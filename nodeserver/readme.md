## Node js Authentication Server

Make sure the Apache and Mysql is running befor starting the Node Srever

To start it alunch the XAMPP application and hit Start for Apache and Mysql.

There is Database in Mysql server:
DB Name: test
Table NAme: admin

**Table content:**

id  username    password    role

1   aman        aman        1

2   jhon        jhon        2

3   bob         bob         2

If you change the table name or db name, please make changes in the App.js file respectively.

## Start the Node server

To make sure no dependency is missing please run:

npm install in root folder where app.js file is there.

Now, start the Node server:

node .\App.js

## Logger - Winston

Logs will be collected in results.log file usoing Winston logger





