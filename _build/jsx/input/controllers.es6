var NightAirModel = require('../model/nightairmodel.es6');
var nightAirModel = new NightAirModel().getInstance();

function assignKeyboardListeners() {
  document.addEventListener("keypress", function(e){
    //console.log(e.keyCode,e.charCode);
    var alarming = nightAirModel.getAlarming(),
    alarmTime = nightAirModel.getAlarmTime();
    if(alarming) nightAirModel.setAlarming(false);
    switch(e.charCode) {
      case 32:
      nightAirModel.setSettingAlarm(true);
      break;

      case 91:
      nightAirModel.setCommandKeyDown(true);
      break;

      case 161:
      setTheme('default');
      break;

      case 8482:
      setTheme('calm');
      break;

      case 163:
      setTheme('dangerous');
      break;

      case 162:
      setTheme('bright');
      break;

      case 8734:
      setTheme('royal');
      break;

      case 167:
      setTheme('neon');
      break;

      case 182:
      setTheme('sterc');
      break;

      case 8226:
      setTheme('invert');
      break;

      case 170:
      setTheme('modx');
      break;

      case 104:
      case 38:
      case 72:
      if(nightAirModel.getSettingAlarm()) nightAirModel.setAlarmTime(new Date(alarmTime.getTime() + (1000 * 60 * 60)));
      break;

      case 109:
      case 39:
      case 77:
      if(nightAirModel.getSettingAlarm()) nightAirModel.setAlarmTime(new Date(alarmTime.getTime() + (1000 * 60)));
      break;

      case 229:
      nightAirModel.setAlarmEnabled(!nightAirModel.getAlarmEnabled());
      break;

      case 402: // fullscreen mode
      if(nightAirModel.getAllowFullscreen()) toggleFullscreen();
      break;
    }
  });

  document.addEventListener("keyup", function(e){
    var settingAlarm = nightAirModel.getSettingAlarm(),
    alarmTime = nightAirModel.getAlarmTime();
    switch(e.keyCode) {
      case 32:
      nightAirModel.setSettingAlarm(false);
      break;

      case 91:
      nightAirModel.setCommandKeyDown(false);
      break;

      case 38:
      if(settingAlarm) setAlarmTime(new Date(alarmTime.getTime() + (1000 * 60 * 60)));
      break;

      case 39:
      if(settingAlarm) setAlarmTime(new Date(alarmTime.getTime() + (1000 * 60)));
      break;
    }
  });

  function setTheme(theme) {
    document.body.setAttribute('data-theme',theme);
    nightAirModel.setTheme(theme);
  }

  function RunPrefixMethod(obj, method) {
      var pfx = ["webkit", "moz", "ms", "o", ""];
      var p = 0, m, t;
      while (p < pfx.length && !obj[m]) {
          m = method;
          if (pfx[p] == "") {
              m = m.substr(0,1).toLowerCase() + m.substr(1);
          }
          m = pfx[p] + m;
          t = typeof obj[m];
          if (t != "undefined") {
              pfx = [pfx[p]];
              return (t == "function" ? obj[m]() : obj[m]);
          }
          p++;
      }
  }

  function toggleFullscreen() {
    if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
        RunPrefixMethod(document, "CancelFullScreen");
        nightAirModel.setFullscreenMode(false);
    }
    else {
        RunPrefixMethod(clockDOM, "RequestFullScreen");
        nightAirModel.setFullscreenMode(true);
    }
  }
}

module.exports = {assignKeyboardListeners:assignKeyboardListeners};
