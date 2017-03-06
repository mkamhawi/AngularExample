"use strict";

angular.module('angularExampleApp')

.filter('objectFilter', function() {
  return function(input, search) {
    if (!input) { return input; }
    if (!search) { return input; }
    if (!angular.isObject(search)) { return input; }
    var result = {};
    var emptyQuery = true;
    angular.forEach(search, function(query, searchTerm) {
      if(query) {
        emptyQuery = false;
        angular.forEach(input, function(obj, key) {
          if (JSON.stringify(obj[searchTerm]).toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            result[key] = obj;
          }
        });
      }
    });
    if(emptyQuery) { return input; }
    return result;
  }
});
