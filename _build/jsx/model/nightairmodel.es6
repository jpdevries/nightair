let __NightAirModel = null;

class NightAirModel {
    constructor() {
        this.settingAlarm = false;
        this.fullscreenMode = false;
        this.commandKeyDown = false;
        this.alarming = false;
        this.suppressAlarm = false;
        // pull releveant properties out of localStorage
        this.mondayFirst = this.getBooleanLocalStorageItem('NightAir__mondayFirst',false);
        this.militaryTime = this.getBooleanLocalStorageItem('NightAir__militaryTime',false);
        this.notify = this.getBooleanLocalStorageItem('NightAir__notify',true);
        this.allowFullscreen = this.getBooleanLocalStorageItem('NightAir__allowFullscreen',true);
        this.alarmEnabled = this.getBooleanLocalStorageItem('NightAir__alarmEnabled',true);
        this.theme = this.getLocalStorageItem('NightAir__theme','default');
        this.alarmTime = (function(that){ // set alarm time to stored value or 00:00
          var storage = that.getLocalStorageItem('NightAir__alarm');
          var date = new Date();
          if(storage) {
            date = new Date(parseInt(storage));
          } else {
            date.setHours(0);
            date.setMinutes(0);
          }
          date.setSeconds(0);
          date.setMilliseconds(0);

          return date;
        })(this);
        if(!__NightAirModel){
              __NightAirModel = this;
        }

        return __NightAirModel;
    }
    getInstance() {
      return __NightAirModel || new NightAirModel();
    }
    getLocalStorageItem(n, d) {
      try {
        return (localStorage.getItem(n) || d);
      } catch (e) {
        return d;
      }
    }
    getBooleanLocalStorageItem(n,d) {
      return JSON.parse(this.getLocalStorageItem(n,d));
    }
    getSettingAlarm() {
      return this.settingAlarm;
    }
    setSettingAlarm(val) {
      this.settingAlarm = val;
    }
    getFullscreenMode() {
      return this.fullscreenMode;
    }
    setFullscreenMode(val) {
      this.fullscreenMode = val;
    }
    getCommandKeyDown() {
      return this.commandKeyDown;
    }
    setCommandKeyDown(val) {
      this.commandKeyDown = val;
    }
    getAlarming() {
      return this.alarming;
    }
    setAlarming(val) {
      this.alarming = val;
    }
    getSuppressAlarm() {
      return this.suppressAlarm;
    }
    setSuppressAlarm(val) {
      this.suppressAlarm = val;
    }
    getMondayFirst() {
      return this.mondayFirst;
    }
    setMondayFirst(val) {
      this.mondayFirst = val;
    }
    getMilitaryTime() {
      return this.militaryTime;
    }
    setMilitaryTime(val) {
      this.militaryTime = val;
    }
    getNotify() {
      return this.notify;
    }
    setNotify(val) {
      this.notify = val;
    }
    getAllowFullscreen() {
      return this.allowFullscreen;
    }
    setAllowFullscreen(val) {
      this.allowFullscreen = val;
    }
    getAlarmEnabled() {
      return this.alarmEnabled;
    }
    setAlarmEnabled(val) {
      this.alarmEnabled = val;
      localStorage.setItem('NightAir__alarmEnabled',val);
    }
    getAlarmTime() {
      return this.alarmTime;
    }
    setAlarmTime(val) {
      val = new Date(val);
      this.alarmTime = val;
      localStorage.setItem('NightAir__alarm',val.getTime());
    }
    getTheme() {
      return this.theme;
    }
    setTheme(val) {
      this.theme = val;
      localStorage.setItem('NightAir__theme',val);
    }
}

module.exports = NightAirModel;
