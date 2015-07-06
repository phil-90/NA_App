var App = angular.module('Controllers',[]);

App.controller('IndexCtrl', ['$scope', function($scope){
    
    $scope.login = function(credentials){
        
        window.location.replace('#/chat');
    };
}]);

App.controller('ChatCtrl',['$scope', 'Socket', function($scope, Socket){
    //var socket = io();
    $scope.msgs = [];
    
    $scope.sendMessage = function(){
        Socket.emit('send message', $scope.msg);
        console.log($scope.msgs);
      
    };
    
    Socket.on('get message', function(data){
        msgs.push(data);
        $scope.$digest();
        console.log(data);
    });
}]);

