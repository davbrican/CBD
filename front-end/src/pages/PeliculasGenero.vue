<template>
  <div id="Inicio">  
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">Inicio</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li v-if="!user" class="nav-item">
                    <a class="nav-link" href="/login">Iniciar Sesión</a>
                </li>
                <li v-if="user" class="nav-item">
                    <a class="nav-link" href="/perfil">Perfil</a>
                </li>
                <li v-if="user" class="nav-item">
                    <a @click="logout" class="nav-link" href="/">Cerrar Sesion</a>
                </li>
            </ul>
            <input v-model="busqueda" class="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search">
            <button @click="buscarPelicula()" class="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
        </div>
    </nav>

    <h1>PELICULAS BUSCADAS POR LOS USUARIOS</h1>

    <div class="allFilms" v-for="(pelicula, index) in peliculas" :key="index">
        <div class="column1">
            <a style="color: blue;text-decoration: underline blue; cursor: pointer;" @click="redirectFilm(pelicula.Title)"><img class="imagenPortada" v-bind:src="pelicula.Poster" alt="" /></a>
            <h1>{{pelicula.Title}}</h1>
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
        vuetify: new Vuetify()
    }
  },
  methods: {
    redirectFilm(title) {
        window.location.href = `/contenido/${title}`;
    },
    obetenerPeliculas() {
        var genero = window.location.href.split("/")[5];
        axios.get(`${process.env.VUE_APP_BACK_URL}/api/v1/film/genre?genre=${genero}`)
        .then(response => {
            if (response.status == 200) {
                this.peliculas = response.data;
                console.log(this.peliculas);
            }
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    },
    buscarPelicula() {
      window.location.href = `/contenido/${this.busqueda}`;
    },
    logout() {
        localStorage.removeItem('user');
    }
  },
  mounted() {
      this.obetenerPeliculas();
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