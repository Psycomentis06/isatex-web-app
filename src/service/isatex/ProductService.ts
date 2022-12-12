import axios from "axios";
import { config } from '../config'

export default class ProductService {
    getProducts(query?: string, size?: number, page?: number) {
        return axios.get(`${config["isatex-api"]}/api/product/all`)
    }
}
