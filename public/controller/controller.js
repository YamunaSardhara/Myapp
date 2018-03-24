var app=angular.module('Myapp',['ngResource']).
factory('Appctrl', function() {
  return {
    response: function(response) {
      console.log('response intercepted: ', response);
    }
  }
}).
factory('Appctrl', ['$resource', 'resourceInterceptor', function($resource, resourceInterceptor) {
  return $resource(":name",
  {},
  {
    'list': {method: 'GET', isArray: false, interceptor: resourceInterceptor}
  }
);
}]).
run(['Appctrl', 'resourceService', '$http', function(resourceService, $http) {
  resourceService.list({name: 'list.json'}); // <= intercepted
  $http.get('list.json'); // <= not intercepted
}]);
