# Tennis Dashboard Backend

Enterprise-level Spring Boot application for managing tennis player data.

## Technologies Used

- Java 17
- Spring Boot 3.1.4
- Spring Security
- Spring Data JPA
- PostgreSQL
- Swagger/OpenAPI Documentation
- JWT Authentication (prepared for implementation)
- Maven
- Lombok

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- PostgreSQL 12 or higher

## Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE tennis_db;
```

2. Configure the database connection in `src/main/resources/application.yml`

3. Build the project:
```powershell
mvn clean install
```

4. Run the application:
```powershell
mvn spring-boot:run
```

The application will start on http://localhost:8080/api

## API Documentation

Access the Swagger UI documentation at:
- http://localhost:8080/api/swagger-ui.html

The OpenAPI specification is available at:
- http://localhost:8080/api/api-docs

## Project Structure

```
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/tennis/dashboard/
│   │   │       ├── config/           # Configuration classes
│   │   │       ├── controller/       # REST controllers
│   │   │       ├── dto/             # Data Transfer Objects
│   │   │       ├── model/           # Entity classes
│   │   │       ├── repository/      # JPA repositories
│   │   │       ├── security/        # Security configuration
│   │   │       ├── service/         # Business logic
│   │   │       └── TennisDashboardApplication.java
│   │   └── resources/
│   │       └── application.yml      # Application configuration
│   └── test/                        # Test classes
└── pom.xml                          # Maven configuration
```

## Features

- CRUD operations for tennis players
- Global exception handling
- Input validation
- Swagger documentation
- Security configuration (basic setup)
- Enterprise-level project structure
- Transaction management
- Database integration