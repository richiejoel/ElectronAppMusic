import { toast } from "react-toastify";

export default function alertsErrors(type) {
  switch (type) {
    case "auth/wrong-password":
      toast.warning("La contraseña introducida no es correcta");
      break;
    case "auth/email-already-in-use":
      toast.warning("El email elegido ya está en uso.");
      break;
    case "auth/network-request-failed":
      toast.warning("Solicitud de red fallida. Revise su conexión a internet.");
      break;
    case "auth/too-many-requests":
      toast.warning(
        "Has enviado demasiadas solicitudes de reenvio de email de confirmación en muy poco tiempo"
      );
      break;
    case "auth/user-not-found":
      toast.warning("El usuario ingresado es incorrecto.");
      break;
    default:
      toast.warning("Error del servidor, inténtelo más tarde");
      break;
  }
}
