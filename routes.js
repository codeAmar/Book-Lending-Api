require('dotenv').config()

const monk = require('monk')
const joi = require('joi')

const db = monk(process.env.DB_URL)
let students = db.get('books')


const bookSchema = {
  title:joi.string().required().max(30),
  isbn:joi.string().required().max(20),
  author:joi.string().required().max(30),
  genre:joi.string().required().max(20),
  publication:joi.object().keys({
    // note - date act as string in httpie
    date:joi.date(),
    publisher:joi.string().required(),
    cityPublished:joi.string()
  }),
  copies:joi.array().items(joi.object().keys({
    editionName:joi.string().required().max(20),
    editionDate:joi.date(),
    issued:joi.object().keys({
      isIssued:joi.boolean().truthy('yes').falsy('no').required().when('reserved',{
        is:true,
        then:joi.invalid(joi.ref('reserved'))
      }),
      issuedTo:joi.string().empty(' ').default('not applicable'),
      reserved:joi.boolean().truthy('yes').falsy('no').optional()
    })
  })).min(1).required()
}


// echo '{"title":"book1", "isbn":"12345", "author":"amar", "genre":"music", "publication":{"date":"12-21-2012","publisher":"ravi","cityPublished":"vancouver"},"copies":[{"editionName":"first","editionDate":"12-13-2013","issued":{"isIssued":"true","issuedTo":"amarjot","reserved":"false"}}]}' | http  :3000/books



module.exports = [
  {
      method:'GET',
      path:'/',
      handler:(req,res)=>{
        return res("welcome to book lending api")
      }
  },
  {
      method:'GET',
      path:'/books',
      handler:(req,res)=>{
        //find all the books from database
      }
  },
  {
      method:'GET',
      path:'/books/{bookId}',
      handler:(req,res)=>{
        //isbn or unique id of somekind
        //get an individual book
      }
  },
  {
      method:'POST',
      path:'/books',
      config:{validate:{payload:bookSchema}},
      handler:(req,res)=>{
        //create a new student
        //validate with joi
        return res(req.payload)
      }
  },
  {
      method:'PUT',
      path:'/books',
      handler:(req,res)=>{
        //update a book record
        //validate with joi
      }
  },
  {
      method:'DELETE',
      path:'/books',
      handler:(req,res)=>{
        //delete a book from books record
      }
  },
  {
      method:'GET',
      path:'/books/{p*}',
      handler:(req,res)=>{
        // -- genre get all books by genre genre=mystery
        // -- title get all books with key words in a title title=the long goodbye (you
        //   can use a regular expression for this with your database and mongodb find, title: /the long
        //   goodbye/)
        // -- author get all books by an author author=raymond chandler
      }
  }
]
