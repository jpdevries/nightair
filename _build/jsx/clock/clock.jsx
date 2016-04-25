var NightAirModel = require('../model/nightairmodel.es6');
var nightAirModel = new NightAirModel().getInstance();
var Digit = require('./pieces/digit.jsx');
var Separator = require('./pieces/separator.jsx');
var Notify = require('../helpers/notify.es6');

var Clock = React.createClass({ // the clock display, made up if <Digit>s
  render:function(){
    var now = this.getTime();
    var cls = '';
    if(nightAirModel.getAlarming()) cls = 'alarming';
    else if(nightAirModel.getSettingAlarm()) cls = 'settingAlarm';
    if(this.shouldAlarm()) this.doAlarm();
    return (
      <div className={cls}>
        <Digit digit={now.h1} />
        <Digit digit={now.h2} />
        <Separator />
        <Digit digit={now.m1} />
        <Digit digit={now.m2} />
        <Separator />
        <Digit className="digit seconds seconds-tenth" digit={now.s1} />
        <Digit className="digit seconds" digit={now.s2} />
      </div>
    );
  },
  doAlarm:function() {
    var settingAlarm = nightAirModel.getSettingAlarm(),
    suppressAlarm = nightAirModel.getSuppressAlarm(),
    alarmEnabled = nightAirModel.getAlarmEnabled(),
    notify = nightAirModel.getNotify(),
    alarmTime = nightAirModel.getAlarmTime();
    if(settingAlarm || suppressAlarm || !alarmEnabled) return;
    nightAirModel.setAlarming(true);
    nightAirModel.setSuppressAlarm(true);
    if(notify) Notify.pushNotification('Beep Beep!','You\'re ' + getAlarmDisplayTime() + ' alarm is sounding.',undefined,60000);
    function getAlarmDisplayTime() {
      var h = alarmTime.getHours(),
      m = alarmTime.getMinutes(),
      militaryTime = nightAirModel.getMilitaryTime(),
      mer = (!militaryTime) ? 'am' : '';
      if(!militaryTime) {
        if(alarmTime.getHours() > 12) {
          mer = 'pm';
        }
      } else {
        if(h < 10) h = '0' + h.toString();
      }
      return h + ':' + m + mer;
    }
  },
  shouldAlarm:function(){
    var now = new Date(),
    alarmTime = nightAirModel.getAlarmTime();
    return (alarmTime.getHours() === now.getHours() && alarmTime.getMinutes() === now.getMinutes()) ? true : false;
  },
  getTime:function(){
    var settingAlarm = nightAirModel.getSettingAlarm(),
    alarmTime = nightAirModel.getAlarmTime(),
    alarming = nightAirModel.getAlarming(),
    now = (settingAlarm) ? alarmTime : new Date();

    if(alarming) {
      now.setSeconds(0);
      now.setMilliseconds(0);
    }

    var hours = (function(){
      var h = now.getHours();
      if(!nightAirModel.getMilitaryTime() && h > 12) h -= 12;
      return h;
    })().toString().split('');
    var minutes = now.getMinutes().toString().split('');
    var seconds = now.getSeconds().toString().split('');

    if(hours.length < 2) hours.unshift('0');
    if(minutes.length < 2) minutes.unshift('0');
    if(seconds.length < 2) seconds.unshift('0');

    return {
      h1:digitToWord(hours[0]),
      h2:digitToWord(hours[1]),
      m1:digitToWord(minutes[0]),
      m2:digitToWord(minutes[1]),
      s1:digitToWord(seconds[0]),
      s2:digitToWord(seconds[1])
    }

    function digitToWord(digit) { // accepts "0" returns "zero"
      return ['zero','one','two','three','four','five','six','seven','eight','nine'][parseInt(digit)];
    }
  }
});

module.exports = Clock;
