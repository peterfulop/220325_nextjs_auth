import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import { FoodEntryDetails } from "../../server/resources/food/food.interface";
import Layout from "../layouts/Layout";
import Card from "../ui/Card";
import classes from "./FoodDetail.module.css";
import FoodIngredient from "./FoodDetailItem";
import { Modal, Box, Typography } from "@mui/material";

import "react-toastify/dist/ReactToastify.css";
import FormDialog from "../ui/FormDialog";
import FoodEditDialog from "./FoodEditDialog";

export default function FoodDetail(props: {
  name: string;
  details: FoodEntryDetails[];
  id: string;
}) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const deleteFoodHandler = () => {
    setDeleteConfirmation((prev) => true);
  };

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
    setDeleteConfirmation((prev) => false);
    Router.push("/");
  };

  const onEditFood = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };

  return (
    <Card className={classes.card}>
      <FoodEditDialog foodName={props.name} onSubmitHandler={onEditFood} />
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
            <button className={classes.home}>Foods</button>
          </Link>

          {!deleteConfirmation && (
            <section className={classes.actions}>
              <button
                className={classes.edit}
                onClick={(event: React.MouseEvent<HTMLElement>) =>
                  onEditFood(event)
                }
              >
                Edit
              </button>
              <br></br>
              <button className={classes.delete} onClick={deleteFoodHandler}>
                Delete
              </button>
            </section>
          )}
          {deleteConfirmation && (
            <section className={classes.confirmation}>
              <p>Delete the current food?</p>
              <button className={classes.delete} onClick={onDeleteFood}>
                Yes
              </button>
              <button
                className={classes.edit}
                onClick={() => setDeleteConfirmation(false)}
              >
                No
              </button>
            </section>
          )}
        </section>
      </section>
    </Card>
  );
}
