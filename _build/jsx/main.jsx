document.querySelector('html').classList.remove('no-js');

setTimeout(function(){ // wait until the next whole second to start the blinking so it syncs with the seconds
  document.body.classList.add('ticking');
}, 1000 - new Date().getMilliseconds());

var mondayFirst = false, // will eventually be user facing
militaryTime = false;

var Digits = React.createClass({ // the clock display, made up if <Digit>s
  render:function(){
    var now = this.getTime();
    return (
      <div>
        <Digit digit={now.h1} />
        <Digit digit={now.h2} />
        <Separator />
        <Digit digit={now.m1} />
        <Digit digit={now.m2} />
        <Separator />
        <Digit digit={now.s1} />
        <Digit digit={now.s2} />
      </div>
    );
  },
  getTime:function(){
    var now = new Date();
    var hours = (function(){
      var h = now.getHours();
      if(!militaryTime && h > 12) h -= 12;
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

    function digitToWord(digit) {
      return ['zero','one','two','three','four','five','six','seven','eight','nine'][parseInt(digit)];
    }
  }
});

var Digit = React.createClass({ // an SVG representation of a digit 0-9
  getDefaultProps:function(){
    return {
      digit:"zero",
      // SVG path data for each digit
      zero:"M8.8,19.7l-1.1,1.1L7,20.2v-6.9L8.8,15V19.7z M8.8,27.3L7,29.1v-6.9l0.7-0.7l1.1,1.1V27.3z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4z M17,20.2l-0.6,0.7l-1.1-1.1V15l1.8-1.8L17,20.2L17,20.2z M17,29.1l-1.8-1.8v-4.7l1.1-1.1l0.6,0.7v6.9H17z",
      one:"M15.2,19.7V15l1.8-1.8v7l-0.7,0.7L15.2,19.7z M16.9,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L16.9,22.2z",
      two:"M8.8,22.6v4.7L7,29.1v-6.9l0.7-0.7L8.8,22.6z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4z M15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3z M15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7z",
      three:"M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4z M15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3z M15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7z M17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      four:"M7,20.2v-7L8.8,15v4.7l-1.1,1.1L7,20.2z M15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3zM15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7z M17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      five:"M7,20.2v-6.9L8.8,15v4.7l-1.1,1.1L7,20.2z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4zM15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3z M17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      six:"M7,20.2v-6.9L8.8,15v4.7l-1.1,1.1L7,20.2z M8.8,22.6v4.7L7,29.1v-6.9l0.7-0.7L8.8,22.6z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4z M15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3zM17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      seven:"M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7z M17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      eight:"M7,20.2v-6.9L8.8,15v4.7l-1.1,1.1L7,20.2z M8.8,22.6v4.7L7,29.1v-6.9l0.7-0.7L8.8,22.6z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4z M15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3zM15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7z M17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      nine:"M7,20.2v-6.9L8.8,15v4.7l-1.1,1.1L7,20.2z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4zM15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3z M15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7zM17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
    }
  },
  render:function(){
    return (
      <div className="digit">
        <svg className="blur" x="0px" y="0px" viewBox="0 0 24 42" enable-background="new 0 0 24 42">
        <defs>
            <filter id="blur"  x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation=".42" />
            </filter>
        </defs>
        <g id="d0" filter="url(#blur)" >
          <path d={this.props[this.props.digit]}/>
        </g>
      </svg>
        <svg x="0px" y="0px" viewBox="0 0 24 42" enable-background="new 0 0 24 42">
          <g id="d8" opacity="0.1">
          	<path d={this.props.eight}/>
          </g>
          <g id="d0">
            <path d={this.props[this.props.digit]}/>
          </g>
        </svg>
      </div>
    );
  }
});

var Separator = React.createClass({ // SVG representation of : separator
  render:function(){
    return (
      <div className="digit separator">
        <svg className="blur" x="0px" y="0px" viewBox="0 0 12.8 42" >
          <defs>
              <filter id="blur"  x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation=".42" />
              </filter>
          </defs>
          <g filter="url(#blur)">
            <rect id="block" x="5.5" y="16.5" width="1.8" height="1.8"/>
          	<rect id="block_2_" x="5.5" y="23.7" width="1.8" height="1.8"/>
          </g>
        </svg>
        <svg x="0px" y="0px" viewBox="0 0 12.8 42" >
          <g>
            <rect id="block" x="5.5" y="16.5" width="1.8" height="1.8"/>
          	<rect id="block_2_" x="5.5" y="23.7" width="1.8" height="1.8"/>
          </g>
        </svg>
      </div>
    );
  }
});

var WeekDay = React.createClass({ // SVG representation of a given day
  getDefaultProps:function(){
    return {
      D:'sun',
      l:'Sunday',
      isToday:false
    }
  },
  render:function() {
    var xlink = "assets/img/art.svg#icon-" + this.props.D,
    dow = "weekday " + this.props.D;
    if(this.props.isToday) dow = 'today ' + dow;
    return (
      <h3 className={dow}>
        <svg x="0px" y="0px" viewBox="0 0 42 42" enable-background="new 0 0 42 42">
          <title>{this.props.l}</title>
          <use xlinkHref={xlink} />
        </svg>
      </h3>
    );
  }
});

var WeekDays = React.createClass({ // weekdays display ticker made up of <Weekday>s
  render:function() {
    var dow = new Date().getDay();
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
    if(mondayFirst) cls += 'monfirst'; // uses flex order to change the visual order

    return (
      <div className={cls}>
        {weekNodes}
      </div>
    );
  }
});

var Meridian = React.createClass({
  getAnteMeridiem(){
    return (new Date().getHours() < 12) ? true : false;
  },
  getPostMeridiem(){
    return !this.getAnteMeridiem();
  },
  render:function(){
    var xlink = "assets/img/art.svg#icon-" + (this.getAnteMeridiem() ? 'am' : 'pm'),
    title = (this.props.anteMeridiem ? 'AM' : 'PM');
    if(militaryTime) return null;
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

var digitsDOM = document.getElementById('digits'),
weekdaysDOM = document.getElementById('daysoftheweek'),
meridianDOM = document.getElementById('meridian');
function step(timestamp) { // tick tock
  ReactDOM.render(<Digits />, digitsDOM);
  ReactDOM.render(<WeekDays />, weekdaysDOM);
  ReactDOM.render(<Meridian />, meridianDOM);

  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

(function(){
  var pfx = ["webkit", "moz", "ms", "o", ""];
  function RunPrefixMethod(obj, method) {
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

  var e = document.querySelector('#clock'); // this is the current displaying video
  e.onclick = function() {

    if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
        RunPrefixMethod(document, "CancelFullScreen");
    }
    else {
        RunPrefixMethod(e, "RequestFullScreen");
    }
}
})();
