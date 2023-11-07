
//Guardamos la key de la api
let apiKey = '65021451a394e28f3dea93eeda0fe97f'

//Guardamos las url
const urlBase = 'https://api.themoviedb.org/3/search/movie'
let urlImg = 'https://image.tmdb.org/t/p/w200'

//Recuperamos el div donde vana  ir las peliculas
let resultContainer = document.getElementById('results')


//Creamos la funcion que se comunique con la api al pulsar el boton
const searchMovies = () => {

    resultContainer.innerHTML = 'Cargando...' //Por si tarda que se vea que esta cargando
    //Guardamos el nombre que se va a buscar
    let searchInput = document.getElementById('searchInput').value

    //Llamamos a la API
    fetch(`${urlBase}?query=${searchInput}&api_key=${apiKey}`)
        .then(res => res.json())
        .then(result => displayMovies(result.results)) //le pasamos el array de peliculas
}

//Lo ponemos a la escucha y le pasamos un callback
document.getElementById('searchButton').addEventListener('click',searchMovies) 

const displayMovies= (movies) => {

    resultContainer.innerHTML = '' //Lo vaciamos para poder meter las peliculas

    if(movies.length === 0){ //Si el array tiene 0 posiciones es decir esta vacio
        resultContainer.innerHTML = '<p> No se han encontrado resultados para esta búsqueda</p>'
        return //Para que salga de la funcion
    }

    movies.forEach(movie => { //Recorremos cada elemento del array

        //Creamos un div para cada pelicula y le añadimos la clase movie
        let movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')

        //Creamos el titulo y lo recuperamos de la llamada a la API
        let title = document.createElement('h2')
        title.textContent = movie.title //es movie. el nombre que viene en el json

        //Igual con la fecha
        let releaseDate = document.createElement('p')
        releaseDate.textContent = 'Fecha de estreno: '+ movie.release_date

        //Ahora descripcion
        let overview=document.createElement('p')
        overview.textContent =  movie.overview

        //Y la imagen que obtenemos de la url
        let posterPath = urlImg + movie.poster_path //De nuevo se mira en la documentacion
        let poster = document.createElement('img')
        poster.src= posterPath

        //Lo primero es meter el nuevo en el que ya tenemos(results)

        resultContainer.appendChild(movieDiv)

        

        //Una vez creado todo se añade al div
        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)

       
        
    })

}