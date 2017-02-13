angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    var pages = "#/tab/home+#/tab/notification+#/tab/project";
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
    var pages = "#/tab/home+#/tab/notification+#/tab/project";
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


//add notificationCtrl
.controller('notificationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    var pages = "#/tab/home+#/tab/notification+#/tab/project";
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
.controller('myProfileCtrl', ['$scope', '$stateParams','$ionicActionSheet', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicActionSheet) {
    $scope.$on('$ionicView.afterEnter', function(){
        //Get a reference to the database service
        var database = firebase.database();

        //check if login successful, if not, return to login page.
        if(!firebase.auth().currentUser){
            location.href = "#/login";
            return;
        }
        var userId = firebase.auth().currentUser.uid;

        if(localStorage.getItem('user')){
            $scope.user = JSON.parse(localStorage.getItem('user'));
        } else{
            $scope.user = {};
        }



        $scope.show = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
            { text: 'Take photo' },
            { text: 'Choose from album' }
            ],
            
            titleText: 'Modify profile picture',
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
                },
            buttonClicked: function(index) {
                if(index==0){
                    document.addEventListener("deviceready", function () {

                    var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 100,
                    targetHeight: 100,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation:true
                    };

                    $cordovaCamera.getPicture(options).then(function(imageData) {
                        var image = document.getElementById('myImage');
                        image.src = "data:image/jpeg;base64," + imageData;
                    }, function(err) {
                    // error
                    });

                    }, false);
                }else if(index==1){
                    //add choose from album code here....
                }
            }
        });

       
        

 };
        /*$scope.user = {
            name : localStorage.getItem("username"),
            imageUrl : "",
            coach : "",
            uid : userId,
            email: firebase.auth().currentUser.email
        };*/
    });


        
        /*$scope.user.email = firebase.auth().currentUser.email;
*/
        /*return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
            $scope.user.name = snapshot.val().name;
  // ...
        });*/


        /*//Write process
        $scope.writeUserData = function(){
            firebase.database().ref('users/' + userId).set($scope.user);
        }

        //read process
        $scope.readUserData = function(){
            firebase.database().ref('/users/' + userId).once('value').then(function(res){
                $scope.user.name = res.val().name;
                $scope.user = res.val();
            });
        }*/



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
    $scope.user = JSON.parse(localStorage.getItem("user"));
    if(!$scope.user) $scope.user = {};
    


    $scope.saveName = function(){
            
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('users/' + userId).set($scope.user).then(function(res){
                localStorage.setItem("user", JSON.stringify($scope.user));
                location.href="#/myProfile";
            });
            }
            
        
}])



.controller('editProfileCoachCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    $scope.user = JSON.parse(localStorage.getItem("user"));
    if(!$scope.user) $scope.user = {};
    


    $scope.saveCoach = function(){
            
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('users/' + userId).set($scope.user).then(function(res){
                localStorage.setItem("user", JSON.stringify($scope.user));
                location.href="#/myProfile";
            });
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
   
.controller('loginCtrl', ['$scope', '$stateParams', '$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {
     $scope.user = {email:"", psw:""};

     $scope.login = function() {
        firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.psw).then(function(msg) {
            // Login Success
            console.log(msg);
            var userId = firebase.auth().currentUser.uid;

            firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
                if(snapshot.val()){
                    var user = snapshot.val();
                    user.email = firebase.auth().currentUser.email;
                    localStorage.setItem("user", JSON.stringify(user));
                }
            });

            location.href = "#tab/home";
        }, function(error){
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            if(errorCode=="auth/user-not-found"){
                $ionicPopup.alert({
                    title:'Invalid email',
                    template:'User not found'
                })
            }else if(errorCode=="auth/wrong-password"){
                $ionicPopup.alert({
                    title:'invalid Password',
                    template:'The password is Invalid'
                })
            }else if(errorCode=="auth/invalid-email"){
                $ionicPopup.alert({
                    title:'format error',
                    template:'The email address is badly formatted'
                })
            }
        });

    };

}])





   
.controller('signUpCtrl', ['$scope', '$stateParams', '$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {
    $scope.user = {email:"", psw:"", name:""};
    $scope.signUp = function() {
        console.log($scope.user.email+$scope.user.psw+$scope.user.name);

        var psw = $scope.user.psw;

            if(psw.length < 6){
                $ionicPopup.alert({
                    title:'Weak Password',
                    template:'Password should not be less than 6 characters'
                })
            }else if(psw.length >25){
                $ionicPopup.alert({
                    title:'Invalid Password',
                    template:'Password should not exceed 25 characters'
                })

            }else if(psw.search(/[A-Z]/) <0){
                $ionicPopup.alert({
                    title:'Invalid Password',
                    template:'Password should contain at lease 1 uppercase'
                })
            }else{
                firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.psw).then(function(msg) {
                  // Handle Errors here.
                  
                  console.log(msg);
                  alert("User created!");
                  location.href = "#tab/login";
                    }, function(error){
                        console.log(error);
                  var errorCode = error.code;
                  var errorMessage = error.message;
                    if(errorCode=='auth/email-already-in-use'){
                        $ionicPopup.alert({
                        title:'Invalid email',
                        template:'This email address is already in use'
                        })
                    }else if(errorCode=="auth/invalid-email"){
                        $ionicPopup.alert({
                        title:'Invalid email',
                        template:'The email address is badly formatted'
                        })
                    }
                });
            }
    };


    

}])
   
/*.controller('addNewProjectCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 */