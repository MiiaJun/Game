<?php
require __DIR__ . "/../config/database.php";

header("Content-Type: application/json");

$stmt = $conn->prepare(
    "SELECT id, type, name
     FROM spawn_requests
     WHERE processed = 0
     ORDER BY id ASC"
);

$stmt->execute();
$result = $stmt->get_result();
$stmt->close();
$requests = [];

while ($row = $result->fetch_assoc()) {
    $requests[] = $row;
}

echo json_encode([
    "requests" => $requests
]);