import { useEffect, useState } from 'react'
import Search from './components/Search'
import MovieCard from './components/MovieCard'
import Spinner from './components/Spinner'
import { useDebounce } from 'react-use'
import { updateSearchCount, getTrendingMovies } from './appwrite'

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
  const [trendingMovies, setTrendingMovies] = useState([])
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

      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0])
      }
    } catch (error) {
      console.error("Error fetching movies:", error)
      setErrorMessage("Error fetching movies. Please try again later.")
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies =  await getTrendingMovies()

      setTrendingMovies(movies)
    } catch (error) {
      console.error("Error fetching trending movies:", error)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(() => {
    loadTrendingMovies()
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

        {trendingMovies.length > 0 && (
        <section className="trending">
          <h2>Trending Movies</h2>
          <ul>
            {trendingMovies.map((movie, index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.title} />
              </li>
            ))}
          </ul>
        </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
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