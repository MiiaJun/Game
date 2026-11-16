<?php
require __DIR__ . "/../config/database.php";

header("Content-Type: application/json");

$stmt = $conn->prepare(
    "UPDATE spawn_requests
     SET processed = 1
     WHERE processed = 0"
);

$stmt->execute();
$stmt->close();

echo json_encode([
    "success" => true
]);