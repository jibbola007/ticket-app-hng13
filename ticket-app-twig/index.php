<?php
session_start();
require_once __DIR__ . '/vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/templates');
$twig = new \Twig\Environment($loader, ['cache' => false]);

$page = $_GET['page'] ?? 'landing'; // ✅ Default to landing page

$ticketsFile = __DIR__ . '/data/tickets.json';
$tickets = file_exists($ticketsFile)
  ? json_decode(file_get_contents($ticketsFile), true)
  : [];

// 🧭 Handle form submissions (route internally)
if ($page === 'tickets' && ($_GET['action'] ?? '') === 'save' && $_SERVER['REQUEST_METHOD'] === 'POST') {
  require 'tickets.php';
  exit;
}

// ✅ Protect certain pages (dashboard, tickets)
$protectedPages = ['dashboard', 'tickets'];
if (in_array($page, $protectedPages) && !isset($_SESSION['ticketapp_session'])) {
  header('Location: ?page=login');
  exit;
}

// ✅ Dashboard
if ($page === 'dashboard') {
  $openCount = count(array_filter($tickets, fn($t) => $t['status'] === 'open'));
  $progressCount = count(array_filter($tickets, fn($t) => $t['status'] === 'in_progress'));
  $closedCount = count(array_filter($tickets, fn($t) => $t['status'] === 'closed'));

  echo $twig->render('dashboard.html.twig', [
    'page' => 'dashboard',
    'title' => 'Dashboard - TicketFlow',
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
    'title' => 'Tickets - TicketFlow',
    'tickets' => $tickets,
    'editTicket' => $_SESSION['editTicket'] ?? null,
    'message' => $_SESSION['flash_message'] ?? null,
    'error' => $_SESSION['flash_error'] ?? null,
    'session' => $_SESSION['ticketapp_session'],
  ]);
  unset($_SESSION['flash_message'], $_SESSION['flash_error'], $_SESSION['editTicket']);
  exit;
}

// ✅ Login page
if ($page === 'login') {
  echo $twig->render('login.html.twig', [
    'page' => 'login',
    'title' => 'Login - TicketFlow',
  ]);
  exit;
}

// ✅ Signup page
if ($page === 'signup') {
  echo $twig->render('signup.html.twig', [
    'page' => 'signup',
    'title' => 'Sign Up - TicketFlow',
  ]);
  exit;
}

// ✅ Default landing page
echo $twig->render('landing.html.twig', [
  'page' => 'landing',
  'title' => 'Welcome - TicketFlow',
]);
