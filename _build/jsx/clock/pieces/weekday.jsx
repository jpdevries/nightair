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

module.exports = WeekDay;
