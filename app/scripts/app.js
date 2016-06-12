'use strict';

/**
 * @ngdoc overview
 * @name angularExampleApp
 * @description
 * # angularExampleApp
 *
 * Main module of the application.
 */
angular

  .module('angularExampleApp', [
    'ngRoute'
  ])

  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider

      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })

      .otherwise({
        redirectTo: '/'
      });

  }])

  .run(['browserStorage', function(browserStorage) {
    browserStorage.insertSampleData();
  }]);
