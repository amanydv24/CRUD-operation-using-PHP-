<?php
include('dbconnection.php');
$data=file_get_contents("php://input");
$mydata=json_decode($data,true);



$name=$mydata['name'];
$branch=$mydata['branch'];
$mobile=$mydata['mobile'];
if(!empty($name) && !empty($branch) && !empty($mobile))
{
    $sql="INSERT INTO student(name,branch,mobile) VALUES('$name','$branch','$mobile')";

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
