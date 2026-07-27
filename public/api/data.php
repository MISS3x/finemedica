<?php
// Simple data management script for Forpsi hosting
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dataFile = '../data.json';

// GET: Read data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode(['error' => 'Data file not found']);
    }
    exit;
}

// POST: Save data - Very basic security (PIN check) could be added here
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read input
    $input = file_get_contents('php://input');
    
    // Validate JSON
    $json = json_decode($input);
    if ($json === null) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }
    
    // Write data
    if (file_put_contents($dataFile, json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to write data file']);
    }
    exit;
}
?>
