'use strict';

/**
 * @ngdoc function
 * @name angularExampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularExampleApp
 */
angular.module('angularExampleApp')

  .controller('MainCtrl', ['$scope', 'browserStorage', function ($scope, browserStorage) {
    var vm = $scope.vm = {};
    vm.users = browserStorage.getUsersData();
  }]);
