'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

document.querySelector('html').classList.remove('no-js');
if (localStorage.getItem('NightAir__theme')) {
  //console.log(localStorage.getItem('NightAir__theme'));
  document.body.setAttribute('data-theme', localStorage.getItem('NightAir__theme'));
}

function tick() {
  setTimeout(function () {
    // wait until the next whole second to start the blinking so it syncs with the seconds
    document.body.classList.add('ticking');
  }, 1000 - new Date().getMilliseconds());
}

tick();

var mondayFirst = false,
    // will eventually be user facing
militaryTime = false,
    settingAlarm = false,
    fullscreenMode = false,
    commandKeyDown = false,
    alarming = false,
    suppressAlarm = false,
    alarmTime = function () {
  var storage = localStorage.getItem('NightAir__alarm') || undefined;
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
}();
var clockDOM = document.querySelector('#clock'); // this is the current displaying video

function setAlarmTime(date) {
  alarmTime = date;
  localStorage.setItem('NightAir__alarm', alarmTime.getTime());
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('NightAir__theme', theme);
}

document.addEventListener("keypress", function (e) {
  //console.log(e.keyCode);
  switch (e.keyCode) {
    case 32:
      settingAlarm = true;
      break;

    case 91:
      commandKeyDown = true;
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
      if (settingAlarm) setAlarmTime(new Date(alarmTime.getTime() + 1000 * 60 * 60));
      break;

    case 109:
    case 39:
    case 77:
      if (settingAlarm) setAlarmTime(new Date(alarmTime.getTime() + 1000 * 60));
      break;
  }
});

document.addEventListener("keyup", function (e) {
  switch (e.keyCode) {
    case 32:
      settingAlarm = false;
      break;

    case 91:
      commandKeyDown = true;
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
  if (settingAlarm || suppressAlarm) return;
  //console.log('ALARM!');
  alarming = true;
  suppressAlarm = true;
}

var Digits = React.createClass({
  displayName: 'Digits',
  // the clock display, made up if <Digit>s
  render: function render() {
    var now = this.getTime();
    var cls = '';
    if (settingAlarm) cls = 'settingAlarm';
    if (alarming) cls = 'alarming';
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
    var now = new Date();
    return alarmTime.getHours() === now.getHours() && alarmTime.getMinutes() === now.getMinutes() ? true : false;
  },
  getTime: function getTime() {
    var now = settingAlarm ? alarmTime : new Date();

    if (alarming) {
      now.setSeconds(0);
      now.setMilliseconds(0);
    }

    var hours = function () {
      var h = now.getHours();
      if (!militaryTime && h > 12) h -= 12;
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
    if (mondayFirst) cls += 'monfirst'; // uses flex order to change the visual order

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
      if (settingAlarm) return alarmTime;
      return new Date();
    }().getHours() < 12 ? true : false;
  },
  getPostMeridiem: function getPostMeridiem() {
    return !this.getAnteMeridiem();
  },

  render: function render() {
    var xlink = "assets/img/art.svg#icon-" + (this.getAnteMeridiem() ? 'am' : 'pm'),
        title = this.props.anteMeridiem ? 'AM' : 'PM';
    if (militaryTime) return null;
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
    if (!alarming) return React.createElement('div', null);
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

var digitsDOM = document.getElementById('digits'),
    weekdaysDOM = document.getElementById('daysoftheweek'),
    meridianDOM = document.getElementById('meridian'),
    playerDOM = document.getElementById('player');
function step(timestamp) {
  // tick tock
  ReactDOM.render(React.createElement(Digits, null), digitsDOM);
  ReactDOM.render(React.createElement(WeekDays, null), weekdaysDOM);
  ReactDOM.render(React.createElement(Meridian, null), meridianDOM);
  ReactDOM.render(React.createElement(Player, null), playerDOM);

  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

(function () {
  var pfx = ["webkit", "moz", "ms", "o", ""];
  function RunPrefixMethod(obj, method) {
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

  clockDOM.onclick = function () {
    if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
      RunPrefixMethod(document, "CancelFullScreen");
      fullscreenMode = false;
    } else {
      RunPrefixMethod(clockDOM, "RequestFullScreen");
      fullscreenMode = true;
    }
  };
})();
