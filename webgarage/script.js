document.addEventListener("DOMContentLoaded", function () {

    const menuButton = document.getElementById("menuButton");
    const navMenu = document.querySelector(".nav-menu");

    const notification = document.getElementById("notification");
    const notificationText =
        document.getElementById("notificationText");

    const closeNotification =
        document.getElementById("closeNotification");

    const contactButton =
        document.getElementById("contactButton");

    const serviceButtons =
        document.querySelectorAll(".service-button");

    const year =
        document.getElementById("year");


    /* TAHUN FOOTER */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* MENU MOBILE */

    if (menuButton && navMenu) {

        menuButton.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });

        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
            });

        });
    }


    /* NOTIFICATION */

    function showNotification(message) {

        if (!notification || !notificationText) {
            return;
        }

        notificationText.textContent = message;

        notification.classList.add("show");

        setTimeout(function () {
            notification.classList.remove("show");
        }, 4000);
    }


    /* TOMBOL LAYANAN */

    serviceButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const service =
                button.getAttribute("data-service");

            showNotification(
                "Layanan " +
                service +
                " dipilih."
            );

        });

    });


    /* TOMBOL KONTAK */

    if (contactButton) {

        contactButton.addEventListener("click", function () {

            showNotification(
                "Silakan tambahkan informasi kontak WebGarage."
            );

        });

    }


    /* TUTUP NOTIFIKASI */

    if (closeNotification) {

        closeNotification.addEventListener(
            "click",
            function () {

                notification.classList.remove("show");

            }
        );

    }

});
