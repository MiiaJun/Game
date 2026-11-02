<?php
require __DIR__ . "/../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);
$ids = $data["ids"] ?? [];

$stmt = $conn->prepare(
    "UPDATE spawn_requests SET processed = 1 WHERE id = ?"
);

$stmt->bind_param("i", $id);

foreach ($ids as $id) {
    $stmt->execute();
}

$stmt->close();