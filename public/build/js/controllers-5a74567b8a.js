myApp.controller('navController', ['$scope', '$location', '$cookies', 'userModel',
    function($scope, $location, $cookies, userModel) {
        /*Variables*/
        angular.extend($scope, {
            user: userModel.getUserObject(),
            navLinkPrimary: [{
                link: 'Home',
                url: '/dashboard'
            }, {
                link: 'Add Gallery',
                url: '/gallery/add'
            }]
        });

        /*Methods*/
        angular.extend($scope, {
            checkActiveLink: function(currLink) {
                if ($location.path() == currLink) {
                    return 'make-active';
                }
            },
            doLogout: function() {
                userModel.doUserLogout();
                $location.path('/');
            }
        });
    }
]);

myApp.controller('userController', ['$scope', '$location', 'userModel', function($scope, $location, userModel) {
    angular.extend($scope, {
        login: {
            username: 'reachme@amitavroy.com',
            password: 'pass'
        }
    });

    angular.extend($scope, {
        doLogin: function(loginForm) {
            var data = {
                email: $scope.login.username,
                password: $scope.login.password
            };

            userModel.doLogin(data).then(function() {
                $location.path('/dashboard');
            });
        }
    });
}]);

myApp.controller('galleryController', ['$scope', 'galleryModel', function($scope, galleryModel) {

    galleryModel.fetchUserGalleries().then(function(response) {
        $scope.galleries = response.data;
    });

    /*variables*/
    angular.extend($scope, {
        newGallery: {},
        errorDiv: false,
        errorMessages: ['asd', 'as'],
        csrfToken: csrfToken,
        dropzoneConfig: {
            'options': { // passed into the Dropzone constructor
                'url': baseUrl + 'save/file'
            },
            'eventHandlers': {
                'sending': function(file, xhr, formData) {},
                'success': function(file, response) {}
            }
        }
    });

    /*methids*/
    angular.extend($scope, {
        /**
         * Saving a new gallery
         * 
         * @return {galleryObj}
         */
        saveNewGallery: function(addGalleryFrm) {
            $scope.formSubmitted = true;

            if (addGalleryFrm.$valid) {
                $scope.formSubmitted = false;
                galleryModel.saveGallery($scope.newGallery).success(function(response) {
                    console.log(response, 'success');
                    $scope.errorMessages = null;
                }).error(function(data, status, header) {
                    $scope.errorDiv = true;
                    $scope.errorMessages = data;
                    console.log(data, 'error');
                });
            }
        }
    });
}]);

/**
 * Sinnper taken from https://gist.github.com/compact/8118670
 */
myApp.directive('dropzone', function() {
    return function(scope, element, attrs) {
        var config, dropzone;

        config = scope[attrs.dropzone];

        // create a Dropzone for the element with the given options
        dropzone = new Dropzone(element[0], config.options);

        // bind the given event handlers
        angular.forEach(config.eventHandlers, function(handler, event) {
            dropzone.on(event, handler);
        });
    };
});

myApp.controller('globalController', ['$scope', function($scope) {
    $scope.global = {};
    $scope.global.navUrl = "templates/partials/nav.html";
}]);

//# sourceMappingURL=controllers.js.map