import React from "react";

import classes from "./Order.css";

const Order = props => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientsOutput = ingredients.map(ing => {
        return (
            <span
                style={{
                    textTransform: "capitalize",
                    display: "inline-block",
                    border: "1px solid #ccc",
                    margin: "0 4px",
                    padding: "0 8px"
                }}
                key={ing.name}
            >
                {ing.name} ({ing.amount})
            </span>
        );
    });

    return (
        <div className={classes.Order}>
            <h3>{props.orderId}</h3>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>
                Price:{" "}
                <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
            </p>
        </div>
    );
};

export default Order;
