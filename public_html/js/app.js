var App = angular.module("App",[
    "Controllers",
    "Directives",
    "Services",
    "ngRoute"
]);

App.config(['$routeProvider', function($routeProvider){
        $routeProvider
                .when('/', {controller: 'IndexCtrl', templateUrl: 'views/index.html'})
            .otherwise({redirectTo: '/'});
        //To be added once launched
        //$locationProvider.html5Mode(true);
}]);

//app.run(function($rootScope, $location) {
//  $rootScope.$on('$routeChangeStart', function(event, next, current) {
//        alert('fffffff');
//  });
//});