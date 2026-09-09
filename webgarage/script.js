document.addEventListener("DOMContentLoaded", function () {

    const menuButton =
        document.getElementById("menuButton");

    const navigation =
        document.getElementById("navigation");

    const serviceButtons =
        document.querySelectorAll(".service-button");

    const contactButton =
        document.getElementById("contactButton");

    const notification =
        document.getElementById("notification");

    const notificationText =
        document.getElementById("notificationText");

    const closeNotification =
        document.getElementById("closeNotification");

    const year =
        document.getElementById("year");


    /* TAHUN */

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* MENU */

    if (menuButton && navigation) {

        menuButton.addEventListener(
            "click",
            function () {

                navigation.classList.toggle("active");

            }
        );


        navigation
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navigation.classList.remove(
                            "active"
                        );

                    }
                );

            });

    }


    /* NOTIFICATION */

    function showNotification(message) {

        if (!notification ||
            !notificationText) {
            return;
        }

        notificationText.textContent =
            message;

        notification.classList.add("show");


        setTimeout(function () {

            notification.classList.remove(
                "show"
            );

        }, 3500);

    }


    /* LAYANAN */

    serviceButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const service =
                        button.getAttribute(
                            "data-service"
                        );

                    showNotification(
                        "Anda memilih layanan: " +
                        service
                    );

                }
            );

        }
    );


    /* KONTAK */

    if (contactButton) {

        contactButton.addEventListener(
            "click",
            function () {

                showNotification(
                    "Silakan tambahkan nomor WhatsApp atau informasi kontak Anda pada script.js."
                );

            }
        );

    }


    /* CLOSE NOTIFICATION */

    if (closeNotification) {

        closeNotification.addEventListener(
            "click",
            function () {

                notification.classList.remove(
                    "show"
                );

            }
        );

    }

});
