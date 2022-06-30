const express =require('express');
const Archivos = require('../container.js');
const options = require('../database')

const knex = require('knex')(options)

const product = new Archivos(options)

const router = express.Router();


router.get('/', (req, res)=>{
    product.getAll()
    .then(data => res.send (data))
})

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const idNumber = Number(id);
    let products = await product.getById(idNumber);
    
   if(products == null){
       products = {error: 'El producto que desea buscar no existe'};
   }
    
    return res.json(products)
})

let time = Date.now()
router.post('/', async (req, res)=>{
    let { title, price, thumbnail, description, code, stock } = req.body;
    
    if (!title || !price|| !thumbnail || !description || !code || !stock) {
        return res.status(400).send({ error: 'Los datos están incompletos' });
    }
    
 await product.save({ title, price, thumbnail, description, code, stock, time });
    return res.send({message: 'Producto agregado'})
})


router.put('/:id',  (req, res)=>{
    const idx = this.product.findIndex(p => p.id == id)

    if(idx === -1){
        res.send('El producto que desea modificar no existe')
    }else{
        this.product.splice(idx, 1, product)
        res.json(product)
    } 
})

router.delete('/id',  (req,res)=>{
        const idx = this.product.findIndex(p => p.id == id)

        if(idx === -1){
            res.send('El producto que desea eliminar no existe')
        }else{
            this.product.splice(idx, 1)
            res.json(`Se elimino el producto con id: ${id}`)
        } 
}) 
module.exports = router