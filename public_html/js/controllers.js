var App = angular.module('Controllers',[]);

App.controller('IndexCtrl', ['$scope', function($scope){
    
    $scope.login = function(credentials){
        console.log(window.location);
        window.location.replace('#/chat');
    };
}]);

App.controller('ChatCtrl',['$scope', 'ChatService', function($scope, ChatService){
        
    $scope.recievedTroughSocket = "still waiting for data...";
    
    $scope.sendMessage = function(msg){
        ChatService.emit("something", msg);
    }
    ChatService.on("greetings", function(data){
        console.log("user data: " + JSON.stringify(data));
        $scope.recievedTroughSocket = data.msg;
    });
        
        
        
        
}]);

