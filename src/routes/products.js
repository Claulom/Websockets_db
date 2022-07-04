const express =require('express');
const dbProd = require('../container');

const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index', {message: ''})
})

router.get('/products', (req, res)=>{
   dbProd.getAll()
   .then(product=>{
       (product.length < 1)
       ? res.render('productos', {products: 'No existen productos'})
       : res.render('productos', {products: product})
   })
})

router.get('/products/:id', (req, res)=>{
    const id = Number(req.params.id);
    dbProd.getById(id)
    .then(result =>{
        (result.length < 1)
        ? res.json({error: 'Producto no encontrado'})
        : res.json (result)
    })
})

router.post('/', async (req, res)=>{
    const newProd = req.body;
    dbProd.save(newProd)
    .then(()=> res.render('index', {message: 'Producto agregado'}))
})


router.put('/:id',  (req, res)=>{
  const id = req.params.id;
  const products = req.body
  dbProd.updateProd(products, id)
  .then(() => res.json({message: 'Producto modificado'}))
})

router.delete('products/:id',  (req,res)=>{
        const id = req.params.id;
        dbProd.deleteById(id)
        .then(()=> res.json({message: 'Producto eliminado'}))
}) 
module.exports = router