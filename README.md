# 🎬 React Movies App

A modern, feature-rich movie discovery and search application built with React and powered by The Movie Database (TMDb) API. Discover trending movies, search for your favorites, and track your search history with Appwrite backend integration.

## ✨ Features

- 🔍 **Smart Search** - Search for movies with debounced search queries to minimize API calls
- 🎭 **Trending Movies** - Discover currently trending movies automatically loaded on app start like in Netflix
- 📱 **Responsive Design** - Fully responsive UI that works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast Loading** - Loading states with spinner animations for better user experience
- 🎨 **Modern UI** - Beautiful, clean interface with Tailwind CSS styling
- 📊 **Movie Details** - View comprehensive movie information including ratings and descriptions

## 🛠️ Technologies Used

- **Frontend Framework**: [React 19](https://react.dev/) - A JavaScript library for building user interfaces
- **Build Tool**: [Vite](https://vitejs.dev/) - Next generation frontend tooling with lightning-fast HMR
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Movie Database**: [The Movie Database (TMDb) API](https://www.themoviedb.org/settings/api) - Comprehensive movie data
- **Backend**: [Appwrite](https://appwrite.io/) - Open-source backend platform for managing search history
- **Hooks**: [react-use](https://github.com/streamich/react-use) - Collection of React hooks including `useDebounce`
- **Code Quality**: [ESLint](https://eslint.org/) - Identify and fix code quality issues

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/israelrotimi/movies-app.git
   cd movies-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add the following variables:
   
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
   VITE_APPWRITE_TABLE_ID=your_appwrite_table_id
   ```

   **How to get these keys:**
   - **TMDb API Key**: Sign up at [TheMovieDatabase.org](https://www.themoviedb.org/settings/api) and generate an API key
   - **Appwrite Credentials**: Set up a project at [Appwrite Cloud](https://cloud.appwrite.io/) and create a database with a table for storing search history

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The application will start at `http://localhost:5173` (or the next available port)

## 📖 Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## 📁 Project Structure

```
movies-app/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   │   ├── MovieCard.jsx    # Component to display individual movie cards
│   │   ├── Search.jsx       # Search input component
│   │   └── Spinner.jsx      # Loading spinner component
│   ├── App.jsx         # Main application component
│   ├── appwrite.js     # Appwrite backend integration
│   ├── main.jsx        # React entry point
│   └── index.css       # Global styles
├── .env.local          # Environment variables (not committed)
├── vite.config.js      # Vite configuration
├── eslint.config.js    # ESLint configuration
├── package.json        # Project dependencies and scripts
└── README.md           # This file
```


## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the movie data API

