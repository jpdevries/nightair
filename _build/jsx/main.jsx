document.querySelector('html').classList.remove('no-js');

var NightAirModel = require('./model/nightairmodel.es6');
var nightAirModel = new NightAirModel().getInstance();

document.body.setAttribute('data-theme',nightAirModel.getTheme()); // update the view to the current theme (React doesn't currently render <body>)

var Notify = require('./helpers/notify.es6'), // used to send notifications to the browser (beep beep)
inputControllers = require('./input/controllers.es6'), // keyboard event listeners. todo: refactor?
Clock = require('./clock/clock.jsx'), // the Clock component displays the digital digits and decides if the alarm should be dispatched
Meridian = require('./clock/pieces/meridian.jsx'), // displays AM/PM when militaryTime is disabled
Player = require('./clock/pieces/player.jsx'), // React component that plays alarm when alarm goes off
StatusBar = require('./clock/pieces/statusbar.jsx'), // status bar of icons such as alarm enabled (bell) and snooze icon
WeekDays = require('./clock/pieces/weekdays.jsx'); //displays the days of the week and highlights the current

setTimeout(function(){ // wait until the next whole second to start the blinking so it syncs with the seconds
  document.body.classList.add('ticking');
}, 1000 - new Date().getMilliseconds());

inputControllers.assignKeyboardListeners(); // assign keyboard shortcuts
if(nightAirModel.getNotify()) Notify.pushNotification('Notifications Enabled','You\'ll be notified when the alarm sounds.');

var clockDOM = document.querySelector('#clock'),
digitsDOM = document.getElementById('digits'),
weekdaysDOM = document.getElementById('daysoftheweek'),
meridianDOM = document.getElementById('meridian'),
playerDOM = document.getElementById('player'),
statusBarDOM = document.getElementById('status-bar');

function step(timestamp) { // tick tock
  ReactDOM.render(<Clock />, digitsDOM);
  ReactDOM.render(<WeekDays />, weekdaysDOM);
  ReactDOM.render(<Meridian />, meridianDOM);
  ReactDOM.render(<Player />, playerDOM);
  ReactDOM.render(<StatusBar />, statusBarDOM);

  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
