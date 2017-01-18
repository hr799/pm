angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    var pages = "#/tab/home+#/tab/feedback+#/tab/project";
    $scope.$on('$ionicView.afterEnter', function() {
        if (pages.indexOf(location.hash) > -1) {
            var tabs =document.getElementsByTagName('ion-tabs');
            angular.element(tabs).removeClass("tabs-item-hide");
        }
    });
    $scope.$on('$ionicView.afterLeave', function() {
        if (pages.indexOf(location.hash) > -1) return;
        var tabs =document.getElementsByTagName('ion-tabs');
        angular.element(tabs).addClass("tabs-item-hide");
    });
}])
   
.controller('projectCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    var pages = "#/tab/home+#/tab/feedback+#/tab/project";
    $scope.$on('$ionicView.afterEnter', function() {
        if (pages.indexOf(location.hash) > -1) {
            var tabs =document.getElementsByTagName('ion-tabs');
            angular.element(tabs).removeClass("tabs-item-hide");
        }
    });
    $scope.$on('$ionicView.afterLeave', function() {
        if (pages.indexOf(location.hash) > -1) return;
        var tabs =document.getElementsByTagName('ion-tabs');
        angular.element(tabs).addClass("tabs-item-hide");
    });
}])

//add new controller.
.controller('projectDetailCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])


//add my profile controller.
.controller('myProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    //Get a reference to the database service
    var database = firebase.database();
    var userId = firebase.auth().currentUser.uid;
    $scope.user = {
        name : "",
        imageUrl : "",
        coach : "",
        uid : userId
    };

    //Write process
    $scope.writeUserData = function(){
        firebase.database().ref('users/' + userId).set($scope.user);
    }

    //read process
    $scope.readUserData = function(){
        firebase.database().ref('/users/' + userId).once('value').then(function(res){
            $scope.user.name = res.val().name;
            $scope.user = res.val();
        });
    }



}])

//add about controller
.controller('aboutCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

//add editProfileName controller
.controller('editProfileNameCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    $scope.updateName = function(){
        // console.log($newName);
        var storage= window.localStorage;
        storage.a = storage.getItem("mingzi");
        storage.b = 2;

    }
}])

//add new controller.
.controller('addProjectCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

}])

//addFeedback Controller
.controller('addFeedbackCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

}])


//add new controller.
.controller('feedbackDetailCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {	


}])
   
.controller('feedbackCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    var pages = "#/tab/home+#/tab/feedback+#/tab/project";
    $scope.$on('$ionicView.afterEnter', function() {
        if (pages.indexOf(location.hash) > -1) {
            var tabs =document.getElementsByTagName('ion-tabs');
            angular.element(tabs).removeClass("tabs-item-hide");
        }
    });
    $scope.$on('$ionicView.afterLeave', function() {
        if (pages.indexOf(location.hash) > -1) return;
        var tabs =document.getElementsByTagName('ion-tabs');
        angular.element(tabs).addClass("tabs-item-hide");
    });
}])
      
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
     $scope.user = {email:"", psw:""};
     $scope.login = function() {
        firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.psw).then(function(msg) {
            // Login Success
            console.log(msg);
            location.href = "#tab/home";
        }, function(error){
            console.log(error);
        });

    };

}])
   
.controller('signUpCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    $scope.user = {email:"", psw:"", name:""};
    $scope.signUp = function() {
        console.log($scope.user.email+$scope.user.psw+$scope.user.name);
        // location.href = "#tab/home";
        firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.psw).then(function(msg) {
          // Handle Errors here.
          console.log(msg);
          alert("User created!");
          location.href = "#tab/login";
            }, function(error){
                console.log(error);
          var errorCode = error.code;
          var errorMessage = error.message;
  // ...
        });
        
    };

}])
   
/*.controller('addNewProjectCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 */