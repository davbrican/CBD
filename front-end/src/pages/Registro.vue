<template>
  <div id="Registro" >
     
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

      <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input class="form-control" v-model="email" type="email" placeholder="Email" />
      </div>
      <br>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input class="form-control" v-model="password" type="password" placeholder="Password" />
      </div>
      <br>
      <div class="form-group">
        <label for="exampleInputPassword1">Repit Password</label>
        <input class="form-control" v-model="passwordConfirmation" type="password" placeholder="Repit Password" />
      </div>
      <br>
      <br>
      <button @click="registro()" type="submit" class="btn btn-primary">Register</button>
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