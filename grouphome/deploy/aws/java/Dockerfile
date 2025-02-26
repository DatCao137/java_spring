FROM openjdk:22
COPY /app /app/
WORKDIR /app

# install required modules 
RUN microdnf install findutils

# startup spring boot
RUN sh ./gradlew build
ENTRYPOINT ["java", "-jar", "webapp/build/libs/grouphome-0.0.1-SNAPSHOT.jar"]

EXPOSE 8080
