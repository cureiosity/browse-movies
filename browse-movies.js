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
        console.log(element.name, element.id)
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
      console.log(result)
      console.log(apiSearchWhole)
      result.results.forEach((element) => {
        moviePosterUrls.push(element.poster_path)
      })
      moviePosterGen()
    })
    .catch((err) => {
      console.error("Error --- ", err)
    })
}

const genreList = []
const genreDropdown = document.querySelector("#genre-select")
const moviePosterUrls = []
const main = document.querySelector("main")
const posters = document.querySelector("#posters")

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

function moviePosterGen() {
  for (let i = 0; i < 6; i++) {
    let moviePoster = document.createElement("img")
    let letters = "abcdef"
    moviePoster.id = letters[i]
    moviePoster.src = `https://image.tmdb.org/t/p/w500${moviePosterUrls[i]}`
    posters.appendChild(moviePoster)
  }
}
