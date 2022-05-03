<template>
  <div id="Registro" >
     
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
      <div class="form-group">
        <label for="exampleInputPassword1">Repita Contraseña</label>
        <input class="form-control" v-model="passwordConfirmation" type="password" placeholder="Repita Contraseña" />
      </div>
      <br>
      <br>
      <button @click="registro()" type="submit" class="btn btn-primary">Registrarse</button>
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
        password: "",
        passwordConfirmation: ""
    }
  },
  methods: {
    start() {
      if(localStorage.user) window.location.href = '/';
    },
    registro() {
      axios.post(`${process.env.VUE_APP_BACK_URL}/api/v1/user/signup`, {
          email: this.email,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation,
      })
      .then(function (response) {
        if (response.status == 200) {
          window.location.href = '/login';
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