require('dotenv').config()

const joi = require('joi')
const monk = require('monk')
const db = monk(process.env.DB_URL)
// .then(()=>console.log('server:connected'))
db.then((err)=>{
  if(err) console.log('error :'+err);
  console.log('connected : db');
})
const students = db.get('books')

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

module.exports = {
  students:students,
  bookSchema:bookSchema
}


// echo '{"title":"book1", "isbn":"12345", "author":"amar", "genre":"music", "publication":{"date":"12-21-2012","publisher":"ravi","cityPublished":"vancouver"},"copies":[{"editionName":"first","editionDate":"12-13-2013","issued":{"isIssued":"true","issuedTo":"amarjot","reserved":"false"}}]}' | http  :3000/books
