import { Request, Response } from 'express';
import { JwtService as jwt } from '../services/jwt'
import * as bcrypt from 'bcrypt-nodejs'
import * as bodyParser from 'body-parser';
import { everyTrue, everyExist } from '../config/Utils';
import * as byps from '../services/bcrypt'
import { matchModel, MatchModel } from '../models/Match.Model';
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

    async createNewMatch(req: RequestAuth, res: Response) {
        this.firstWork(req, res)
        console.log(req.body)
        // Create UserModel
        let mdMatch = new matchModel()
        mdMatch.title = this.params.tittle
        mdMatch.team1 = this.params.team1
        mdMatch.team2 = this.params.team2
        mdMatch.place = this.params.place
        mdMatch.createdBy = req.user._id
        // Store user in mongodb
        let matchStored
        try {
            matchStored = await mdMatch.save()
        } catch (reason){
            res.status(500).send('No se pudo guardar: ' + reason)
        }
        debugger
        console.log(matchStored)
        res.status(200).send(matchStored)
    }

    async getAllMatchAdmin(req: RequestAuth, res) {
        let matchs
        try {
            matchs = await matchModel.find()
        } catch {
            res.status(500).send({ message: 'Error in the request.' })
        }
        
        // Return Noticia
        if (!matchs) res.status(500).send({ message: 'not exist matchs' })
        res.status(200).send(matchs)
    }

    async statusMatch(req: RequestAuth, res: Response) {
        this.firstWork(req, res)
        const matchId = this.params.matchId
        const status = this.params.status
        const id = req.user._id as string
        matchModel.findById(matchId)
        .then( match => {
            debugger
            let a = match.toObject() as any
            a.letsgo.find(user => { return user.userid == id })
            if (a) {a.status = status}
            else { match.letsgo.push({'userid': id, 'status': (status as boolean)})}
            return match.save()
        })
        .then( match => {
            res.status(200).send(match)
        })
        .catch( reason => {
            res.status(500).send({message: 'Cant update.' + reason})
        })
    }

} //class
