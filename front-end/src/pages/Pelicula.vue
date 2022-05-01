<template>
  <div id="Pelicula">
    <div class="container">
        <div class="img">
            <img class="imagenPortada" v-bind:src="imagen" alt="" />
        </div>
        <div class="main">
            <h1>{{titulo}}</h1>
            <p>{{generos}} <strong>·</strong> {{duracion}}</p>
            <div class="progressBar" style="background-color: grey;">
                <div class="filledBar" style="background-color: red; height:24px; width:20%"></div>
            </div>
            <p>{{descripcion}}</p>
        </div>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
        titulo: `One Piece`,
        descripcion: `Riqueza, fama, poder... un hombre había obtenido todo en este mundo, era el Rey de los Piratas Gold Roger. Antes de morir sus últimas palabras inspiraron al mundo a aventurarse al mar: "¿Mi tesoro? Si lo queréis es vuestro... lo he escondido todo en ese lugar". Y así dio comienzo lo que se conoce como la Gran Era de la Piratería, lanzando a cientos de piratas al mar para encontrar el gran tesoro One Piece. Esta serie relata las aventuras y desventuras de uno de esos piratas, Monkey D. Luffy, quien accidentalmente de pequeño, comió una Fruta del Diablo (Akuma no Mi en japonés), en particular una Gomu Gomu no Mi que hizo que su cuerpo ganara las propiedades físicas de la goma, convirtiéndose en el hombre de goma. Luffy, después de dicho suceso, decide que se convertirá en el próximo Rey de los Piratas y para ello, deberá encontrar el "One Piece".`,
        imagen: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/goKUd5y4lHU3qkW0XKKxmNSNcem.jpg",
        valoracion: 0.0,
        generos: `Action & Adventure, Comedia, Animación`,
        duracion: `24m`,
    }
  },
  methods: {
    
  },
};
</script>

<style>
.img {
  float: left;
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
</style>