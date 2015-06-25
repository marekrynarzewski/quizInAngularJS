Aplikacja.controller(
	'DetailsCtrl', 
	[
	 	'$scope',  
	 	'rest', 
	 	'$location',
	 	'$routeParams',
	 	'$sce',
	 	function($scope, rest, $location, $routeParams, $sce){
	 		$scope.movie = {};
	 		$scope.movie.id = $routeParams.id;
	 		rest.get("films/"+$scope.movie.id).success(function(data){
	 			$scope.movie = data;
	 		}).send();
	 		$scope.trustSrc = function(src) {
	 			return $sce.trustAsResourceUrl(src);
	 		}
	 	}
	 ]
);


