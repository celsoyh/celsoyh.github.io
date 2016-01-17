$(document).ready(function() {

    var owl = $("#owl-demo");

    owl.owlCarousel({
        items: 4, //10 items above 1000px browser width
        itemsDesktop: [1000, 5], //5 items between 1000px and 901px
        itemsDesktopSmall: [900, 3], // 3 items betweem 900px and 601px
        itemsTablet: [600, 2], //2 items between 600 and 0;
        itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
    });

    // Custom Navigation Events
    $(".next").click(function() {
        owl.trigger('owl.next');
    })
    $(".prev").click(function() {
        owl.trigger('owl.prev');
    })
    $(".play").click(function() {
        owl.trigger('owl.play', 1000);
    })
    $(".stop").click(function() {
        owl.trigger('owl.stop');
    })
});

//CONFIGURANDO A CAMERA
Webcam.set({
    width: 595,
    height: 366,
    image_format: 'jpeg',
    jpeg_quality: 100,
    dest_width: 595,
    dest_height: 366
});

Webcam.attach('#my_camera');

//FUNÇÃO QUE GERAR A IMAGEM
function take_snapshot() {
    // take snapshot and get image data
    Webcam.snap(function(data_uri) {
        // display results in page
        document.getElementById('results').innerHTML =
            '<img src="' + data_uri + '"/> ';
    });

    // document.getElementById("cam").style.display = "none";

    // $('#fotoPerfil, #my_camera, #cam').hide();

    // $('#fotoPerfil, #my_camera, #cam').show();

    Webcam.reset();
}

$(document).ready(function() {
    var $draggable = $('.oculos').draggabilly({});

    $('#my_camera video').attr('poster', 'imagens/foto-padrao.jpg');
});


interact('.oculos img')
    .draggable({
        onmove: window.dragMoveListener
    })

.resizable({
        preserveAspectRatio: true,
        edges: {
            left: true,
            right: true,
            bottom: true,
            top: true
        }
    })
    .on('resizemove', function(event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        // target.setAttribute('data-x', x);
        // target.setAttribute('data-y', y);
        $(target).children('img').css({
            width: target.style.width,
            height: target.style.height,
            border: '1px solid black'
        });
    })

$("input").change(function(e) {

    for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {

        var file = e.originalEvent.srcElement.files[i];

        var reader = new FileReader();
        reader.onloadend = function() {
            $('#fotoPerfil').attr({
                'src': reader.result,
                'width': '100%',
                'height': 'auto'
            });
        }
        reader.readAsDataURL(file);
    }

    $('#my_camera').hide();
});
