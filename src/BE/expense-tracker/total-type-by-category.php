<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// DB connection
include("expense-tracker-connection.php");

$type = $conn->real_escape_string($_GET['type']);

$sql = "
    SELECT category, SUM(amount) AS total
    FROM transactions
    WHERE type = '$type'
    GROUP BY category
";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        "error" => "Query failed",
        "details" => $conn->error
    ]);
    exit;
}

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = [
        "value" => (float) $row["total"],
        "name" => (int) $row["category"]
    ];
}

echo json_encode($data);