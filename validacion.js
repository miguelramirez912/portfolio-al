//Haz tú validación en javascript acá
const inputs = document.querySelectorAll(".formcontato__input, .formcontato__textarea");
const buttonForm = document.querySelector(".formcontato__botao");
const form = document.querySelector(".formcontato__form");

console.log(inputs);
form.reset();
buttonForm.disabled = true;


const valida = (input) => {
    console.log(input);

    const inputType = input.dataset.type;
    console.log(inputType);
    // console.log(input.validity);
    if(input.validity.valid){
        console.log("datos validos");
        input.classList.remove("formcontato__input--invalid");
        input.parentElement.parentElement.querySelector(".formcontato__input--error").innerText = "";
    } else {
        console.log("Datos invalidos");
        input.classList.add("formcontato__input--invalid");
        input.parentElement.parentElement.querySelector(".formcontato__input--error").innerText = showMessageError(inputType, input);
    }

}


form.addEventListener('change', () => {
    console.log("Evento change de form");
    buttonForm.disabled = !form.checkValidity();
});

const sendEmail = () => {
    buttonForm.innerText = "Enviando...."
    fetch("https://formsubmit.co/ajax/migkeane28@gmail.com", {
    method: "POST",
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        name: inputs[0].value,
        email: inputs[1].value,
        subject: inputs[2].value,
        message: inputs[3].value
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        buttonForm.innerHTML = "Mensaje Enviado";
        form.reset();
    })
    .catch(error => console.log(error));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("listo para enviar...");
    sendEmail();
})



// Anki
inputs.forEach( input => {
    input.addEventListener('blur', (e) => {
        valida(e.target);
    });
});

const showMessageError = (inputType, input) => {
    let message = "";
    errorTypes.forEach( error => {
        if(input.validity[error]){
            message = errorMessages[inputType][error];
        };
    });
    return message;
};

const errorTypes = [
    "valueMissing",
    "tooLong",
    "patternMismatch"
]

const errorMessages = {
    name: {
        valueMissing: "Campo Nombre no debe estar en blanco o vacío.",
        tooLong: "Debe contener máximo 50 caracteres."
    },
    email: {
        valueMissing: "Campo e-mail no debe estar en blanco o vacío.",
        patternMismatch: "Deber estar en formato e-mail conteniendo el caracter especial @ seguido de un dominio o proveedor seguido de un punto(.) Ejemplo: texto@texto.com"
    },
    subject: {
        valueMissing: "Campo Asunto no debe estar en blanco o vacío.",
        tooLong: "Debe contener máximo 50 caracteres."
    },
    message: {
        valueMissing: "Campo Mensaje no debe estar en blanco o vacío.",
        tooLong: "Debe contener máximo 300 caracteres."
    }
}