<?php
session_start();
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$phone = isset($input['phone']) ? preg_replace('/\D/','',$input['phone']) : '';
$otp   = isset($input['otp']) ? trim($input['otp']) : '';
$DBid  = isset($input['DBid']) ? intval($input['DBid']) : 0;

if (
    !preg_match('/^[6-9][0-9]{9}$/', $phone) ||
    !preg_match('/^\d{6}$/', $otp) ||
    $DBid <= 0
) {
    echo json_encode(['status' => false, 'message' => 'Invalid input']);
    exit;
}

if (!isset($_SESSION['otp'][$phone])) {
    echo json_encode(['status' => false, 'message' => 'OTP expired or not found']);
    exit;
}

$correct = $_SESSION['otp'][$phone];

if ($otp !== (string)$correct) {
    echo json_encode(['status' => false, 'message' => 'Incorrect OTP']);
    exit;
}

/* ===============================
   OTP VERIFIED → UPDATE DATABASE
   =============================== */

// DB CONFIG
$servername = "localhost";
$username   = "narayana_app";
$password   = "d16R2ScDwot0Y4Z2Of4XSIe4";
$dbname     = "codesol1_narayanaschools";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['status' => false, 'message' => 'DB connection failed']);
    exit;
}

// Update lead
$sql = "UPDATE leads 
        SET otp_validation = 'VALID' 
        WHERE id = ? AND phone = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $DBid, $phone);
$stmt->execute();

if ($stmt->affected_rows <= 0) {
    echo json_encode(['status' => false, 'message' => 'Lead not updated']);
    $stmt->close();
    $conn->close();
    exit;
}

$stmt->close();
$conn->close();

// OTP one-time use (important)
//unset($_SESSION['otp'][$phone]);

echo json_encode([
    'status' => true,
    'message' => 'OTP verified'
]);
