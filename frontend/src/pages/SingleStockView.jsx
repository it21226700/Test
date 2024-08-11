import React, { useEffect } from "react";
import bckgImg from "./../components/Assests/SBackground.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SingleStockView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stockData, setStockData] = React.useState({});
  console.log(id);
  console.log(stockData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/stock/${id}`);
        const data = await response.data;
        setStockData(data);
        if (data === null) navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async (stkId) => {
    await axios.delete(`http://localhost:5000/stock/${stkId}`);
    toast.success("Stock Deleted Successfully");
    navigate("/");
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
            <p className="navbar-brand text-white p-3">STOCK DETAILS</p>
            <form className="d-flex">
              <button
                className="btn btn-outline-light me-4"
                onClick={() => handleDelete(stockData._id)}
              >
                Delete
              </button>
              <Link
                className="btn btn-outline-light me-4"
                to={`/create/${stockData._id}`}
              >
                Update
              </Link>
              <Link to={"/"}>
                <button className="btn btn-outline-light me-4" type="submit">
                  BACK
                </button>
              </Link>
            </form>
          </div>
        </nav>
      </div>

      <div className="d-flex justify-content-center">
        {/* card view */}
        <div className="col-sm-6 mt-5 item-center">
          <div className="card">
            <img src={stockData?.image} className="card-img-top" alt="..." />
            <div className="card-body text-center">
              <p className="card-text">Stock ID</p>
              <h5 className="card-title">{stockData?.name}</h5>
            </div>
            <div className="row justify-content-evenly">
              <div className="col-3">
                <p className="fw-bold">Purchased Date : </p>
                <p> {new Date(stockData?.purchaseDate).toLocaleDateString()}</p>
              </div>
              <div className="col-3">
                <p className="fw-bold">Stock Status :</p>
                <span className="badge bg-success">{stockData?.status}</span>
              </div>
            </div>
            <div className="row justify-content-evenly">
              <div className="col-3">
                <p className="fw-bold">Category : </p>
                <p> {stockData?.category}</p>
              </div>
              <div className="col-3">
                <p className="fw-bold">Available Quantity :</p>
                <p> {stockData?.quantity}</p>
              </div>
            </div>

            <div className="card-body text-center">
              <h5 className="fw-bold">Supplier Information</h5>
              <p>{stockData?.supplier}</p>

              <p className="fw-bold">Location :</p>
              <p> {stockData?.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleStockView;
