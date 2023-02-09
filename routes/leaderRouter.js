const express=require('express');
const bodyParser=require('body-parser');

const leaderRouter=express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('  Will Send all the leaders to You !!');
})
.post((req,res,next)=>{
    res.end('Will add the leaders :' + req.body.name +' with details : ' + req.body.description);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT method cant be supported /leaders');
})
.delete((req,res,next)=>{
    res.end('Deleting all the leaders !!');
});


//fst method

 leaderRouter.route('/:leaderId')
.get((req,res,next)=>{
    res.end(`Will Send details of leaders : ${req.params.leaderId}`);
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('POST method cant be supported on /leaders/  :' + req.params.leaderId);
})
.put((req,res,next)=>{
    res.write("Updating the leaders :" + req.params.leaderId +'\n');
    res.end('Will update thr leaders : ' + req.body.name + 'with details : ' + req.body.description);
})
.delete((req,res,next)=>{
    res.end('Deleting leaders : ' + req.params.leaderId);
});





//second method
// leaderRouter.get('/dishes/:leaderId',(req,res,next)=>{
//     res.end('Will Send details of dish : '+req.params.leaderId);
// });
// leaderRouter.post('/dishes/:leaderId',(req,res,next)=>{
//     res.statusCode=403;
//     res.end('POST method cant be supported /dishes/  :' + req.params.leaderId);
// });
// leaderRouter.put('/dishes/:leaderId',(req,res,next)=>{
//     res.write("Updating the dish :" + req.params.leaderId +'\n');
//     res.end('Will update thr dish : ' + req.body.name + 'with details : ' + req.body.description);
// });
// leaderRouter.delete('/dishes/:leaderId',(req,res,next)=>{
//     res.end('Deleting dish : ' + req.params.leaderId);
// });


module.exports = leaderRouter;


