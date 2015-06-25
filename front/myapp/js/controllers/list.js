Aplikacja.controller(
	'ListCtrl', 
	[
	 	'$scope', 
	 	'rest', 
	 	'$location',
	 	'$sce',
	 	function($scope, rest, $location, $sce){
		    rest.get("films").success(function(data){
		    	$scope.films = data;
		    })
		    .send();
		    $scope.show_details = function(id){
				$location.path('/details/'+id);
		    };
		    $scope.trustSrc = function(src){
		    	return $sce.trustAsResourceUrl(src);
		    }
		    $scope.trunc = function(text) {
		    	var tmp = text.replace(/^(.{51}[^\s]*).*/, "$1");
		    	if (!$scope.endsWith(tmp, '.')){
		    		tmp += ' \u2026';
		    	}
		    	return tmp;
		    }
		    $scope.endsWith = function (str, suffix) {
		        return str.indexOf(suffix, str.length - suffix.length) !== -1;
		    }
	 	}
	 ]
);


