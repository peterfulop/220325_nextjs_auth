import classes from "./FoodIngredient.module.css";

const FoodIngredient = (props: {
  name: string;
  amount: string;
  unit: string;
}) => {
  return (
    <li key={props.name} className={classes.ingredients}>
      <p>{props.name}</p>
      <div className={classes.details}>
        <span className={classes.amount}>{props.amount}</span>
        <span className={classes.unit}>{props.unit}</span>
      </div>
    </li>
  );
};

export default FoodIngredient;
