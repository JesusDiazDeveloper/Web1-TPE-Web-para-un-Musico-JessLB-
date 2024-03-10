"use strict";
document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina (){

    
/*menu responsive*/
    document.querySelector(".botonMenu").addEventListener("click", toggleMenu);
    
    function toggleMenu() {
        document.querySelector("nav").classList.toggle("show");
    } 

/*Captcha*/ 
    let captcha = document.querySelector("#captcha");
    let botonRecargar = document.querySelector("#botonRecargar");
    let botonChequear = document.querySelector("#botonChequear");
    let IngreseTextoDeLaImagen = document.querySelector ("#IngreseTextoDeLaImagen");
    let resultadoDelCaptcha = document.querySelector ("#resultadoDelCaptcha");
    let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";
    let botonEnviar = document.querySelector("#btn-enviar");
    
    botonRecargar.addEventListener("click",captchaAleatorioBotonRefresh);
    botonChequear.addEventListener("click",validacion);

    function captchaAleatorio () {
        for (let i=0 ; i<6 ; i++){
            captcha.innerHTML += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
    }
    
    
    function captchaAleatorioBotonRefresh () {
        captcha.innerHTML = "";
        captchaAleatorio ();
    }
    
    
    function validacion (){
        let valorDelInput = IngreseTextoDeLaImagen.value
        
        if(valorDelInput == captcha.innerHTML){
            resultadoDelCaptcha.classList.remove("valorIncorrecto");
            resultadoDelCaptcha.classList.add("valorCorrecto");
            resultadoDelCaptcha.innerText = "El valor ingresado es correcto.";
            botonEnviar.classList.remove("oculto");
        }
        else{
            resultadoDelCaptcha.classList.add("valorIncorrecto");
            resultadoDelCaptcha.innerText = "El valor ingresado es incorrecto, intentelo otra vez.";
            captcha.innerHTML = ""; // Con esto, sin espacio ni nada, hago que el innerHTML quede vacio, 
            // listo para ser utilizado.
            botonEnviar.classList.add("oculto");
            captchaAleatorio();
        }
    }
    
    captchaAleatorio(); // esto sirve para la primera carga, sin que el usuario haga nada. 

}