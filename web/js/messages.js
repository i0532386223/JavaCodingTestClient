angular.module('textApp', [])
        .controller('SendMessController', function ($http) {
            var $sendCtrl = this;

            $sendCtrl.formModel = {};

            //  Ajax	
            $sendCtrl.onSubmit = function () {
                console.log("Hey i'm submitted!");
                console.log($sendCtrl.formModel);

                console.log("SecretPrefix: " + $.session.get('token'));

                $http({
                    method: 'POST',
                    url: 'http://localhost:7080/api/message',
                    contentType: 'undefined',
                    headers: {
                        'Authorization': "SecretPrefix " + $.session.get('token')},
                    data: $sendCtrl.formModel.name,
                })
                        .success(function (data) {
                            $sendCtrl.response = data;
                        })
                        .error(function (data) {
                            $sendCtrl.response = data;
                        });

            };


        });