import Head from "next/head";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { FoodEntryCreateOptions } from "../../server/resources/food/food.interface";
import Card from "../ui/Card";
import classes from "./NewFoodForm.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
    errorToast(Array(data.error).join());
    return;
  }
  if (data.status === "success") {
    successToast("Food has been created!");
    return true;
  }
};

function NewFoodForm(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [ingrdient, setIngrdient] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const submitHandler = async (event: FormEvent<HTMLFormElement> | null) => {
    event?.preventDefault();

    if (!name || !ingrdient || !unit || !amount) {
      errorToast("All fields are required!");

      return;
    }
    const foodData: FoodEntryCreateOptions = {
      name: String(name),
      details: {
        foodDetailKey: {
          unit: String(unit),
          amount: Number(amount),
        },
      },
    };

    const res = await addFoodHandler(foodData, ingrdient);

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
        <title>Add Food</title>
      </Head>
      <form className={classes.form} onSubmit={(e) => submitHandler(e)}>
        <h2>Add new Food</h2>
        <div className={classes.control}>
          <TextField
            className="w-100"
            label="Name"
            variant="outlined"
            type="text"
            required
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={classes.control}>
          <TextField
            className="w-100"
            label="Ingredient"
            variant="outlined"
            required
            id="ingredient"
            value={ingrdient}
            onChange={(e) => {
              setIngrdient(e.target.value);
            }}
          />
        </div>
        <div className={classes.control}>
          <TextField
            className="w-100"
            type="text"
            label="Unit"
            variant="outlined"
            required
            id="unit"
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value);
            }}
          />
        </div>
        <div className={classes.control}>
          <TextField
            className="w-100"
            label="Amount"
            type="number"
            variant="outlined"
            required
            id="amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>

        <div className={classes.actions}>
          <Button
            variant="contained"
            type="button"
            onClick={() => submitHandler(null)}
          >
            Add Food
          </Button>
        </div>
      </form>
      <ToastContainer />
    </Card>
  );
}

export default NewFoodForm;
