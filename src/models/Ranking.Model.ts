// grab the things we need
import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

export interface rankingTypeModel extends mongoose.Document {
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

var RankingSchema = new Schema({
    Codigo_competicion: String,
    Codigo_equipo: String,
    Codigo_fase: String,
    Codigo_grupo: String,
    Codigo_temporada: String,
    Goles_contra: String,
    Goles_favor: String,
    Nombre_categoria: String,
    Nombre_competicion: String,
    Nombre_deporte: String,
    Nombre_distrito: String,
    Nombre_equipo: String,
    Nombre_fase: String,
    Nombre_grupo: String,
    Nombre_temporada: String,
    Partidos_empatados: String,
    Partidos_ganados: String,
    Partidos_jugados: String,
    Partidos_perdidos: String,
    Posicion: String,
    Puntos: String,
});

// the schema is useless so far
// we need to create a model using it
export let rankingModel = mongoose.model<rankingTypeModel>('Ranking', RankingSchema);