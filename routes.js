require('dotenv').config()

const eventController = require('./controller')
const models= require('./models')

module.exports = [
  {
      method:'GET',
      path:'/',
      handler:eventController.getHome
  },
  {
      method:'GET',
      path:'/books',
      handler:eventController.getBooks
        //find all the books from database
  },
  {
      method:'GET',
      path:'/books/{isbn}',
      handler:eventController.getBooksId
        //isbn or unique id of somekind
        //get an individual book
  },
  {
      method:'POST',
      path:'/books',
      config:{validate:{payload:models.bookSchema}},
      handler:eventController.postBooks
        //create a new student
        //validate with joi
  },
  {
      method:'PUT',
      path:'/books',
      handler:eventController.updateBooks
        //update a book record
        //validate with joi
  },
  {
      method:'DELETE',
      path:'/books/{isbn}',
      handler:eventController.deleteBooks
        //delete a book from books record
  },
  {
      method:'GET',
      path:'/books/{p*}',
      handler:eventController.queryBooks
        // -- genre get all books by genre genre=mystery
        // -- title get all books with key words in a title title=the long goodbye (you
        //   can use a regular expression for this with your database and mongodb find, title: /the long
        //   goodbye/)
        // -- author get all books by an author author=raymond chandler
  }
]
