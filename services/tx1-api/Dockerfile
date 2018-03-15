FROM maven:3.5-jdk-8 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY ./src /usr/src/app
RUN  mvn clean
RUN  mvn package

FROM openjdk:8
COPY --from=builder  /usr/src/app/target/baseapi-0.0.0.1.jar /user/src/
WORKDIR /user/src/
CMD ["java", "-jar", "baseapi-0.0.0.1.jar"]

EXPOSE 8080