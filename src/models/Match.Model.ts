// grab the things we need
import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'



export interface MatchModel extends mongoose.Document {
  title: string,
  team1: string,
  team2: string,
  place: {
    tittle: string,
    gmaps: string
  },
  createdBy: {
    user: string,
    date: Date
  },
  hidden: boolean
}

var matchSchema = new Schema({
  title: String,
  team1: String,
  team2: String,
  date: Date,
  place: {
    tittle: String,
    gmaps: String
  },
  createdBy: { 
    user: {type: Schema.Types.ObjectId, ref: "Users" },
    date: { type: Date, default: Date.now }, // por defecto la fecha actual
  },
  letsgo: [{
    userid: {type: Schema.Types.ObjectId},
    name: String
  }],
  hidden: {type: Boolean, default: false}
});

// the schema is useless so far
// we need to create a model using it
export let matchModel = mongoose.model<MatchModel>('News', matchSchema);