$(document).ready(function($) {
    /*====================================
    =            Slider start            =
    ====================================*/
    function slider() {
        var numeroSlides = $('#carousel-container ul li').length;
        var larguraSlide = $('#carousel-container ul li').width();
        var alturaSlide = $('#carousel-container ul li').height();
        // Largura total do container
        var larguraContainer = (numeroSlides / 2) * larguraSlide;

        var larguraContainerTotal = numeroSlides * larguraSlide;

        // Atribui largura total de 2 'lis'
        $('#carousel-container').css({
            width: 'auto',
            height: alturaSlide
        });

        // Atribui largura total baseada no 'numeroSlides' ao container filho dos slides
        $('#carousel-container ul').css({
            width: larguraContainerTotal,
            height: alturaSlide
        });

        // Função para avançar o slide
        var next = function() {
            $('#carousel-container ul').animate({
                    left: +larguraContainer
                },
                200,
                function() {
                    $('#carousel-container ul li:nth-of-type(1), #carousel-container ul li:nth-of-type(2)').appendTo('#carousel-container ul');
                    $('#carousel-container ul').css('left', '');
                });
        }

        // Função para dar prev no slide
        var prev = function() {
            $('#carousel-container ul').animate({
                    right: -larguraContainer
                },
                200,
                function() {
                    $('#carousel-container ul li:nth-of-type(1), #carousel-container ul li:nth-of-type(2)').appendTo('#carousel-container ul');
                    $('#carousel-container ul').css('right', '');
                });
        }

        // Chama a função de Next no click da seta
        $('#next').on('click', function(event) {
            event.preventDefault();
            next();
        });

        // Chama a função de Prev no click da seta
        $('#prev').on('click', function(event) {
            event.preventDefault();
            prev();
        });
    }

    slider();
    /*=====  End of Slider  ======*/

    /*=============================================
    =            Favorite btn Function            =
    =============================================*/

    $('.favorite-btn').on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $(this).toggleClass('favorited');
    });
    /*=====  End of Favorite btn function  ======*/


    /*=====================================
    =            View selector            =
    =====================================*/
    $('.tab-selector__container ul li').on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        if ($(this).children().attr('id') === 'view-galeria') {
            $('.item').addClass('gallery')
        } else {
            $('.item').removeClass('gallery')
        }

        $('.tab-selector__container ul li').removeClass('active');
        $(this).addClass('active');
    });
    /*=====  End of view Selector  ======*/

    /*=========================================
    =            Menu Mob funcions            =
    =========================================*/

    $('.mob-menu').on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $(this).toggleClass('active')
    });

    /*=====  End of Menu Mob funcions    ======*/
});
