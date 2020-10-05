//constantes de animación, corta y larga
const T_ANIM_MIN=200;
const T_ANIM_MAX=500;
const T_ESPERA=1000;

//Anchuras
var anchoMenu=40;

var menuAbierto=false;

/**
 * Función añadida a jQuery para rotar elementos (propiedad CSS rotate)
 * @param angulo Ángulo de rotación en Grados
 * @param duracion Duración de la rotación (ms)
 * @param completo Función que se invoca cuando finaliza la rotación
 * @returns {*}
 */
$.fn.animRotar=function(angulo, duracion,completo) {
    return this.each(function(){
        var $elem=$(this);

        $({deg: 0}).animate({deg: angulo}, {
            duration: duracion,
            step: function(now) {
                $elem.css({
                    "-moz-transform": 'rotate(' + now + 'deg)',
                    "-ms-transform": 'rotate(' + now + 'deg)',
                    transform: 'rotate(' + now + 'deg)'
                });
            },
            complete:completo || $.noop
        });
    });
};

function cerrarMenu(){
    menuAbierto=false;
    var cssCuerpo={left:"0",right:"0"};
    var leftMenu={left:"-"+anchoMenu+"px"};
    $("#franja1").animRotar("0",T_ANIM_MIN)
        .animate({"top":"0"},T_ANIM_MIN);
    $("#franja2").show(T_ANIM_MIN);
    $("#franja3").animRotar("0",T_ANIM_MIN)
        .animate({"top":"66%"},T_ANIM_MIN);
    $("#barraSocial img").animRotar("-360deg",T_ANIM_MIN);
    $(".Marco-de-texto-b-sico").css({
        margin:"0 auto"
    });

    $("#cuerpo").animate(cssCuerpo,T_ANIM_MIN);
    $("header").animate(cssCuerpo,T_ANIM_MIN);
    $("nav").animate(leftMenu,T_ANIM_MIN);
}

function abrirMenu(){
    menuAbierto=true;
    var cssCuerpo={left:anchoMenu+"px"};
    var leftMenu={left:"0"};
    if($(window).width()<=870+anchoMenu){
        cssCuerpo["right"]=-anchoMenu+"px";
        $(".Marco-de-texto-b-sico").css({
            margin:0
        });
    }
    $("#franja1").animRotar("45deg",T_ANIM_MIN)
        .animate({"top":"6px"},T_ANIM_MIN);
    $("#franja2").hide(T_ANIM_MIN);
    $("#franja3").animRotar("-45deg",T_ANIM_MIN)
        .animate({"top":"6px"},T_ANIM_MIN);
    $("#barraSocial img").animRotar("360deg",T_ANIM_MIN)

    $("#cuerpo").animate(cssCuerpo,T_ANIM_MIN);
    $("header").animate(cssCuerpo,T_ANIM_MIN);
    $("nav").animate(leftMenu,T_ANIM_MIN);
}

/**
 * Código lanzado al inicio
 */
$(function(){
    //completar menu
    var titulo=$(".titulo1").text();
    var $liTitulo=null;
    var $ulTitulo=null;
    var cont=1;
    titulo=titulo.substring(titulo.indexOf("]")+2,titulo.length);
    $("nav ul:nth-of-type(2) li").each(function(i){
        var textoActual=$(this).text();
        textoActual=textoActual.substring(textoActual.indexOf(">")+2,textoActual.length);
       if(textoActual.toUpperCase()==titulo.toUpperCase()) {
           $liTitulo = $(this);
           $liTitulo.append("<ul></ul>");
           $ulTitulo=$liTitulo.find("ul"); //$liTitulo ahora representa la nueva lista
           $liTitulo.find("a").attr("href","#");
           return false; //salida del bucle each
       }
    });
    if($ulTitulo!=null) { //si realmente se ha encomntrado este título
        $("h2,.apendice").each(function (i) {
            var texto = $(this).text();
            var id = "h2"+cont;
            cont++;
            $(this).attr("id",id);
            texto = texto.substring(texto.indexOf("]") + 2, texto.length);
            $ulTitulo.append("<li><a href='#" + id + "'>&gt; " + texto + "</a></li>");
        });
    }


    //control del ancho del menú de navegación
    anchoMenu=$("nav").width();


    //rollover sociales
    $("#barraSocial a").on("mouseover",function(){
        var img=$(this).find("img");
        var imgAnt=img.attr("src");
        img.attr("src",imgAnt.substr(0,imgAnt.indexOf('.png'))+"2.png");
        img.animRotar("360deg",T_ANIM_MIN);
    }).on("mouseout",function(){
        var img=$(this).find("img");
        var imgAnt=img.attr("src");
        img.attr("src",imgAnt.substr(0,imgAnt.indexOf('.png')-1)+".png");
    });

    //Manejo del menú lateral
    $("nav>ul>li>a").on("click",function(){
        var $parent=$(this).parent();
        //ocultar otros menús abiertos
        $("nav>ul>li>ul").hide(T_ANIM_MIN);
        $("nav>ul>li>a").each(function(i){
            $(this).text(">"+$(this).text().substr(1));
        });
        //abrir este submenú si es el caso
        if($(this).parent().html().indexOf("<li")!=-1) {
            $(this).parent().find("ul").show(T_ANIM_MIN);
            var texto=$(this).text();
            if($(this).text().substr(0,1)==">")
                $(this).html("&#709;" + texto.substr(1));
            else
                $(this).html(">" + texto.substr(1));
        }
    });

    // scroll automático desde los menús internos
    $('a[href^="#"]').on('click',function (e) {
        if($(this).attr("href").length>1) {
            e.preventDefault();
            auxScroll=$(this).attr("href");
            //scroll
            $("#cuerpo")
                .stop()
                .scrollTo($(this).attr("href"),
                    T_ANIM_MAX, {
                        easing: 'easeInOutCubic'
                    }
                );
            //colocar URl en la barra de direcciones
            /*window.history.replaceState("","titulo",
             $(this).attr("href").replace("#","/")
             );*/

            /*
             /menuActual = menu.indexOf($(this).attr("href"));
            //borrado de las marcas anteriores
            $("nav a").css("background-color","transparent");
            //marcado en el menú de la sección actual
            $(this).css("background-color","rgba(255,255,255,.2)");*/
        }
    });

    //formulario de envío de Mail
    $("#cerrarMail").on("click",function(e) {
        $("#mail").fadeOut(1000);
    }).on("mouseover",function(e){
        $("#formularioMail").css({opacity:.5});
    }).on("mouseout",function(e){
        $("#formularioMail").css({opacity:1});
    });



    $(".enlaceMail").on("click",function(e){
        $("#mail").fadeIn({
            duration:1000,
            start:function(a){
                $(this).css({
                    "display":"flex"
                })
            }
        });
    });
    //lanzamiento de datos al servidor PHP
    $("#formMail").on("submit",function(e){
        e.preventDefault();
        $.post("/enviarMail.php", {
            nombre: $("#nombre").val(),
            email: $("#email").val(),
            asunto: $("#asunto").val(),
            contenido: $("#contenido").val(),
        }).done(function (data) {
            if(data=="OK") {
                $("#mensajeCorrecto").css({"display": "block"});
                $("#botonCorrecto").before("<p>Mensaje envíado</p>");
            }
            else{
                $("#mensajeError").css({"display": "block"});
                $("#botonError").before("<p>Fallo en el envío del mensaje</p>");
            }
        });
        $("#mail").fadeOut({
            duration:1000,
            start:function(a){
                $(this).css({
                    "display":"flex"
                })
            }
        });
    });

    //botón de cierre de menú
    $("#btMenu").on("click",function(){
        var cssCuerpo={};
        var leftMenu={};
        if($("nav").css("left")=="0px"){
            cerrarMenu();
        }
        else {
            abrirMenu();
        }


    }).on("mouseover",function(){
        $(".franja").css("background-color","white");
    }).on("mouseout",function(){
        $(".franja").css("background-color","gray");
    });

    //recarga de las capas
    $(window).resize(function(){
        var leftCuerpo={};
        anchoMenu=$("nav").width();
        if($("nav").css("left")=="0px"){
            //menú abierto
            leftCuerpo={left:anchoMenu+"px"};
        }
        else {
            //menú cerrado
            leftCuerpo={left:"0"};
            $("nav").css({"left":-anchoMenu+"px"});
        }
        $("#cuerpo").css(leftCuerpo,T_ANIM_MIN);
        $("header").css(leftCuerpo,T_ANIM_MIN);
    });

    $("#cuerpo").on("click",function(){
        if(menuAbierto) cerrarMenu();
    });

    //clicks iniciales de apertura del menú
    abrirMenu();
    $("#cuerpo").css({left:anchoMenu+"px"},T_ANIM_MIN);
    $liTitulo.find("a").trigger("click");
    $("#cuerpo").scrollTo(0,0);
    /*setTimeout(function() {
        cerrarMenu();
    },T_ESPERA);*/
});
