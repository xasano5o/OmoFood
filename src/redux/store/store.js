import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { GetProducts } from "../slice/client/getProduct/index.js";
import { CategoryCrud } from "../slice/client/category/index.js";
import { SubCategoryCrud } from "../slice/client/subcategory/index.jsx";
import { DiscountCrud } from "../slice/client/discount/index.js";
import { GetUserToekn } from "../slice/client/auth/useGetToken.js";
import { BasketCrud } from "../slice/client/basket/index.js";


export const store = configureStore({
    reducer: {
        [GetProducts.reducerPath]: GetProducts.reducer,
        [CategoryCrud.reducerPath]: CategoryCrud.reducer,
        [SubCategoryCrud.reducerPath]: SubCategoryCrud.reducer,
        [DiscountCrud.reducerPath]: DiscountCrud.reducer,
        [GetUserToekn.reducerPath]:GetUserToekn.reducer,
        [BasketCrud.reducerPath]:BasketCrud.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            GetProducts.middleware,
            CategoryCrud.middleware,
            SubCategoryCrud.middleware,
            DiscountCrud.middleware,
            GetUserToekn.middleware,
            BasketCrud.middleware,
        ),
});

setupListeners(store.dispatch);
