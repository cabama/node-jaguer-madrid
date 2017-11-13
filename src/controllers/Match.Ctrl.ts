import { Request, Response } from 'express';
import { JwtService as jwt } from '../services/jwt'
import * as bcrypt from 'bcrypt-nodejs'
import * as bodyParser from 'body-parser';
import { everyTrue, everyExist } from '../config/Utils';
import * as byps from '../services/bcrypt'
import { matchModel } from '../models/Match.Model';
import { RequestAuth } from '../config/interfaces.type'


type User = {
    username: string
    password: string
    name: string
    surname: string
    email: string
    role: 'Admin' | 'User'
    image?: any
}

export class Rules {
    constructor(private res) { }
    noUserInHeader() {
        this.res.status(500).send('There arent all parameters');
        return -1
    }
}

export class MatchController {

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

    async createNew(req: RequestAuth, res: Response) {
        this.firstWork(req, res)
        console.log('Despues del first')
        console.log(req.body)
        // Obtain user from post
        const newExist = everyExist([
            this.params.tittle,
            this.params.body,
        ])
        if (!newExist) {
            res.status(500).send(JSON.stringify(req.body));
            return
        }

        // Create UserModel
        let mdNews = new matchModel()
        mdNews.title = this.params.tittle
        mdNews.team1 = this.params.team1
        mdNews.team2 = this.params.team2
        mdNews.place = this.params.place
        mdNews.createdBy = req.user.id

        // Store user in mongodb
        let newStored = await mdNews.save()
        console.log(newStored)
        res.status(200).send(req.user)
    }

} //class
