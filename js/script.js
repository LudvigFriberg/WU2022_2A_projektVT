const nav = document.getElementById('link_list')
const burger = document.getElementById('burger')

function toggleMenu() {
    nav.classList.toggle('nav-active')
    burger.classList.toggle('crossed_line')
}

burger.addEventListener('click', toggleMenu) 