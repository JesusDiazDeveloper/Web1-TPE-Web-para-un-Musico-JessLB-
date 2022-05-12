
let captcha = document.querySelector("#captcha");
let botonRecargar = document.querySelector("#botonRecargar");
let botonChequear = document.querySelector("#botonChequear");
let IngreseTextoDeLaImagen = document.querySelector ("#IngreseTextoDeLaImagen");
let resultadoDelCaptcha = document.querySelector ("#resultadoDelCaptcha");
let caracteres = "0ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";
let botonEnviar = document.querySelector("#btn-enviar");
 
botonRecargar.addEventListener("click",captchaAleatorioBotonRefresh);
botonChequear.addEventListener("click",validacion);

for (i=0 ; i<6 ; i++){
    captcha.innerHTML += caracteres.charAt(Math.floor( Math.random() * caracteres.length +1));
}

function captchaAleatorioBotonRefresh () {
    captcha.innerHTML = "";
    captchaAleatorio ();
}

function captchaAleatorio () {
    for (i=0 ; i<6 ; i++){
        captcha.innerHTML += caracteres.charAt(Math.floor(Math.random() * caracteres.length + 1));
    }
   
}

function validacion (){
    console.log ("la validacion funciona.");
    let valorDelInput = IngreseTextoDeLaImagen.value
 
    if(valorDelInput == captcha.innerHTML){
        resultadoDelCaptcha.classList.remove("valorIncorrecto");
        resultadoDelCaptcha.classList.add("valorCorrecto");
        resultadoDelCaptcha.innerText = "El valor ingresado es correcto.";
        botonEnviar.classList.remove("oculto");
        console.log ("El if funciona")
    }
    else{
        resultadoDelCaptcha.classList.add("valorIncorrecto");
        resultadoDelCaptcha.innerText = "El valor ingresado es incorrecto, intentelo otra vez.";
        captcha.innerHTML = ""; // Con esto, sin espacio ni nada, hago que el innerHTML quede vacio, 
                                // listo para ser utilizado.
        botonEnviar.classList.add("oculto");
        console.log ("el else funciona");
        captchaAleatorio();
    }
}
