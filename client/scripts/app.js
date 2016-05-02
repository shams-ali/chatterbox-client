// YOUR CODE HERE:
class App {
  
  constructor() {
    this.friendsArray = [];
  }
  init() {
    var context = this;
    $('.username').on('click', function() {
      var user = $('.username').text();
      context.addFriend(user);
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
      url: app.server,
      type: 'GET',
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
    // $('#main').append('<div></div>');
    this.friendsArray.push(friend);
    console.log(this.friendsArray);

    // this.restore = function() {

    // };
  }
}
  
var app = new App();

