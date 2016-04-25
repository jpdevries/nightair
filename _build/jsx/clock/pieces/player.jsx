var NightAirModel = require('../../model/nightairmodel.es6');
var nightAirModel = new NightAirModel().getInstance();

var Player = React.createClass({
  getDefaultProps: function() {
    return {
      srcMp3: 'assets/mp3/digital_beep.mp3',
      autoplay: true,
      volume: 1,
      muted: false,
      loop:true,
      controls:false
    };
  },
  render: function() {
    if(!nightAirModel.getAlarming()) return (<div></div>);
    return (
      <div>
        <audio autoPlay={this.props.autoplay} loop={this.props.loop} muted={this.props.muted} controls={this.props.controls}>
          <source src={this.props.srcMp3} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
});

module.exports = Player;
