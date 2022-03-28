import React from "react";
import { useRef } from "react";
import {
  FoodEntryCreateOptions,
  FoodEntryDetails,
} from "../../server/resources/food/food.interface";

import Card from "../ui/Card";
import classes from "./NewFoodForm.module.css";

const NewFoodForm = (props: any) => {
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const ingredientInputRef = React.useRef<HTMLInputElement>(null);
  const unitInputRef = React.useRef<HTMLInputElement>(null);
  const amountInputRef = React.useRef<HTMLInputElement>(null);

  const submitHandler = (event: any) => {
    event.preventDefault();

    let enteredName;
    let enteredIngredient;
    let enteredUnit;
    let enteredAmount;

    if (
      null !== nameInputRef.current &&
      null !== ingredientInputRef.current &&
      null !== unitInputRef.current &&
      null !== amountInputRef.current
    ) {
      enteredName = nameInputRef.current.value;
      enteredIngredient = ingredientInputRef.current.value;
      enteredUnit = unitInputRef.current.value;
      enteredAmount = amountInputRef.current.value;
    }

    const meetupData: FoodEntryCreateOptions = {
      name: String(enteredName),
      details: {
        foodDetailKey: {
          unit: String(enteredUnit),
          amount: Number(enteredAmount),
        },
      },
    };
    props.onAddFood(meetupData, enteredIngredient);
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Food Name</label>
          <input type="text" required id="name" ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="Ingredient">Ingredient</label>
          <input
            type="text"
            required
            id="Ingredient"
            ref={ingredientInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="unit">Unit</label>
          <input type="text" required id="unit" ref={unitInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="amount">Amount</label>
          <input type="number" required id="amount" ref={amountInputRef} />
        </div>

        <div className={classes.actions}>
          <button>Add Food</button>
        </div>
      </form>
    </Card>
  );
};

export default NewFoodForm;
