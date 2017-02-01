var ngApp = angular.module("login", ["ngCookies"]);

ngApp.factory("userPersistenceService", ["$cookies", function($cookies) {
	//your service code goes here
	var accessToken = "";

		return {
			setCookieData: function(accesstoken) {
				accessToken = accesstoken;
				$cookies.put("accessToken", accesstoken);
			},
			getCookieData: function() {
				accessToken = $cookies.get("accessToken");
				return accessToken;
			},
			clearCookieData: function() {
				accessToken = "";
				$cookies.remove("accessToken");
			}
		}
	}
	
]);
