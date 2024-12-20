
export const AMAZON_URL = "https://www.amazon.in";
export const AMAZON_ORDERS_URL = "/gp/css/order-history";

export const SELECTORS = {
    Classes: {
        OrderBox: ".a-box-group",
        ProductTitle: ".yohtmlc-product-title",
        ProductInfo: ".a-size-base.a-color-secondary",
        SearchedOrderBox: ".a-fixed-left-grid",
        SearchedProductInfo: ".a-row.a-spacing-base",
    },
    IDs: {
        ContinueBtn: "#continue",
        Email: "#ap_email",
        Password: "#ap_password",
        Submit: "#signInSubmit",
        SearchInput: "#searchOrdersInput",
        SearchBtn: "#a-autoid-0",
        AuthError: "#auth-error-message-box",
    },
    Tags: {
        Anchor: "a",
    },
} as const
