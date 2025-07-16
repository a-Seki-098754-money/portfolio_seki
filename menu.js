document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu-btn");
    const menuContent = document.querySelector(".menu-content");
    let menuOpen = false;

    menuBtn.addEventListener("click", function () {
        menuOpen = !menuOpen;
        if (menuOpen) {
            menuContent.classList.add("open");
        } else {
            menuContent.classList.remove("open");
        }
    });
});

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const shadow = document.getElementById('shadow-effect');
    const posX = 50 + (x - 0.5) * 20; // 中心から ±10%
    const posY = 50 + (y - 0.5) * 20;

    shadow.style.background = `radial-gradient(circle at ${posX}% ${posY}%, transparent 50%, rgba(0, 0, 0, 0.7) 100%)`;
});

// トップに戻るボタンのスクリプト
        document.querySelector('.back-to-top').addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });



window.addEventListener( 'DOMContentLoaded', () => {
    const myVideo = document.querySelector( '#work1' );
    myVideo.addEventListener( 'canplaythrough', () => {
        myVideo.addEventListener( 'mouseenter', () => {
            myVideo.volume = 0.0;
            myVideo.play();
        } );
    } );

    myVideo.addEventListener( 'ended', () => {
        myVideo.pause();
        myVideo.currentTime = 0;
    } );

    myVideo.addEventListener( 'mouseleave', () => {
        myVideo.pause();
        myVideo.currentTime = 0;
    } );
} );

document.addEventListener("DOMContentLoaded", function () {
    const toggleLink = document.querySelector(".toggle-submenu");
    const parentLi = toggleLink.closest(".has-submenu");

    toggleLink.addEventListener("click", function (e) {
        e.preventDefault(); // aタグの遷移防止
        parentLi.classList.toggle("open");
    });
});
