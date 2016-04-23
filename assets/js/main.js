'use strict';

var Digits = React.createClass({
  displayName: 'Digits',

  render: function render() {
    var now = this.getTime();
    return React.createElement(
      'div',
      null,
      React.createElement(Digit, { digit: now.h1 }),
      React.createElement(Digit, { digit: now.h2 }),
      React.createElement(Separator, null),
      React.createElement(Digit, { digit: now.m1 }),
      React.createElement(Digit, { digit: now.m2 }),
      React.createElement(Separator, null),
      React.createElement(Digit, { digit: now.s1 }),
      React.createElement(Digit, { digit: now.s2 })
    );
  },
  getTime: function getTime() {
    var now = new Date();
    var hours = now.getHours().toString().split('');
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
      switch (digit.toString()) {
        case '0':
          return 'zero';

        case '1':
          return 'one';

        case '2':
          return 'two';

        case '3':
          return 'three';

        case '4':
          return 'four';

        case '5':
          return 'five';

        case '6':
          return 'six';

        case '7':
          return 'seven';

        case '8':
          return 'eight';

        case '9':
          return 'nine';
      }
    }
  }
});

var Digit = React.createClass({
  displayName: 'Digit',

  getDefaultProps: function getDefaultProps() {
    return { // SVG path data for each digit
      zero: "M8.8,19.7l-1.1,1.1L7,20.2v-6.9L8.8,15V19.7z M8.8,27.3L7,29.1v-6.9l0.7-0.7l1.1,1.1V27.3z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4z M17,20.2l-0.6,0.7l-1.1-1.1V15l1.8-1.8L17,20.2L17,20.2z M17,29.1l-1.8-1.8v-4.7l1.1-1.1l0.6,0.7v6.9H17z",
      one: "M15.2,19.7V15l1.8-1.8v7l-0.7,0.7L15.2,19.7z M16.9,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L16.9,22.2z",
      two: "M8.8,22.6v4.7L7,29.1v-6.9l0.7-0.7L8.8,22.6z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4z M15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3z M15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7z",
      three: "M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4z M15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3z M15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7z M17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      four: "M7,20.2v-7L8.8,15v4.7l-1.1,1.1L7,20.2z M15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3zM15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7z M17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      five: "M7,20.2v-6.9L8.8,15v4.7l-1.1,1.1L7,20.2z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4zM15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3z M17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      six: "M7,20.2v-6.9L8.8,15v4.7l-1.1,1.1L7,20.2z M8.8,22.6v4.7L7,29.1v-6.9l0.7-0.7L8.8,22.6z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4z M15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3zM17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      seven: "M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7z M17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      eight: "M7,20.2v-6.9L8.8,15v4.7l-1.1,1.1L7,20.2z M8.8,22.6v4.7L7,29.1v-6.9l0.7-0.7L8.8,22.6z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4z M15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3zM15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7z M17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      nine: "M7,20.2v-6.9L8.8,15v4.7l-1.1,1.1L7,20.2z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4zM15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3z M15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7zM17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z",
      digit: "zero"
    };
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'digit' },
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
          React.createElement('path', { d: 'M7,20.2v-6.9L8.8,15v4.7l-1.1,1.1L7,20.2z M8.8,22.6v4.7L7,29.1v-6.9l0.7-0.7L8.8,22.6z M16.6,12.9l-1.7,1.8H9.1l-1.7-1.8H16.6z M16.6,29.4H7.4l1.7-1.8h5.7L16.6,29.4z M15.1,20.3l0.9,0.9L15.1,22H8.9L8,21.2l0.9-0.9C8.9,20.3,15.1,20.3,15.1,20.3zM15.2,19.7V15l1.8-1.8v6.9l-0.6,0.7L15.2,19.7z M17,22.2v6.9l-1.8-1.8v-4.7l1.1-1.1L17,22.2z' })
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

var digitsDOM = document.getElementById('digits');
function step(timestamp) {
  // tick tock
  ReactDOM.render(React.createElement(Digits, null), digitsDOM);

  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
