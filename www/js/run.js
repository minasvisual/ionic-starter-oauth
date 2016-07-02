angular.module('starter.run')

	.run(function($ionicPlatform, $state, $rootScope, OAuth) 
	{
	  $ionicPlatform.ready(function() 
	  {
	    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	    // for form inputs)
	    if (window.cordova && window.cordova.plugins.Keyboard) {
	      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	      cordova.plugins.Keyboard.disableScroll(true);

	    }
	    if (window.StatusBar) {
	      // org.apache.cordova.statusbar required
	      StatusBar.styleDefault();
	    }
	  });

	   //stateChange event
	  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams)
	  {
	      if ( toState.authRequired && !OAuth.isAuthenticated())
	      { //Assuming the AuthService holds authentication logic
	        // User isn’t authenticated
	        $state.transitionTo("login");
	        event.preventDefault(); 
	      }
	  });

	});