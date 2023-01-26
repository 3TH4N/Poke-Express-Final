const mongoose = require("mongoose");
const React = require("react");

class New extends React.Component {
  render() {
    return (
    <div>
        <link rel="stylesheet" href="../css/styles.css" type='text/css' />
      <h1>New Pokemon</h1>
      <form action="/pokemon" method="POST">
        Name: <input type="text" name="name" /> <br />
        {/* Img: <input type="text" name="img" /> <br /> */}
        <input type="submit" name="" value="Create Pokemon"/>
      </form>
      <nav>
        <a href="/pokemon">Back</a>
      </nav>
    </div>);
  }
}

module.exports = New;