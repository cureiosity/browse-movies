let date = new Date()
let month = date.getMonth() + 1
if ((month.length = 1)) month = `0${month}`
const day = date.getDate()
const year = date.getFullYear()
date = `${year}-${month}-${day}`

const apiGenre =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=9c05bfa9fd21923d33ba2cdcfc64c52c&language=en-US"
const apiSearchPt1 =
  "https://api.themoviedb.org/3/discover/movie?api_key=9c05bfa9fd21923d33ba2cdcfc64c52c&language=en-US&sort_by=primary_release_date.desc&page=1&primary_release_date.lte="
const apiSearchPt2 = date
const apiSearchPt3 = "&with_genres="
let apiSearchPt4 = null

function fetchGenres() {
  fetch(apiGenre)
    .then((result) => result.json())
    .then((result) => {
      result.genres.forEach((element) => {
        genreList.push(element)
        // console.log(element.name, element.id)
      })
      genreDropdownGen()
    })
    .catch((err) => {
      console.error("Error --- ", err)
    })
}
fetchGenres()

function fetchSearchResults(genre) {
  apiSearchPt4 = genre
  const apiSearchWhole =
    apiSearchPt1 + apiSearchPt2 + apiSearchPt3 + apiSearchPt4

  fetch(apiSearchWhole)
    .then((result) => result.json())
    .then((result) => {
      for (i = 0; i < 6; i++) {
        const element = result.results[i]
        // console.log(element)
        moviePosterUrls.push(element.poster_path)
        const newMovie = new Movie(
          element.poster_path,
          element.title,
          element.release_date,
          element.overview
        )
        movies.push(newMovie)
      }
      // console.log(movies)
      movieDataGen()
    })
    .catch((err) => {
      console.error("Error --- ", err)
    })
}

const genreList = []
const genreDropdown = document.querySelector("#genre-select")
const movies = []
const moviePosterUrls = []
const main = document.querySelector("main")
const postersContainer = document.querySelector("#posters-container")

class Movie {
  constructor(moviePosterUrl, name, releaseDate, description) {
    this.moviePosterUrl = moviePosterUrl
    this.name = name
    this.releaseDate = releaseDate
    this.description = description
  }
}

genreDropdown.addEventListener("change", (e) =>
  fetchSearchResults(e.target.value)
)

function genreDropdownGen() {
  genreList.forEach((genre) => {
    let option = document.createElement("option")
    option.value = genre.id
    option.innerText = genre.name
    genreDropdown.appendChild(option)
  })
}

function movieDataGen() {
  for (let i = 0; i < 6; i++) {
    let moviePoster = document.createElement("img")
    let letters = "abcdef"
    moviePoster.classList.add("posters")
    moviePoster.id = letters[i]
    moviePoster.src = `https://image.tmdb.org/t/p/w500${moviePosterUrls[i]}`
    postersContainer.appendChild(moviePoster)
  }
  const posters = document.querySelectorAll(".posters")
  posters.forEach((poster) => {
    poster.addEventListener("click", modalGen)
  })
}

function modalGen() {
  let modalBackground = document.createElement("div")
  modalBackground.classList.add("modal-bg")
  modalBackground.innerHTML = `
  <div class="modal">
  <span class="modal-close">X</span>
    <img src="https://image.tmdb.org/t/p/w500${movies[0].moviePosterUrl}">
    <h4>${movies[0].name}</h4><br>
    <h6>${movies[0].releaseDate}</h6><br>
    <h6>${movies[0].description}</h6>
  </div>
    `
  main.appendChild(modalBackground)
  const xButton = document.querySelector(".modal-close")
  xButton.addEventListener("click", function () {
    modalBackground.remove()
  })
}
