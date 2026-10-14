<?php
session_start();
header("Content-Type: application/json");

// DB CONFIG
$servername = "localhost";
$username   = "narayana_app";
$password   = "d16R2ScDwot0Y4Z2Of4XSIe4";
$dbname     = "codesol1_narayanaschools";

// Read JSON
$input = json_decode(file_get_contents("php://input"), true);

// Variables
$name           = trim($input['name'] ?? '');
$phone          = trim($input['phone'] ?? '');
$parent_email   = trim($input['parent_email'] ?? '');
$city           = trim($input['city'] ?? '');
$branch         = trim($input['branch'] ?? '');
$board          = trim($input['board'] ?? '');
$reservation_type = trim($input['reservation_type'] ?? '');
$class          = trim($input['classes'] ?? '');
$class_category = trim($input['class_category'] ?? $input['classCategory'] ?? '');
$utm_source     = $input['utm_source'] ?? null;
$utm_medium     = $input['utm_medium'] ?? null;
$utm_campaign   = $input['utm_campaign'] ?? null;
$redirect_from  = $input['redirect_from'] ?? '';

if ($name == '' || !preg_match('/^[6-9][0-9]{9}$/', $phone)) {
    echo json_encode(["status" => false, "message" => "Invalid input"]);
    exit;
}

// Generate OTP
$otp = rand(100000, 999999);
$_SESSION['otp'][$phone] = $otp;

// DB
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["status" => false, "message" => "DB connection failed"]);
    exit;
}

// Legacy/default values required by leads table
$stream         = '';
$course         = '';
$dob            = '0000-00-00';
$address        = '';
$grade          = '';
$guardian_name  = '';
$whatsapp_number = '';
$page_section   = '';

// Insert
$sql = "INSERT INTO leads
(
    entrydate,
    name,
    parent_email,
    phone,
    city,
    branch,
    stream,
    course,
    board,
    reservation_type,
    class,
    class_category,
    dob,
    address,
    grade,
    guardian_name,
    whatsapp_number,
    utm_source,
    utm_medium,
    utm_campaign,
    redirect_from,
    page_section
)
VALUES (
    NOW(),
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sssssssssssssssssssss",
    $name,
    $parent_email,
    $phone,
    $city,
    $branch,
    $stream,
    $course,
    $board,
    $reservation_type,
    $class,
    $class_category,
    $dob,
    $address,
    $grade,
    $guardian_name,
    $whatsapp_number,
    $utm_source,
    $utm_medium,
    $utm_campaign,
    $redirect_from,
    $page_section
);

$stmt->execute();

// GET INSERTED ID
$lead_id = $stmt->insert_id;

$stmt->close();

// SEND SMS
$url = "https://njportal.thenoncoders.in/api/v1/send_sms?mobile={$phone}&otp_or_msg={$otp}&type=RNETSC_OTP";
$headers = [
    "sms_api_key: x908707x7f0c36aedab814_eb0390cef345_D15C968A8C79C44552B91F7B6"
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_exec($ch);
curl_close($ch);

// Send lead notification email to LeadCMS
$mailerPayload = [
    'lead_id' => $lead_id,
    'data'    => [
        'name'             => $name,
        'phone'            => $phone,
        'parent_email'     => $parent_email,
        'city'             => $city,
        'branch'           => $branch,
        'board'            => $board,
        'class'            => $class,
        'class_category'   => $class_category,
        'reservation_type' => $reservation_type,
        'utm_source'       => $utm_source,
        'utm_medium'       => $utm_medium,
        'utm_campaign'     => $utm_campaign,
        'redirect_from'    => $redirect_from
    ]
];
$emailCh = curl_init('https://narayanainternationalschool.net/leadcms/mailer/api_send_lead_email.php');
curl_setopt($emailCh, CURLOPT_POST, true);
curl_setopt($emailCh, CURLOPT_POSTFIELDS, json_encode($mailerPayload));
curl_setopt($emailCh, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($emailCh, CURLOPT_RETURNTRANSFER, true);
curl_setopt($emailCh, CURLOPT_TIMEOUT, 5);
curl_setopt($emailCh, CURLOPT_CONNECTTIMEOUT, 3);
curl_setopt($emailCh, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) NarayanaLeadMailer/1.0');
curl_setopt($emailCh, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($emailCh, CURLOPT_SSL_VERIFYHOST, 0);
$emailResp = curl_exec($emailCh);
if ($emailResp === false) {
    error_log("Lead mailer curl error for lead #{$lead_id}: " . curl_error($emailCh));
}
curl_close($emailCh);

$conn->close();

// RESPONSE WITH ID
echo json_encode([
    "status" => true,
    "message" => "OTP sent",
    "lead_id" => $lead_id
]);
?>
