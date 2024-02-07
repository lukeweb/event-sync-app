# EventSyncApp

EventSyncApp is a real-time event organization application that allows event organizers to efficiently plan and manage events.

## Getting Started

### Environment Configuration

Before running the application, make sure to set up your environment variables. Copy the `.env.dist` file to `.env` and configure the necessary variables.

### Running MongoDB and MongoDB Express with Docker Compose

EventSyncApp uses MongoDB as its database. To easily set up MongoDB and MongoDB Express, you can use Docker Compose. Make sure you have Docker installed on your machine.

1. Navigate to the root directory of the project.
2. Run the following command to start MongoDB and MongoDB Express:
   ```bash
   docker-compose up -d
   ```
3. Log in to MongoDB Express and create a new database with the name specified in the .env file.

## Starting the Application

To start the EventSyncApp:

1. Install dependencies
```
yarn install
```
2. Start the application:
```
yarn dev
```

## Running Unit Tests
EventSyncApp comes with unit tests to ensure its reliability. To run the tests:
```
yarn test
```
