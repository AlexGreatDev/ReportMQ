 
# Invoice and Daily Sales Report System

ReportMQ is a microservice-based system designed to handle invoice creation and automated daily sales reporting using a message queue.
It leverages RabbitMQ for asynchronous event-driven communication and MongoDB for persistent storage.

The architecture follows separation of concerns across two services:

Invoice Service: Responsible for handling invoice data and publishing sales events to the queue.

Email Sender Service: Consumes sales events from the queue and sends formatted sales reports via email.

This project uses NestJS, Docker, and RabbitMQ to demonstrate scalable, event-driven service communication.



## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup Instructions](#setup-instructions)
3. [How to Run the Services](#how-to-run-the-services)
5. [Testing](#testing)
6. [Additional Notes](#additional-notes)

## Prerequisites

Before running the project, ensure the following software is installed:

- **Node.js** 
- **Docker**  
- **MongoDB** (If not using Docker) 
- **RabbitMQ** (If not using Docker)

## Setup Instructions

**Docker**

1. Build Docker containers using `docker-compose up --build`
2. Open the application at `http://localhost:3000`

**Nest Js**

1. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

    `.env` file 
   ```env
   RABBITMQ_URL=amqp://localhost:5672      
   ```

5. **Start the Application:**

   ```bash
   npm run start
   ```
   This will start the application .

## How to Run the Services

The system consists of two main services:

1. **Invoice Service** - Handles the creation of invoices and stores them in MongoDB.
2. **Email Sender Service** - Consumes the sales report from RabbitMQ and sends an email with the report.

### Running Both Services


1. Start the **invoice service**:

   ```bash
   cd invoice-service
   npm run start
   ```

2. Start the **email sender service**:

   ```bash
   cd email-sender-service
   npm run start
   ```


## Testing


```bash
npm run test
```


## Additional Notes

- **Swagger Documentation:**

The Swagger UI Open Api:
 ```bash
    http://localhost:3000/api
   ```
