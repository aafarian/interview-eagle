# Interview Eagle 🦅

## Features
- User authentication with Firebase
- Interview question generator powered by Together.ai
- Interactive multiple choice questions
- Dark/Light mode support
- File-based routing

## Prerequisites
- Node.js
- npm
- Expo CLI
- Firebase account
- Together.ai API key

## Environment Setup

1. Create a `.env` file in the root directory based on `.env.example`:
```bash
EXPO_PUBLIC_TOGETHER_API_KEY=your_api_key_here
EXPO_PUBLIC_TOGETHER_API_URL=https://api.together.xyz/v1/chat/completions
EXPO_PUBLIC_TOGETHER_MODEL=meta-llama/Llama-3.3-70B-Instruct-Turbo
EXPO_PUBLIC_TOGETHER_TEMPERATURE=0.9
EXPO_PUBLIC_TOGETHER_MAX_TOKENS=500

EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id_here
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
EXPO_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id_here
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id_here
```

## Getting Started

1. Install dependencies
```bash
npm install
```

2. Start the development server
```bash
npx expo start
```

## Development Options

In the development server output, you'll find options to open the app in:
- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

## Project Structure
```
interview-eagle/
├── app/                   # Main application code
│   ├── (auth)/           # Authentication screens
│   ├── (tabs)/           # Tab-based navigation
│   └── _layout.tsx       # Root layout
├── components/           # Reusable components
├── assets/              # Images, fonts, etc.
├── .env                 # Environment variables (not in git)
├── .env.example         # Example environment variables
└── firebaseConfig.js    # Firebase configuration
```

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [React Native documentation](https://reactnative.dev/)
- [Firebase documentation](https://firebase.google.com/docs)
- [Together.ai documentation](https://docs.together.ai/)

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

Note: Make sure not to commit any sensitive information or API keys.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
