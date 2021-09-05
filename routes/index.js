const express = require ('express');
const router = express.Router();

const { projects } = require ('../data/data.json');


//Home route
router.get('/', (req, res) => {
    res.locals = projects;
    res.render('index', {projects})
});

// About route
router.get('/about', (req, res) => {
    res.render('about')
})

// Projects route
router.get('/projects/:id', (req, res, next) => {
    const projectId = parseInt(req.params.id);
    const project = projects.find(({ id }) => id === projectId);
    
    if(project){
      res.render('project', { project })
    }else{
      const err = new Error();
      err.status =  500;
      err.message = `server error(${err.status}). Your request was unable to be completed.`
      return next(err);
    }
   
});








module.exports = router;