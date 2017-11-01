var jwt    = require ('jwt-simple');
var moment = require('moment');

var secret = 'Clave secreta del token';

exports.autenticateFunction = (req, res, next) =>
{
	if (!req.headers.authoritation){
		return res.status(403).send({message: 'La peticion no tiene la cabecera de autenticación'});
	}

	var token = req.headers.authoritation.replace(/['"]+/g, '');

	try{
		var payload = jwt.decode(token, secret);

		if (payload.exp <= moment().unix()){
			return res.status(401).send({message: 'El token ha expirado'});
		}
	} catch (ex) {
		console.log(ex);
		return res.status(404).send({message: 'Token no valido.'})
	}

	req.user = payload;

	next();
}  