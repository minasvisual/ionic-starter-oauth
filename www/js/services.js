angular.module('starter.services')
	.factory('UserServ', function($resource, AppConfig){
		return $resource(AppConfig.baseUrl+AppConfig.userRoute, {},{
			query:{
				isArray:false
			}
		});
	});