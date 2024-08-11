import React, { useEffect } from "react";
import bckgImg from "./../components/Assests/SBackground.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../db/firebase";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = yup.object().shape({
  productName: yup.string().required(),
  category: yup.string().required(),
  quantity: yup.number().required(),
  location: yup.string().required(),
  stockStatus: yup.string().required(),
  supplierInfo: yup.string().required(),
});

const storage = getStorage(app);

const CreateStock = () => {
  const [image, setImage] = React.useState(null);
  const { id } = useParams();
  const [editClick, setEditClick] = React.useState(false);
  const [source, setSource] = React.useState(null);
  const [date, setDate] = React.useState();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    if (id) {
      const fetchStock = async () => {
        const response = await axios.get(`http://localhost:5000/stock/${id}`);
        const stock = response.data;
        setValue("productName", stock.name);
        setValue("category", stock.category);
        setValue("quantity", stock.quantity);
        setValue("purchaseDate", stock.purchaseDate);
        setValue("location", stock.location);
        setValue("stockStatus", stock.status);
        setValue("supplierInfo", stock.supplier);
        setSource(stock.image);
        setDate(stock.purchaseDate.substring(0, 10));
        setEditClick(true);
      };
      fetchStock();
    }
  }, [id]);

  function onImageChange(e) {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      setError("image", {
        type: "manual",
        message: "Please select at least one image",
      });
    }
    const currentFile = selectedFiles[0];
    setImage(currentFile);
  }
  const onSubmit = async (data) => {
    if (!image && !source) {
      return toast.error("Please upload an image");
    }

    let imageUrl = null;

    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const stock = {
      name: data.productName,
      category: data.category,
      quantity: data.quantity,
      purchaseDate: date,
      location: data.location,
      status: data.stockStatus,
      supplier: data.supplierInfo,
      image: imageUrl,
    };

    const updateStock = {
      name: data.productName,
      category: data.category,
      quantity: data.quantity,
      purchaseDate: date,
      location: data.location,
      status: data.stockStatus,
      supplier: data.supplierInfo,
      image: imageUrl ? imageUrl : source,
    };

    if (editClick) {
      try {
        const response = await axios.patch(
          `http://localhost:5000/stock/${id}`,
          updateStock
        );
        if (response.data) {
          toast.success("Stock updated successfully");
          navigate("/");
        }
      } catch (error) {
        if (error?.response) {
          toast.error(error.response.data);
        } else {
          console.log(error);
          toast.error("Something went wrong");
        }
      }
    } else {
      try {
        const response = await axios.post(`http://localhost:5000/stock`, stock);
        if (response.data) {
          toast.success("Stock created successfully");
          navigate("/");
        }
      } catch (error) {
        if (error?.response) {
          toast.error(error.response.data);
        } else {
          console.log(error);
          toast.error("Something went wrong");
        }
      }
    }
  };
  return (
    <div
      className="container-fluid p-4"
      style={{
        backgroundImage: `url(${bckgImg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <p className="navbar-brand text-white p-3">
              {editClick ? "Edit Stock" : "Create Stock"}
            </p>
            <form className="d-flex">
              <Link to={"/"}>
                <button className="btn btn-outline-light me-4" type="submit">
                  CANCEL
                </button>
              </Link>
            </form>
          </div>
        </nav>
      </div>

      <div className="d-flex justify-content-center">
        {/* card view */}
        <div className="col-sm-6 mt-5 item-center">
          <div className="card p-4">
            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-md-4">
                <label for="validationDefault01" className="form-label">
                  Product Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault01"
                  {...register("productName")}
                />
                {errors.productName && (
                  <p className="text-danger">Product Name is required</p>
                )}
              </div>
              <div className="col-md-4">
                <label for="validationDefault02" className="form-label">
                  Category:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault02"
                  {...register("category")}
                />
                {errors.category && (
                  <p className="text-danger">Category is required</p>
                )}
              </div>
              <div className="col-md-4">
                <label for="validationDefault02" className="form-label">
                  Quantity Available:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="validationDefault02"
                  {...register("quantity")}
                />
                {errors.quantity && (
                  <p className="text-danger">Quantity is required</p>
                )}
              </div>
              <div className="col-md-4">
                <label for="validationDefault01" className="form-label">
                  Purchase Date:
                </label>
                <input
                  type="date"
                  value={date}
                  className="form-control"
                  id="validationDefault01"
                  onChange={(e) => {
                    setDate(e.target.value);
                    if (e.target.value === "") {
                      setError("purchaseDate", {
                        type: "manual",
                        message: "Purchase Date is required",
                      });
                    }
                  }}
                />
                {errors.purchaseDate && (
                  <p className="text-danger">Purchase Date is required</p>
                )}
              </div>
              <div className="col-md-4">
                <label for="validationDefault02" className="form-label">
                  Location:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault02"
                  {...register("location")}
                />
                {errors.location && (
                  <p className="text-danger">Location is required</p>
                )}
              </div>
              <div className="col-md-4">
                <label for="validationDefault04" className="form-label">
                  Stock Status:
                </label>
                <select
                  className="form-select"
                  id="validationDefault04"
                  required
                  {...register("stockStatus")}
                >
                  <option selected value="In Stock">
                    In Stock
                  </option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Back Order">Back Order</option>
                </select>
                {errors.stockStatus && (
                  <p className="text-danger">Stock Status is required</p>
                )}
              </div>
              <div className="col-md-8">
                <label for="validationDefault03" className="form-label">
                  Supplier Information:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault03"
                  {...register("supplierInfo")}
                />
                {errors.supplierInfo && (
                  <p className="text-danger">
                    Supplier Information is required
                  </p>
                )}
              </div>
              <div className="col-md-4">
                <label for="formFile" className="form-label">
                  Upload Image
                </label>
                <input
                  onChange={onImageChange}
                  className="form-control"
                  type="file"
                  id="formFile"
                />
                {errors.image && (
                  <p className="text-danger">{errors.image.message}</p>
                )}
              </div>
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="meal"
                  className="w-40 h-40"
                />
              )}

              {!image && source && (
                <img src={source} alt="meal" className="w-40 h-40" />
              )}
              <div className="col-12">{/*  */}</div>
              <div className="col-12">
                <button
                  className="btn btn-dark me-3"
                  type="submit"
                  onClick={() => console.log("submit")}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : editClick
                    ? "Update"
                    : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStock;
