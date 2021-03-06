angular.module('starter.controllers')

.controller('AppCtrl', function(
  $state, $scope, $ionicModal, $ionicPopup,$timeout, $cookies, OAuth, OAuthToken
) 
{

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
     OAuth.getAccessToken($scope.loginData).then(
        function(data)
        {
          console.log(data);
          console.log($cookies.getObject('token'));
          $scope.closeLogin();
        },
        function(responseError){
          $ionicPopup.alert({
            title:'Login error',
            template: 'Username or password invalid!'
          });
          $scope.loginData.password = '';
        });
  };

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('HomeCtrl', function($scope, $stateParams, UserServ, OAuth) {
    $scope.user = {
      name:'',
      last_name:'',
      email:'',
      level:''
    };
    if( OAuth.isAuthenticated() ){
      UserServ.query({},
        function(data){
          $scope.user = data;
        });
    }else{
       $scope.user.name = 'Visitor';
    }
    
})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, UserServ, OAuth, OAuthToken) 
{
    $scope.loginData = {};

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
       OAuth.getAccessToken($scope.loginData).then(
          function(data)
          {
            console.log(data);
            $state.go('app.home');
          },
          function(responseError){
            $ionicPopup.alert({
              title:'Login error',
              template: 'Username or password invalid!'
            });
            $scope.loginData.password = '';
          });
    };

})

.controller('LogoutCtrl', function($scope, $state, $ionicPopup, UserServ, OAuth, OAuthToken, $ionicHistory) 
{
    // Form data for the login modal
    OAuthToken.removeToken();
    $scope.loginData = null;
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $ionicHistory.nextViewOptions({
        disableBack: true,
        historyRoot: true
    });
    $state.go('login');
});
