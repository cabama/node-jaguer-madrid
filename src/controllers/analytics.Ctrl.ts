import { Request, Response } from 'express';
import { JwtService as jwt } from '../services/jwt'
import * as bcrypt from 'bcrypt-nodejs'
import * as bodyParser from 'body-parser';
import { everyTrue, everyExist } from '../config/Utils';
import * as byps from '../services/bcrypt'
import { newsModel } from '../models/News.Model';
import { RequestAuth } from '../config/interfaces.type'
import { getRanking, getRankingJSON } from '../services/getMadridData'

export class Rules {
    constructor(private res) { }
    noUserInHeader() {
        this.res.status(500).send('There arent all parameters');
        return -1
    }
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

    test(req, res) {
        console.log('Its a test.')
        res.status(200).send(`Its a test, ${new Date().toISOString()}`)
    }

    async ranking (req: Request, res: Response) {
        this.firstWork(req, res);
        let stadist = await getRankingJSON();
        stadist = stadist.sort((a, b) => { return a.Posicion - b.Posicion })
        res.status(200).send(stadist)
        console.log('He terminado joder')
        console.log(stadist)
        
    }


    async getAllNews(req: Request, res: Response) {
        // Find Noticia
        let noticias
        try {
            noticias = await newsModel.find()
        } catch {
            res.status(500).send({ message: 'Error in the request.' })
        }
        // Return Noticia
        if (noticias) res.status(200).send(noticias)
        else res.status(500).send({ message: 'The news not exist' })
    }

    async getANews(req: Request, res: Response) {
        // Obtain id from post
        let newsId = req.params.newsId
        console.log(newsId)
        // Find Noticia
        let noticia
        try {
            noticia = await newsModel.findById(newsId)
        } catch {
            res.status(500).send({ message: 'Error in the request.' })
        }
        // Return Noticia
        if (noticia) res.status(200).send(noticia)
        else res.status(500).send({ message: 'The news not exist' })
    }

} //class
