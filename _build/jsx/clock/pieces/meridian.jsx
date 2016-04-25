var NightAirModel = require('../../model/nightairmodel.es6');
var nightAirModel = new NightAirModel().getInstance();

var Meridian = React.createClass({
  getAnteMeridiem(){
    return ((function(){
      if(nightAirModel.getSettingAlarm()) return nightAirModel.getAlarmTime();
      return new Date();
    })().getHours() < 12) ? true : false;
  },
  getPostMeridiem(){
    return !this.getAnteMeridiem();
  },
  render:function(){
    var xlink = "assets/img/art.svg#icon-" + (this.getAnteMeridiem() ? 'am' : 'pm'),
    title = (this.props.anteMeridiem ? 'AM' : 'PM');
    if(nightAirModel.getMilitaryTime()) return null;
    return (
      <h3>
        <svg x="0px" y="0px" viewBox="0 0 24 42" enable-background="new 0 0 24 42">
          <title>{title}</title>
          <use xlinkHref={xlink} />
        </svg>
      </h3>
    );
  }
});

module.exports = Meridian;
