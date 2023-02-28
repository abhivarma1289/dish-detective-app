const express=require('express');
const bodyParser=require('body-parser');



const promoRouter=express.Router();
promoRouter.use(bodyParser.json());



promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('  Will Send all the promotion to You !!');
})
.post((req,res,next)=>{
    res.end('Will add the promotions :' + req.body.name +' with details : ' + req.body.description);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT method cant be supported /promotions');
})
.delete((req,res,next)=>{
    res.end('Deleting all the promotions !!');
});


//fst method

 promoRouter.route('/:promoId')
.get((req,res,next)=>{
    res.end('Will Send details of promotions : '+req.params.promoId);
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('POST method cant be supported on /promotions/  :' + req.params.promoId);
})
.put((req,res,next)=>{
    res.write("Updating the promotions :" + req.params.promoId +'\n');
    res.end('Will update thr promotions : ' + req.body.name + 'with details : ' + req.body.description);
})
.delete((req,res,next)=>{
    res.end('Deleting promostions : ' + req.params.promoId);
});





//second method
// promoRouter.get('/dishes/:promoId',(req,res,next)=>{
//     res.end('Will Send details of dish : '+req.params.promoId);
// });
// promoRouter.post('/dishes/:promoId',(req,res,next)=>{
//     res.statusCode=403;
//     res.end('POST method cant be supported /dishes/  :' + req.params.promoId);
// });
// promoRouter.put('/dishes/:promoId',(req,res,next)=>{
//     res.write("Updating the dish :" + req.params.promoId +'\n');
//     res.end('Will update thr dish : ' + req.body.name + 'with details : ' + req.body.description);
// });
// promoRouter.delete('/dishes/:promoId',(req,res,next)=>{
//     res.end('Deleting dish : ' + req.params.promoId);
// });


module.exports = promoRouter;


