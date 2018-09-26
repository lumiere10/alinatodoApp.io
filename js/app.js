angular.module("toDoApp", []).controller("toDoAppCtrl", ['$scope', '$http', function($scope, $http){
  
    $http.get('tasks.json').then(function(data){
    
      $scope.taskList = data;
    });

    $scope.taskList = angular.fromJson(localStorage.getItem('taskList'));
    
    
    $scope.addTask = function(){
        $scope.taskList.push({
          title : $scope.newTaskTitle,
          desc : $scope.newTaskDescription, 
        });

        $scope.save();
        $scope.newTaskTitle = '';
        $scope.newTaskDescription = '';
            };
    
    $scope.removeCompleted = function(){
        var oldList = $scope.taskList;
        $scope.taskList = [];
        angular.forEach(oldList, function(x){
           if(!x){
            $scope.taskList.push(x);
           }
        });
        $scope.save();
    };

      $scope.remove = function() {
        var oldList = $scope.taskList;
        $scope.taskList = [];
        taskList.remove();
    };
    
    $scope.save = function(){


        localStorage.setItem('taskList', angular.toJson($scope.taskList));
        $http.post('../app.php', angular.toJson($scope.taskList)).then(function(){
           $scope.taskList = response.data.records;
        });
    }

}
]);