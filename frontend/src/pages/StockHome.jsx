import React, { useEffect } from "react";
import bckgImg from "./../components/Assests/SBackground.jpg";
import cdImg from "./../components/Assests/card_Img.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const StockHome = () => {
  const [stockData, setStockData] = React.useState([]);

  useEffect(() => {
    //fetch data from database
    //setStockData(data)
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/stock");
        const data = response.data;
        setStockData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(stockData);

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
              <Link to={"/create"}>
                <button className="btn btn-outline-light me-2" type="submit">
                  CREATE
                </button>
              </Link>

              <Link to={"/report"}>
                <button className="btn btn-outline-light" type="submit">
                  REPORT
                </button>
              </Link>
            </form>
          </div>
        </nav>
      </div>
      <div>
        <div className="row">
          {/* card view */}
          {stockData.map((stock) => {
            return (
              <div className="col-sm-3 mt-5">
                <div className="card">
                  <img
                    src={stock?.image}
                    className="card-img-top "
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                    alt="..."
                  />

                  <div className="card-body text-center">
                    <h5 className="card-title">{stock.name}</h5>
                    <p className="card-text">{stock.status}</p>
                  </div>
                  <div className="row justify-content-evenly">
                    <div className="col-4">
                      {new Date(stock.purchaseDate).toLocaleDateString()}
                    </div>
                    <div className="col-4">
                      <span className="badge bg-success">
                        {stock.stockStatus}
                      </span>
                    </div>
                  </div>
                  <div className="card-body ">
                    <Link to={`/single/${stock._id}`}>
                      <p className="text-center">- See More Details -</p>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StockHome;
