<?php
header("Access-Control-Allow-Origin:*");
//说明向前台返回的数据类型为JSON

$name=$_FILES['file']['name'];
$type=$_FILES['file']['type'];
$size=$_FILES['file']['size'];
$tmp_name=$_FILES['file']["tmp_name"];
$time = time();
if($size<2000000){
	
	switch ($type){  
        case 'image/jpg':$img_type='jpg';  
            break;  
        case 'image/jpeg':$img_type='jpeg';  
            break;  
        case 'image/gif':$img_type='gif';  
            break;  
        case 'image/png':$img_type='png';  
            break;  
    }  	
	
	$re=move_uploaded_file($tmp_name,"upload/".$time.'.'.$img_type);
	$imgsrc="upload/".$time.'.'.$img_type;

	if($re){
		echo $imgsrc;
	}
}else{
	echo 3;
} 
 
?>



