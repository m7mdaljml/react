<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// DB connection
include("expense-tracker-connection.php");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid id"]);
    exit;
}

$id = $conn->real_escape_string($id);

$query = "DELETE FROM transactions WHERE id = '$id'";

if ($conn->query($query)) {
    if ($conn->affected_rows > 0) {
        http_response_code(200);
        echo json_encode(["success" => true]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Transaction not found"]);
    }
} else {
    http_response_code(500);
    echo json_encode(["error" => $conn->error]);
}

$conn->close();