import React from "react";

import classes from "./Order.css";

const Order = props => (
    <div className={classes.Order}>
        <h3>{props.orderId}</h3>
        <p>Ingredients: Salad (1)</p>
        <p>
            Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
        </p>
    </div>
);

export default Order;
