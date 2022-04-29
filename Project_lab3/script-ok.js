var empDataApp = angular.module('myEmpDataApp', []);
empDataApp.controller('browseEmpData', ['$scope', '$http', 'showHTMLcontent', function($scope, $http, showHTMLcontent) {
	$http.get('employeeData-depth5.json').success(function(data) {
		$scope.title = $scope.setTitle("Employee Data Navigation");
		$scope.renderOption = "opt1";
		$scope.searchResult = $scope.empData = data.employeeData;
		$scope.currentLevel = 0;
		$scope.maxDepth = 0;
		$scope.hierarchy = [];
	});

	$http.get('renderOptions.json').success(function(data) {
		$scope.renderOptions = data.renderOptions;
	});
	
	$scope.setTitle = function(t) {
		$scope.title = t;
	};
	
	$scope.changeFunc = function (opt) {
		$scope.renderOption = opt;

		switch($scope.renderOption) {
			case 'opt1':
				$scope.searchResult = $scope.empData;
				break;
			case 'opt2':
				// Hierarchical relationship among employees
				$scope.currentLevel = 0;
				$scope.hierarchy = [];				
				$scope.formHierarchy("");
				//alert("$scope.hierarchy.length=" + $scope.hierarchy.length + " and content=" + JSON.stringify($scope.hierarchy));
				break;
			case 'opt3':
				// Employee without manager, for e.g., the CEO.
				$scope.searchResult = $scope.empData.filter(function (n, i){
					return n.managerId === "";
				});
				break;
			case 'opt4':
				// Manager who is not a valid employee
				var uniqueMgrIDs = $scope.findUniqueManagerIDs("managerId");
				var uniqueIDs = $scope.findUniqueManagerIDs("id");	
				var invalidEmployeeIDs = $scope.findInvalidEmployeeIDs(uniqueMgrIDs, uniqueIDs);
				$scope.searchResult = $scope.findEmployeesWhoseMangerIdInvalid(invalidEmployeeIDs);				
				break;				
		}		
	};

	$scope.findUniqueManagerIDs = function (type) {	
		var lookup = {};
		var items = $scope.empData;
		var result = [];
		var name = "";
		
		items.forEach(function(item) {
			switch(type) {
				case 'managerId':
					name = item.managerId;
					break;
				case 'id':
					name = item.id;
					break;
			}		

			if (!(name in lookup)) {
				lookup[name] = 1;
				result.push(name);
			}
		});		
		return result;
	};

	$scope.findInvalidEmployeeIDs = function (uniqueManagerIDs, uniqueIDs) {	
		var invalidEmployeeIDs = [];
		
		uniqueManagerIDs.forEach(function(mgrID) {
			if (!($scope.checkAvailability(uniqueIDs, mgrID))) {
				invalidEmployeeIDs.push(mgrID);  
			}	
		});			
		return invalidEmployeeIDs;
	};	
	
	$scope.checkAvailability = function (arr, val) {
		return arr.some(function(arrVal) {
			return val === arrVal;
		});
	};
	
	$scope.findEmployeesWhoseMangerIdInvalid = function (arr) {
		var items = $scope.empData;
		var result = [];

		arr.forEach(function(mgrID) {	
			items.forEach(function(item) {
				if (mgrID !== "" && mgrID === item.managerId) {
					result.push(item);
				}
			});				
		});				
		return result;
	};

	$scope.formHierarchy = function (id) {
		/** 
		 *	Find the depth of the employees data structure
		 *  Note: THIS IS A RECURSIVE FUNCTION
		 */
		var items = $scope.empData; 
		var mgrs = {}; 
		var immediateSubordinates = {}; 

		// 1. find immediate subordinates of the employee, if exist
		mgrs = $scope.empData.filter(function (n, i){
			return n.managerId === id;
		});
		$scope.currentLevel += (mgrs != null ? 1 : 0);		
		$scope.maxDepth = Math.max($scope.currentLevel, $scope.maxDepth);
				
		// 2. traverse from EACH of the immediate subordinates, until reaching his/her 
		// lowest level (leaf) staff, whose id is not a managerId. 	
		mgrs.forEach(function(subr) {
			var oneLine = {
				"name" : subr.employeeName,
				"level" : $scope.currentLevel
			};	
			$scope.hierarchy.push(oneLine);
			
			if ($scope.isManager(subr.id)) {
				// start recursion here!
				$scope.formHierarchy(subr.id);
			} else {
				// an employee without subordinate
			}
		});
		
		$scope.currentLevel -= 1;
	};

	$scope.isManager = function (id) {
		return $scope.empData.some(function(oneEmployee) {
			return id === oneEmployee.managerId;
		});
	};

}]);

/**
 * Following configuration is to force sto remove unwanted "#/index.html" suffix from URL when refreshing.
 * ref: http://stackoverflow.com/questions/14771091/removing-the-fragment-identifier-from-angularjs-urls-symbol
 *		https://docs.angularjs.org/api/ng/provider/$locationProvider
 */
empDataApp.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode(true);
}]);

empDataApp.factory('showHTMLcontent', function() {
	return {
		htmlOut: function(url) {
			return url;
		}
	}
});
