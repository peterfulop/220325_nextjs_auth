import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { FoodEntryDetails } from "../../server/resources/food/food.interface";
import Card from "../ui/Card";
import classes from "./FoodDetail.module.css";
import FoodIngredient from "./FoodDetailItem";
import { FoodEntryUpdateOptions } from "../../server/resources/food/food.interface";
import "react-toastify/dist/ReactToastify.css";
import FoodEditDialog from "./FoodEditDialog";
import FoodDeleteDialog from "./FoodDeleteDialog";
import Button from "@mui/material/Button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const errorToast = (message: string) => toast.error(message);
const successToast = (message: string) => toast.success(message);

export default function FoodDetail(props: {
  name: string;
  details: FoodEntryDetails[];
  id: string;
}) {
  const onDeleteFood = async () => {
    const foodId = props.id;
    const res = await fetch(`/api/foods/${foodId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (res.status !== 202) {
      alert(data.error);
      return;
    }
    Router.push("/");
  };

  const onEditFood = async (name: string) => {
    const foodId = props.id;
    const res = await fetch(`/api/foods/${foodId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name, details: props.details }),
    });
    const data = await res.json();

    if (data.status !== "success") {
      errorToast(Array(data.error).join());
      return;
    }
    successToast(data.message);
  };

  return (
    <Card>
      <Head>
        <title>{props.name}</title>
      </Head>
      <section className={classes.detail}>
        <h1>{props.name}</h1>
        <ul>
          {props.details.map((detail: FoodEntryDetails) => (
            <FoodIngredient
              key={Object.keys(detail)[0]}
              name={Object.keys(detail)[0]}
              amount={String(Object.values(detail)[0]["amount"])}
              unit={String(Object.values(detail)[0]["unit"])}
            />
          ))}
        </ul>
        <section className={classes.footer}>
          <Link href="/" passHref>
            <Button variant="outlined" color="primary">
              Foods
            </Button>
          </Link>
          <section className={classes.actions}>
            <FoodEditDialog foodName={props.name} submitAction={onEditFood} />
            <FoodDeleteDialog
              foodName={props.name}
              submitAction={onDeleteFood}
            />
          </section>
        </section>
      </section>
      <ToastContainer />
    </Card>
  );
}
