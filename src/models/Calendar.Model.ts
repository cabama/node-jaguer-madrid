// grab the things we need
import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

export interface calendarType extends mongoose.Document {
    Codigo_temporada: string,
    Codigo_competicion: string,
    Codigo_fase: string,
    Codigo_grupo: string,
    Jornada: string,
    Partido: string,
    Codigo_equipo1: string,
    Codigo_equipo2: string,
    Resultado1: string,
    Resultado2: string,
    Codigo_campo: string,
    Fecha: string,
    Hora: string,
    Programado: string,
    Estado: string,
    Nombre_temporada: string,
    Nombre_competicion: string,
    Nombre_fase: string,
    Nombre_grupo: string,
    Nombre_deporte: string,
    Nombre_categoria: string,
    Nombre_jornada: string,
    Equipo_local: string,
    Equipo_visitante: string,
    Campo: string,
    Sexo_grupo: string,
    Distrito: string,
    Observaciones: string,
    SISTEMA_COMPETICION: string,
    COORD_X_CAMPO: string,
    COORD_Y_CAMPO: string,
    Date: Date
}

var calendarSchema = new Schema({
    Codigo_temporada: String,
    Codigo_competicion: String,
    Codigo_fase: String,
    Codigo_grupo: String,
    Jornada: String,
    Partido: String,
    Codigo_equipo1: String,
    Codigo_equipo2: String,
    Resultado1: String,
    Resultado2: String,
    Codigo_campo: String,
    Date: Date,
    Fecha: String,
    Hora: String,
    Programado: String,
    Estado: String,
    Nombre_temporada: String,
    Nombre_competicion: String,
    Nombre_fase: String,
    Nombre_grupo: String,
    Nombre_deporte: String,
    Nombre_categoria: String,
    Nombre_jornada: String,
    Equipo_local: String,
    Equipo_visitante: String,
    Campo: String,
    Sexo_grupo: String,
    Distrito: String,
    Observaciones: String,
    SISTEMA_COMPETICION: String,
    COORD_X_CAMPO: String,
    COORD_Y_CAMPO: String
});

// the schema is useless so far
// we need to create a model using it
export let calendarModel = mongoose.model<calendarType>('Calendar', calendarSchema);