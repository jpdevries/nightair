var NightAirModel = require('../model/nightairmodel.es6');
var nightAirModel = new NightAirModel().getInstance();

function pushNotification(title,body,icon,timeout) {
  if(!nightAirModel.getNotify()) return;
  timeout = (timeout == undefined) ? 4200 : timeout;
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
    }
    var notification = new Notification(title,options);
    setTimeout(notification.close.bind(notification), timeout);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(title,options);
        setTimeout(notification.close.bind(notification), timeout);
      }
    });
  }
}

module.exports = {
  pushNotification: pushNotification
};
