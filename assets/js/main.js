'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.querySelector('html').classList.remove('no-js');

var __NightAirModel = null;

var NightAirModel = function () {
  function NightAirModel() {
    _classCallCheck(this, NightAirModel);

    this.settingAlarm = false;
    this.fullscreenMode = false;
    this.commandKeyDown = false;
    this.alarming = false;
    this.suppressAlarm = false;
    // pull releveant properties out of localStorage
    this.mondayFirst = this.getBooleanLocalStorageItem('NightAir__mondayFirst', false);
    this.militaryTime = this.getBooleanLocalStorageItem('NightAir__militaryTime', false);
    this.notify = this.getBooleanLocalStorageItem('NightAir__notify', true);
    this.allowFullscreen = this.getBooleanLocalStorageItem('NightAir__allowFullscreen', true);
    this.alarmEnabled = this.getBooleanLocalStorageItem('NightAir__alarmEnabled', true);
    this.theme = this.getLocalStorageItem('NightAir__theme', 'default');
    this.alarmTime = function (that) {
      // set alarm time to stored value or 00:00
      var storage = that.getLocalStorageItem('NightAir__alarm');
      var date = new Date();
      if (storage) {
        date = new Date(parseInt(storage));
      } else {
        date.setHours(0);
        date.setMinutes(0);
      }
      date.setSeconds(0);
      date.setMilliseconds(0);

      return date;
    }(this);
    if (!__NightAirModel) {
      __NightAirModel = this;
    }

    return __NightAirModel;
  }

  _createClass(NightAirModel, [{
    key: 'getInstance',
    value: function getInstance() {
      return __NightAirModel || new NightAirModel();
    }
  }, {
    key: 'getLocalStorageItem',
    value: function getLocalStorageItem(n, d) {
      try {
        return localStorage.getItem(n) || d;
      } catch (e) {
        return d;
      }
    }
  }, {
    key: 'getBooleanLocalStorageItem',
    value: function getBooleanLocalStorageItem(n, d) {
      return JSON.parse(this.getLocalStorageItem(n, d));
    }
  }, {
    key: 'getSettingAlarm',
    value: function getSettingAlarm() {
      return this.settingAlarm;
    }
  }, {
    key: 'setSettingAlarm',
    value: function setSettingAlarm(val) {
      this.settingAlarm = val;
    }
  }, {
    key: 'getFullscreenMode',
    value: function getFullscreenMode() {
      return this.fullscreenMode;
    }
  }, {
    key: 'setFullscreenMode',
    value: function setFullscreenMode(val) {
      this.fullscreenMode = val;
    }
  }, {
    key: 'getCommandKeyDown',
    value: function getCommandKeyDown() {
      return this.commandKeyDown;
    }
  }, {
    key: 'setCommandKeyDown',
    value: function setCommandKeyDown(val) {
      this.commandKeyDown = val;
    }
  }, {
    key: 'getAlarming',
    value: function getAlarming() {
      return this.alarming;
    }
  }, {
    key: 'setAlarming',
    value: function setAlarming(val) {
      this.alarming = val;
    }
  }, {
    key: 'getSuppressAlarm',
    value: function getSuppressAlarm() {
      return this.suppressAlarm;
    }
  }, {
    key: 'setSuppressAlarm',
    value: function setSuppressAlarm(val) {
      this.suppressAlarm = val;
    }
  }, {
    key: 'getMondayFirst',
    value: function getMondayFirst() {
      return this.mondayFirst;
    }
  }, {
    key: 'setMondayFirst',
    value: function setMondayFirst(val) {
      this.mondayFirst = val;
    }
  }, {
    key: 'getMilitaryTime',
    value: function getMilitaryTime() {
      return this.militaryTime;
    }
  }, {
    key: 'setMilitaryTime',
    value: function setMilitaryTime(val) {
      this.militaryTime = val;
    }
  }, {
    key: 'getNotify',
    value: function getNotify() {
      return this.notify;
    }
  }, {
    key: 'setNotify',
    value: function setNotify(val) {
      this.notify = val;
    }
  }, {
    key: 'getAllowFullscreen',
    value: function getAllowFullscreen() {
      return this.allowFullscreen;
    }
  }, {
    key: 'setAllowFullscreen',
    value: function setAllowFullscreen(val) {
      this.allowFullscreen = val;
    }
  }, {
    key: 'getAlarmEnabled',
    value: function getAlarmEnabled() {
      return this.alarmEnabled;
    }
  }, {
    key: 'setAlarmEnabled',
    value: function setAlarmEnabled(val) {
      this.alarmEnabled = val;
      localStorage.setItem('NightAir__alarmEnabled', val);
    }
  }, {
    key: 'getAlarmTime',
    value: function getAlarmTime() {
      return this.alarmTime;
    }
  }, {
    key: 'setAlarmTime',
    value: function setAlarmTime(val) {
      val = new Date(val);
      this.alarmTime = val;
      localStorage.setItem('NightAir__alarm', val.getTime());
    }
  }, {
    key: 'getTheme',
    value: function getTheme() {
      return this.theme;
    }
  }, {
    key: 'setTheme',
    value: function setTheme(val) {
      this.theme = val;
      localStorage.setItem('NightAir__theme', val);
    }
  }]);

  return NightAirModel;
}();

var nightAirModel = new NightAirModel().getInstance();
console.log(nightAirModel);

document.body.setAttribute('data-theme', nightAirModel.getTheme());

function tick() {
  setTimeout(function () {
    // wait until the next whole second to start the blinking so it syncs with the seconds
    document.body.classList.add('ticking');
  }, 1000 - new Date().getMilliseconds());
}

tick();

function pushNotification(title, body, icon, timeout) {
  if (!nightAirModel.getNotify()) return;
  timeout = timeout == undefined ? 4200 : timeout;
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support system notifications");
    nightAirModel.setNotify(false);
    return;
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var options = {
        body: body,
        icon: icon
      };
      var notification = new Notification(title, options);
      setTimeout(notification.close.bind(notification), timeout);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification(title, options);
            setTimeout(notification.close.bind(notification), timeout);
          }
        });
      }
}

pushNotification('Notifications Enabled', 'You\'ll be notified when the alarm sounds.');

var clockDOM = document.querySelector('#clock'); // this is the current displaying video

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  nightAirModel.setTheme(theme);
}

document.addEventListener("keypress", function (e) {
  //console.log(e.keyCode,e.charCode);
  var alarming = nightAirModel.getAlarming(),
      alarmTime = nightAirModel.getAlarmTime();
  if (alarming) nightAirModel.setAlarming(false);
  switch (e.charCode) {
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
      if (nightAirModel.getSettingAlarm()) nightAirModel.setAlarmTime(new Date(alarmTime.getTime() + 1000 * 60 * 60));
      break;

    case 109:
    case 39:
    case 77:
      if (nightAirModel.getSettingAlarm()) nightAirModel.setAlarmTime(new Date(alarmTime.getTime() + 1000 * 60));
      break;

    case 229:
      nightAirModel.setAlarmEnabled(!nightAirModel.getAlarmEnabled());
      break;

    case 402:
      // fullscreen mode
      if (nightAirModel.getAllowFullscreen()) toggleFullscreen();
      break;
  }
});

document.addEventListener("keyup", function (e) {
  var settingAlarm = nightAirModel.getSettingAlarm(),
      alarmTime = nightAirModel.getAlarmTime();
  switch (e.keyCode) {
    case 32:
      nightAirModel.setSettingAlarm(false);
      break;

    case 91:
      nightAirModel.setCommandKeyDown(false);
      break;

    case 38:
      if (settingAlarm) setAlarmTime(new Date(alarmTime.getTime() + 1000 * 60 * 60));
      break;

    case 39:
      if (settingAlarm) setAlarmTime(new Date(alarmTime.getTime() + 1000 * 60));
      break;
  }
});

function doAlarm() {
  var settingAlarm = nightAirModel.getSettingAlarm(),
      suppressAlarm = nightAirModel.getSuppressAlarm(),
      alarmEnabled = nightAirModel.getAlarmEnabled(),
      notify = nightAirModel.getNotify(),
      alarmTime = nightAirModel.getAlarmTime();
  if (settingAlarm || suppressAlarm || !alarmEnabled) return;
  nightAirModel.setAlarming(true);
  nightAirModel.setSuppressAlarm(true);
  if (notify) pushNotification('Beep Beep!', 'You\'re ' + getAlarmDisplayTime() + ' alarm is sounding.', undefined, 60000);
  function getAlarmDisplayTime() {
    var h = alarmTime.getHours(),
        m = alarmTime.getMinutes(),
        militaryTime = nightAirModel.getMilitaryTime(),
        mer = !militaryTime ? 'am' : '';
    if (!militaryTime) {
      if (alarmTime.getHours() > 12) {
        mer = 'pm';
      }
    } else {
      if (h < 10) h = '0' + h.toString();
    }
    return h + ':' + m + mer;
  }
}

var Digits = React.createClass({
  displayName: 'Digits',
  // the clock display, made up if <Digit>s
  render: function render() {
    var now = this.getTime();
    var cls = '';
    if (nightAirModel.getAlarming()) cls = 'alarming';else if (nightAirModel.getSettingAlarm()) cls = 'settingAlarm';
    if (this.shouldAlarm()) doAlarm();
    return React.createElement(
      'div',
      { className: cls },
      React.createElement(Digit, { digit: now.h1 }),
      React.createElement(Digit, { digit: now.h2 }),
      React.createElement(Separator, null),
      React.createElement(Digit, { digit: now.m1 }),
      React.createElement(Digit, { digit: now.m2 }),
      React.createElement(Separator, null),
      React.createElement(Digit, { className: 'digit seconds seconds-tenth', digit: now.s1 }),
      React.createElement(Digit, { className: 'digit seconds', digit: now.s2 })
    );
  },
  shouldAlarm: function shouldAlarm() {
    var now = new Date(),
        alarmTime = nightAirModel.getAlarmTime();
    return alarmTime.getHours() === now.getHours() && alarmTime.getMinutes() === now.getMinutes() ? true : false;
  },
  getTime: function getTime() {
    var settingAlarm = nightAirModel.getSettingAlarm(),
        alarmTime = nightAirModel.getAlarmTime(),
        alarming = nightAirModel.getAlarming(),
        now = settingAlarm ? alarmTime : new Date();

    if (alarming) {
      now.setSeconds(0);
      now.setMilliseconds(0);
    }

    var hours = function () {
      var h = now.getHours();
      if (!nightAirModel.getMilitaryTime() && h > 12) h -= 12;
      return h;
    }().toString().split('');
    var minutes = now.getMinutes().toString().split('');
    var seconds = now.getSeconds().toString().split('');

    if (hours.length < 2) hours.unshift('0');
    if (minutes.length < 2) minutes.unshift('0');
    if (seconds.length < 2) seconds.unshift('0');

    return {
      h1: digitToWord(hours[0]),
      h2: digitToWord(hours[1]),
      m1: digitToWord(minutes[0]),
      m2: digitToWord(minutes[1]),
      s1: digitToWord(seconds[0]),
      s2: digitToWord(seconds[1])
    };

    function digitToWord(digit) {
      // accepts "0" returns "zero"
      return ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][parseInt(digit)];
    }
  }
});

var Digit = React.createClass({
  displayName: 'Digit',
  // an SVG representation of a digit 0-9
  getDefaultProps: function getDefaultProps() {
    return {
      digit: "zero",
      className: 'digit ',
      // SVG path data for each digit
      zero: "M8.8,19.7l-1.1,1.1L7,20.2v-6.9L8.8,15V19.7z M8.8,27.3L7,29.1v-6.9l0.7-0.7l1.1,1.1V27.3z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4z M17,20.2l-0.6,0.7l-1.1-1.1V15l1.8-1.8L17,20.2L17,20.2z M17,29.1l-1.8-1.8v-4.7l1.1-1.1l0.6,0.7v6.9H17z",
      one: "M15.2,19.7V15l1.8-1.8v7l-0.7,0.7L15.2,19.7z M16.9,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L16.9,22.2z",
      two: "M8.8,22.6v4.7L7,29.1v-6.9l0.7-0.7L8.8,22.6z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4z M15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3z M15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7z",
      three: "M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4z M15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3z M15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7z M17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      four: "M7,20.2v-7L8.8,15v4.7l-1.1,1.1L7,20.2z M15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3zM15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7z M17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      five: "M7,20.2v-6.9L8.8,15v4.7l-1.1,1.1L7,20.2z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4zM15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3z M17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      six: "M7,20.2v-6.9L8.8,15v4.7l-1.1,1.1L7,20.2z M8.8,22.6v4.7L7,29.1v-6.9l0.7-0.7L8.8,22.6z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4z M15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3zM17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      seven: "M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7z M17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      eight: "M7,20.2v-6.9L8.8,15v4.7l-1.1,1.1L7,20.2z M8.8,22.6v4.7L7,29.1v-6.9l0.7-0.7L8.8,22.6z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4z M15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3zM15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7z M17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      nine: "M7,20.2v-6.9L8.8,15v4.7l-1.1,1.1L7,20.2z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4zM15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3z M15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7zM17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z"
    };
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: this.props.className },
      React.createElement(
        'svg',
        { className: 'blur', x: '0px', y: '0px', viewBox: '0 0 24 42', 'enable-background': 'new 0 0 24 42' },
        React.createElement(
          'defs',
          null,
          React.createElement(
            'filter',
            { id: 'blur', x: '-50%', y: '-50%', width: '200%', height: '200%' },
            React.createElement('feGaussianBlur', { 'in': 'SourceGraphic', stdDeviation: '.42' })
          )
        ),
        React.createElement(
          'g',
          { id: 'd0', filter: 'url(#blur)' },
          React.createElement('path', { d: this.props[this.props.digit] })
        )
      ),
      React.createElement(
        'svg',
        { x: '0px', y: '0px', viewBox: '0 0 24 42', 'enable-background': 'new 0 0 24 42' },
        React.createElement(
          'g',
          { id: 'd8', opacity: '0.1' },
          React.createElement('path', { d: this.props.eight })
        ),
        React.createElement(
          'g',
          { id: 'd0' },
          React.createElement('path', { d: this.props[this.props.digit] })
        )
      )
    );
  }
});

var Separator = React.createClass({
  displayName: 'Separator',
  // SVG representation of : separator
  render: function render() {
    return React.createElement(
      'div',
      { className: 'digit separator' },
      React.createElement(
        'svg',
        { className: 'blur', x: '0px', y: '0px', viewBox: '0 0 12.8 42' },
        React.createElement(
          'defs',
          null,
          React.createElement(
            'filter',
            { id: 'blur', x: '-50%', y: '-50%', width: '200%', height: '200%' },
            React.createElement('feGaussianBlur', { 'in': 'SourceGraphic', stdDeviation: '.42' })
          )
        ),
        React.createElement(
          'g',
          { filter: 'url(#blur)' },
          React.createElement('rect', { id: 'block', x: '5.5', y: '16.5', width: '1.8', height: '1.8' }),
          React.createElement('rect', { id: 'block_2_', x: '5.5', y: '23.7', width: '1.8', height: '1.8' })
        )
      ),
      React.createElement(
        'svg',
        { x: '0px', y: '0px', viewBox: '0 0 12.8 42' },
        React.createElement(
          'g',
          null,
          React.createElement('rect', { id: 'block', x: '5.5', y: '16.5', width: '1.8', height: '1.8' }),
          React.createElement('rect', { id: 'block_2_', x: '5.5', y: '23.7', width: '1.8', height: '1.8' })
        )
      )
    );
  }
});

var WeekDay = React.createClass({
  displayName: 'WeekDay',
  // SVG representation of a given day
  getDefaultProps: function getDefaultProps() {
    return {
      D: 'sun',
      l: 'Sunday',
      isToday: false
    };
  },
  render: function render() {
    var xlink = "assets/img/art.svg#icon-" + this.props.D,
        dow = "weekday " + this.props.D;
    if (this.props.isToday) dow = 'today ' + dow;
    return React.createElement(
      'h3',
      { className: dow },
      React.createElement(
        'svg',
        { x: '0px', y: '0px', viewBox: '0 0 42 42', 'enable-background': 'new 0 0 42 42' },
        React.createElement(
          'title',
          null,
          this.props.l
        ),
        React.createElement('use', { xlinkHref: xlink })
      )
    );
  }
});

var WeekDays = React.createClass({
  displayName: 'WeekDays',
  // weekdays display ticker made up of <Weekday>s
  render: function render() {
    var dow = function () {
      //if(settingAlarm) return alarmTime;
      return new Date();
    }().getDay();
    var weekDays = [{ key: 'sun', l: 'Sunday' }, { key: 'mon', l: 'Monday' }, { key: 'tue', l: 'Tuesday' }, { key: 'wed', l: 'Wednesday' }, { key: 'thu', l: 'Thursday' }, { key: 'fri', l: 'Friday' }, { key: 'sat', l: 'Saturday' }];
    var weekNodes = [];
    for (var i = 0; i < weekDays.length; i++) {
      weekNodes.push( // push each day of the weak into an Array
      React.createElement(WeekDay, { key: weekDays[i].key, D: weekDays[i].key, l: weekDays[i].l, isToday: dow == i ? true : false }));
    }var cls = 'week ';
    if (nightAirModel.getMondayFirst()) cls += 'monfirst'; // uses flex order to change the visual order

    return React.createElement(
      'div',
      { className: cls },
      weekNodes
    );
  }
});

var Meridian = React.createClass({
  displayName: 'Meridian',
  getAnteMeridiem: function getAnteMeridiem() {
    return function () {
      if (nightAirModel.getSettingAlarm()) return nightAirModel.getAlarmTime();
      return new Date();
    }().getHours() < 12 ? true : false;
  },
  getPostMeridiem: function getPostMeridiem() {
    return !this.getAnteMeridiem();
  },

  render: function render() {
    var xlink = "assets/img/art.svg#icon-" + (this.getAnteMeridiem() ? 'am' : 'pm'),
        title = this.props.anteMeridiem ? 'AM' : 'PM';
    if (nightAirModel.getMilitaryTime()) return null;
    return React.createElement(
      'h3',
      null,
      React.createElement(
        'svg',
        { x: '0px', y: '0px', viewBox: '0 0 24 42', 'enable-background': 'new 0 0 24 42' },
        React.createElement(
          'title',
          null,
          title
        ),
        React.createElement('use', { xlinkHref: xlink })
      )
    );
  }
});

var Player = React.createClass({
  displayName: 'Player',

  getDefaultProps: function getDefaultProps() {
    return {
      srcMp3: 'assets/mp3/digital_beep.mp3',
      autoplay: true,
      volume: 1,
      muted: false,
      loop: true,
      controls: false
    };
  },
  render: function render() {
    if (!nightAirModel.getAlarming()) return React.createElement('div', null);
    return React.createElement(
      'div',
      null,
      React.createElement(
        'audio',
        { autoPlay: this.props.autoplay, loop: this.props.loop, muted: this.props.muted, controls: this.props.controls },
        React.createElement('source', { src: this.props.srcMp3, type: 'audio/mpeg' }),
        'Your browser does not support the audio element.'
      )
    );
  }
});

var StatusBar = React.createClass({
  displayName: 'StatusBar',

  getDefaultProps: function getDefaultProps() {
    return {};
  },
  render: function render() {
    var alarmEnabled = nightAirModel.getAlarmEnabled();
    return React.createElement(
      'div',
      null,
      React.createElement(StatusIcon, { id: 'bell', lit: alarmEnabled })
    );
  }
});

var StatusIcon = React.createClass({
  displayName: 'StatusIcon',

  getDefaultProps: function getDefaultProps() {
    return {
      id: "bell",
      path: "M25.2,22.9c0,0.1-0.1,0.1-0.1,0.1h-4.7c-0.1,0-0.1,0-0.1-0.1s0-0.1,0.1-0.1c0,0,0.3-0.1,0.6-0.4c0.3-0.3,0.4-0.8,0.4-1.8c0-0.8,0.3-1.2,0.6-1.4c0.1-0.1,0.2-0.1,0.3-0.2c0,0,0,0,0-0.1c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5c0,0,0,0,0,0.1c0.1,0,0.2,0.1,0.3,0.2c0.3,0.2,0.6,0.6,0.6,1.4c0,1,0.1,1.5,0.4,1.8s0.6,0.4,0.6,0.4C25.1,22.8,25.2,22.8,25.2,22.9zM23.1,23.2h-1c-0.1,0-0.1,0.1-0.1,0.1c0,0.3,0.3,0.6,0.6,0.6s0.6-0.3,0.6-0.6C23.3,23.3,23.2,23.2,23.1,23.2z",
      lit: false
    };
  },
  render: function render() {
    var cls = this.props.id;
    if (this.props.lit) cls += ' lit';
    return React.createElement(
      'h2',
      { className: cls },
      React.createElement(
        'svg',
        { id: 'bell', x: '0px', y: '0px', viewBox: '0 0 42 42', 'enable-background': 'new 0 0 42 42' },
        React.createElement(
          'defs',
          null,
          React.createElement(
            'filter',
            { id: 'f1', x: '-50%', y: '-50%', width: '200%', height: '200%' },
            React.createElement('feGaussianBlur', { 'in': 'SourceGraphic', stdDeviation: '.42' })
          )
        ),
        React.createElement('path', { id: this.props.id + '_blur', filter: 'url(#f1)', d: this.props.path }),
        React.createElement('path', { id: this.props.id, d: this.props.path })
      )
    );
  }
});

var digitsDOM = document.getElementById('digits'),
    weekdaysDOM = document.getElementById('daysoftheweek'),
    meridianDOM = document.getElementById('meridian'),
    playerDOM = document.getElementById('player'),
    statusBarDOM = document.getElementById('status-bar');
function step(timestamp) {
  // tick tock
  ReactDOM.render(React.createElement(Digits, null), digitsDOM);
  ReactDOM.render(React.createElement(WeekDays, null), weekdaysDOM);
  ReactDOM.render(React.createElement(Meridian, null), meridianDOM);
  ReactDOM.render(React.createElement(Player, null), playerDOM);
  ReactDOM.render(React.createElement(StatusBar, null), statusBarDOM);

  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

function RunPrefixMethod(obj, method) {
  var pfx = ["webkit", "moz", "ms", "o", ""];
  var p = 0,
      m,
      t;
  while (p < pfx.length && !obj[m]) {
    m = method;
    if (pfx[p] == "") {
      m = m.substr(0, 1).toLowerCase() + m.substr(1);
    }
    m = pfx[p] + m;
    t = _typeof(obj[m]);
    if (t != "undefined") {
      pfx = [pfx[p]];
      return t == "function" ? obj[m]() : obj[m];
    }
    p++;
  }
}

function toggleFullscreen() {
  if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
    RunPrefixMethod(document, "CancelFullScreen");
    nightAirModel.setFullscreenMode(false);
  } else {
    RunPrefixMethod(clockDOM, "RequestFullScreen");
    nightAirModel.setFullscreenMode(true);
  }
}
