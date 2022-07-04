const options = require('./db/database')
const knex = require('knex')(options)

class Archivos {
    constructor(options) {
       this.options = options

    }
       ifCreateTable(){
          const table =  knex.schema.hasTable('productos')
          if(!table){
               this.createTable()
          }else{
              console.log('tabla ya esta creada')
          }
      }
       createTable(){
          knex.schema.createTable('productos', (table)=>{
            table.increments('id')
            table.string('title')
            table.integer('price')
            table.string('thumbnail')
          })
      }

       getAll() {
        return knex.from(this.options.connection.table).select('*')
        .then(rows => rows)
        .catch(err => console.log (err))
      
      }
      
       save(data) {
        return this.knex(this.options.connection.table).insert(data)
        .then(()=> 'Producto guardado')
        .catch(err => console.log(err))
      }
      
       getById(id) {
     return knex.from(this.options.connection.table).select('*').where('id', '=', id)
       .then(rows => rows)
            .catch(err => console.log(err))
            
      }
      
       deleteById(id) {
         return knex.from(this.options.connection.table).where('id', '=', id).del()
            .then(() => console.log('data deleted'))
            .catch(err => console.log(err))
           
      } 
      updateProd(edit, id){
          return knex.from(this.options.connection.table)
          .where('id', '=', id)
          .update(edit)
          .then(() => 'Producto modificado')
          .catch(err => console.log(err))
      }
}
const dbProd = new Archivos(options)
    module.exports = dbProd;
