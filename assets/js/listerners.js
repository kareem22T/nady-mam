$(document).ready(function () {
    $(document).on("click", ".hide-content", function (e) {
        e.preventDefault()
        $(".login-popup").fadeOut()
    $(".booking-popup").fadeOut()

        $(".register-popup").fadeOut()
            $("nav, .hide-content").addClass("animate__slideOutRight").fadeOut()
            $("nav, .hide-content").removeClass("animate__slideInRight")
    })
    $(".show-menu").on("click", function (e) {
        e.preventDefault()
        $(".login-popup").fadeOut()
        $(".register-popup").fadeOut()
        $("nav, .hide-content").addClass("animate__slideInRight").fadeIn()
        $("nav, .hide-content").removeClass("animate__slideOutRight")
    })
});
$(document).on("click", ".login", function () {
    $(".login-popup").fadeIn()
    $(".hide-content").fadeIn()
})
$(document).on("click", ".register", function () {
    $(".register-popup").fadeIn()
    $(".hide-content").fadeIn()
})

$(document).on("click", ".comfirm-booking", function () {
    $(".booking-popup").fadeIn()
    $(".hide-content").fadeIn()
})
$(document).on("click", ".book", function () {
    $(".success-booking-popup").fadeIn()
    $(".booking-popup").fadeOut()
    $(".hide-content").fadeIn()
})
$(document).on("click", ".close-success", function () {
    $(".success-booking-popup").fadeOut()
    $(".booking-popup").fadeOut()
    $(".hide-content").fadeOut()
})

