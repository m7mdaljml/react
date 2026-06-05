<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// DB connection
include("expense-tracker-connection.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON"]);
    exit;
}

function uid() {
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}


$id = uid();
$title = $conn->real_escape_string($data['title'] ?? '');
$amount = floatval($data['amount'] ?? 0);
$type = $conn->real_escape_string($data['type'] ?? '');
$category = $conn->real_escape_string($data['category'] ?? '');
$date = $conn->real_escape_string($data['date'] ?? date('Y-m-d'));
$createdDateUtc = gmdate('Y-m-d H:i:s');

if ($title == '' || $type == '' || $amount <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "title, type, amount required"]);
    exit;
}

$query = "INSERT INTO transactions (id, title, amount, type, category, date,createdDateUtc)
VALUES ('$id', '$title', $amount, '$type', '$category', '$date','$createdDateUtc')";

if ($conn->query($query)) {
    http_response_code(201);
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["error" => $conn->error]);
}

$conn->close();