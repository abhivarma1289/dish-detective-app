const express=require('express');
const bodyParser=require('body-parser');

const dishRouter=express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('  Will Send all the Dishes to You !!');
})
.post((req,res,next)=>{
    res.end('Will add the dishe :' + req.body.name +' with details : ' + req.body.description);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT method cant be supported /dishes');
})
.delete((req,res,next)=>{
    res.end('Deleting all the dishes !!');
});


//fst method

 dishRouter.route('/:dishId')
.get((req,res,next)=>{
    res.end('Will Send details of dish : '+req.params.dishId);
})
.post((req,res,next)=>{
    res.statusCode=403;
    const newLocal = 'POST method cant be supported /dishes/  :';
    res.end(newLocal + req.params.dishId);
})
.put((req,res,next)=>{
    res.write("Updating the dish :" + req.params.dishId +'\n');
    res.end('Will update thr dish : ' + req.body.name + 'with details : ' + req.body.description);
})
.delete((req,res,next)=>{
    res.end('Deleting dish : ' + req.params.dishId);
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


