import FoodItem from "./FoodItem";
import classes from "./FoodList.module.css";

const FoodList = (props: any) => {
  return (
    <ul className={classes.list}>
      {props.foods.map((food: any) => (
        <FoodItem key={food._id} id={food._id} name={food.name} />
      ))}
    </ul>
  );
};

export default FoodList;
