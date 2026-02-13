// Variables
const formulario = document.querySelector('#formularioMolon')

const inputNombre = document.querySelector('#nombre')
const inputCorreo = document.querySelector('#correo')
const inputEdad = document.querySelector('#edad')
const inputFecha = document.querySelector('#fecha')
const selectNivel = document.querySelector('#nivel')
const checkCondiciones = document.querySelector('#condiciones')

const errorNombre = document.getElementById('errorNombre')
const errorCorreo = document.getElementById('errorCorreo')
const errorEdad = document.getElementById('errorEdad')
const errorFecha = document.getElementById('errorFecha')
const errorNivel = document.getElementById('errorNivel')
const errorCondiciones = document.getElementById('errorCondiciones')

const mensajes = document.querySelector('#mensajes')


// Mensajes generales
function limpiarMensajes() {
    mensajes.textContent = ''
    mensajes.className = 'mensajes'
}

function mostrarMensaje(texto, tipo) {
    limpiarMensajes()
    mensajes.textContent = texto
    mensajes.classList.add(tipo)
}


// Marcar errores
function marcarError(campo, contenedor, texto) {
    campo.classList.remove('input-ok')
    campo.classList.add('input-error')
    contenedor.textContent = texto
}

function marcarOK(campo, contenedor) {
    campo.classList.remove('input-error')
    campo.classList.add('input-ok')
    contenedor.textContent = ''
}


// Validación HTML5 base
function validarHTML(campo, contenedor) {

    if (campo.checkValidity()) {
        marcarOK(campo, contenedor)
        return true
    }

    let mensaje = 'Valor no válido'

    if (campo.validity.valueMissing)
        mensaje = 'Este campo es obligatorio'
    else if (campo.validity.typeMismatch)
        mensaje = 'Formato incorrecto'
    else if (campo.validity.rangeUnderflow)
        mensaje = 'Edad mínima 18'
    else if (campo.validity.rangeOverflow)
        mensaje = 'Edad demasiado alta'
    else if (campo.validity.tooShort)
        mensaje = `Mínimo ${campo.minLength} caracteres`

    marcarError(campo, contenedor, mensaje)
    return false
}


// Validación lógica extra (JS)
function validarLogica() {

    let correcto = true

    // Nombre debe tener al menos 2 palabras
    const partes = inputNombre.value.trim().split(/\s+/)

    if (partes.length < 2) {
        marcarError(inputNombre, errorNombre, 'Escribe nombre y apellidos')
        correcto = false
    }

    // Fecha no puede ser anterior a hoy
    const hoy = new Date()
    const fechaSeleccionada = new Date(inputFecha.value)

    if (fechaSeleccionada < hoy) {
        marcarError(inputFecha, errorFecha, 'La fecha no puede ser pasada')
        correcto = false
    }

    return correcto
}


// Validación completa
function validarFormulario() {

    let valido = true

    if (!validarHTML(inputNombre, errorNombre)) valido = false
    if (!validarHTML(inputCorreo, errorCorreo)) valido = false
    if (!validarHTML(inputEdad, errorEdad)) valido = false
    if (!validarHTML(inputFecha, errorFecha)) valido = false
    if (!validarHTML(selectNivel, errorNivel)) valido = false

    if (!checkCondiciones.checked) {
        errorCondiciones.textContent = 'Debes aceptar las reglas'
        valido = false
    } else {
        errorCondiciones.textContent = ''
    }

    if (!validarLogica()) valido = false

    return valido
}


// Evento submit
formulario.addEventListener('submit', function (e) {

    e.preventDefault()
    limpiarMensajes()

    if (!validarFormulario()) {
        mostrarMensaje('Hay errores en el formulario molón', 'mensaje-error')
    } else {
        mostrarMensaje('Formulario molón enviado correctamente', 'mensaje-ok')
        formulario.reset()
    }

})
