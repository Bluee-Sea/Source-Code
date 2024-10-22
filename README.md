# Source-Code

### Project Structure
```
root/
│
├── client/              # Frontend (ReactJS + Tailwind CSS)
│   ├── public/          # Static assets
│   └── src/
│       ├── components/  # Reusable React components
│       ├── pages/       # Page components (e.g., Signup, Login, Dashboard)
│       ├── App.js       # Main app component
│       ├── index.js     # React entry point
│       └── tailwind.config.js  # Tailwind CSS config
│
└── server/              # Backend (Node.js + MongoDB)
    ├── config/          # Configuration (e.g., DB connection, environment variables)
    ├── controllers/     # Business logic (handling requests/responses)
    ├── models/          # Mongoose models (User schema)
    ├── routes/          # API routes (Signup, Login, etc.)
    ├── middleware/      # Middlewares (auth, validation, etc.)
    ├── utils/           # Utility functions (token generation)
    ├── server.js        # Express server entry point
    └── .env             # Environment variables

```
