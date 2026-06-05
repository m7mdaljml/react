<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// DB connection
include("expense-tracker-connection.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "id is required"]);
    exit;
}

$id = $conn->real_escape_string($data['id']);
$title = $conn->real_escape_string($data['title'] ?? '');
$amount = floatval($data['amount'] ?? 0);
$type = $conn->real_escape_string($data['type'] ?? '');
$category = $conn->real_escape_string($data['category'] ?? '');
$date = $conn->real_escape_string($data['date'] ?? date('Y-m-d'));

if ($title == '' || $type == '' || $amount <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "title, type, amount required"]);
    exit;
}

$query = "
UPDATE transactions 
SET 
    title = '$title',
    amount = $amount,
    type = '$type',
    category = '$category',
    date = '$date'
WHERE id = '$id'
";

if ($conn->query($query)) {
    if ($conn->affected_rows > 0) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Updated"]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Transaction not found"]);
    }
} else {
    http_response_code(500);
    echo json_encode(["error" => $conn->error]);
}

$conn->close();