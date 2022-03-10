<?php 
	
	// echo "checkUserName";
    $username = $_GET['username'];

    if($username == "admin"){
        echo "username exists";
    }else {
        echo "username ok";
    }

 ?>
