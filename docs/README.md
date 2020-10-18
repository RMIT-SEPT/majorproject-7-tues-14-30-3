# SEPT Startup code and  project Structure documentation 

# Quick Start
CircleCI implemented for back/frontend deployment to aws.
However this is unable to be tested due to lack of CircleCI credits.

BackEnd : 
In BackEnd/agme
Simply run the AgmeApplication.java main and the BackEnd should be up and running on port 8080.
Alternatively: run docker-compose file to start a docker container

` http://localhost:8080/h2-console `

Can be used to access the database in order to check the contents.

FrontEnd :
Navigate to the directory ` majorproject-7-tues-14-30-3/FrontEnd/agme_react/my-app ` and then run the command;

`npm start` 

Is required to run React on port 3000. The site can be reached via 

`http://localhost:3000/Dashboard`,  

but you would be automatically redirected to the site after running `npm start`

You need to make sure that the correct dependencies are installed as well. The extra dependencies which you need, separate from what you get from `npm install` are,

Axios, redux, react-redux, redux-thunk, redux-devtools-extension, prop-types.

These can also be installed by running the commands

` npm i axios `
` npm i redux react-redux redux-thunk`
` redux-devtools-extension`
` npm install --save prop-types`

You can test the functionality by signing up as either a worker or a customer and logging in and checking the options available to you in your DashBoard. Advice to create at least one customer and one worker or you won’t be able to properly test the booking functionality as you need one of each in order to book.

Signup to create accounts, login as a valid customer or worker account, customers can create new bookings and view their past and upcoming bookings. Workers can only view their past and upcoming bookings.
