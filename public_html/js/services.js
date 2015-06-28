var App = angular.module('Services', []);

//Handles the value for the inputs of a user's chat
App.factory('ChatService', [function(){
        return {
            on: function(eventName, callBack){
                io.on('connection', function(socket){
                    console.log('a user connected');
                    socket.on('disconnect', function(){
                        console.log('disconnected');
                    });
                });
            }
        };
}]);

//Create a session for the user
App.factory('SessionService',[function(){
      return{
          get: function(key){
              return sessionStorage.getItem(key);
          },
          set: function(key, value){
              return sessionStorage.setItem(key, value);
          },
          unset: function(){
              return sessionStorage.removeItem(key);
          }
      }  
}]);


//Authenticate the login for a user
App.factory('AuthenticateFactory',[ 'SessionService', '$http', function(SessionService, $http){
        var cacheSession = function(){
            return SessionService.set('Authenticated', true);
        };
        var uncacheSession = function(){
            return SessionService.unset('Authenticated');
        };
        var isSessionCached = function(){
            return SessionService.get('Authenticated');
        };
        return{
            login: function(credentials){
                var login = $http.post('', credentials);
                login.success(cacheSession);
                return login;
            },
            logout: function(credentials){
                var logout = $http.get('', credentials);
                logout.success(uncacheSession);
                return logout;
            },
            isLoggedIn: function(){
                return isSessionCached;
            }
        }
}]);
