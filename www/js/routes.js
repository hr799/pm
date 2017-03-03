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

  .state('tab.addDiary', {
    url: '/addDiary/:id',
    views: {
      'project': {
        templateUrl: 'templates/addDiary.html',
        controller: 'addDiaryCtrl'
      }
    }
  })


  //add notification tab
  .state('tab.notification', {
    url: '/notification',
    views: {
      'notification': {
        templateUrl: 'templates/notification.html',
        controller: 'notificationCtrl'
      }
    }
  })


    .state('tab.projectDetail', {
      url: '/projectDetail',
      views: {
        'project': {
          templateUrl: 'templates/projectDetail.html',
          controller: 'projectDetailCtrl'
        }
      }
    })
    .state('tab.addProject', {
      url: '/addProject/:id',
      views: {
        'project': {
          templateUrl: 'templates/addProject.html',
          controller: 'addProjectCtrl'
        }
      }
    })

    .state('tab.diaryDetail', {
      url: '/diaryDetail',
      views: {
        'project': {
          templateUrl: 'templates/diaryDetail.html',
          controller: 'diaryDetailCtrl'
        }
      }
    })

    .state('tab.diaries', {
      url: '/diaries',
      views: {
        'project': {
          templateUrl: 'templates/diaries.html',
          controller: 'diariesCtrl'
        }
      }
    })

    .state('addFeedback', {
        url: '/addFeedback',
        templateUrl: 'templates/addFeedback.html',
        controller: 'addFeedbackCtrl'
      })

    .state('about', {
        url: '/about',
        templateUrl: 'templates/about.html',
        controller: 'aboutCtrl'
      })

    /*.state('notification', {
        url: '/notification',
        templateUrl: 'templates/notification.html',
        controller: 'notificationCtrl'
      })*/


    .state('editProfileName', {
        url: '/editProfileName',
        templateUrl: 'templates/editProfileName.html',
        controller: 'editProfileNameCtrl'
      })

    .state('editProfileCoach', {
        url: '/editProfileCoach',
        templateUrl: 'templates/editProfileCoach.html',
        controller: 'editProfileCoachCtrl'
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