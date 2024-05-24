#FROM maven:3.8.3-openjdk-17 AS build
#WORKDIR /app
#COPY . /app/
#RUN mvn clean package

#FROM openjdk:17-jdk-slim
#WORKDIR /app
#COPY --from=build /app/target/*.jar /app/app.jar
#EXPOSE 8080
#
#ENTRYPOINT ["java", "-jar","app.jar"]
FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/Challenge_Liter_Alura-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app_biblioteca.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app_biblioteca.jar"]
