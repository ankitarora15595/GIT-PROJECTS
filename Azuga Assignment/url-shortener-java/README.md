# URL Shortener Service

This project is a URL Shortener Service implemented in Java using Spring Boot. It allows users to shorten long URLs and retrieve them using the shortened version.

## Project Structure

```
url-shortener-java
├── src
│   └── main
│       └── java
│           └── com
│               └── example
│                   ├── App.java
│                   ├── controller
│                   │   └── UrlController.java
│                   ├── service
│                   │   └── UrlService.java
│                   └── model
│                       └── Url.java
├── pom.xml
└── README.md
```

## Technologies Used

- Java
- Spring Boot
- Maven

## Features

- Shorten a long URL
- Retrieve the original URL using the shortened version
- Simple RESTful API for URL management

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd url-shortener-java
   ```

3. Build the project using Maven:
   ```
   mvn clean install
   ```

4. Run the application:
   ```
   mvn spring-boot:run
   ```

5. Access the API at `http://localhost:8080/url`.

## API Endpoints

- `POST /url`: Create a shortened URL.
- `GET /url/{shortenedUrl}`: Retrieve the original URL.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.