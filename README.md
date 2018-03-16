# microservicesrouter
A docker-compose application that builds containers for two SPA and four APIs. It is necessary that Docker Engine and Docker Compose are already installed. On Docker for windows, both are installed at the same time

- Inside services folder, create the directory `auth-db/data/db`
- In the root folder, run (with sudo if you are on linux) 
```
docker-compose build
```

- In the root folder, run (with sudo if you are on linux) 
```
docker-compose up
```

On http://localhost:4200/home you can manage the application
