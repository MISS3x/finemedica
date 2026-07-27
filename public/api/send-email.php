<?php
// Simple email script for Forpsi hosting
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input']);
    exit;
}

$name = filter_var($input['name'] ?? '', FILTER_SANITIZE_STRING);
$email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$phone = filter_var($input['phone'] ?? '', FILTER_SANITIZE_STRING);
$message = filter_var($input['message'] ?? '', FILTER_SANITIZE_STRING);

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['error' => 'Chybí povinné údaje']);
    exit;
}

// Email settings
$to = 'ordinace@finemedica.cz'; // Change to recipient address
$subject = 'Nová zpráva z kontaktního formuláře FineMedica';
$headers = "From: noreply@finemedica.cz\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$body = "Jméno: $name\n";
$body .= "Email: $email\n";
$body .= "Telefon: $phone\n\n";
$body .= "Zpráva:\n$message\n";

// Send email
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Chyba při odesílání emailu']);
}
?>
