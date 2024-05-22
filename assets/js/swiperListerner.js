var swiper = new Swiper(".secSwiper", {
    slidesPerView: 1,
    spaceBetween: 40,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        550: {
        slidesPerView: 2,
        spaceBetween: 30,
        },
        767: {
        slidesPerView: 3,
        spaceBetween: 30,
        },
        992: {
        slidesPerView: 4,
        spaceBetween: 20,
        },
},
});

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 40,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        550: {
        slidesPerView: 2,
        spaceBetween: 30,
        },
        767: {
        slidesPerView: 3,
        spaceBetween: 30,
        },
        992: {
        slidesPerView: 4,
        spaceBetween: 30,
        },
        1199: {
        slidesPerView: 5,
        spaceBetween: 20,
        },
},
});
