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
      zero: "M10,14.9V19l-1.3,1.3l-0.4-0.4v-5.7L10,14.9z M8.3,26.9v-5.7l0.4-0.4l1.3,1.3v4.1L8.3,26.9z M15.9,28.5H9.4c-0.6-0.1-0.9-0.5-1.1-1.1l1.7-0.7h5.2L15.9,28.5z M15.3,14.5H10l-1.7-0.7c0.1-0.6,0.5-0.9,1.1-1.1h6.5L15.3,14.5z M15.7,19.1v-4.6l0.7-1.7c0.6,0.1,0.9,0.5,1.1,1.1V20L17,20.4L15.7,19.1z M17,20.8l0.4,0.4v6.1c-0.1,0.6-0.5,0.9-1.1,1.1l-0.7-1.7v-4.6L17,20.8z",
      one: "M15,19.4v-4.6l0.7-1.7c0.6,0.1,0.9,0.5,1.1,1.1v6.1l-0.4,0.4L15,19.4z M16.3,21.1l0.4,0.4v6.1c-0.1,0.6-0.5,0.9-1.1,1.1L14.9,27v-4.5L16.3,21.1z",
      two: "M7.9,26.8v-5.7l0.4-0.4L9.6,22v4.1L7.9,26.8z M16.1,28.3H8.9c-0.6-0.1-0.9-0.5-1.1-1.1l1.7-0.7h5.9L16.1,28.3z M14.8,14.3H9.6l-1.7-0.7C8,13,8.4,12.7,9,12.5h6.5L14.8,14.3z M15.3,19.6l0.9,0.9l-0.9,0.9H9.6l-0.9-0.9l0.9-0.9H15.3z M15.3,18.9v-4.6l0.7-1.7c0.6,0.1,0.9,0.5,1.1,1.1v6.1l-0.4,0.4L15.3,18.9z",
      three: "M15.8,28.7H9.3c-0.6-0.1-0.9-0.5-1.1-1.1l1.7-0.7h5.2L15.8,28.7z M15.1,14.7H9.9L8.2,14c0.1-0.6,0.5-0.9,1.1-1.1h6.5L15.1,14.7z M15.6,19.9l0.9,0.9l-0.9,0.9H9.9L9,20.8l0.9-0.9H15.6z M15.6,19.3v-4.6l0.7-1.7c0.6,0.1,0.9,0.5,1.1,1.1v6.1L17,20.6L15.6,19.3z M16.9,21l0.4,0.4v6.1c-0.1,0.6-0.5,0.9-1.1,1.1l-0.7-1.7v-4.6L16.9,21z",
      four: "M9.2,14.6v4.8l-1.3,1.3l-0.4-0.4V14L9.2,14.6z M14.9,20.1l0.9,0.9l-0.9,0.9H9.2L8.3,21l0.9-0.9H14.9z M14.9,19.4v-4.6l0.7-1.7c0.6,0.1,0.9,0.5,1.1,1.1v6.1l-0.4,0.4L14.9,19.4z M16.2,21.2l0.4,0.4v6.1c-0.1,0.6-0.5,0.9-1.1,1.1l-0.7-1.7v-4.6L16.2,21.2z",
      five: "M9.5,15.1v4.1l-1.3,1.3l-0.4-0.4v-5.7L9.5,15.1z M15.4,28.6H8.9c-0.6-0.1-0.9-0.5-1.1-1.1l1.7-0.7h5.2L15.4,28.6zM15.4,14.6H9.5L7.8,14c0.1-0.6,0.5-0.9,1.1-1.1H16L15.4,14.6z M15.1,19.9l0.9,0.9l-0.9,0.9H9.4l-0.9-0.9l0.9-0.9H15.1z M16.5,20.9l0.4,0.4v6.1c-0.1,0.6-0.5,0.9-1.1,1.1l-0.7-1.7v-4.6L16.5,20.9z",
      six: "M9.8,15.3v4.1l-1.3,1.3L8,20.3v-5.7L9.8,15.3z M8,27.3v-5.7l0.4-0.4l1.3,1.3v4.1L8,27.3z M15.7,28.8H9.2c-0.6-0.1-0.9-0.5-1.1-1.1L9.8,27H15L15.7,28.8z M15.7,14.8H9.8L8,14.2c0.1-0.6,0.5-0.9,1.1-1.1h7.2L15.7,14.8z M15.4,20.1l0.9,0.9l-0.9,0.9H9.7L8.8,21l0.9-0.9H15.4z M16.7,21.2l0.4,0.4v6.1c-0.1,0.6-0.5,0.9-1.1,1.1l-0.7-1.7v-4.6L16.7,21.2z",
      seven: "M9.1,14.8v4.1l-1.3,1.3l-0.4-0.4v-5.7L9.1,14.8z M14.3,14.3H9.1l-1.7-0.7c0.1-0.6,0.5-0.9,1.1-1.1H15L14.3,14.3zM14.7,18.9v-4.6l0.7-1.7c0.6,0.1,0.9,0.5,1.1,1.1v6.1L16,20.2L14.7,18.9z M16,20.6l0.4,0.4v6.1c-0.1,0.6-0.5,0.9-1.1,1.1l-0.7-1.7V22L16,20.6z",
      eight: "M9.3,15.3v4.1L8,20.7l-0.4-0.4v-5.7L9.3,15.3z M7.6,27.3v-5.7L8,21.2l1.3,1.3v4.1L7.6,27.3z M15.2,28.8H8.7c-0.6-0.1-0.9-0.5-1.1-1.1L9.3,27h5.2L15.2,28.8z M14.6,14.8H9.4l-1.7-0.7c0.1-0.6,0.5-0.9,1.1-1.1h6.5L14.6,14.8z M15,20.1l0.9,0.9L15,21.8H9.3l-0.9-0.9L9.3,20H15V20.1z M15,19.4v-4.6l0.7-1.7c0.6,0.1,0.9,0.5,1.1,1.1v6.1l-0.4,0.4L15,19.4z M16.3,21.2l0.4,0.4v6.1c-0.1,0.6-0.5,0.9-1.1,1.1L15,27.1v-4.6L16.3,21.2z",
      nine: "M9.6,15.2v4.1l-1.3,1.3l-0.4-0.4v-5.7L9.6,15.2z M15.5,28.7H9c-0.6-0.1-0.9-0.5-1.1-1.1l1.7-0.7h5.2L15.5,28.7z M14.9,14.7H9.7L8,14c0.1-0.6,0.5-0.9,1.1-1.1h6.5L14.9,14.7z M15.3,20l0.9,0.9l-0.9,0.9H9.6l-0.9-0.9L9.6,20H15.3z M15.3,19.3v-4.6L16,13c0.6,0.1,0.9,0.5,1.1,1.1v6.1l-0.4,0.4L15.3,19.3z M16.6,21.1l0.4,0.4v6.1c-0.1,0.6-0.5,0.9-1.1,1.1L15.3,27v-4.6L16.6,21.1z",
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
          React.createElement('path', { d: 'M9.3,15.3v4.1L8,20.7l-0.4-0.4v-5.7L9.3,15.3z M7.6,27.3v-5.7L8,21.2l1.3,1.3v4.1L7.6,27.3z M15.2,28.8H8.7c-0.6-0.1-0.9-0.5-1.1-1.1L9.3,27h5.2L15.2,28.8z M14.6,14.8H9.4l-1.7-0.7c0.1-0.6,0.5-0.9,1.1-1.1h6.5L14.6,14.8z M15,20.1l0.9,0.9L15,21.8H9.3l-0.9-0.9L9.3,20H15V20.1z M15,19.4v-4.6l0.7-1.7c0.6,0.1,0.9,0.5,1.1,1.1v6.1l-0.4,0.4L15,19.4z M16.3,21.2l0.4,0.4v6.1c-0.1,0.6-0.5,0.9-1.1,1.1L15,27.1v-4.6L16.3,21.2z' })
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
