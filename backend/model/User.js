import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required: [true, "Please Enter name"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    select: false,
  },
  Subjects: [{
    name: { type: String, default: "Subject" },
    notes: [
      {
        heading: { type: String, default: "Heading" },
        date: { type: String, default: "09/09/2022" },
        pageNo: { type: Number, default: 0 },
        text: { type: String, default: "text" }
      }
    ]
  }
  ]
});

export const User = mongoose.model("User", userSchema);
/*

let subjects = [
  {
    name: "Subject",
    notes: [
      {
        heading: "Heading",
        date: "09/09/2022",
        pageno: 0,
        text: "Text"
      }
    ]
  }
]
*/
/*  {
         name:{type:String,default:"Subject"},
         notes:[
             {
                 heading:{type:String,default:"Heading"},
                 date:{type:String,default:"09/09/2022"},
                 pageNo:{type:Number,default:0},
                 text:{type:String,default:"text"}
             }
         ]
     } */