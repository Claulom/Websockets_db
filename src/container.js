
const options = require('./database')

/* const knex = require('knex')(options) */

class Archivos {
    constructor(options) {
       this.knex = require('knex')(options)

    }
      async ifCreateTable(){
          const table = await this.knex.schema.hasTable('productos')
          if(!table){
              await this.createTable()
          }else{
              console.log('tabla ya esta creada')
          }
      }
      async createTable(){
          return this.knex.schema.createTable('productos', (table)=>{
            table.increments('id')
            table.string('title')
            table.integer('price')
            table.string('thumbnail')
            table.string('description')
            table.integer('code')
            table.integer('stock')
          })
      }

      async getAll() {
        const data = await this.knex.from('productos').select('*')
            return data
      
      }
      
      async save(data) {
        await this.knex('productos').insert(data)
      
      }
      
      async getById(id) {
       await this.knex('productos').select([id]).then(rows => {
            for (const row of rows) {
                console.log(`${row['id']} `)
            }
            console.log(rows)
        })
            .catch(err => console.log(err))
            .finally(() => knex.destroy())
      }
      
      async deleteById() {
        await knex('productos').where('id').del()
            .then(() => console.log('data deleted'))
            .catch(err => console.log(err))
            .finally(() => knex.destroy())
      } 
}

    module.exports = Archivos
