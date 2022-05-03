import Pelicula from "./pages/Pelicula";

const routes = [
    {     
        path: "/contenido/:titulo",
        component: Pelicula,
        name: "Pelicula",
        meta: { title: "Pelicula / Serie" },
    }
];
export default routes;