var NightAirModel = require('../../model/nightairmodel.es6');
var nightAirModel = new NightAirModel().getInstance();
var WeekDay = require('./weekday.jsx');

var WeekDays = React.createClass({ // weekdays display ticker made up of <Weekday>s
  render:function() {
    var dow = (function(){
      //if(settingAlarm) return alarmTime;
      return new Date();
    })().getDay();
    var weekDays = [
      {key:'sun',l:'Sunday'},
      {key:'mon',l:'Monday'},
      {key:'tue',l:'Tuesday'},
      {key:'wed',l:'Wednesday'},
      {key:'thu',l:'Thursday'},
      {key:'fri',l:'Friday'},
      {key:'sat',l:'Saturday'}
    ]
    var weekNodes = [];
    for(var i = 0; i < weekDays.length; i++) weekNodes.push( // push each day of the weak into an Array
      <WeekDay key={weekDays[i].key} D={weekDays[i].key} l={weekDays[i].l} isToday={dow == i ? true : false} />
    );

    var cls = 'week ';
    if(nightAirModel.getMondayFirst()) cls += 'monfirst'; // uses flex order to change the visual order

    return (
      <div className={cls}>
        {weekNodes}
      </div>
    );
  }
});

module.exports = WeekDays;
