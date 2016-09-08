import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.main.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.connection = new ReactiveVar({});
});

Template.main.helpers({
  connection() {
    return Template.instance().connection.get();
  },
});

Template.main.events({
  'click #test'(event, instance) {
    const url = $("#url").val();
    instance.connection.set(DDP.connect(url));
  },

  'click #stop'(event, instance){
    stopConnection(instance);
  },

  'change #url'(event, instance) {
    // New URL - close any existing connection
    stopConnection(instance);
  }
});



function stopConnection(instance) {
  const connection = instance.connection.get();
  if (connection.status) {
    connection.disconnect();
    connection.close();
  }
  instance.connection.set({});
}
