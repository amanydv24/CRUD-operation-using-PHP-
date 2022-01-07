<?php
include('dbconnection.php');
$data=stripslashes(file_get_contents("php://input"));
$mydata=json_decode($data,true);
$id=$mydata['id'];
$name=$mydata['name'];
$branch=$mydata['branch'];
$mobile=$mydata['mobile'];
if(!empty($name) && !empty($branch) && !empty($mobile))
{
    $sql="UPDATE student SET name = '$name', branch = '$branch', mobile = '$mobile' WHERE id= {$id}";
    if($conn->query($sql)==TRUE){
        echo "Student saved successfully";
    }
    else{
        echo "Unable to save student";
    }
   
}
else{
    echo "Fill all fields";
}
?>