'use strict';

/**
 * @ngdoc function
 * @name angularExampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularExampleApp
 */
angular.module('angularExampleApp')

  .controller('MainCtrl', ['$scope', '$mdDialog', 'browserStorage', function ($scope, $mdDialog, browserStorage) {
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
            delete vm.users[id];
            browserStorage.updateUsersData(vm.users);
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
            browserStorage.updateUserData(id, response);
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
