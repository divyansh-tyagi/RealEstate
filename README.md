# RealEstateApp

RealEstateApp is a React Native application that allows users to browse and unlock real estate properties. It uses Expo for development and deployment, React Navigation for navigation, and React Query for data fetching and state management.

## Features

- View a list of homes with images, addresses, and descriptions.
- View detailed information about a selected home.
- Unlock a home if you are within a certain distance of it.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- [Expo Go App](https://expo.dev/client) (available on iOS and Android)

## Getting Started

Follow these steps to set up and run the project:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/RealEstateApp.git
cd RealEstateApp
```

### 2. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Start the Development Server

Start the Expo development server with:

```bash
npm start
```

This will open the Expo Developer Tools in your browser and display a QR code in your terminal.

### 4. Run the App on Your Device

1. Install the **Expo Go** app on your mobile device from the [App Store](https://apps.apple.com/) or [Google Play Store](https://play.google.com/).
2. Open the Expo Go app and scan the QR code displayed in your terminal or browser.
3. The app will load on your device.


## Project Structure

```
RealEstateApp/
├── [`App.js`](App.js )                 # Main application entry point
├── [`app.json`](app.json )               # Expo configuration
├── [`index.js`](index.js )               # Entry point for Expo
├── [`package.json`](package.json )           # Project dependencies and scripts
├── screens/               # Contains app screens
│   ├── [`screens/HomeScreen.js`](screens/HomeScreen.js )      # Home screen displaying the list of homes
│   └── [`screens/DetailScreen.js`](screens/DetailScreen.js )    # Detail screen for a selected home
├── services/              # Contains API services
│   └── [`services/api.js`](services/api.js )             # API functions for fetching and unlocking homes
├── assets/                # Static assets (icons, images)
└── .gitignore             # Files and directories to ignore in Git
```

## API Details

The app uses the following APIs:

- **Get Homes**: Fetches a list of homes from the mock API.
- **Unlock Home**: Sends a request to unlock a home.

## Dependencies

The project uses the following key dependencies:

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Query](https://tanstack.com/query/v5)
- [Axios](https://axios-http.com/)

## Troubleshooting

- If the QR code does not appear in the terminal, ensure the Expo CLI is installed globally.
- If the app does not load on your device, ensure your device and computer are on the same Wi-Fi network.

## License

This project is licensed under the [0BSD License](LICENSE).
