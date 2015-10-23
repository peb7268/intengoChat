angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.msgs = [{
    msg: $scope.chat.lastText,
    face: $scope.chat.face
  }];

  function init(){

    socket.on('msg:rec', function(msg){
      $scope.msgs.push(msg);
      $scope.$digest();
    });
  }

  $scope.postMsg = function($event){
    $event.preventDefault();
    
    var msgPacket = {
      msg: this.msg,
      uid: this.chat.id,
      username: this.chat.name,
      face: this.chat.face
    }
    socket.emit('msg:sent', msgPacket);
    console.log('sending message: ', msgPacket);

    this.msg = '';
    return false;
  };

  init();
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
