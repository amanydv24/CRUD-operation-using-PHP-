<?php
    include('dbconnection.php');
    
    $sql="SELECT max(id) maxid FROM student";
    $result=$conn->query($sql);
    $row=$result->fetch_assoc();
    echo json_encode($row);
?>