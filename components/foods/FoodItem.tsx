import Card from "../ui/Card";
import classes from "./FoodItem.module.css";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";

const FoodItem = (props: any) => {
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push(`/foods/${props.id}`);
  };

  return (
    <li className={classes.item}>
      <div className={classes.content}>
        <h3>{props.name}</h3>
      </div>
      <div className={classes.actions}>
        <button onClick={showDetailsHandler}>Show Details</button>
      </div>
    </li>
  );
};

export default FoodItem;
