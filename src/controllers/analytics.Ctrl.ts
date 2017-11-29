import { Request, Response } from 'express';
import { JwtService as jwt } from '../services/jwt'
import * as bcrypt from 'bcrypt-nodejs'
import * as bodyParser from 'body-parser';
import { everyTrue, everyExist } from '../config/Utils';
import * as byps from '../services/bcrypt'
import { newsModel } from '../models/News.Model';
import { RequestAuth } from '../config/interfaces.type'
import { getRanking, getRankingJSON, getCalendarJSON } from '../services/getMadridData'
import { rankingModel } from '../models/Ranking.Model';
import { calendarModel, calendarType } from '../models/Calendar.Model';

export class Rules {
    constructor(private res) { }
    noUserInHeader() {
        this.res.status(500).send('There arent all parameters');
        return -1
    }
}

type rankingRow = {
    Codigo_competicion: string,
    Codigo_equipo: string,
    Codigo_fase: string,
    Codigo_grupo: string,
    Codigo_temporada: string,
    Goles_contra: string,
    Goles_favor: string,
    Nombre_categoria: string, 
    Nombre_competicion: string, 
    Nombre_deporte: string, 
    Nombre_distrito: string, 
    Nombre_equipo: string, 
    Nombre_fase: string, 
    Nombre_grupo: string, 
    Nombre_temporada: string, 
    Partidos_empatados: string, 
    Partidos_ganados: string,
    Partidos_jugados: string,
    Partidos_perdidos: string,
    Posicion: string,
    Puntos: string,
}

export class AnalyticsController {

    private request;
    private response;
    private params;
    private errorRules: Rules

    private firstWork(req: Request, res: Response) {
        console.log('Estoy en el first work')
        this.errorRules = new Rules(res)
        this.request = req
        this.response = res
        this.params = req.body
    }

    async ranking (req: Request, res: Response) {
        this.firstWork(req, res);
        getRankingJSON()
        .then(stadist => {
            stadist = stadist.sort((a, b) => { return a.Posicion - b.Posicion })
            res.status(200).send(stadist)
            console.log('He terminado joder')
            console.log(stadist)
        })
        .catch(reason => {
            console.log(reason)
        })
        
    }

    async getRanking(req: Request, res: Response) {
        let ranking
        try {
            ranking = await rankingModel.find()
        } catch {
            res.status(500).send({ message: 'Error in the request.' })
        }
        if (!ranking) res.status(500).send({ message: 'The news not exist' })
        // Return Noticia
        ranking.sort((a, b) => { return a.Posicion - b.Posicion })
        res.status(200).send(ranking)
    }

    async getCalendar (req: Request, res: Response) {
        let ranking
        try {
            ranking = await calendarModel.find()
        } catch {
            res.status(500).send({ message: 'Error in the request.' })
        }
        if (!ranking) res.status(500).send({ message: 'The news not exist' })
        // Return Noticia
        res.status(200).send(ranking)
    }

    async scheduleGetRanking () {
        getRankingJSON()
        .then(async (stadist)  => {
            stadist = (stadist.sort((a, b) => { return a.Posicion - b.Posicion })) as rankingRow[]
            await rankingModel.remove({})
            stadist.forEach(async (stadist2) =>  {
                let rankingModelo = new rankingModel ()
                rankingModelo.Codigo_competicion = stadist2.Codigo_competicion
                rankingModelo.Codigo_equipo = stadist2.Codigo_equipo
                rankingModelo.Codigo_fase = stadist2.Codigo_fase
                rankingModelo.Codigo_grupo = stadist2.Codigo_grupo
                rankingModelo.Codigo_temporada = stadist2.Codigo_temporada
                rankingModelo.Goles_contra = stadist2.Goles_contra
                rankingModelo.Goles_favor = stadist2.Goles_favor
                rankingModelo.Nombre_categoria = stadist2.Nombre_categoria
                rankingModelo.Nombre_competicion = stadist2.Nombre_competicion
                rankingModelo.Nombre_deporte = stadist2.Nombre_deporte
                rankingModelo.Nombre_distrito = stadist2.Nombre_distrito
                rankingModelo.Nombre_equipo = stadist2.Nombre_equipo
                rankingModelo.Nombre_fase = stadist2.Nombre_fase
                rankingModelo.Nombre_grupo = stadist2.Nombre_grupo
                rankingModelo.Nombre_temporada = stadist2.Nombre_temporada
                rankingModelo.Partidos_empatados = stadist2.Partidos_empatados
                rankingModelo.Partidos_ganados = stadist2.Partidos_ganados
                rankingModelo.Partidos_jugados = stadist2.Partidos_jugados
                rankingModelo.Partidos_perdidos = stadist2.Partidos_perdidos
                rankingModelo.Posicion = stadist2.Posicion
                rankingModelo.Puntos = stadist2.Puntos
                await rankingModelo.save()
            });

        })
    }

    async scheduleCalendar () {
        console.log('Comienzo mi tarea de calendario.')
        getCalendarJSON() 
            .then(async calendarioJson => {
                await calendarModel.remove({})
                calendarioJson.forEach(async (jornada) => {
                    let calendarMd = new calendarModel()
                    for (let key in jornada) {
                        calendarMd[key] = jornada[key]
                    }
                    let f = new Date(jornada.Fecha)
                    const hora = parseInt(jornada.Hora.match(/([0-9][0-9]):/)[1])
                    const min = parseInt(jornada.Hora.match(/:(.*)/)[1])
                    f.setHours(hora, min)
                    calendarMd.Date = f
                    await calendarMd.save()
                })
            })
    }

} //class
