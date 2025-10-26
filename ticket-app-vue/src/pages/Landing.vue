<template>
  <main class="relative min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-between overflow-hidden">
    <section class="relative flex flex-col items-center text-center py-24 px-6 max-w-1440 mx-auto">
      <div class="absolute -top-20 -left-20 w-64 h-64 bg-blue-300 rounded-full opacity-30 blur-3xl"></div>

      <h1 class="text-4xl md:text-6xl font-bold text-blue-700 mb-4">TicketFlow</h1>
      <p class="text-lg md:text-xl text-gray-600 max-w-xl mb-8">
        Seamlessly manage, track, and resolve your support tickets — all in one smart workspace.
      </p>

      <div class="flex flex-wrap gap-4 justify-center">
        <RouterLink to="/auth/login" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition">Login</RouterLink>
        <RouterLink to="/auth/signup" class="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl shadow transition">Get Started</RouterLink>
      </div>
    </section>

    <img src="/shared-assets/wave.svg" alt="" class="absolute bottom-0 left-0 w-full select-none pointer-events-none" />

    <footer class="relative z-10 bg-blue-900 text-white py-6 text-center text-sm">
      © {{ new Date().getFullYear() }} TicketFlow. All rights reserved.
    </footer>
  </main>
</template>
