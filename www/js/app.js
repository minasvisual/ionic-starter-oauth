// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter.controllers', [])
angular.module('starter.services', [])
angular.module('starter.run', [])

angular.module('starter', [
  'ionic', 
  'starter.controllers',
  'starter.services',
  'starter.run',
  'angular-oauth2',
  'ngResource',
  'http-auth-interceptor'
])

.constant('AppConfig',{
    baseUrl: 'http://localhost:8000/',
    userRoute: 'api/user/',
    clientId: 'api01',
    clientSecret: 'secret', // optional
    grantPath: '/oauth/access_token'
})

.config(function(
  $stateProvider, $urlRouterProvider, OAuthProvider, OAuthTokenProvider, AppConfig, $provide
) 
{
    OAuthProvider.configure({
      baseUrl: AppConfig.baseUrl,
      clientId: AppConfig.clientId,
      clientSecret: AppConfig.clientSecret, // optional
      grantPath: AppConfig.grantPath
    });

    OAuthTokenProvider.configure({
      name: 'token',
      options: {
        secure: false
      }
    });

  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

   .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    })

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: '/home',
      authRequired: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.search', {
      url: '/search',
      authRequired: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html'
        }
      }
    })

    .state('app.browse', {
        url: '/browse',
        authRequired: true,
        views: {
          'menuContent': {
            templateUrl: 'templates/browse.html'
          }
        }
      })

      .state('app.playlists', {
        url: '/playlists',
        authRequired: true,
        views: {
          'menuContent': {
            templateUrl: 'templates/playlists.html',
            controller: 'PlaylistsCtrl'
          }
        }
      })

    .state('app.single', {
      url: '/playlists/:playlistId',
      authRequired: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/playlist.html',
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('login');

  $provide.decorator('oauthInterceptor', ['$delegate', function($delegate){
      delete $delegate['responseError'];
      return $delegate;
  }]);
});
