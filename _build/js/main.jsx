var Digits = React.createClass({
  render:function(){
    return (
      <div>
        <h1>Digits</h1>
        <Digit />
      </div>
    );
  }
});

var Digit = React.createClass({
  render:function(){
    return (
      <div>
        <h3>Digit</h3>
      </div>
    );
  }
});

ReactDOM.render(
  <Digits />,
  document.getElementById('digits')
);
