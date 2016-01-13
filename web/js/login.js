angular.module('loginApp', [])
        .controller('LoginPageController', function ($window,$http) {

            var $logCtrl = this;
            $logCtrl.submitted = false;
            $logCtrl.registration = false;
            $logCtrl.has_error = false;
            $logCtrl.formModel = {};

            $logCtrl.toReg = function () {
                $logCtrl.registration = true;
            };
            $logCtrl.toLogin = function () {
                $logCtrl.registration = false;
            };
            //  Ajax 1	
            $logCtrl.onSubmitLog = function () {
                console.log("Hey i'm submitted!");
                console.log($logCtrl.formModel);

                var d = {name: $logCtrl.formModel.name, password: $logCtrl.formModel.password};

                $http({
                    method: 'POST',
                    url: 'http://localhost:7080/api/login',
                    contentType: 'application/json',
                    data: JSON.stringify(d),
                })
                        .success(function (data) {
                            $logCtrl.submitted_text = "Login completed successfully";
                            $.session.set("token", data.token);
                            console.log(data.token + ":)");
                            $logCtrl.submitted = true;
                            $logCtrl.has_error = false;
                            //$location.path('messages.html');
                            var url = "http://" + $window.location.host + "/JavaCodingDWClient/messages.html";
                            console.log(url);
                            $window.location.href = url;
                        })
                        .error(function (data) {
                            $logCtrl.has_error_text = "Wrong name or password";
                            $.session.set("token", "");
                            console.log(data + ":(");
                            $logCtrl.submitted = false;
                            $logCtrl.has_error = true;
                        });

            };

            //  Ajax 2	
            $logCtrl.onSubmitReg = function () {
                console.log("Hey i'm submitted Reg!");
                console.log($logCtrl.formModel);
                var d = {name: $logCtrl.formModel.name, password: $logCtrl.formModel.password};

                $http({
                    method: 'POST',
                    url: 'http://localhost:7080/api/create',
                    contentType: 'application/json',
                    data: JSON.stringify(d),
                })
                        .success(function (data) {
                            $logCtrl.submitted_text = "The user is successfully created";
                            console.log(data + ":)");
                            $logCtrl.submitted = true;
                            $logCtrl.has_error = false;
                        })
                        .error(function (data) {
                            $logCtrl.has_error_text = "A user with this name already exists";
                            console.log(data + ":(");
                            $logCtrl.submitted = false;
                            $logCtrl.has_error = true;
                        });

            };

        });