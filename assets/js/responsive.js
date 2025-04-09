document.addEventListener("DOMContentLoaded", function() {
    // Toggle sidebar on mobile
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('hidden');
      });
    }
    
    // Close sidebar when clicking on a link (mobile)
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth < 768) { // md breakpoint in Tailwind
          sidebar.classList.add('hidden');
        }
      });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) { // md breakpoint in Tailwind
        sidebar.classList.remove('hidden');
      }
    });
  });