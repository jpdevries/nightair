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

module.exports = Separator;
