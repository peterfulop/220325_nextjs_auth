import Router from "next/router";
import React, { useEffect, useState } from "react";
import { FoodEntryDetails } from "../../server/resources/food/food.interface";
import Layout from "../layouts/Layout";
import classes from "./FoodDetail.module.css";

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

  const onEditFood = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <section className={classes.detail}>
        <h1>{props.name}</h1>
        <ul>
          {props.details.map((detail: FoodEntryDetails) => (
            <li key={Object.keys(detail)[0]}>
              <p>{Object.keys(detail)[0]}</p>
              <span>{Object.values(detail)[0]["amount"]}</span>
              <span>{Object.values(detail)[0]["unit"]}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={(event: React.MouseEvent<HTMLElement>) => onEditFood(event)}
        >
          Edit Food
        </button>
        <br></br>
        <button type="submit" onClick={onDeleteFood}>
          Delete Food
        </button>
      </section>
    </Layout>
  );
}
