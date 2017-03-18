# Bucket Microserivce

![Build Status](https://github.com/armand1m/bucket-service/blob/master/.github/bucket-icon.png)

This is a microservice project for the `armand1m/microservices` environment.

This project is a bucket service implemented in Node.

It allows you to serve and upload static files.

It exposes the following routes:

 - `GET /bucket/raw`: Search through the static files.
 - `POST /bucket`: Accepts a multipart request for uploading static files.

It includes a simple `docker-compose.yml` defining this service, and extending the services from `armand1m/core-services`.

It also includes a `properties.env` file that contains some environment variables. You can set the path to serve at the environment variable `BUCKET_PATH`, specified in this file, for example.

You can edit these files in order to parametrize this service to match your needs.

The implementation can be found inside the `./service` folder.

## Running
    $ ./commands/run

## Testing
    $ ./commands/test

## Logging
    $ ./commands/log
