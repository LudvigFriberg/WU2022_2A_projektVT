const nav = document.getElementById('link_list')
const burger = document.getElementById('burger')
const game = document.getElementsByClassName('game_button_home')


function toggleMenu() {
    nav.classList.toggle('nav-active')
    burger.classList.toggle('crossed_line')
}


document
burger.addEventListener('click', toggleMenu) 
