<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// DB connection
include("expense-tracker-connection.php");

$query = "
    SELECT 
       SUM(CASE WHEN type = '1' THEN amount ELSE 0 END) AS totalExpense,
SUM(CASE WHEN type = '0' THEN amount ELSE 0 END) AS totalIncome
    FROM transactions
";

$result = $conn->query($query);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        "error" => "Query failed",
        "message" => $conn->error
    ]);
    exit;
}

$row = $result->fetch_assoc();

$conn->close();

http_response_code(200);

echo json_encode([
    "totalExpense" => (float)($row["totalExpense"] ?? 0),
    "totalIncome" => (float)($row["totalIncome"] ?? 0)
]);

exit;