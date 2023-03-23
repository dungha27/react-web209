import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type } from "os";
import { IProduct } from "../interfaces/Product";


type StateProduct = {
    value: IProduct[];
    item:IProduct,
    loading:boolean
}

const initialState: StateProduct = {
    value: [],
    item :{name:""},
    loading:false
};

export const fetchProduct = createAsyncThunk("product/fetchProduct", async (id: number | String) => {
    const response = await fetch('http://localhost:3000/products'+id);
    const data = await response.json();
    return data
})
export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
    const response = await fetch('http://localhost:3000/products');
    const data = await response.json();
    return data
})

export const createProducts = createAsyncThunk("product/create", async (product: IProduct) => {
    const response = await fetch('http://localhost:3000/products',{
        method : "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(product)
    })
    const date = await response.json()
    return date
});


export const updateProducts = createAsyncThunk("product/update", async (product: IProduct) => {
    const response = await fetch('http://localhost:3000/products/' + product.id,{
        method : "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(product)
    })
    const date = await response.json()
    return date
});

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetch
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.value = action.payload
            state.loading = false;
        })

        // add
        builder.addCase(createProducts.fulfilled, (state, action) => {
            state.value.push(action.payload)
            state.loading = false;
        })
        // Get
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.item = action.payload
            state.loading = false;
        })
        // Update
        builder.addCase(updateProducts.fulfilled, (state, action) => {
            state.value = state.value.map(item => item.id === action.payload.id ? action.payload : item)
            state.loading = false;
        })
    }
});

export default productSlice.reducer;