import Pelicula from "./pages/Pelicula";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";

const routes = [
    {     
        path: "/",
        component: Inicio,
        name: "Inicio",
        meta: { title: "Inicio" },
    },
    {     
        path: "/contenido/:titulo",
        component: Pelicula,
        name: "Pelicula",
        meta: { title: "Pelicula / Serie" },
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