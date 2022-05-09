<template>
  <div id="Inicio">  
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="/">Home</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li v-if="!user" class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li v-if="user" class="nav-item">
                    <a class="nav-link" href="/perfil">Profile</a>
                </li>
                <li v-if="user" class="nav-item">
                    <a @click="logout" class="nav-link" href="/">Logout</a>
                </li>
            </ul>
            <input v-model="busqueda" class="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search">
            <button @click="buscarPelicula()" class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
        </div>
    </nav>

    <div class="d-flex justify-content-center">
      <h1>YOUR FAVOURITE FILMS / TV SERIES</h1>
    </div>

    <div class="d-flex justify-content-center">
      <p>Filter by genre:<select id="choosenGenre"><option value="" selected disabled hidden>Choose genre</option><option v-for="category in setCategories" :key="category" :value="category" @click="filterByGenre()">{{category}}</option></select></p>
    </div >

    <div class="d-flex justify-content-center">
      <p>Sort by: <select id="orderBy"><option value="" selected disabled hidden>Choose option...</option><option v-for="order in orderByList" :key="order" :value="order" @click="sortList()">{{ order }}</option></select></p>
    </div >
    
    <div class="container">
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
        orderByList: ["Title ascendent", "Title descendent", "Rating ascendent", "Rating descendent"],
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
        axios.get(`${process.env.VUE_APP_BACK_URL}/api/v1/user/films`, {headers: {
            "x-access-token": localStorage.user
        }}).then(response => {
          console.log(response)
            var lista = response.data.films[0].films;
            for (let i = 0; i < lista.length; i++) {
                const element = lista[i];
                this.peliculas.push(element);
                element.Genre.split(",").forEach(genre => {
                  this.setCategories.add(genre);
                });
            }
            this.peliculas = this.peliculas.sort((a, b) => {
              return a.Title.localeCompare(b.Title);
            });
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