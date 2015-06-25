Aplikacja.controller(
	'AddFilmCtrl', 
	[
	 	'$scope',  
	 	'rest',
	 	'$routeParams',
	 	function($scope, rest, $routeParams){
	 		$scope.film = {};
	 		$scope.action = "Dodawanie";
	 		$scope.state = "Nowy";
	 		$scope.saveToDb = function(){
	 			if ($scope.film == {}){
	 				$scope.state = "Błąd";
	 				return false;
	 			}
	 			rest.post("films")
	 			.data($scope.film)
	 			.success(function(data){
	 				if (data.name){
	 					$scope.film.id = data.name;
	 					$scope.state = "Zapisany";
	 				}
	 				rest.put("films/"+$scope.film.id)
	 				.data($scope.film)
	 				.send();
	 				$scope.film = {};
	 				$scope.state = "Nowy";
	 			})
	 			.error(function(data){
	 				$scope.state = data.error;
	 			})
	 			.send();
	 		};
	 	}
	 ]
);