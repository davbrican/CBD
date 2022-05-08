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
    <div class="row">
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
        items: [
          {name: 'MacBook Air', img:'http://images.macworld.com/images/news/graphics/131583-mbair_large.jpg', price: 1000},
          {name: 'MacBook Pro', img:'http://images.macworld.com/images/news/graphics/131583-mbair_large.jpg', price: 1800},
          {name: 'Lenovo W530', img:'https://static.consumentenbond.nl/NOTEB/829349_NOTEB/2/hp-pavilion-15-p035nd-j2s28ea-large.jpg', price: 1400},
          {name: 'Acer Aspire One', img:'https://images-na.ssl-images-amazon.com/images/I/41zRcBUFldL._SX355_.jpg', price: 300},
          {name: 'MacBook AirPro', img:'//via.placeholder.com/350x180', price: 1200},
          {name: 'MacBook Pro 2', img:'//via.placeholder.com/350x180', price: 1900},
          {name: 'Lenovo Yoga', img:'http://images.macworld.com/images/news/graphics/131583-mbair_large.jpg', price: 1500},
          {name: 'Acer Aspire 3', img:'//via.placeholder.com/350x180', price: 300}
        ]
    }
  },
  methods: {
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