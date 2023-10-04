/* 2. Validación de Formularios:
Implementar la validación de formularios en las páginas Login.html (Página de Inicio de Sesión)
y Logup.html (Página de Registro) en este caso, la validación refiérase a que se llenen los 
campos del formulario.
✔Validar que los campos obligatorios estén completos.
✔Validar que el correo electrónico tenga un formato válido.
✔Validar que las contraseñas tengan mas de 8 caracteres.
✔Mostrar mensajes de error adecuados cuando se ingresen datos incorrectos en los formularios. */


// Ivalidamos el envío de formulario en caso de que haya campos que no cumplen
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')
  const email = document.getElementById('email')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      //Email Validation
      let emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      if (!emailRegex.test(email.value)) {
        email.setCustomValidity("Por favor ingrese un email válido");
        event.preventDefault()
        event.stopPropagation()
      } else {
        email.setCustomValidity("");
        email.classList.add('is-valid');
      }

      form.classList.add('was-validated')
    }, false)
  })

})()