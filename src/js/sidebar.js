const sidebar = document.getElementById('sidebar');
const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    sidebar.classList.remove('-translate-x-full');
    sidebarOverlay.classList.remove('hidden');
}
function closeSidebar() {
    sidebar.classList.add('-translate-x-full');
    sidebarOverlay.classList.add('hidden');
}

sidebarToggleBtn.addEventListener('click', openSidebar);
sidebarCloseBtn.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);