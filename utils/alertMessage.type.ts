import AlertColors from "./alertColors.enum";
type AlertMessage = {
  color: AlertColors;
  title: string;
  message: string;
};

export default AlertMessage;
