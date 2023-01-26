const mongoose = require('mongoose');


const pokemon = [
 {name: "bulbasaur", img: "http://img.pokemondb.net/artwork/bulbasaur"},
 {name: "ivysaur", img: "http://img.pokemondb.net/artwork/ivysaur"},
 {name: "venusaur", img: "http://img.pokemondb.net/artwork/venusaur"},
 {name: "charmander", img: "http://img.pokemondb.net/artwork/charmander"},
 {name: "charizard", img: "http://img.pokemondb.net/artwork/charizard"},
 {name: "squirtle", img: "http://img.pokemondb.net/artwork/squirtle"},
 {name: "wartortle", img: "http://img.pokemondb.net/artwork/wartortle"},
 {name: "blastoise", img: "http://img.pokemondb.net/artwork/blastoise"}
 ];


const pokemonSchema = new mongoose.Schema({
     name: { type: String, required: true },
     img: { type: String, require: true }
 });
 
 const Pokemon = mongoose.model('Pokemon', pokemonSchema);
 
 module.exports = Pokemon;