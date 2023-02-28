const express=require('express');
const bodyParser=require('body-parser');

const mongoose =require('mongoose');
const Dishes=require('../models/dishes');
mongoose.Promise = require('bluebird');

const dishRouter=express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get((req,res,next)=>{
    Dishes.find({})
    .then((getdishes)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(getdishes);
    },(err)=>next(err))
    .catch((err)=> next(err));

})
.post((req,res,next)=>{
   Dishes.create(req.body)
   .then((postdish)=>{

        console.log('dish created');
        console.log('post dish created',postdish);

        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(postdish);

   },(err)=>next(err))
   .catch((err)=> next(err));
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT method cant be supported /dishes');
})
.delete((req,res,next)=>{
    Dishes.deleteOne({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=> next(err));
});


//fst method

 dishRouter.route('/:dishId')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((gettiddish)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(gettiddish);
    },(err)=>next(err))
    .catch((err)=> next(err));
})
.post((req,res,next)=>{
    res.statusCode=403;
    const newLocal = 'POST method cant be supported /dishes/  :';
    res.end(newLocal + req.params.dishId);
})
.put((req,res,next)=>{
   Dishes.findByIdAndUpdate(req.params.dishId,{
    $set :req.body},{new:true})
    .then((putiddish)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(putiddish);
    },(err)=>next(err))
    .catch((err)=> next(err));
})
.delete((req,res,next)=>{
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=> next(err));
});





//second method
// dishRouter.get('/dishes/:dishId',(req,res,next)=>{
//     res.end('Will Send details of dish : '+req.params.dishId);
// });
// dishRouter.post('/dishes/:dishId',(req,res,next)=>{
//     res.statusCode=403;
//     res.end('POST method cant be supported /dishes/  :' + req.params.dishId);
// });
// dishRouter.put('/dishes/:dishId',(req,res,next)=>{
//     res.write("Updating the dish :" + req.params.dishId +'\n');
//     res.end('Will update thr dish : ' + req.body.name + 'with details : ' + req.body.description);
// });
// dishRouter.delete('/dishes/:dishId',(req,res,next)=>{
//     res.end('Deleting dish : ' + req.params.dishId);
// });


module.exports = dishRouter;


