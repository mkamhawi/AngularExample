"use strict";

angular

  .module('angularExampleApp')

  .factory('browserStorage', ['$window', '$q', function($window, $q) {

    var userDataKey = "user_data";
    var sampleData = {
      'Jennifer_Aniston': {
        'username': 'Jennifer_Aniston',
        'firstname': 'Rachel',
        'lastname': 'Green',
        'email': 'rachel@friends.net'
      },
      'Courteney_Cox': {
        'username': 'Courteney_Cox',
        'firstname': 'Monica',
        'lastname': 'Geller',
        'email': 'monica@friends.net'
      },
      'Lisa_Kudrow': {
        'username': 'Lisa_Kudrow',
        'firstname': 'Phoebe',
        'lastname': 'Buffay',
        'email': 'phoebe@friends.net'
      },
      'Matt_LeBlanc': {
        'username': 'Matt_LeBlanc',
        'firstname': 'Joey',
        'lastname': 'Tribbiani',
        'email': 'joey@friends.net'
      },
      'Matthew_Perry': {
        'username': 'Matthew_Perry',
        'firstname': 'Chandler',
        'lastname': 'Bing',
        'email': 'chandler@friends.net'
      },
      'David_Schwimmer': {
        'username': 'David_Schwimmer',
        'firstname': 'Ross',
        'lastname': 'Geller',
        'email': 'ross@friends.net'
      }
    };

    var saveObject = function(key, value) {
        $window.localStorage.setItem(key, JSON.stringify(value));
    };

    var getObject = function(key) {
        var object = $window.localStorage.getItem(key);
        return JSON.parse(object) || undefined;
    };

    var clearObject = function(key) {
        $window.localStorage.removeItem(key);
    };

    var clearAll = function() {
        $window.localStorage.clear();
    };

    var appendToArray = function(key, valueToAppend) {
        var existingArray = getObject(key);
        if(angular.isArray(existingArray)) {
            existingArray.push(valueToAppend);
            saveObject(key, existingArray);
        } else {
            saveObject(key, [valueToAppend]);
        }
    };

    var insertSampleData = function() { saveObject(userDataKey, sampleData); };

    var getUsersData = function() { return getObject(userDataKey); };

    var updateUsersData = function(updatedData) {
      saveObject(userDataKey, updatedData);
    };

    var updateUserData = function(id, updatedUserData) {
      var deferred = $q.defer();
      setTimeout(function() {
        var users = getUsersData();
        if(!angular.isObject(users)) {
          deferred.reject("Error: check internet connectivity");
        } else {
          users[id] = updatedUserData;
          saveObject(userDataKey, users);
          deferred.resolve("Data updated successfully");
        }
      }, 2000);

      return deferred.promise;
    };

    var deleteUser = function (id) {
      var deferred = $q.defer();
      setTimeout(function() {
        var users = getUsersData();
        if(!angular.isObject(users) || !users[id]) {
          deferred.reject("Error: check internet connectivity");
        } else {
          delete users[id];
          saveObject(userDataKey, users);
          deferred.resolve("User deleted successfully");
        }
      }, 2000);

      return deferred.promise;
    };

    return {
      insertSampleData: insertSampleData,
      getUsersData: getUsersData,
      updateUsersData: updateUsersData,
      updateUserData: updateUserData,
      deleteUser: deleteUser
    };

  }]);
