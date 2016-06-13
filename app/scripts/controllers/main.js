'use strict';

/**
 * @ngdoc function
 * @name angularExampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularExampleApp
 */
angular.module('angularExampleApp')

  .controller('MainCtrl', ['$scope', '$mdDialog', '$mdToast', 'browserStorage', function ($scope, $mdDialog, $mdToast, browserStorage) {
    var vm = $scope.vm = {};
    vm.users = browserStorage.getUsersData();
    vm.toggleItemState = function (event) {
      var row = event.target.parentNode.parentNode;
      if(row.classList.contains("disabled")) {
        row.classList.remove("disabled");
      } else {
        row.classList.add("disabled");
      }
    };

    vm.delete = function(event, id) {
      var confirm = $mdDialog.confirm()
          .title('Remove ' + vm.users[id].firstname + ' ' + vm.users[id].lastname + '?')
          .textContent('All data about ' + vm.users[id].firstname + ' ' + vm.users[id].lastname + ' will be lost.')
          .targetEvent(event)
          .ok('Ok')
          .cancel('Cancel');
      $mdDialog.show(confirm)
          .then(function() {
            $mdToast.show(
              $mdToast.simple()
                .textContent('Loading...')
                .position(['top', 'right'])
                .hideDelay(3000)
            );
            browserStorage.deleteUser(id)
              .then(function(response) {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent(response)
                    .position(['top', 'right'])
                    .hideDelay(2000)
                );
                delete vm.users[id];
              }, function(rejection) {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent(rejection)
                    .position(['top', 'right'])
                    .hideDelay(2000)
                );
                console.log(rejection);
              });
          }, function() {
            console.log("Delete command cancelled!");
          });
    };

    vm.edit = function(event, id) {
      $mdDialog.show({
        locals: {
          userDetails: vm.users[id],
          cancel: vm.cancel,
          save: vm.save
        },
        bindToController: true,
        controllerAs: 'dialog',
        controller: function() {},
        templateUrl: 'views/detailsDialog.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true,
        fullscreen: true
      })
        .then(function(response) {
          if(!response || response === 'cancelled') {
            console.log("Edit command cancelled!");
          } else {
            $mdToast.show(
              $mdToast.simple()
                .textContent('Loading...')
                .position(['top', 'right'])
                .hideDelay(3000)
            );
            browserStorage.updateUserData(id, response)
              .then(function(successMsg) {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent(successMsg)
                    .position(['top', 'right'])
                    .hideDelay(2000)
                );
                console.log(successMsg);
              }, function(rejection) {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent(rejection)
                    .position(['top', 'right'])
                    .hideDelay(2000)
                );
                console.log(rejection);
              });
          }
        });
    };

    vm.save = function(userDetails) {
      $mdDialog.hide(userDetails);
    };
    vm.cancel = function() {
      $mdDialog.hide('cancelled');
    };
  }]);
