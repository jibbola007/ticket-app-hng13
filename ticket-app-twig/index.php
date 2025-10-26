<?php
session_start();
require_once __DIR__ . '/vendor/autoload.php';

if (!isset($_SESSION['ticketapp_session'])) {
  header('Location: auth.php?action=login');
  exit;
}

$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/templates');
$twig = new \Twig\Environment($loader, ['cache' => false]);

$page = $_GET['page'] ?? 'dashboard';
$ticketsFile = __DIR__ . '/data/tickets.json';
$tickets = file_exists($ticketsFile) ? json_decode(file_get_contents($ticketsFile), true) : [];

// 🧭 Handle form submissions (route internally)
if ($page === 'tickets' && ($_GET['action'] ?? '') === 'save' && $_SERVER['REQUEST_METHOD'] === 'POST') {
  require 'tickets.php';
  exit;
}

// ✅ Dashboard
if ($page === 'dashboard') {
  $openCount = count(array_filter($tickets, fn($t) => $t['status'] === 'open'));
  $progressCount = count(array_filter($tickets, fn($t) => $t['status'] === 'in_progress'));
  $closedCount = count(array_filter($tickets, fn($t) => $t['status'] === 'closed'));

  echo $twig->render('dashboard.html.twig', [
    'page' => 'dashboard',
    'title' => 'Dashboard - Ticket App',
    'openCount' => $openCount,
    'progressCount' => $progressCount,
    'closedCount' => $closedCount,
    'tickets' => $tickets,
    'session' => $_SESSION['ticketapp_session'],
  ]);
  exit;
}

// ✅ Tickets page
if ($page === 'tickets') {
  echo $twig->render('tickets.html.twig', [
    'page' => 'tickets',
    'title' => 'Tickets - Ticket App',
    'tickets' => $tickets,
    'editTicket' => $_SESSION['editTicket'] ?? null,
    'message' => $_SESSION['flash_message'] ?? null,
    'error' => $_SESSION['flash_error'] ?? null,
    'session' => $_SESSION['ticketapp_session'],
  ]);
  unset($_SESSION['flash_message'], $_SESSION['flash_error'], $_SESSION['editTicket']);
  exit;
}

// ✅ Default landing
echo $twig->render('landing.html.twig', [
  'page' => 'landing',
  'title' => 'Welcome - Ticket App',
  'session' => $_SESSION['ticketapp_session'],
]);
