import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IProduct } from "../interfaces/Product";
// import { createProduct } from "../slice/product";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { createProducts } from "../slice/product";

const ProductAdd = () => {
const {
    register,
    handleSubmit,
    formState: {errors},
} = useForm<IProduct>();
const navigate = useNavigate();
const dispatch = useAppDispatch();
const onHandlseSubmit: SubmitHandler<IProduct> = (data) => {
    dispatch(createProducts(data)).then(() => { 
        navigate("/");
    });
};

  return (
    <div>
      <form onSubmit={handleSubmit(onHandlseSubmit)}>
        <input type="text" {...register("name",{required: true})} />
         {errors.name && <span>required ....</span>}
         <button>Submit</button>
      </form>
    </div>
  );
};

export default ProductAdd;
