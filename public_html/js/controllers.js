var App = angular.module('Controllers',[]);

App.controller('IndexCtrl', ['$scope', function($scope){
    
    $scope.login = function(credentials){
        
        window.location.replace('#/chat');
    };
}]);

App.controller('ChatCtrl',['$scope', 'SocketService', function($scope, SocketService){
    //var socket = io();
    $scope.msgs = [];
    
    $scope.sendMessage = function(data){
        SocketService.emit('send message', data);
        console.log(SocketService);
        console.log(SocketService.connected);
    };
    
    SocketService.on('get message', function(data){
        msgs.push(data);
        $scope.$digest();
        
    });
}]);

