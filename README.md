# libMessageOnMousePoint
Mensajes de alerta sobre la posición del cursor del mouse

Depdendencias: Jquery & Boostrap

Ejemplo de implementacion

View

<message-box></message-box>

Script

messageOnMouse.showMessage('success', 'success operation', callback, true, 2000);

Parametros:
type: string - tipo de mensaje recibe los siguientes tipos 'success' || 'info' || 'warning' || 'alert'
template: string - Template del contenido del mensaje
callbackClose: function - Metodo a ejecutar al cerrar el mensaje
btnClose: boolean - Mostrar u ocultar el boton de cerrar el mensaje
timeout: Number - Tiempo de duracion visible del mensaje
