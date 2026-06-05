<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// DB connection
include("expense-tracker-connection.php");

$sql = "
    SELECT
        MONTH(date) AS month,
        SUM(CASE WHEN type = '0' THEN amount ELSE 0 END) AS income,
        SUM(CASE WHEN type = '1' THEN amount ELSE 0 END) AS expense
    FROM transactions
    GROUP BY month
    ORDER BY month ASC
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

    $income = (float)$row["income"];
    $expense = (float)$row["expense"];

    $data[] = [
        "month" => $row["month"],
        "income" => $income,
        "expense" => $expense,
        "balance" => $income - $expense
    ];
}

echo json_encode($data);