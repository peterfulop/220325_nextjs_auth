import Head from "next/head";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { FoodEntryCreateOptions } from "../../server/resources/food/food.interface";
import Card from "../ui/Card";
import classes from "./NewFoodForm.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const errorToast = (message: string) => toast.error(message);
const successToast = (message: string) => toast.success(message);

const addFoodHandler = async (
  enteredFoodData: FoodEntryCreateOptions,
  enteredIngredient: string
) => {
  let bodyObject = JSON.stringify(enteredFoodData).replace(
    "foodDetailKey",
    enteredIngredient
  );
  const res = await fetch("/api/foods", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: bodyObject,
  });

  const data = await res.json();

  if (res.status !== 201) {
    errorToast(data.error);
    return;
  }
  if (data.status === "success") {
    successToast("Food has been created!");
    return true;
  }
};

function NewFoodForm(): JSX.Element {
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const ingredientInputRef = React.useRef<HTMLInputElement>(null);
  const unitInputRef = React.useRef<HTMLInputElement>(null);
  const amountInputRef = React.useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>("");
  const [ingrdient, setIngrdient] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredName = nameInputRef.current?.value as string;
    const enteredIngredient = ingredientInputRef.current?.value as string;
    const enteredUnit = unitInputRef.current?.value as string;
    const enteredAmount = amountInputRef.current?.value as string;

    const meetupData: FoodEntryCreateOptions = {
      name: String(enteredName),
      details: {
        foodDetailKey: {
          unit: String(enteredUnit),
          amount: Number(enteredAmount),
        },
      },
    };

    const res = await addFoodHandler(meetupData, enteredIngredient as string);

    if (res) {
      setName((prev) => "");
      setIngrdient((prev) => "");
      setUnit((prev) => "");
      setAmount((prev) => "");
    }
  };

  return (
    <Card>
      <Head>
        <title>Create New Food</title>
      </Head>
      <form className={classes.form} onSubmit={(e) => submitHandler(e)}>
        <h2>Create a new Food</h2>
        <div className={classes.control}>
          <label htmlFor="name">Food Name</label>
          <input
            type="text"
            required
            id="name"
            ref={nameInputRef}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="Ingredient">Ingredient</label>
          <input
            type="text"
            required
            id="Ingredient"
            ref={ingredientInputRef}
            value={ingrdient}
            onChange={(e) => {
              setIngrdient(e.target.value);
            }}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="unit">Unit</label>
          <input
            type="text"
            required
            id="unit"
            ref={unitInputRef}
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value);
            }}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            required
            id="amount"
            ref={amountInputRef}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>

        <div className={classes.actions}>
          <button>Add Food</button>
        </div>
      </form>
      <ToastContainer />
    </Card>
  );
}

export default NewFoodForm;
