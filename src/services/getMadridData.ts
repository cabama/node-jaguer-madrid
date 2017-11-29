import {default as axios, AxiosRequestConfig} from 'axios'
import * as request from 'request'
import * as csv from 'csvtojson'

export function getRanking (): Promise<any> {

	const options = {
		host: 'datos.madrid.es',
		port: 80,
		path: '/egob/catalogo/211549-1-juegos-deportivos-actual.csv'
	};

	let a: AxiosRequestConfig;

	return axios.get('http://datos.madrid.es/egob/catalogo/211549-1-juegos-deportivos-actual.csv')


}

export function getRankingJSON(): Promise<any> {

	return new Promise ( (resolve, reject) => {
		let clasificaciones = []

		try {
			csv({ delimiter: ";" })
				.fromStream(request.get('http://datos.madrid.es/egob/catalogo/211549-1-juegos-deportivos-actual.csv'))
				.on('done', (error) => {
					if (error) reject(error)
					else resolve (clasificaciones)
				})
				.on('json', (json) => {
					if (json['Nombre_grupo'] == 'F.SALA SEN-MASC DOM-TARDE GR-4') {
						clasificaciones.push(json)
					}
				})
				.on('error', (error) => {
					console.log('Error getting Madrid ranking data.')
					reject(error)
				})
		} catch (error) {
			reject(error)
		}

	})
}


export function getCalendarJSON(): Promise<any> {

	return new Promise((resolve, reject) => {
		let clasificaciones = []

		try {
			csv({ delimiter: ";" })
				.fromStream(request.get('http://datos.madrid.es/egob/catalogo/211549-3-juegos-deportivos-actual.csv'))
				.on('done', (error) => {
					if (error) reject(error)
					else resolve(clasificaciones)
				})
				.on('json', (json) => {
					if (json['Codigo_equipo1'] == '123655'
						|| json['Codigo_equipo2'] == '123655') {
						clasificaciones.push(json)
					}
				})
				.on('error', (error) => {
					console.log('Error getting Madrid ranking data.')
					reject(error)
				})
		} catch (error) {
			reject(error)
		}

	})
}
