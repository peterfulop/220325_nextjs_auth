import classes from "./FoodItem.module.css";
import { useRouter } from "next/router";
import React from "react";
import Button from "@mui/material/Button";

const FoodItem = (props: any) => {
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push(`/foods/${props.id}`);
  };

  return (
    <li className={classes.item}>
      <div className={classes.content}>
        <h2>{props.name}</h2>
      </div>
      <div className={classes.actions}>
        <Button variant="contained" color="info" onClick={showDetailsHandler}>
          Show Details
        </Button>
      </div>
    </li>
  );
};

export default FoodItem;
