var app = angular.module('Myapp', ['angularUtils.directives.dirPagination']);
app.controller('Appctrl',function($http){
    var vm = this;
    vm.users = [];
    vm.pageno = 1;
    vm.total_count = 0;
    vm.itemsPerPage = 10;
    vm.getData = function(pageno){
        vm.users = [];  $http.get("http://yourdomain/apiname/{itemsPerPage}/{pagenumber}").success(function(response){

            vm.users = response.data;
            vm.total_count = response.total_count;
        });
    };
    vm.getData(vm.pageno);
});
