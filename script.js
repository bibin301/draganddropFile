// Code goes here

var app= angular.module('app',['ngFileUpload']);


  app.controller('appCtl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });
        $scope.$watch('file', function () {
            if ($scope.file != null) {
                $scope.files = [$scope.file];
            }
        });
        $scope.log = '';

        $scope.upload = function (files) {
console.log("my uploaded files" ,files)
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                  var file = files[i];
                  console.log(file);

                  if (!file.$error) {
                    Upload.upload({
                      //  url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                      url:'http://192.168.10.57/qdepAPI/api/Administration/FileAttachment',
                      method:'post',
                        data: {

                          file: file
                        }
                    }).then(function (resp) {
                      console.log("get fileuploaded response" , resp);
                      if(resp.statusText){
                        $scope.errorMessage =""

                      }

                        // $timeout(function() {
                        //     // $scope.log = 'file: ' +
                        //     // resp.config.data.file.name +
                        //     // ', Response: ' + JSON.stringify(resp.data) +
                        //     // '\n' + $scope.log;
                        // });
                    }, null, function (evt) {
                        var progressPercentage = parseInt(100.0 *
                        		evt.loaded / evt.total);
                        $scope.log = 'progress: ' + progressPercentage +
                        	'% ' + evt.config.data.file.name + '\n' +
                          $scope.log;
                    });
                  }
                }
            }
        };
    }]);
