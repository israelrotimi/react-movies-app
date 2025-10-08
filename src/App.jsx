import { useEffect, useState } from 'react'
import Search from './components/Search'
import MovieCard from './components/MovieCard'
import Spinner from './components/Spinner'
import { useDebounce } from 'react-use'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
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
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  // Debouunce search term to prevent making too many requests
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  useDebounce(()=> setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${BASE_API_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${BASE_API_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, OPTIONS)
      
      if(!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json()

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies")
        setMovieList([])
        return
      }
      
      setMovieList(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error)
      setErrorMessage("Error fetching movies. Please try again later.")
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

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
          <h2 className="mt-[40px]">All Movies</h2>
          {isLoading ? (
            <p className="text-white">
              <Spinner />
            </p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>

        
      </div>
    </main>
  )
}

export default App