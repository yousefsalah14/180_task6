const express = require('express');
const app = express();
const mysql = require('mysql');
let pool= mysql.createPool({
    connectionLimit :10,
    host :"localhost",
    user:"root",
    database :"cinema"

});
app.use(express.json());//to access body in post
app.listen(5000, () => {
    console.log("server is on port 5000");
});
app.get("/cinema/movies",(req,res)=>{
        pool.query(
            "select * from thecamp_cinema",
    function (err,result,fields){
if (err) res.status(404).send("error")
res.send(result);
    });
});
app.post('/cinema/movies', (req, res) => {
    
    pool.query(
        `insert into  thecamp_cinema (id,movie_name,movie_length,movie_director ) 
        VALUES ("${req.body.id}","${req.body.movie_name}","${req.body.movie_length}",
        "${req.body.movie_director }")`,
        function(err,results,fields){
            if (err) res.status(404).send(err)
            res.send(results);
        }
    )
});
app.delete('/cinema/movies', (req, res) => {
    const id = req.body.id;
    pool.query(
        `DELETE FROM thecamp_cinema WHERE id = ${id}`,
        function(err, results, fields) {
            if (err) return res.status(404).send(err);
            console.log('Deleted ');
            res.send('Deleted ');
        }
    );
});
app.patch('/cinema/movies', (req, res) => {
    const movie = req.body;
    pool.query(
        `UPDATE thecamp_cinema SET movie_name = "${movie.movie_name}",
        movie_length = "${movie.movie_length}",
        movie_director = "${movie.movie_director}" WHERE id = ${movie.id}`,
        function(err, results, fields) {
            if (err) return res.status(404).send(err);
            console.log(`Updated movie with id ${movie.id}`);
            res.send(`Updated movie with id ${movie.id}`);
        }
    );
});
app.post('/cinema/movies/ratings', (req, res) => {

    pool.query(
        `insert into  thecamp_movies_ratings (id,movie_review,date,movie_id ) 
        VALUES ("${req.body.id}","${req.body.movie_review}","${req.body.date}",
        "${req.body.movie_id}")`,
        function(err,results,fields){
            if (err) res.status(404).send(err)
            res.send(results);
        }
    )
});