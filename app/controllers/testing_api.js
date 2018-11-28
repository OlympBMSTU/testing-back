
const express = require('express');
const router = express.Router();
const db = require('../models');
const crypto = require('crypto');

const authToken = require('../authToken.js')

const tokenLiveTime = 86400; // время жизни общее токена интерфейса 24 часа

module.exports = (app) => {
  app.use('/api/testing', router);
};

router.post('/init', (req, res, next) => {
	console.log('***\n\n' + new Date() + ':\n' + 'Got request for init');
	cookie = req.cookies.bmstuOlimpAuth;

	if (!cookie) return res.status(401).send( {res_code: "NO_TOKEN", res_data: cookie, res_msg: "Вы не авторизованны"} );

	jwtFromToken = authToken.decodeJWT(cookie);

	if (jwtFromToken.res != 'OK') {
		console.log('jwtFromToken.res',jwtFromToken.res);
		return res.status(401).send( {res_code: "INVALID_TOKEN", res_data: jwtFromToken.res, res_msg: "Неверные данные авторизации"} );
	}

	let id = jwtFromToken.jwt.payload.id;
	console.log('UserID: ', id);

	if (id > 10) {
		return res.status(403).send( {res_code: "NOT_ALLOWED", res_data: jwtFromToken.res, res_msg: "Функционал временно недоступен"} );
	}
	
	db.Variant.getVariant(1, function (err, variant) {
		db.Progres.createProgres(1, 1, variant.body, function (err, progres) {
			console.log(err);
			if (!err) {
				return res.status(200).send({res_code: "OK", res_data: "", res_msg: "Вы успешно запустили тестирование"} );
			} else {
				return res.status(500).send( {res_code: "INTERNAL_ERROR", res_data: "", res_msg: "Произошла внутренняя ошибка"} );
			}
		});
	});
});

router.get('/get', (req, res, next) => {
	console.log('***\n\n' + new Date() + ':\n' + 'Got request for get');
	cookie = req.cookies.bmstuOlimpAuth;

	if (!cookie) return res.status(401).send( {res_code: "NO_TOKEN", res_data: cookie, res_msg: "Вы не авторизованны"} );

	jwtFromToken = authToken.decodeJWT(cookie);

	if (jwtFromToken.res != 'OK') {
		console.log('jwtFromToken.res',jwtFromToken.res);
		return res.status(401).send( {res_code: "INVALID_TOKEN", res_data: jwtFromToken.res, res_msg: "Неверные данные авторизации"} );
	}

	let id = jwtFromToken.jwt.payload.id;
	console.log('UserID: ', id);

	if (id > 10) {
		return res.status(403).send( {res_code: "NOT_ALLOWED", res_data: jwtFromToken.res, res_msg: "Функционал временно недоступен"} );
	}

	db.Progres.findProgres(1, id, variant.body, function (err, progres) {
		console.log(err);
		if (!err) {
			return res.status(200).send(findProgres);
		} else {
			return res.status(500).send( {res_code: "INTERNAL_ERROR", res_data: "", res_msg: "Произошла внутренняя ошибка"} );
		}
	});
});

router.post('/update', (req, res, next) => {
	console.log('***\n\n' + new Date() + ':\n' + 'Got request for update');
	cookie = req.cookies.bmstuOlimpAuth;

	if (!cookie) return res.status(401).send( {res_code: "NO_TOKEN", res_data: cookie, res_msg: "Вы не авторизованны"} );

	jwtFromToken = authToken.decodeJWT(cookie);

	if (jwtFromToken.res != 'OK') {
		console.log('jwtFromToken.res',jwtFromToken.res);
		return res.status(401).send( {res_code: "INVALID_TOKEN", res_data: jwtFromToken.res, res_msg: "Неверные данные авторизации"} );
	}

	let id = jwtFromToken.jwt.payload.id;
	console.log('UserID: ', id);

	if (id > 10) {
		return res.status(403).send( {res_code: "NOT_ALLOWED", res_data: jwtFromToken.res, res_msg: "Функционал временно недоступен"} );
	}

	return res.status(200).send({res_code: "OK", res_data: account, res_msg: "Краткая информация об аккаунте"} );
});

router.post('/commit', (req, res, next) => {
	console.log('***\n\n' + new Date() + ':\n' + 'Got request for commit');
	cookie = req.cookies.bmstuOlimpAuth;

	if (!cookie) return res.status(401).send( {res_code: "NO_TOKEN", res_data: cookie, res_msg: "Вы не авторизованны"} );

	jwtFromToken = authToken.decodeJWT(cookie);

	if (jwtFromToken.res != 'OK') {
		console.log('jwtFromToken.res',jwtFromToken.res);
		return res.status(401).send( {res_code: "INVALID_TOKEN", res_data: jwtFromToken.res, res_msg: "Неверные данные авторизации"} );
	}

	let id = jwtFromToken.jwt.payload.id;
	console.log('UserID: ', id);

	if (id > 10) {
		return res.status(403).send( {res_code: "NOT_ALLOWED", res_data: jwtFromToken.res, res_msg: "Функционал временно недоступен"} );
	}

	return res.status(200).send({res_code: "OK", res_data: account, res_msg: "Краткая информация об аккаунте"} );
});
