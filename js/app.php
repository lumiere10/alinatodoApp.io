<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if($_SERVER['REQUEST_METHOD'] == 'POST') {
$title = $_POST['title'];
$desc = $_POST['desc'];

function clean($value = "") {
    $value = trim($value);
    $value = stripslashes($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value);
    
    return $value;
}

function check_length($value = "", $min, $max) {
    $result = (mb_strlen($value) < $min || mb_strlen($value) > $max);
    return !$result;
}

$title = clean($title);
$desc = clean($desc);

if(!empty($title) && !empty($desc)) {
      if(check_length($title, 0, 255) && check_length($desc, 2, 50) ) {
       if(file_exists('task.json'))  
           {  
                $current_data = file_get_contents('task.json');  
                $array_data = json_decode($current_data, true);  
                $extra = array(  
                     'title'               =>     $_POST['title'],  
                     'desc'          =>     $_POST["desc"] 
                );  
                $array_data[] = $extra;  
                $final_data = json_encode($array_data);  
                if(file_put_contents('task.json', $final_data))  
                {  
                     $message = "<label class='text-success'>File Appended Success fully</p>";  
                }  
           }  
           else  
           {  
                $error = 'JSON File not exits';  
           }  
      }  
    
    else { 
        echo "Введенные данные некорректные";
    }
}
 else {
    echo "Заполните пустые поля";
}
}
?>