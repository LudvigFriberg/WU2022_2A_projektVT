const nav = document.getElementById('link_list')
const burger = document.getElementById('burger')
const game = document.getElementsByClassName('game_button_home')


function toggleMenu() {
    nav.classList.toggle('nav-active')
    burger.classList.toggle('crossed_line')
}

function toggle_game_button() {
    console.log("TEST")
    game.classList.toggle('game_button_active')

}
document
burger.addEventListener('click', toggleMenu) 
