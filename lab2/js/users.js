var app = angular.module("imionaApp", []);
app.controller("imionaCtrl", function($scope, $http) {
    $scope.selected = "none";
    console.log($scope.filtr);
    $scope.selection = function(selection){
        $scope.selected = selection;
    }
    $scope.updateValue = function(){
        if($scope.selected == "none"){
            return;
        }
        $scope.filteredUsers = $scope.users.filter(function(a,b,c){
            console.log(a[$scope.selected]);
            if(a[$scope.selected] && a[$scope.selected].toString().startsWith($scope.filtr)){
                return a;
            }
        })
    }
    $http.get("users.php").then( function(response) {
        $scope.users = response.data;
        $scope.filteredUsers = $scope.users;
        console.log(response.data);
    }, function() {});
});