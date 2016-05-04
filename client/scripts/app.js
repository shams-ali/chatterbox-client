// YOUR CODE HERE:
class App {
  constructor() {
    this.friendsArray = [];
    this.rooms = {};
    this.server = 'https://api.parse.com/1/classes/messages';
    this.inited = false;
  }
  init() {
    if (this.inited) {
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
        console.log(data);
        _.each(data, function(arr) {
          _.each(arr, function(node) {
            node.text = _.escape(node.text);
            node.roomname = _.escape(node.roomname);
            app.addMessage(node);
            app.addRoom(node);
          });
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
  // selectRoom(message) {

  // }
  addMessage(message) {
    $('#chats').append('<div id="chat"><a href="" class="username">' + message.username + '</a>: ' + message.text + '</div>');
    $('.username').on('click', function() {
      var user = $('.username').text();
      app.addFriend(user);
    });
    $('#roomSelect').on('click', function() {
      var room = $('.rooms').text();
      if (message.roomname === room) {
        // app.clearMessages(); 
        $('#chats').append('<div id="chat"><a href="" class="username">' + message.username + '</a>: ' + message.text + '</div>');
      }
    });
  }
  addRoom (node) {
    if (!app.rooms[node.roomname] && node.roomname.length !== 0) {
      app.rooms[node.roomname] = node.roomname;
      $('#roomSelect').append('<option class="rooms" value="' + node.roomname + '">' + node.roomname + '</option>');
    }
    // for (var prop in app.rooms) {
    //   $('#roomSelect').append('<option class="rooms" value="' + prop + '">' + prop + '</option>');
    // }
    // for (var prop in app.rooms) {
    //   $('#roomSelect').append('<option class="rooms" value="' + prop + '">' + prop + '</option>');
    // }
    console.log(app.rooms);
 
    //$('#roomSelect').append('<option class="rooms" value="' + roomname + '">' + roomname + '</option>');
    // var roomExists = false;
    // $('#main a').each(function( index ) {
    //   if ($(this).text() === chatRoom) {
    //     roomExists = true;
    //   }
    // });
    // if (!roomExists) {
    //   $('#roomSelect').append('<a href="#">' + chatRoom + '</a>');
    // }
  }
  addFriend (friend) {
    this.friendsArray.push(friend);
  }
  handleSubmit (obj) {
    app.send(obj);
    app.clearMessages();
    app.fetch(obj);
  }
} 
var app = new App();
$(document).ready(function() {
  app.init();
});

//access results array in data object
//access roomname property in object in array
//loop through roomnames and add each room name to drop down menu.
  //maybe make arra and add roomname to array then iterate over them and add to the roomname menu
