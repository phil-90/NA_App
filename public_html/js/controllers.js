var App = angular.module('Controllers',[]);

App.controller('IndexCtrl', ['$scope', function($scope){
    
    $scope.login = function(credentials){
        console.log(credentials);
    };
}]);

App.controller('ChatCtrl',['$scope', 'ChatService', function($scope, ChatService){
        var socket = io();
        
        $scope.sendMessage = function(message){
            ChatService.on(message);
        };
        
        console.log(socket);
}]);

