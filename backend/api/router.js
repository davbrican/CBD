const express = require('express');
const router = express.Router();

const userService = require('./services/user');
const filmService = require('./services/film');

const verifyUser = require('./middlewares/verifyUser');


router.post('/user/login', (req, res) => {
    userService.login(req, res);
});

router.post('/user/signup', (req, res) => {
    userService.signup(req, res);
});

router.get('/user/films', verifyUser, (req, res) => {
    userService.getFilms(req, res);
});

router.post('/user/films', verifyUser, (req, res) => {
    userService.saveFilm(req, res);
});

router.get('/film/all', (req, res) => {
    filmService.getAll(req, res);
});

router.get('/film/genre', (req, res) => {
    filmService.getByGenre(req, res);
});

router.get('/film/:film', (req, res) => {
    filmService.getByTitle(req, res);
});


module.exports = router;