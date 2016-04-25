var NightAirModel = require('../../model/nightairmodel.es6');
var nightAirModel = new NightAirModel().getInstance();
var StatusIcon = require('./statusicon.jsx');

var StatusBar = React.createClass({
  getDefaultProps:function(){
    return {};
  },
  render:function(){
    var alarmEnabled = nightAirModel.getAlarmEnabled();
    return (
      <div>
        <StatusIcon id="bell" lit={alarmEnabled} />
      </div>
    );
  }
});

module.exports = StatusBar;
