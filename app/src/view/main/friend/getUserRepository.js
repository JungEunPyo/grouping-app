import axios from "axios";
import {SERVER_URL} from "../../../constant/HttpProperty";
const TARGET_URL = SERVER_URL + '/users';
export function getData(){
    return axios.get(TARGET_URL + '/auth', {});
};
