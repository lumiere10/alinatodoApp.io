angular.module("toDoList", []).controller("toDoListCtrl", ['$scope', '$http', function($scope, $http){
  
    $http.get('tasks.json').success(function(data){
      $scope.taskList = data;
    });

    $scope.taskList = angular.fromJson(localStorage.getItem('taskList'));
    $scope.order = 'task';
    
    $scope.addTask = function(){
var t = {
          completed : false,
          task : $scope.newTask,
          desc : $scope.newTaskDescription, 
          important : false

        }
        $scope.taskList.push(t);
        $scope.save();
        $scope.newTask = '';
        $scope.newTaskDescription='';
            };
    
    $scope.removeCompleted = function(){
        var oldList = $scope.taskList;
        $scope.taskList = [];
        angular.forEach(oldList, function(task, desc){
           if(!task.completed){
            $scope.taskList.push(task);
             $scope.taskList.push(desc);
           }
        });
        $scope.save();
    };
    
    $scope.save = function(){
        localStorage.setItem('taskList', angular.toJson($scope.taskList));
        $http.post('app.php', angular.toJson($scope.taskList)).then(function(){
          // log success
        });
    }

}
]);