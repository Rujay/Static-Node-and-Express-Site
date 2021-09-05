const express = require ('express');

const app = express();

app.set('view engine', 'pug');

//static middleware
app.use(express.static('./public'));

//routes
const mainRoutes = require('./routes/index');

app.use(mainRoutes);



//404 error handler
app.use((req, res, next) => {
    const err = new Error("Page not found");
    err.status = 404;
    res.render('not-found', {err})
})

//Global error handler middleware
app.use((err, req, res, next) => {
   if (err) {
       console.log('Global error is called', err);
   }
   if (err.status === 404) {
       res.status(404).render('not-found', {err});
   } else {
       err.message = err.message || 'Something went wrong :(';
       res.status(err.status || 500).render('error', {err})
   }
    
});


app.listen(3000, function () {
    console.log('App running on port 3000');
})