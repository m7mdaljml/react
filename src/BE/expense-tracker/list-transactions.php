<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// DB connection
include("expense-tracker-connection.php");

$query = "SELECT * FROM transactions";

if (isset($_GET['title'])) {
    $query .= (strpos($query, 'WHERE') === false ? " WHERE" : " AND") . " title = '" . $conn->real_escape_string($_GET['title']) . "'";
}

if (isset($_GET['category'])) {
    $query .= (strpos($query, 'WHERE') === false ? " WHERE" : " AND") . " category = '" . $conn->real_escape_string($_GET['category']) . "'";
}
if (isset($_GET['type'])) {
    $query .= (strpos($query, 'WHERE') === false ? " WHERE" : " AND") . " type = '" . $conn->real_escape_string($_GET['type']) . "'";
}

$query .= " ORDER BY createdDateUtc";

$result = $conn->query($query);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        "error" => "Query failed",
        "message" => $conn->error
    ]);
    exit;
}

$transactions = [];

while ($row = $result->fetch_assoc()) {
    $transactions[] = $row;
}

$conn->close();

http_response_code(200);

echo json_encode($transactions);
exit;