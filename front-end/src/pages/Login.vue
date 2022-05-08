<template>
  <div id="Login" >
     
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
      <br>
      <button @click="login()" type="submit" class="btn btn-primary">Log in</button>
      <br> <br>
      <a href="/registro">Aren't you still registered? Click here</a>
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