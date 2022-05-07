import Pelicula from "./pages/Pelicula";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import PeliculasGenero from "./pages/PeliculasGenero";
import Perfil from "./pages/Perfil";

const routes = [
    {     
        path: "/",
        component: Inicio,
        name: "Inicio",
        meta: { title: "Inicio" },
    },
    {     
        path: "/perfil",
        component: Perfil,
        name: "Perfil",
        meta: { title: "Perfil" },
    },
    {     
        path: "/contenido/:titulo",
        component: Pelicula,
        name: "Pelicula",
        meta: { title: "Pelicula / Serie" },
    },
    {     
        path: "/contenido/genero/:tipo",
        component: PeliculasGenero,
        name: "PeliculasGenero",
        meta: { title: "Peliculas / Series" },
    },
    {     
        path: "/registro",
        component: Registro,
        name: "Registro",
        meta: { title: "Registro" },
    },
    {     
        path: "/login",
        component: Login,
        name: "Login",
        meta: { title: "Login" },
    }
];
export default routes;