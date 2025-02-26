FROM openjdk:22
WORKDIR /app

# install required modules 
RUN microdnf install findutils

# startup spring boot
ENTRYPOINT ["sh", "./gradlew", "build", "--continuous"]

EXPOSE 8080
