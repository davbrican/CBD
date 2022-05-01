<template>
  <div id="Pelicula" >
    <div class="menu">
      MENU
    </div>

    <br>
    <br>
    <div class="img">
        <img class="imagenPortada" v-bind:src="imagen" alt="" />
    </div>
    <div class="main">
        <h1>{{titulo}}</h1>
        <p><strong>Géneros:</strong> {{generos}}</p>
        <br>
        <p><strong>Duración:</strong> {{duracion}}</p>
        <br>
        <p><strong>Valoración media:</strong></p>
        <br>
        <v-progress-circular
          :rotate="360"
          :size="50"
          :width="5"
          :value="valoracion"
          color="teal"
        >
          {{ valoracion }}%
        </v-progress-circular>
        <br>
        <br>
        <p><strong>Descripción:</strong><br>{{descripcion}}</p>
    </div>
    <div style="margin-top: 500px; background-color: white;">
      --------------------------
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

export default {
  data() {
    return {
        titulo: `One Piece`,
        descripcion: `Riqueza, fama, poder... un hombre había obtenido todo en este mundo, era el Rey de los Piratas Gold Roger. Antes de morir sus últimas palabras inspiraron al mundo a aventurarse al mar: "¿Mi tesoro? Si lo queréis es vuestro... lo he escondido todo en ese lugar". Y así dio comienzo lo que se conoce como la Gran Era de la Piratería, lanzando a cientos de piratas al mar para encontrar el gran tesoro One Piece. Esta serie relata las aventuras y desventuras de uno de esos piratas, Monkey D. Luffy, quien accidentalmente de pequeño, comió una Fruta del Diablo (Akuma no Mi en japonés), en particular una Gomu Gomu no Mi que hizo que su cuerpo ganara las propiedades físicas de la goma, convirtiéndose en el hombre de goma. Luffy, después de dicho suceso, decide que se convertirá en el próximo Rey de los Piratas y para ello, deberá encontrar el "One Piece".`,
        imagen: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/goKUd5y4lHU3qkW0XKKxmNSNcem.jpg",
        valoracion: 88,
        generos: `Action & Adventure, Comedia, Animación`,
        duracion: `24m`,
        vuetify: new Vuetify()
    }
  },
  methods: {
    
  },
  mounted() {
    
  }
};
</script>

<style>
.img {
  float: left;
  margin-left: 25px;
  margin-top: 10px;;
  width: 20%;
  text-align: center;
}

.main {
  float: left;
  width: 60%;
  padding: 0 50px;
}

@media only screen and (max-width: 620px) {
  /* For mobile phones: */
  .menu, .main, .right {
    width: 100%;
  }
}

img {
  width: 80%;
}

.menu {
  size: 40px;
  width: 150%;
  overflow: hidden;
  margin-top: -10px;
  margin-left: -50px;
  background-color: rgba(48, 148, 115, 0.74);
}

</style>