# Semester 6 - Enterprise Software

## Project description
This project is web-app audio player(such as Storytell). Users can enjoy listening to books of their desire, and also to publish their own.

### Tech stack
In this repo you can find the backend services of AUDIOPAGE.


1. Audiopage Microservices

    2.1 **Node JS** - microservices development

    2.2 **Sequelize** - ORM

    2.3 **PostgreSQL** - database

    2.4 **Amazon RDS** - cloud storage
    
    2.5 **RabbitMQ** - messaging queues

2. DevOps - Infrastrucutre

    3.1 **Docker** - containarization platform

    3.3 **Google Cloud** - cloud provider
    
    3.4 **Kubernetes** - autoscaling
    
    3.5 **k6 load testing** - load testing
    
 
## About the repository
All services, related to this project, are part of this repository. Here is a brief explanation about the strucutre:

    -audiopage
        - users_ms          // account service
            - docker
        - books_ms     // book storage and interaction service
            - docker
        - library_ms // personal book storage
            - docker
        - docker-compose // local network
        - nginx // gateway
            - nginx.conf
        - load-testing // see if it scales?
            - load.js
# Config

NPM

inject initial user roles.
INSERT INTO roles VALUES (1, 'user', now(), now());
INSERT INTO roles VALUES (2, 'admin', now(), now());
