<template>
  <div id="Pelicula" >
     
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

    <div class="column3" v-if="!notFound">
        <img class="imagenPortada" v-bind:src="imagen" alt="" />
    </div>
    <div class="column4" v-if="!notFound">
      
        <h1>{{titulo}} <button @click="guardarContenido" v-if="user && !userLikes"><img src="@/assets/emptyHeart.svg" style="width: 20px;" /></button><button @click="guardarContenido" v-if="user && userLikes"><img src="@/assets/filledHeart.svg" style="width: 20px;" /></button></h1>
        
        <strong>Géneros:</strong> 
        <div v-for="genero in generos.split(',')" :key="genero">
          <a style="color: blue;text-decoration: underline blue; cursor: pointer;" @click="redirectGenre(genero)">{{genero}}</a>
        </div>
        <br>
        <p><strong>Duración:</strong> {{duracion}}</p>
        <p><strong>Valoración media:</strong></p>
        <v-progress-circular
          :rotate="360"
          :size="50"
          :width="5"
          :value="valoracion"
          color="teal"
        >
          {{ (valoracion/10) }}
        </v-progress-circular>
        <br>
        <br>
        <p><strong>Descripción:</strong><br>{{descripcion}}</p>
        <p><strong>Actores:</strong><br>{{actores}}</p>
    </div>

    <div v-if="notFound">
      <h1>Pelicula no encontrada</h1>
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
      busqueda: '',
      user: localStorage.user,
      userLikes: false,
      titulo: ``,
      descripcion: ``,
      imagen: ``,
      valoracion: 0,
      generos: ``,
      duracion: ``,
      actores: [],
      vuetify: new Vuetify(),
      notFound: false,
    }
  },
  methods: {
    buscarPelicula() {
      window.location.href = `/contenido/${this.busqueda}`;
    },
    guardarContenido() {
      this.userLikes = !this.userLikes;
      axios.post(`${process.env.VUE_APP_BACK_URL}/api/v1/user/films`, {
        film: this.titulo
      }, 
      {
        headers: {
          "x-access-token": localStorage.user
        }
      }).then(response => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
      });
    },
    obetenerPelicula() {
      var titulo = window.location.href.split("/")[4].replace(/%20/g, " ");
      axios.get(`${process.env.VUE_APP_BACK_URL}/api/v1/film/${titulo}`)
      .then(response => {
        if (response.data.message) {
          this.titulo = response.data.film.Title;
          this.generos = response.data.film.Genre;
          this.duracion = response.data.film.Runtime;
          this.imagen = response.data.film.Poster;
          this.descripcion = response.data.film.Plot;
          this.valoracion = response.data.film.imdbRating*10;
          this.actores = response.data.film.Actors;
        } else {
          this.titulo = response.data.Title;
          this.generos = response.data.Genre;
          this.duracion = response.data.Runtime;
          this.imagen = response.data.Poster;
          this.descripcion = response.data.Plot;
          this.valoracion = response.data.imdbRating*10;
          this.actores = response.data.Actors;
        }
      })
      .catch(error => {
        this.notFound = true;
        console.log(error);
      });
    },
    logout() {
        localStorage.removeItem('user');
    },
    redirectGenre(genre) {
      if (genre[0] == " ") genre = genre.substring(1, genre.length);
      window.location.href = `/contenido/genero/${genre}`;
    }
  },
  mounted() {
    this.obetenerPelicula();
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

.column3 {
  float: left;
  width: 30%;
  padding: 10px;
}
.column4 {
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
  width: 80%;
}


</style>