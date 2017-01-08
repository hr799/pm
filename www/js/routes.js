angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.home', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tabsController.project', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/project.html',
        controller: 'projectCtrl'
      }
    }
  })

  .state('tabsController.feedback', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/feedback.html',
        controller: 'feedbackCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signUp', {
    url: '/page7',
    templateUrl: 'templates/signUp.html',
    controller: 'signUpCtrl'
  })

  .state('addNewProject', {
    url: '/page8',
    templateUrl: 'templates/addNewProject.html',
    controller: 'addNewProjectCtrl'
  })

$urlRouterProvider.otherwise('/page5')

  

});