import { useEffect, useState } from 'react'
import Search from './components/Search'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_API_URL = "https://api.themoviedb.org/3/"
const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setsearchTerm] = useState("")
  // const [movies, setMovies] = useState([])
  // const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMovies = async () => {
    try {
      const endpoint = `${BASE_API_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, OPTIONS)
      const data = await response.json()
      throw new Error("Error fetching movies")
    } catch (error) {
      console.error("Error fetching movies:", error)
      setError("Error fetching movies. Please try again later.")
    }
  }
  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <main className="w-full h-full">

      <div className="pattern" />
      
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You&apos;ll Enjoy Witout The Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setsearchTerm} />
        </header>

        <section className="all-movies">
          <h2>All Movies</h2>
          {error && <p className="text-red-500">{error}</p>}
        </section>

        
      </div>
    </main>
  )
}

export default App