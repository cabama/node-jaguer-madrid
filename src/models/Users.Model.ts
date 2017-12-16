// grab the things we need
import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

export interface UserModel extends mongoose.Document {
  username: String,
  email: String,
  password: String,
  name: String,
  surname: String,
  role: String,
  image: String,
  avatar: String
  visible: Function
}

// create a schema
var userSchema = new Schema({
  username: {type:String, required: true, unique: true},
  email: 	{ type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: 	String,
  surname: 	String,
  role: 	String,
  image: 	String,
  avatar: String
});

userSchema.method('visible', function (password: string): any {
  return {
    name: this.name,
    surname: this.surname,
    username: this.username,
    image: this.image,
    email: this.email
  }
});

// the schema is useless so far
// we need to create a model using it
export let MdUser = mongoose.model<UserModel>('Users', userSchema);