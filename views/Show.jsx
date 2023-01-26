const React = require("react");

const style = {
    body: 'rgb(106, 134, 56)'
};

class Show extends React.Component {
    
    render () {
        const{ pokemon } = this.props
              return (
        <>
         <div style={style}>
         <link rel="stylesheet" href="../css/styles.css" type='text/css' />
        <h1>Gotta Catch 'Em All</h1>
        <h2> {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2> 
         <img src={'http://img.pokemondb.net/artwork/' +
            pokemon.name.toLowerCase() + ".jpg"}> 
        </img>
        <a href="/pokemon/"> Back</a>
        </div>
        </>
        )     
    }
} 

module.exports = Show;

