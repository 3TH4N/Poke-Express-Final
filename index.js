require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000
const db = mongoose.connection
const methodOverride = require('method-override')

//Code added from Hadia (worked)
const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI);
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

//Code added from Hadia (worked)
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("open", () => console.log("mongo connected: ", mongoURI));
db.on("close", () => console.log("mongo disconnected"));


const Pokemon = require('./models/pokemon.js');

// Set up MIDDLEWARE///
app.use(methodOverride('_method'))

app.use((req, res, next) => {
    console.log("I run for all routes")
    next()
})

////This needs explained to me//////
app.use(express.urlencoded({ extended: false }))
mongoose.set("strictQuery", true)


app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())



app.get('/', (req, res) =>{
    res.send("Welcome to the Pokemon App!");
})

//INDEX ROUTES = showing all records
app.get('/pokemon/', (req, res) =>{
    Pokemon.find({}, (error, allPokemon) => {
        res.render('Index', {
            allPokemon: allPokemon
        })
    })
  
})

// NEW - form to create new pokemon
app.get('/pokemon/new', (req,res) =>{
    res.render('New')
})

// DELETE - will delete this one record// USED TO DELETED DATA FROM MONGO
app.delete('/pokemon/:id', (req, res) => {
    Pokemon.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/pokemon');//redirect back to pokemon index
    });
})

// UPDATE - Modifying a record///
app.put('/pokemon/:id', (req, res)=>{
   
    Pokemon.findByIdAndUpdate(req.params.id, req.body, (err, updatedPokemon)=>{
       console.log(updatedPokemon)
        res.redirect(`/pokemon/${req.params.id}`); //This is redirecting to the show page
    });
});


//CREATE - send the filled in *UPDATE* form to db andn create a new record
app.post('/pokemon', (req,res )=> {
    //CREATED VARIBLE TO LINK POKEMON PHOTOS
    let pokemonBody = req.body
    pokemonBody.img = pokemonBody.name

    Pokemon.create(req.body, (error, createPokemon) =>{
        res.redirect('/pokemon')
    })
})

//EDIT - Get the form with the record update

app.get('/pokemon/:id/edit', (req, res)=>{
    Pokemon.findById(req.params.id, (err, foundPokemon)=>{ //find the fruit
      if(!err){
        res.render(
    		  'Edit',
    		{
    			pokemon: foundPokemon //pass in the found fruit so we can prefill the form
    		}
    	);
    } else {
      res.send({ msg: err.message })
    }
    });
});

//SHOW ROUTE
app.get('/pokemon/:id', (req, res) => {
    Pokemon.findById(req.params.id, (err, foundPokemon) => {
        res.render("Show", {
          pokemon: foundPokemon
        })
      })
  
})


app.use(express.static('public'));



app.listen(3000, () => {
    console.log('listening')
});