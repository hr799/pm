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

            if(localStorage.getItem('user')){
                $scope.user = JSON.parse(localStorage.getItem('user'));
            } else{
                $scope.user = {};
            }
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
        //check if current view is home or project or notification, if so show bottom tabs.
        if (pages.indexOf(location.hash) > -1) {
            var tabs =document.getElementsByTagName('ion-tabs');
            angular.element(tabs).removeClass("tabs-item-hide");
        }
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/projects/' + userId).once('value').then(function(snapshot){
            $scope.projectList = snapshot.val();
            $scope.$apply();
        });

    });

    //check when leave the page, if not in home, project or notification page, then dont show bottom tabs. 
    $scope.$on('$ionicView.afterLeave', function() {
        if (pages.indexOf(location.hash) > -1) return;
        var tabs =document.getElementsByTagName('ion-tabs');
        angular.element(tabs).addClass("tabs-item-hide");
    });

    //trigger when user click on project div
    $scope.goToProject = function(id){
        var project = $scope.projectList[id];
        project.id = id;    // add project ID, to be used after.
        localStorage.setItem("tempProject", JSON.stringify(project));
        window.tempProjectId = id;
        location.href = "#/tab/projectDetail";

    };
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
    $scope.$on('$ionicView.afterEnter', function() {
        var userId = firebase.auth().currentUser.uid;
        /*firebase.database().ref('/projects/' + userId).once('value').then(function(snapshot){
            $scope.projectList = snapshot.val();
        });*/

        $scope.displayProject = JSON.parse(localStorage.getItem('tempProject'));
        $scope.displayProject.startDate = new Date($scope.displayProject.startDate);
    });

}])


.controller('diariesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    var projectId = tempProjectId;
    $scope.$on('$ionicView.afterEnter', function() {
        
        firebase.database().ref('diaries/' + projectId).once('value').then(function(snapshot){
            $scope.diariesList = snapshot.val();
            //$scope.diariesList.date = new Date($scope.diariesList.date);  
            $scope.$apply();
        });
    });


    $scope.goToDiary = function(id){
        var diary = $scope.diariesList[id];
        diary.id = id;    // add diary ID, to be used after.
        localStorage.setItem("tempDiary", JSON.stringify(diary));
        window.tempDiaryId = id;
        location.href = "#/tab/diaryDetail";

    };

    /*$scope.format = function(date){
        var o = {   
        "M+" : this.getMonth()+1,                 //月份   
        "d+" : this.getDate(),                    //日   
        "h+" : this.getHours(),                   //小时   
        "m+" : this.getMinutes(),                 //分   
        "s+" : this.getSeconds(),                 //秒   
        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
        "S"  : this.getMilliseconds()             //毫秒   
      };   
      if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
      for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
      return fmt;   
    }*/
}])


.controller('diaryDetailCtrl', ['$scope', '$stateParams', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {
    $scope.$on('$ionicView.afterEnter', function() {
        var userId = firebase.auth().currentUser.uid;
        /*firebase.database().ref('/projects/' + userId).once('value').then(function(snapshot){
            $scope.projectList = snapshot.val();
        });*/

        $scope.displayDiary = JSON.parse(localStorage.getItem('tempDiary'));
        $scope.displayDiary.date = new Date($scope.displayDiary.date);
    });
}])

.controller('addDiaryCtrl', ['$scope', '$stateParams', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {
    
    var diaryId = window.tempDiaryId;
    var projectId = window.tempProjectId;
    $scope.$on('$ionicView.afterEnter', function() {
        $scope.title = "New Diary";
        $scope.diary = {};
        var date = new Date();
        $scope.diary.date = date.toString();
        
        
        if($stateParams.id != "0"){
            $scope.canDelete = true;
            $scope.title = "Edit Diary";
            $scope.diary = JSON.parse(localStorage.getItem('tempDiary'));
        };
    });

    $scope.saveDiary = function(){
        
        var userId = firebase.auth().currentUser.uid;
        
        if(!$scope.diary.title || !$scope.diary.detail){ //check if input fileds is empty
            var tempMsg = "Input Required"
            $ionicPopup.alert({template:tempMsg})
            return;
        };
        

        
        if($scope.diary.id){
            firebase.database().ref('diaries/' + projectId + '/' + $scope.diary.id).update($scope.diary, function(error){
                tempMsg = "Diary Updated!";
                $ionicPopup.alert({template:tempMsg})
                location.href="#/tab/diaries";
            });
        }else{
            firebase.database().ref('diaries/' + projectId).push().set($scope.diary, function(res){
                var tempMsg = "Diary Saved"
                $ionicPopup.alert({
                    template: tempMsg
                })
                location.href="#/tab/diaries";
            });
        }
    };

    $scope.deleteDiary = function(){
        firebase.database().ref('diaries/' + projectId).child($scope.diary.id).remove(function(error){
            if(error){
                alert(error);
            }else{
                location.href="#/tab/diaries";
            }
        });
    }

}])


//add my profile controller.
.controller('myProfileCtrl', ['$scope', '$stateParams','$ionicActionSheet', '$timeout','$cordovaCamera', '$cordovaImagePicker',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicActionSheet, $timeout,$cordovaCamera, $cordovaImagePicker) {
    $scope.$on('$ionicView.afterEnter', function(){
        // Create a root reference
        var storageRef = firebase.storage().ref();

        // Create a reference to 'mountains.jpg'
        var imgRef = storageRef.child('img.jpg');

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
                    
                    // 
                    var options = {
                    quality: 70,
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
                        var image = document.getElementById('profileImg');
                        image.src = "data:image/jpeg;base64," + imageData;
                        imgRef.putString(imageData, 'base64').on('state_changed', function(snapshot){
                            console.log('Uploaded a base64 string!');
                            var profileImgURL = snapshot.downloadURL;

                            //save profile image url to firebase database..
                            var user = JSON.parse(localStorage.getItem("user"));
                            user.imageUrl = profileImgURL;
                            storageRef('users/' + userId).set($scope.user).then(function(res){
                                console.log(res);
                                 //update local user info..
                                localStorage.setItem("user", stringify(user));
                            });
                        }, function(error){
                            //error code here
                        }, function(){
                        //success
                        }) 
                    });
                } else if (index==1) {
                    var options = {
                    maximumImagesCount: 1,
                    width: 800,
                    height: 800,
                    quality: 80
                    };

                    $cordovaImagePicker.getPictures(options)
                        .then(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            console.log('Image URI: ' + results[i]);
                        }
                        }, function(error) {
                        // error getting photos
                        });
                    }
                }
            });
        };
    });

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
    $scope.$on('$ionicView.afterEnter', function() {
        //$scope.user = JSON.parse(localStorage.getItem("user"));
        //if(!$scope.user) $scope.user = {};
        $scope.users = [];
        firebase.database().ref('users/').once('value').then(function(snapshot){
            if(snapshot.val()){
                var users = snapshot.val();
            }
            if(users){
                for (var k in users){
                    var item = users[k];
                    $scope.users.push(item);
                }
            }else{
                $scope.users ={};
            }
            $scope.search = "";
        });


        
    });
    
    
    // $scope.saveCoach = function(){
    //     var userId = firebase.auth().currentUser.uid;
    //     firebase.database().ref('users/' + userId).set($scope.user).then(function(res){
    //         localStorage.setItem("user", JSON.stringify($scope.user));
    //         location.href="#/myProfile";
    //     });
    // }        

        
}])

//add new controller.
.controller('addProjectCtrl', ['$scope', '$stateParams','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {
    $scope.$on('$ionicView.afterEnter', function() {  
        $scope.title = "Add Project";
        $scope.project = {};
        if ($stateParams.id != "0") {
            $scope.canDelete = true;
            $scope.title = "Edit Project";
            $scope.project = JSON.parse(localStorage.getItem('tempProject'));
            if ($scope.project.startDate) {
                $scope.project.startDate = new Date($scope.project.startDate);  
            } else {
                $scope.project.startDate = new Date();  
            };
        };
    });

    $scope.saveProject = function(){
        var userId = firebase.auth().currentUser.uid;
        if (!$scope.project.startDate) {
            alert("Please specify start date");
            return;
        };
        var pj = {};
        pj.startDate = $scope.project.startDate.toString();
        pj.name = $scope.project.name;
        pj.client = $scope.project.client;
        pj.goal = $scope.project.goal;
        pj.description = $scope.project.description;
        var ref;
        if ($scope.project.id) {
            var ref = firebase.database().ref('projects/' + userId);
            var updates = {};
            updates['projects/' + userId + '/' + $scope.project.id] = pj;
            firebase.database().ref().update(updates, function(error) {
                tmp = "Project Updated";
                $ionicPopup.alert({
                    template:tmp
                })
                location.href="#/tab/project";
            });
        } else {
            firebase.database().ref('projects/' + userId).push().set(pj, function(res){
                var tmp = "New Project Created"
                $ionicPopup.alert({
                    template:tmp
                })
                location.href="#/tab/project";
            });
        }
    };

    $scope.delete = function(){
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref('projects/' + userId);
        ref.child($scope.project.id).remove(function(error){
            if (error) {
                alert(error);
            } else {
                location.href = "#/tab/project";
            };
        });
    };
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
                    firebase.database().ref('users/' + userId).set($scope.user.email);
                    localStorage.setItem("user", JSON.stringify(user));
                }
            });
            
            location.reload();
            location.href = "#tab/home";
            

        }, function(error){ // if login failed
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
            if (psw.length < 6) {
                $ionicPopup.alert({
                    title:'Weak Password',
                    template:'Password should not be less than 6 characters'
                })
            } else if (psw.length >25) {
                $ionicPopup.alert({
                    title:'Invalid Password',
                    template:'Password should not exceed 25 characters'
                })

            } else if (psw.search(/[A-Z]/) <0) {
                $ionicPopup.alert({
                    title:'Invalid Password',
                    template:'Password should contain at lease 1 uppercase'
                })
            } else {
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