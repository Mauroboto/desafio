// Importamos la librería JWT
const jwt = require('jsonwebtoken');

// Creamos un objeto usuario con nombre de usuario y contraseña
const usuario = {
  nombreUsuario: 'ejemplo',
  contrasena: 'contraseña123'
};

// Función para autenticar al usuario
function autenticarUsuario(nombreUsuario, contrasena) {
  // Verificamos si el nombre de usuario y la contraseña coinciden
  if (nombreUsuario === usuario.nombreUsuario && contrasena === usuario.contrasena) {
    console.log('Autenticación exitosa');

    // Creamos un token JWT y lo almacenamos en una cookie
    const token = jwt.sign({ nombreUsuario }, 'secreto');
    document.cookie = `jwt=${token}; path=/`;

    // Almacenamos el token y los datos del usuario en local storage
    localStorage.setItem('jwt', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  } else {
    console.log('Nombre de usuario o contraseña incorrectos');
  }
}

// Función para obtener el usuario actual
function obtenerUsuarioActual() {
  // Obtenemos el token JWT de la cookie
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0] === 'jwt') {
      const token = cookie[1];

      // Verificamos el token y obtenemos los datos del usuario
      try {
        const decoded = jwt.verify(token, 'secreto');
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (usuario && decoded.nombreUsuario === usuario.nombreUsuario) {
          return usuario;
        }
      } catch (err) {
        console.log('Token inválido');
      }
    }
  }

  return null;
}

// Llamamos a la función de autenticación con los datos del usuario
autenticarUsuario('ejemplo', 'contraseña123');

// Obtenemos el usuario actual
const usuarioActual = obtenerUsuarioActual();
console.log(usuarioActual);
