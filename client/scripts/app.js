// YOUR CODE HERE:
class App {
  constructor() {
    this.friendsArray = [];
    this.server = 'https://api.parse.com/1/classes/messages';
    this.inited= false;
  }
  init() {
    if(this.inited){
      return;
    }
    this.inited = true;
    var context = this;
    $('#send').submit(function(e) {
      e.preventDefault();
      var messageInput = $('#message').val();
      var userInput = window.location.search.split('=')[1];
      var roomInput = $('#roomSelect').val();
      var obj = {
        username: userInput,
        text: messageInput,
        roomname: roomInput
      };
      context.handleSubmit(obj);      
    });
  } 
  send(message) {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }
  fetch(message) {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        _.each(data.results, function(val) {

          app.addMessage(val);
        });
        console.log('chatterbox: Message received');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  }
  clearMessages() {
    $('#chats').empty();
  }
  addMessage(message) {
    var context = this;
    $('#chats').append('<div class="message"></div>');
    $('.message').append('<h2><a class="username" href=' + message.username + '</a></h2>');
    $('.message').append('<p>' + message.text + '</p>');
    $('.username').on('click', function() {
      var user = $('.username').text();
      context.addFriend(user);
    });
  }
  addRoom(chatRoom) {
    var roomExists = false;
    $('#main a').each(function( index ) {
      if ($(this).text() === chatRoom) {
        roomExists = true;
      }
    });
    if (!roomExists) {
      $('#roomSelect').append('<a href="#">' + chatRoom + '</a>');
    }
  }
  addFriend(friend) {
    this.friendsArray.push(friend);
  }
  handleSubmit(obj) {
    app.send(obj);
    app.fetch(obj);
    $('#chats').append('<div id="chat"><a href="">' + obj.username + '</a>: ' + obj.text + '</div>');
  }
}
  
var app = new App();

$(document).ready(function() {
  app.init();
});
