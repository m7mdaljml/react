<?php

$conn = new mysqli("localhost", "root", "", "expense-tracker");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}