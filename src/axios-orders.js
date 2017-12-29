import axios from "axios";

const instance = axios.create({
    baseURL: "https://udemy-react-my-burger.firebaseio.com/"
});

export default instance;