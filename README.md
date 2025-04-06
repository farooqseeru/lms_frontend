# LMS Frontend

A modern Learning Management System (LMS) frontend built with React, TypeScript, and Docker.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

## Project Structure

```
lms-frontend/
├── src/                # Source files
├── public/            # Static files
├── Dockerfile         # Docker configuration
├── docker-compose.yml # Docker Compose configuration
├── nginx.conf         # Nginx configuration
└── package.json       # Project dependencies
```

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/farooqseeru/lms_frontend.git
   cd lms_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Docker Deployment

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

2. The application will be available at:
   - Frontend: [http://localhost:80](http://localhost:80)
   - API: [http://localhost:8000](http://localhost:8000)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Environment Variables

The following environment variables are required:

```env
REACT_APP_API_URL=http://localhost:8000
```

## Features

- Modern React with TypeScript
- Docker containerization
- Nginx reverse proxy
- Responsive design
- Component-based architecture

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
