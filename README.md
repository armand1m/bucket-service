# Microservice Barebone

This is a microservice project barebone project for the `armand1m/microservices` environment.

This project **does not** contains any code implementation for a service. 
This is only the barebone project to kickstart a service that compatible with the `armand1m/microservices` environment.

It includes a simple `docker-compose.yml` defining this service, and extending the services from `armand1m/core-services`, 
it also includes a `properties.env` file that contains some environment variables. 

You can edit these files in order to parametrize your service as needed.

Make your implementation inside the `./service` folder.

## Running
    $ sudo docker-compose up -d

## Testing

_(soon)_

## Logging
    $ sudo docker-compose logs