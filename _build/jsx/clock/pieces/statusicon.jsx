var StatusIcon = React.createClass({
  getDefaultProps:function(){
    return {
      id:"bell",
      path:"M25.2,22.9c0,0.1-0.1,0.1-0.1,0.1h-4.7c-0.1,0-0.1,0-0.1-0.1s0-0.1,0.1-0.1c0,0,0.3-0.1,0.6-0.4c0.3-0.3,0.4-0.8,0.4-1.8c0-0.8,0.3-1.2,0.6-1.4c0.1-0.1,0.2-0.1,0.3-0.2c0,0,0,0,0-0.1c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5c0,0,0,0,0,0.1c0.1,0,0.2,0.1,0.3,0.2c0.3,0.2,0.6,0.6,0.6,1.4c0,1,0.1,1.5,0.4,1.8s0.6,0.4,0.6,0.4C25.1,22.8,25.2,22.8,25.2,22.9zM23.1,23.2h-1c-0.1,0-0.1,0.1-0.1,0.1c0,0.3,0.3,0.6,0.6,0.6s0.6-0.3,0.6-0.6C23.3,23.3,23.2,23.2,23.1,23.2z",
      lit:false
    };
  },
  render:function(){
    var cls = this.props.id;
    if(this.props.lit) cls += ' lit';
    return (
        <h2 className={cls}>
          <svg id="bell" x="0px" y="0px" viewBox="0 0 42 42" enable-background="new 0 0 42 42">
            <defs>
                <filter id="f1"  x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation=".42" />
                </filter>
            </defs>
            <path id={this.props.id + '_blur'} filter="url(#f1)" d={this.props.path}/>
            <path id={this.props.id} d={this.props.path}/>
          </svg>
        </h2>
    );
  }
});

module.exports = StatusIcon;
