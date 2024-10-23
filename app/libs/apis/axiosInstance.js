import axios from "axios";

const fbInstance = axios.create({
  timeout: 25000,
  baseURL: process.env.NEXT_PUBLIC__WHATSAPP_apiurl,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC__WHATSAPP_token}`
  }
})

export { fbInstance }
