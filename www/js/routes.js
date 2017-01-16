angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('tab', {
    url: '/tab',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })
  .state('tab.home', {
    url: '/home',
    views: {
      'home': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl',
      }
    }
  })
  .state('tab.project', {
    url: '/project',
    views: {
      'project': {
        templateUrl: 'templates/project.html',
        controller: 'projectCtrl'
      }
    }
  })
    .state('tab.projectDetail', {
      url: '/projectDetail/:id',
      views: {
        'project': {
          templateUrl: 'templates/projectDetail.html',
          controller: 'projectDetailCtrl'
        }
      }
    })
    .state('tab.addProject', {
      url: '/addProject',
      views: {
        'project': {
          templateUrl: 'templates/addProject.html',
          controller: 'addProjectCtrl'
        }
      }
    })
    .state('tab.feedbackList', {
      url: '/feedbackList',
      views: {
        'project': {
          templateUrl: 'templates/feedbackList.html',
          controller: 'feedbackListCtrl'
        }
      }
    })

  .state('tab.feedback', {
    url: '/feedback',
    views: {
      'feedback': {
        templateUrl: 'templates/feedback.html',
        controller: 'feedbackCtrl'
      }
    }
  })
    .state('tab.feedbackDetail', {
      url: '/feedbackDetail/:id',
      views: {
        'feedback': {
          templateUrl: 'templates/feedbackDetail.html',
          controller: 'feedbackDetailCtrl'
        }
      }
    })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signUp', {
    url: '/signUp',
    templateUrl: 'templates/signUp.html',
    controller: 'signUpCtrl'
  })

 /* .state('addNewProject', {
    url: '/addNewProject',
    templateUrl: 'templates/addNewProject.html',
    controller: 'addNewProjectCtrl'
  })*/

  .state('myProfile', {
    url: '/myProfile',
    templateUrl: 'templates/myProfile.html',
    controller: 'myProfileCtrl'
  })


$urlRouterProvider.otherwise('/login')

  

});