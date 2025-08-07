#  SkateSpotter

SkateSpotter is a full-stack project that helps skateboarding enthusiasts find, rate, and report skate spots.

##  Features
- Mark skate spots on a map with ratings and photos
- Submit and report new spots by users
- Filter by surface type, difficulty, or location
- Authentication and user roles: users and admins

##  Tech Stack
- **Backend**: Java (Spring Boot)
- **Frontend**: TypeScript (likely React or similar)
- **Database**: MySQL (or similar relational DB)
- **Storage**: Cloudinary or S3 for image uploads
- **Authentication**: JWT-based

##  Getting Started

### Prerequisites
- Java 17+
- Maven
- Node.js & npm or Yarn
- MySQL or compatible DB

### Setup Backend
```bash
cd Backend
# Configure application.properties/env variables
mvn clean install
mvn spring-boot:run
````

### Setup Frontend

```bash
cd Frontend
npm install
npm run dev
```

### Running All Together

* Backend at `http://localhost:8080`
* Frontend at `http://localhost:3000` (adjust ports if needed)
* API env vars and endpoints configured accordingly

## Project Structure

```
SkateSpotter/
├── Backend/       Java + Spring Boot backend
└── Frontend/      TypeScript-based SPA (e.g. React)
```

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/...`)
3. Commit your changes (`git commit -m "feat: ..."`)
4. Push (`git push origin feature/...`)
5. Open a Pull Request

## License

Project licensed under the MIT License. *(ou indique outra licença caso use)*

````