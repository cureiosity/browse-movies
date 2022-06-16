const apiUrl =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=9c05bfa9fd21923d33ba2cdcfc64c52c&language=en-US";
let searchString = "";

function fetchIt() {
  fetch(`${apiUrl}${searchString}`)
    .then((result) => result.json())
    .then((result) => {
      result.genres.forEach((element) => {
        genreList.push(element.name);
      });
      genreDropdownGen();
    })
    .catch((err) => {
      console.error("Error --- ", err);
    });
}
fetchIt();

const genreList = [];
const genreDropdown = document.querySelector("#genre-select");

function genreDropdownGen() {
  genreList.forEach((genre) => {
    let option = document.createElement("option");
    option.value = genre;
    option.innerText = genre;
    genreDropdown.appendChild(option);
  });
}
