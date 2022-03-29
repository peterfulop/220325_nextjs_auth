import { ReactNode } from "react";
import classes from "./Card.module.css";

function Card(props: { className?: string; children: ReactNode }) {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
}

export default Card;
