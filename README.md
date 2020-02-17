# Test full stack position

## Available Scripts

In the project directory, you can run:

### `yarn initDB`

Script will import posts and users from https://jsonplaceholder.typicode.com/posts and https://jsonplaceholder.typicode.com/users endpoint and insert into local database MongoDB

### `yarn start`

Express server will be running on port 3000

It also hanles static ./public folder 

Navigate to http://localhost:3000 to see simple html page that shows posts (Id, Title, Text and Author) fetched from MongoDB database