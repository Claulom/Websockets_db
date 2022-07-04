const options = require ('./db/sqlite');
const knex = require('knex')( options );

class Contenedor{
  constructor( options ){
    this.options = options;
  }

  createTable(){
    knex.schema.createTable( 'messages', table => {
      table.string('author')
      table.string('msg')
      table.string('date')
    })
      .then( ()=> console.log('Table created') )
      .catch( error => console.log( error ) )
      
  }

  getAll(){
    return knex.from( 'messages' ).select( '*' )
      .then( rows => rows )
      .catch( error => console.log( error ) )
      
  }

  newMessage( newMessage ){
    return knex( 'messages' ).insert( newMessage )
      .then( () => false )
      .catch( error => console.log( error ) )
      
  }

  deleteAll(){
    knex.from( 'messages' )
      .where( 'author', '=', 'f@gmail.com' ) 
      .del()

      .then( () => console.log('Data removed') )
      .catch( error => console.log( error ) )
      
  }

}

const sqlite = new Contenedor( options );


module.exports = sqlite;