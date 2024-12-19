import { SelectorsType } from "models/types";

export const AMAZON_URL = "https://www.amazon.in/gp/css/order-history";

export const SELECTORS: SelectorsType = {
    Classes: {
        OrderBox: ".a-box-group",
        ProductTitle: ".yohtmlc-product-title",
        ProductInfo: ".a-size-base.a-color-secondary"
    },
    IDs: {
        ContinueBtn: "#continue",
        Email: "#ap_email",
        Password: "#ap_password",
        Submit: "#signInSubmit",
    },

}
