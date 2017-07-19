require('dotenv').config()

const models = require('./models')

module.exports ={
  getHome:getHome,
  getBooks:getBooks,
  getBooksId:getBooksId,
  postBooks:postBooks,
  updateBooks:updateBooks,
  deleteBooks:deleteBooks,
  queryBooks:queryBooks
}

function getHome(req,res){
  return res("welcome to book lending api")
}
async function getBooks(req,res){
  let allBooks = await models.students.find({},{limit:10})
  return res(allBooks).code(200)
}
async function getBooksId(req,res){
  let typicalBook = await models.students.find({"isbn":req.params.isbn})
  return res(typicalBook).code(200)

}
async function postBooks(req,res){
  let newBook = await models.students.insert(req.payload)
  return res(req.payload).code(201)
}
async function updateBooks(req,res){
  let bookToUpdate = await models.students.findOneAndUpdate({"isbn":req.payload['isbn']},{$set:req.payload})
  return res(req.payload).code(200)
}
async function deleteBooks(req,res){
  let bookToDelete = await models.students.findOneAndDelete({"isbn":req.params.isbn})
  return res(bookToDelete).code(200)
}
async function queryBooks(req,res){
  console.log(req.query);
  if(req.query.genre){
    let queryBooksResult = await models.students.find({"genre":req.query.genre})
    if(Object.keys(queryBooksResult)){
      return res(queryBooksResult).code(200)
    }else{
      return res('please correct the query format').code(404)
    }
  }

  if(req.query.title){
    let queryBooksResult = await models.students.find({"title":{$regex:req.query.title,$options:'i'}})
    if(Object.keys(queryBooksResult)){
      return res(queryBooksResult).code(200)
    }else{
      return res('please correct the query format').code(404)
    }
  }

  if(req.query.author){
    let queryBooksResult = await models.students.find({"author":req.query.author})
    if(Object.keys(queryBooksResult)){
      return res(queryBooksResult).code(200)
    }else{
      return res('please correct the query format').code(404)
    }
  }
}
