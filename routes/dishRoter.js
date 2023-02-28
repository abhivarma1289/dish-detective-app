const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Dishes = require('../models/dishes');
mongoose.Promise = require('bluebird');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
	.get((req, res, next) => {
		Dishes.find({})
			.then((getdishes) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(getdishes);
			}, (err) => next(err))
			.catch((err) => next(err));

	})
	.post((req, res, next) => {
		Dishes.create(req.body)
			.then((postdish) => {

				console.log('dish created');
				console.log('post dish created', JSON.stringify(postdish, null, 2));

				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(postdish);

			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.put((req, res, next) => {
		res.statusCode = 403;
		res.end('PUT method cant be supported /dishes');
	})
	.delete((req, res, next) => {
		Dishes.deleteOne({})
			.then((resp) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(resp);
			}, (err) => next(err))
			.catch((err) => next(err));
	});


//fst method

dishRouter.route('/:dishId')
	.get((req, res, next) => {
		Dishes.findById(req.params.dishId)
			.then((gettiddish) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(gettiddish);
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		res.statusCode = 403;
		const newLocal = 'POST method cant be supported /dishes/  :';
		res.end(newLocal + req.params.dishId);
	})
	.put((req, res, next) => {
		Dishes.findByIdAndUpdate(req.params.dishId, {
			$set: req.body
		}, { new: true })
			.then((putiddish) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(putiddish);
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		Dishes.findByIdAndRemove(req.params.dishId)
			.then((resp) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(resp);
			}, (err) => next(err))
			.catch((err) => next(err));
	});




dishRouter.route('/:dishId/comments')
	.get((req, res, next) => {
		Dishes.findById(req.params.dishId)
			.then((getdishcmt) => {
				if (getdishcmt != null) {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(getdishcmt.comments);
				}
				else {
					err = new Error('Dish' + req.params.dishId + 'not Found');
					err.status = 404;
					return next(err);
				}
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	// .post((req,res,next)=>{
	//    Dishes.findById(req.params.dishId)
	//    .then((postdishcmt)=>{
	//     if(postdishcmt !=null){
	//         console.log(req.body);
	//         console.log(postdishcmt.comment);
	//         postdishcmt.comments.push(req.body);
	//         postdishcmt.update()
	//         .then((updateResponse)=>{
	//             console.log(updateResponse);
	//             Dishes.findById(req.params.dishId)
	//             .then((postdishcmtdata)=>{
	//                 res.statusCode=200;
	//                 res.setHeader('Content-Type','application/json');  
	//                 res.json(postdishcmtdata);
	//             })         
	//         },(err)=>next(err));   
	//     }
	//     else{
	//         err =new Error('Dish' +req.params.dishId+'not Found');
	//         err.status= 404;
	//         return next(err);
	//     }      
	//    },(err)=>next(err))
	//    .catch((err)=> next(err));
	// })
	.post((req, res, next) => {
		const dishId = req.params.dishId;
		Dishes.findById(dishId)
			.then((dish) => {
				if (dish != null) {
					dish.comments.push(req.body);
					dish.save()
						.then(() => {
							console.log(JSON.stringify(dish, null, 2));
							res.statusCode = 200;
							res.setHeader('Content-Type', 'application/json');
							res.json(dish);
						})
						.catch(err => next(err));
					// dish.save((err) => {
					//     if (err) return next(err);
					//     console.log(JSON.stringify(dish, null, 2));
					//     res.statusCode=200;
					//     res.setHeader('Content-Type','application/json');  
					//     res.json(dish);
					// });
					// Dishes.update(dish)
					// .then((updateRes) => {
					//     Dishes.findById(dishId)
					//     .then((postdishcmtdata)=>{
					//         res.statusCode=200;
					//         res.setHeader('Content-Type','application/json');  
					//         res.json(postdishcmtdata);
					//     }).catch(err => next(err));
					//     // res.statusCode = 200;
					//     // res.setHeader('Content-Type', 'application/json');
					//     // res.json(dish);                
					// }, (err) => next(err));
				}
				else {
					err = new Error('Dish ' + req.params.dishId + ' not found');
					err.status = 404;
					return next(err);
				}
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.put((req, res, next) => {
		res.statusCode = 403;
		res.end('PUT method cant be supported /dishes/' + req.params.dishId + '/comments');
	})
	.delete((req, res, next) => {
		Dishes.findById(req.params.dishId)
			.then((dishid) => {
				if (dishid != null) {
					for (var i = (dishid.comments.length-1); i >= 0; i--) {
						dishid.comments.id(dishid.comments[i]._id).remove();
					}
					dishid.save()
						.then((cmtmodfydish) => {
							res.statusCode = 200;
							res.setHeader('Content-Type', 'application/json');
							res.json(cmtmodfydish);
						}, (err) => next(err));
				}
				else {
					err = new Error('Dish' + req.params.dishId + 'not Found');
					err.status = 404;
					return next(err);
				}
			}, (err) => next(err))
			.catch((err) => next(err));
	});

// 	.delete((req, res, next) => {
//     Dishes.findById(req.params.dishId)
//     .then((dish) => {
//         if (dish != null) {
//             for (var i = (dish.comments.length -1); i >= 0; i--) {
//                 dish.comments.id(dish.comments[i]._id).remove();
//             }
//             dish.save()
//             .then((dish) => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(dish);                
//             }, (err) => next(err));
//         }
//         else {
//             err = new Error('Dish ' + req.params.dishId + ' not found');
//             err.status = 404;
//             return next(err);
//         }
//     }, (err) => next(err))
//     .catch((err) => next(err));    
// });










dishRouter.route('/:dishId/comments/:commentId')
	.get((req, res, next) => {
		Dishes.findById(req.params.dishId)
			.then((getdishcmtid) => {
				if (getdishcmtid != null && getdishcmtid.comments.id(req.params.commentId) != null) {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(getdishcmtid.comments.id(req.params.commentId));
				}
				else if (getdishcmtid == null) {
					err = new Error('Dish' + req.params.dishId + 'not Found');
					err.status = 404;
					return next(err);
				}
				else {
					err = new Error('Comment' + req.params.commentId + 'not Found');
					err.status = 404;
					return next(err);
				}
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		res.statusCode = 403;
		const newLocal = 'POST method cant be supported /dishes/  :';
		res.end(newLocal + req.params.dishId + '/comment/' + req.params.commentId);
	})
	.put((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
	.delete((req, res, next) => {
		Dishes.findById(req.params.dishId)
			.then((ddishcmtid) => {
				if (ddishcmtid != null && ddishcmtid.comments.id(req.params.commentId) != null) {
					ddishcmtid.comments.id(req.params.commentId).remove();
					ddishcmtid.save()
						.then((ddishcmtid) => {
							res.statusCode = 200;
							res.setHeader('Content-Type', 'application/json');
							res.json(ddishcmtid);
						}, (err) => next(err));
				}
				else if (ddishcmtid == null) {
					err = new Error('Dish' + req.params.dishId + 'not Found');
					err.status = 404;
					return next(err);
				}
				else {
					err = new Error('Comment' + req.params.commentId + 'not Found');
					err.status = 404;
					return next(err);
				}
			}, (err) => next(err))
			.catch((err) => next(err));
	});
// 	.delete((req, res, next) => {
//     Dishes.findById(req.params.dishId)
//     .then((dish) => {
//         if (dish != null && dish.comments.id(req.params.commentId) != null) {
//             dish.comments.id(req.params.commentId).remove();
//             dish.save()
//             .then((dish) => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(dish);                
//             }, (err) => next(err));
//         }
//         else if (dish == null) {
//             err = new Error('Dish ' + req.params.dishId + ' not found');
//             err.status = 404;
//             return next(err);
//         }
//         else {
//             err = new Error('Comment ' + req.params.commentId + ' not found');
//             err.status = 404;
//             return next(err);            
//         }
//     }, (err) => next(err))
//     .catch((err) => next(err));
// });

















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


