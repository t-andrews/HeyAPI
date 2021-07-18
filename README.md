# HeyAPI
[![CircleCI](https://circleci.com/gh/t-andrews/HeyAPI.svg?style=svg)](https://circleci.com/gh/t-andrews/HeyAPI)

## Summary
This project is a way to explore interesting technologies like [Apollo Server](https://www.apollographql.com/docs/) and [TypeGraphQL](https://typegraphql.com/) 
as well as CI/CD tools like [CircleCI](https://circleci.com/) and [Heroku](https://dashboard.heroku.com/) with a subject I personally enjoy (Sumo). 
The end goal is to create an API that can be extended so that it can be used to store and retrieve the data from the main sumo association (the Japan Sumo Association).

## Installation
To install the needed dependencies, run the following command in the repository's root:
```
npm install
```

### Running locally
#### Setting up the database
1) Before starting the API, A PostgreSQL database with the name `sumodb-dev` must be created on your machine. 

2) To create the tables, run the latest migration with the following command:
    ```
    npm run knex:migrate:latest
    ```

3) To fetch the required dataset, run the following command (with a valid data.world API token):
    ```
    npm run fetch:dataset token=your_data.world_api_token
    ```

4) To populate the database, run the following command:
     ```
    npm run knex:seed:run
    ```

#### Starting the API
To start the API locally, run the following command:
```
npm run start:dev
```

The GraphQL Playground should now be available on the url logged in the terminal!
