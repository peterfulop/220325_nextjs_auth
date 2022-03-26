import AlertMessage from "../utils/alertMessage.type";

const AlertBox = (props: {
  details: AlertMessage | undefined;
}): JSX.Element => {
  return (
    <div
      className={`alert alert-${props.details?.color} alert-dismissible fade show`}
      role="alert"
    >
      <strong>{props.details?.title}</strong>
      {props.details?.message}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default AlertBox;
