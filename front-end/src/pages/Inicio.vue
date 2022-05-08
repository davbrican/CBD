<template>
  <div id="Inicio">  
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">Home</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li v-if="!user" class="nav-item">
                    <a class="nav-link" href="/login">Log in</a>
                </li>
                <li v-if="user" class="nav-item">
                    <a class="nav-link" href="/perfil">Profile</a>
                </li>
                <li v-if="user" class="nav-item">
                    <a @click="logout" class="nav-link" href="/">Log out</a>
                </li>
            </ul>
            <input v-model="busqueda" class="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search">
            <button @click="buscarPelicula()" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </div>
    </nav>


    <h1>FILMS / TV SERIES SEARCHED BY USERS</h1>
    <pre>Filter by genre:<select id="choosenGenre"><option value="" selected disabled hidden>Choose genre</option><option v-for="category in setCategories" :key="category" :value="category" @click="filterByGenre()">{{category}}</option></select></pre>
    <pre>Sort by: <select id="orderBy"><option value="" selected disabled hidden>Choose option...</option><option v-for="order in orderByList" :key="order" :value="order" @click="sortList()">{{order}}</option></select></pre>
    <div class="row" v-if="loadedFilms">
        <div v-for="(pelicula, index) in peliculas" :key="index" class="col-md-3 col-6 my-1">
            <div class="card h-100">
                <a v-if='pelicula.Poster != "N/A"' style="color: blue;text-decoration: underline blue; cursor: pointer;" @click="redirectFilm(pelicula.Title)"><img class="imagenPortada" v-bind:src="pelicula.Poster" alt="" /></a>
                <a v-if='pelicula.Poster == "N/A"' style="color: blue;text-decoration: underline blue; cursor: pointer;" @click="redirectFilm(pelicula.Title)"><img class="imagenPortada" src="@/assets/no-image.png" alt="" /></a>
                <div class="card-body">
                    <div class="card-title"><h3>{{pelicula.Title}}</h3></div>
                </div>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)
import axios from 'axios'

export default {
  data() {
    return {
        peliculas: [],
        busqueda: "",
        user: localStorage.user,
        vuetify: new Vuetify(),
        setCategories: new Set(),
        categoriaSeleccionada: '',
        orderByList: ["Title ascendent", "Title descendent", "Rating ascendent", "Rating descendent"],
        loadedFilms: true,
    }
  },
  methods: {
    sortList() {
      this.loadedFilms = false;
      var orderBy = document.getElementById("orderBy").value;
      if(orderBy == "Title ascendent") {
        this.peliculas.sort(function(a, b) {
            return a.Title.localeCompare(b.Title);
        });
      }
      else if(orderBy == "Title descendent") {
        this.peliculas.sort(function(a, b) {
            return b.Title.localeCompare(a.Title);
        });
      }
      else if(orderBy == "Rating ascendent") {
        this.peliculas.sort(function(a, b) {
            return a.imdbRating.localeCompare(b.imdbRating);
        });
      }
      else if(orderBy == "Rating descendent") {
        this.peliculas.sort(function(a, b) {
            return b.imdbRating.localeCompare(a.imdbRating);
        });
      }
      this.loadedFilms = true;
    },
    filterByGenre() {
      this.categoriaSeleccionada = document.getElementById("choosenGenre").value;
      if (this.categoriaSeleccionada[0] == " ") this.categoriaSeleccionada = this.categoriaSeleccionada.substring(1, this.categoriaSeleccionada.length);
      window.location.href = `/contenido/genero/${this.categoriaSeleccionada}`;
    },
    buscarPelicula() {
      window.location.href = `/contenido/${this.busqueda}`;
    },
    redirectFilm(title) {
        window.location.href = `/contenido/${title}`;
    },
    obtenerPeliculas() {
        axios.get(`${process.env.VUE_APP_BACK_URL}/api/v1/film/all`)
        .then(response => {
            if (response.status == 200) {
                this.peliculas = response.data.sort((a, b) => {
                  return a.Title.localeCompare(b.Title);
                });
                this.peliculas.forEach(element => {
                  element.imdbRating = (element.imdbRating == "N/A") ? "0.0" : element.imdbRating;
                  element.Genre.split(",").forEach(genre => {
                    this.setCategories.add(genre);
                  });
                });
            }
        }).catch(error => {
            console.log(error);
        });
    },
    logout() {
        localStorage.removeItem('user');
    }
  },
  mounted() {
      this.obtenerPeliculas();
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

.column1 {
  float: left;
  width: 20%;
  padding: 10px;
}
.column2 {
  float: left;
  width: 70%;
  padding: 10px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}
img {
  width: 100%;
}
</style>