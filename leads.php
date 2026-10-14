<?php
  session_start();
  $phone = $_POST['phone'] ?? '';
  $user_otp = $_POST['otp_input'] ?? '';

    if (!isset($_SESSION['otp'][$phone]) || $_SESSION['otp'][$phone] != $user_otp) {
        echo "<script>alert('OTP verification failed'); window.location='https://www.narayanaschoolsuttarakhand.com/';</script>";
        exit;
    }
    unset($_SESSION['otp'][$phone]);

//   $secret = '6Lca1QwsAAAAANUqcxf1_u5I-ECNzDEKjveg6l-3';
//   $response = $_POST['g-recaptcha-response'];
//   $url = 'https://www.google.com/recaptcha/api/siteverify';
//   $data = [
//       'secret' => $secret,
//       'response' => $response,
//       'remoteip' => $_SERVER['REMOTE_ADDR']
//   ];
//   $options = [
//       'http' => [
//           'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
//           'method'  => 'POST',
//           'content' => http_build_query($data)
//       ]
//   ];

//   $context  = stream_context_create($options);
//   $result = file_get_contents($url, false, $context);
//   $resultJson = json_decode($result);
  //echo "<pre>";
  //var_dump($resultJson);
  //die();
  //if ($resultJson->success == true) {
  if (isset($phone) && $phone!='') {
      
    // echo "<pre>";
    // var_dump($_POST);
    // die();

    $name = (isset($_POST['name']) && $_POST['name']!='') ? $_POST['name'] : '';
    $parent_email = (isset($_POST['parent_email']) && $_POST['parent_email']!='') ? $_POST['parent_email'] : '';
    $phone = (isset($_POST['phone']) && $_POST['phone']!='') ? $_POST['phone'] : '';
    $city = (isset($_POST['city']) && $_POST['city']!='') ? $_POST['city'] : '';
    $branch = (isset($_POST['branch']) && $_POST['branch']!='') ? $_POST['branch'] : '';
    $board = (isset($_POST['board']) && $_POST['board']!='') ? $_POST['board'] : '';
    $reservation_type = (isset($_POST['reservation_type']) && $_POST['reservation_type']!='') ? $_POST['reservation_type'] : '';
    $class = (isset($_POST['class']) && $_POST['class']!='') ? $_POST['class'] : '';
    $from_for = (isset($_POST['from_for']) && $_POST['from_for']!='') ? $_POST['from_for'] : '';
    $feesStucture = (isset($_POST['feesStucture']) && $_POST['feesStucture']!='') ? $_POST['feesStucture'] : 'NO';
    

    $utm_source = (isset($_POST['utm_source']) && $_POST['utm_source']!='') ? trim($_POST['utm_source']) : '';
    $utm_medium = (isset($_POST['utm_medium']) && $_POST['utm_medium']!='') ? trim($_POST['utm_medium']) : '';
    $utm_campaign = (isset($_POST['utm_campaign']) && $_POST['utm_campaign']!='') ? trim($_POST['utm_campaign']) : '';
    $redirect_from = isset($_POST['redirect_from']) ? $_POST['redirect_from'] : '';

    $entrydate = date('Y-m-d H:i:s');
        
    if($name != '') 
    {       

    //   $servername = "localhost";
    //   $username = "narayana_app";
    //   $password = "d16R2ScDwot0Y4Z2Of4XSIe4";
    //   $dbname = "codesol1_narayanaschools";

    //   // Create connection
    //   $conn = new mysqli($servername, $username, $password, $dbname);
    //   // Check connection
    //   if ($conn->connect_error) {
    //     die("Connection failed: " . $conn->connect_error);
    //   }

    //     $sql = "INSERT INTO leads (entrydate, name, parent_email, phone, city, branch, board, reservation_type, class, utm_source, utm_medium, utm_campaign, utm_content, utm_term, redirect_from)
    //     VALUES ('".$entrydate."', '".$name."', '".$parent_email."','".$phone."','".$city."','".$branch."','".$board."','".$reservation_type."','".$class."','".$utm_source."','".$utm_medium."','".$utm_campaign."','','','".$redirect_from."')";
          
    //     if ($conn->query($sql) === TRUE) {
    //       //echo "New record created successfully";
    //     } else {
    //       //echo "Error: " . $sql . "<br>" . $conn->error;
    //       //die();
    //     }
    //     $conn->close();
        if(isset($from_for) && $from_for=='feesstructure'){
          //echo "<script language='javascript' type='text/javascript'> 
          //window.location = 'https://www.wbnarayanaschools.in/thankyou.php';</script>";
          if(isset($_POST['downloadBrochure']) && $_POST['downloadBrochure']=='YES'){
                header("Location: thankyou.php?branch=".$branch."&download=YES");
                exit;
            }else{
                if(isset($feesStucture) && $feesStucture=='YES'){
                    echo "<script>
                    window.location = 'https://www.narayanaschoolsuttarakhand.com/thankyou.php?branch=".$branch."&feesstructure=".$feesStucture."';
                    </script>";
                }else{
                    header("Location: thankyou.php?branch=".$branch);
                }
                
            }
          
        }else{
            if(isset($_POST['downloadBrochure']) && $_POST['downloadBrochure']=='YES'){
                header("Location: thankyou.php?download=YES");
                exit;
            }else{
                if(isset($feesStucture) && $feesStucture=='YES'){
                    echo "<script>
                    window.location = 'https://www.narayanaschoolsuttarakhand.com/thankyou.php?branch=".$branch."&feesstructure=".$feesStucture."';
                    </script>";
                }else{
                    echo "<script language='javascript' type='text/javascript'> 
                    window.location = 'https://www.narayanaschoolsuttarakhand.com/thankyou.php';</script>";
          
                }
          
            }
        }


      }else{
        echo "<script language='javascript' type='text/javascript'> 
          alert('Name is required.');
          window.location = 'https://www.narayanaschoolsuttarakhand.com/';</script>";  
      }
    
  }else{
    echo "<script language='javascript' type='text/javascript'> 
          alert('Captcha invalid');
          window.location = 'https://www.narayanaschoolsuttarakhand.com/';</script>";
  }
?>