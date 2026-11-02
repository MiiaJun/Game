<?php
require __DIR__ . "/../config/database.php";

header("Content-Type: application/json");

$stmt = $conn->prepare(
    "SELECT id, type, name
     FROM spawn_requests
     WHERE processed = 0"
);

$stmt->execute();
$result = $stmt->get_result();
$stmt->close();
$requests = [];

$update = $conn->prepare(
    "UPDATE spawn_requests SET processed = 1 WHERE id = ?"
);

$update->bind_param("i", $id);

while ($row = $result->fetch_assoc()) {
    $requests[] = $row;

    $id = $row["id"];
    $update->execute();
}

$update->close();

echo json_encode([
    "requests" => $requests
]);