import Card from "../ui/Card";
import classes from "./FoodItem.module.css";
import { useRouter } from "next/router";
import React from "react";

const FoodItem = (props: any) => {
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push(`/foods/${props.id}`);
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <address>{props.id}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
};

export default FoodItem;
