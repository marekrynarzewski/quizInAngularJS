Aplikacja.factory('rest', ['$http', function($http){
    function RestApplication(method, path){
        this._method = method;
        this._path = path;
        this._params = {};
        this._pathParams = [];
        this._data = {};
        this.params = function(params){
            this._params = params;
            return this;
        };
        this.pathParams = function(pathParams){
            this._pathParams = pathParams;
            return this;
        };
        this.data = function(data){
            this._data = data;
            return this;
        };
        this.success = function(callback){
            this._success = callback;
            return this;
        };
        this.error = function(callback){
            this._error = callback;
            return this;
        };
        this.send = function(){
        	var restUrl = 'https://restoweapi.firebaseio.com/';
            var url = restUrl+this._path;
            for (var key in this._pathParams){
                var pathParam = this._pathParams[key];
                url += '/'+pathParam;
            };
            url = url+".json";
            var response = $http({
                url: url,
                method: this._method,
                params: this._params,
                data: this._data,
                responseType: 'application/json',
            });
            if (this._success) response.success(this._success);
            if (this._error) response.error(this._error);
            return this;
        };
    };
    return {
        get: function(path){
            return new RestApplication('GET', path);
        },
        put: function(path){
            return new RestApplication('PUT', path);
        },
        post: function(path){
            return new RestApplication('POST', path);
        },
        _delete: function(path){
            return new RestApplication('DELETE', path);
        },
    };
}]);

