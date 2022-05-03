<template>
  <div id="Login" >
     
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
            </ul>
            <input class="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
        </div>
    </nav>

      <div class="form-group">
        <label for="exampleInputEmail1">Correo Electrónico</label>
        <input class="form-control" v-model="email" type="email" placeholder="Correo Electrónico" />
      </div>
      <br>
      <div class="form-group">
        <label for="exampleInputPassword1">Contraseña</label>
        <input class="form-control" v-model="password" type="password" placeholder="Contraseña" />
      </div>
      <br>
      <br>
      <button @click="login()" type="submit" class="btn btn-primary">Entrar</button>
      <br> <br>
      <a href="/registro">¿No estás registrado? Haz clic aquí</a>
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
        email: "",
        password: ""
    }
  },
  methods: {
    start() {
      if(localStorage.user) window.location.href = '/';
    },
    login() {
      axios.post(`${process.env.VUE_APP_BACK_URL}/api/v1/user/login`, {
          email: this.email,
          password: this.password
      })
      .then(function (response) {
        if (response.status == 200) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          window.location.href = '/';
        }
        console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
    }
  },
  mounted() {
    this.start();
  }
};
</script>

<style>


</style>