<?php
session_start();

error_log("🚀 tickets.php started, checking session...");


// ✅ Protect page
if (!isset($_SESSION['ticketapp_session'])) {
  header('Location: auth.php?action=login');
  exit;
}
error_log("✅ Session confirmed. Continuing...");


$ticketsFile = __DIR__ . '/data/tickets.json';
$tickets = file_exists($ticketsFile)
  ? json_decode(file_get_contents($ticketsFile), true)
  : [];

$action = $_GET['action'] ?? null;

// ---------- CREATE / UPDATE ----------
if ($action === 'save' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    error_log("💾 Save action triggered");

  $title = trim($_POST['title'] ?? '');
  $status = trim($_POST['status'] ?? '');
  $description = trim($_POST['description'] ?? '');
  $id = $_POST['id'] ?? null;

  if (empty($title) || empty($status)) {
    $_SESSION['flash_error'] = "Both Title and Status are required.";
  } elseif (!in_array($status, ['open', 'in_progress', 'closed'])) {
    $_SESSION['flash_error'] = "Invalid status selected.";
  } else {
    if ($id) {
      foreach ($tickets as &$t) {
        if ($t['id'] == $id) {
          $t['title'] = $title;
          $t['status'] = $status;
          $t['description'] = $description;
        }
      }
      unset($t);
      $_SESSION['flash_message'] = "Ticket updated successfully!";
    } else {
      $tickets[] = [
        'id' => time(),
        'title' => $title,
        'status' => $status,
        'description' => $description,
      ];
      $_SESSION['flash_message'] = "Ticket created successfully!";
    }

    file_put_contents($ticketsFile, json_encode($tickets, JSON_PRETTY_PRINT));
  }

  error_log("🎯 Redirecting now...");

  header('Location: /index.php?page=tickets');
  exit;

}

// ---------- DELETE ----------
if ($action === 'delete' && isset($_GET['id'])) {
  $id = $_GET['id'];
  $tickets = array_filter($tickets, fn($t) => $t['id'] != $id);
  file_put_contents($ticketsFile, json_encode(array_values($tickets), JSON_PRETTY_PRINT));

  $_SESSION['flash_message'] = "Ticket deleted successfully!";
  header('Location: /index.php?page=tickets');
  exit;
  
}

// ---------- EDIT ----------
if ($action === 'edit' && isset($_GET['id'])) {
  $id = $_GET['id'];
  $editTicket = null;

  foreach ($tickets as $t) {
    if ($t['id'] == $id) {
      $editTicket = $t;
      break;
    }
  }

  // ✅ Pass ticket to form by redirecting with query param
  $_SESSION['editTicket'] = $editTicket;
  header('Location: /index.php?page=tickets');
  exit;
  
}

error_log("🎯 Redirecting to tickets page...");
