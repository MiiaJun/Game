<?php
require __DIR__ . "/../config/cors.php";
require __DIR__ . "/../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);
$name = trim($data["name"] ?? "");
$type = $data["type"] ?? 0;

if ($name === "") {
    $name = "Anonymous";
}

$stmt = $conn->prepare(
    "INSERT INTO spawn_requests (type, name) VALUES (?, ?)"
);

$stmt->bind_param("is", $type, $name);
$stmt->execute();
$stmt->close();