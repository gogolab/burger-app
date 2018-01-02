import React, { Component } from "react";

import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        loading: false,
        totalPrice: 0
    };

    orderHandler = event => {
        event.preventDefault();
        // console.log("order handler:", this.props.ingredients);

        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Mad Max",
                address: {
                    street: "Teststreet 1",
                    zipCode: "23452",
                    country: "Poland"
                },
                email: "test@test.com"
            },
            deliveryMethod: "fastest"
        };

        axios
            .post("/orders.json", order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    };

    render() {
        let form = (
            <form>
                <label htmlFor="form-name">name:</label>
                <input type="text" name="name" id="form-name" />
                <label htmlFor="form-email">email:</label>
                <input type="text" name="email" id="form-email" />
                <label htmlFor="form-street">street:</label>
                <input type="text" name="street" id="form-street" />
                <label htmlFor="form-postal">postal code:</label>
                <input type="text" name="postal" id="form-postal" />
                <Button btnType="Success" clicked={this.orderHandler}>
                    order
                </Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
