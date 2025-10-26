<?php
session_start();
require_once __DIR__ . '/vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/templates');
$twig = new \Twig\Environment($loader);

$action = $_GET['action'] ?? '';
$usersFile = __DIR__ . '/data/users.json';
$users = file_exists($usersFile) ? json_decode(file_get_contents($usersFile), true) : [];

$error = null;

// --- HANDLE SIGNUP ---
if ($action === 'signup' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($username) || empty($password)) {
        $error = "All fields are required.";
    } elseif (isset($users[$username])) {
        $error = "Username already exists.";
    } else {
        $users[$username] = password_hash($password, PASSWORD_DEFAULT);
        file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
        header('Location: auth.php?action=login&registered=1');
        exit;
    }

    echo $twig->render('signup.html.twig', ['error' => $error]);
    exit;
}

// --- HANDLE LOGIN ---
if ($action === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($username) || empty($password)) {
        $error = "Please enter both username and password.";
    } elseif (!isset($users[$username]) || !password_verify($password, $users[$username])) {
        $error = "Invalid username or password.";
    } else {
        $_SESSION['ticketapp_session'] = ['username' => $username];
        header('Location: index.php?page=dashboard');
        exit;
    }

    echo $twig->render('login.html.twig', ['error' => $error]);
    exit;
}

// --- LOGOUT ---
if ($action === 'logout') {
    session_destroy();
    header('Location: auth.php?action=login');
    exit;
}

// --- PAGE ROUTING ---
if ($action === 'signup') {
    echo $twig->render('signup.html.twig', ['error' => $error]);
} else {
    echo $twig->render('login.html.twig', ['error' => $error]);
}
