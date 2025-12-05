# Face Recognition Brain - Frontend

A modern React application that uses AI-powered face detection to identify faces in images. This project demonstrates the integration of machine learning APIs with a clean, user-friendly interface.

## 🚀 Features

- **Face Detection**: Detects and highlights faces in uploaded images
- **User Authentication**: Secure sign-in and registration system with JWT
- **Real-time Processing**: Instant face detection results
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Entry Tracking**: Keeps count of how many images each user has processed

## 🛠️ Technologies Used

- **React** - Frontend framework
- **Create React App** - Project setup and build configuration
- **Tachyons** - Lightweight CSS framework
- **Particles.js** - Interactive background animations
- **Clarifai API** - Face detection machine learning model

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- A running instance of the [backend API](https://github.com/ckapsalis2710/face-recognition-brain-api)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/ckapsalis2710/face-recognition-brain.git
cd face-recognition-brain
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables file:
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:3000
```

For production, update the API URL accordingly:
```env
REACT_APP_API_URL=https://your-backend-api-url.com
```

4. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

### `npm start`
Runs the app in development mode. The page will automatically reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. The build is optimized for best performance.

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App, giving you full control over configuration files.

## 🎯 Usage

1. **Register/Sign In**: Create an account or log in to an existing one
2. **Enter Image URL**: Paste a URL of an image containing faces
3. **Detect Faces**: Click the "Detect" button to process the image
4. **View Results**: The app will draw boxes around detected faces
5. **Track Progress**: Your entry count increases with each detection

## 🏗️ Project Structure

```
face-recognition-brain/
├── public/
├── src/
│   ├── components/      # Reusable React components
│   ├── App.js          # Main application component
│   ├── App.css         # Application styles
│   └── index.js        # Application entry point
├── .env                # Environment variables (not in repo)
├── package.json
└── README.md
```

## ⚙️ Environment Variables

The application requires the following environment variable:

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API endpoint | `http://localhost:3000` |

**Important**: Never commit your `.env` file to version control. Add it to `.gitignore`.

## 🔗 Backend Integration

This frontend application requires the backend API to be running. The backend handles:
- User authentication with JWT
- Database operations
- Image processing coordination
- Session management with Redis

Backend repository: [face-recognition-brain-api](https://github.com/ckapsalis2710/face-recognition-brain-api)

## 🐛 Known Issues & Fixes

This repository includes fixes from the original Zero to Mastery course project to ensure compatibility with current dependencies and best practices.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/ckapsalis2710/face-recognition-brain/issues).

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**ckapsalis2710**

- GitHub: [@ckapsalis2710](https://github.com/ckapsalis2710)

## 🙏 Acknowledgments

- Based on the Zero to Mastery course project
- Powered by Clarifai's face detection API
- Built with Create React App

## 📚 Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [Clarifai Documentation](https://docs.clarifai.com/)

---

**Note**: Make sure to configure your environment variables and ensure the backend API is running before starting the application.