// YOUR CODE HERE:
class App {
  constructor() {
    this.friendsArray = [];
    this.server = 'https://api.parse.com/1/classes/messages';
  }
  init() {
    var context = this;
    $('.username').on('click', function() {
      var user = $('.username').text();
      context.addFriend(user);
    });
    //button is doing submit action, init is being called 3 times, every time you call init
    //you unbind the previous and remind again
    $('#send').submit(function(e) {
      e.preventDefault();
      var messageInput = $('#message').val();
      var userInput = $('.username').val();
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
    $('#chats').append('<div class="message"></div>');
    $('.message').append('<h2><a class="username" href=' + message.username + '</a></h2>');
    $('.message').append('<p>' + message.text + '</p>');
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
    var username = window.location.search.split('=')[1];
    app.send(obj);
    app.fetch(obj);
    $('#chats').append('<div id="chat"><a href="">' + username + '</a>: ' + obj.text + '</div>');
  }
}
  
var app = new App();

$( document ).ready(function() {
  app.init();
});
