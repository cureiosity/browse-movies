const apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=9c05bfa9fd21923d33ba2cdcfc64c52c&query='
let searchString = ''
  
function fetchIt() {
  fetch(`${apiUrl}${searchString}`)
    .then(result => result.json())
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.error("Error --- ", err)
    })
}
fetchIt()
