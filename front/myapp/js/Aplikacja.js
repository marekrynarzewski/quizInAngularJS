var Aplikacja = angular.module('Aplikacja', ['ngRoute', 'ngSanitize']);
Aplikacja.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/list', {
        templateUrl: 'front/myapp/html/list.html',
        controller: 'ListCtrl'
      })
      .when('/details/:id', {
          templateUrl: 'front/myapp/html/details.html',
          controller: 'DetailsCtrl'
      })
      .when('/admin/add', {
          templateUrl: 'front/myapp/html/addFilm.html',
          controller: 'AddFilmCtrl'
      })
      .otherwise({
    	  redirectTo: '/list'
      });
  }]);


