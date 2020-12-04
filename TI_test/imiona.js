var app = angular.module("imionaApp", []);
app.controller("imionaCtrl", function ($scope, $http) {
    $scope.imiona = [{"id":123,"pozycja":12, "imie":"Anna"}]
    $http.get("imiona.php").then(function(response) {
        $scope.imiona = response.data.imiona
    }, function (response) {});
});