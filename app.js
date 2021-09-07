const express = require ('express');

const app = express();

const port = process.env.PORT || 3000;

//Template engine
app.set('view engine', 'pug');

//static files middleware
app.use(express.static('./public'));

//routes
const mainRoutes = require('./routes/index');

app.use(mainRoutes);



//404 error handler
app.use((req, res, next) => {
    const err = new Error("Page not found");
    err.status = 404;
    console.log('Page not found :(');
    res.render('not-found', {err})
})

//Global error handler middleware
app.use((err, req, res, next) => {
   if (err) {
       console.log('Something went wrong :(')
       console.log('Global error is called', err);
   }
   if (err.status === 404) {

       res.status(404).render('not-found', {err});
   } else {
       err.message = err.message || 'Something went wrong :(';
       res.status(err.status || 500).render('error', {err})
       
   }
    
});


app.listen(port, function () {
    console.log(`App running on port ${port}`);
})