import UpLoadProduct from "@/components/admin-view/UpLoadProduct";
import CommomForm from "@/components/common/CommomForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { getAllProduct } from "@/redux/admin/product-slice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};
const AdminProduct = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("form data",formData)
  };
  const [imgFile, setImgFile] = useState(null);
  const [uploadImgUrl, setUploadImg] = useState("");
  const [imgLoadingState,setImgLoadingState] = useState(false)

   useEffect(() =>{
     dispatch(getAllProduct());
   },[dispatch])


  return (
    <Fragment>
      <div className="mt-5 justify-end flex w-full">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add new product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add new product</SheetTitle>
          </SheetHeader>
          <UpLoadProduct
            imgFile={imgFile}
            setImgFile={setImgFile}
            uploadedImageUrl={uploadImgUrl}
            setUploadedImageUrl={setUploadImg}
            setImgLoadingState ={setImgLoadingState}
            imgLoadingState={imgLoadingState}
          />
          <div className="py-6">
            <CommomForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProduct;
