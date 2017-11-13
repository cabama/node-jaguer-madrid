// grab the things we need
import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'



export interface NewModel extends mongoose.Document {
  title: string,
  body: string,
  createdBy: string
  date: Date
}

var newsSchema = new Schema({
  title: String,
  body: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "Users" },
  date: { type: Date, default: Date.now }, // por defecto la fecha actual
  hidden: Boolean,
});

// the schema is useless so far
// we need to create a model using it
export let newsModel = mongoose.model<NewModel>('News', newsSchema);