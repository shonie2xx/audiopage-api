# Semester 6 - Enterprise Software

## Project description
This project is web-app audio player(such as Storytell). Users can enjoy listening to books of their desire, and also to publish their own.

### Tech stack
There are three main parts of the project, regarding the tech stack of this project.

1. Frontend Project - Audiopage Client
    
    1.1  **React JS** - frontend framework

    1.2 **Material UI** - component library & CSS utility library 

2. Backend Project - Audiopage Microservices

    2.1 **Node JS** - microservices development

    2.2 **Sequelize** - ORM

    2.3 **PostgreSQL** - database

    2.4 **Amazon RDS** - cloud storage

3. DevOps - Infrastrucutre

    3.1 **Docker** - containarization platform

    3.3 **AWS Fargate** - cloud provider

## About the repository
All subprojects, related to this project, are part of this repository. Here is a brief explanation about the strucutre:

    -audiopage
        - users_ms          // account service
            - docker
        - audiobooks_ms     // audiobook_service
            - docker

# Config

put this into db users roles;
INSERT INTO roles VALUES (1, 'user', now(), now());