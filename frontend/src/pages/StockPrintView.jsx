import React, { useEffect, useState } from "react";
import bckgImg from "./../components/Assests/SBackground.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const StockPrintView = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
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

  const columns = [
    { title: "Name", field: "name" },
    { title: "Category", field: "category" },
    { title: "Qty", field: "quantity" },
    { title: "Supplier", field: "supplier" },
    { title: "Date", field: "purchaseDate" },
    { title: "Location", field: "location" },
    { title: "Status", field: "status" },
  ];

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFont("Helvertica", "bold");
    doc.text("Stock Details", 90, 10);
    doc.autoTable({
      margin: { top: 30 },
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: stockData.map((row) => ({
        ...row,
        purchaseDate: new Date(row.purchaseDate).toLocaleDateString(),
      })),
    });

    doc.save("stock.pdf");
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
              VIEW ALL STOCK DETAILS
            </p>
            <form className="d-flex">
              <Link to={"/"}>
                <button className="btn btn-outline-light me-4" type="submit">
                  BACK
                </button>
              </Link>
              <button
                className="btn btn-light me-4"
                type="submit"
                onClick={downloadPdf}
              >
                DOWNLOAD
              </button>
            </form>
          </div>
        </nav>
      </div>

      <div className="container-fluid">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Category</th>
              <th scope="col">Qty</th>
              <th scope="col">Supplier Information</th>
              <th scope="col">Date</th>
              <th scope="col">Location</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((stock) => (
              <tr key={stock._id}>
                <td>{stock.name}</td>
                <td>{stock.category}</td>
                <td>{stock.quantity}</td>
                <td>{stock.supplier}</td>
                <td> {new Date(stock.purchaseDate).toLocaleDateString()}</td>
                <td>{stock.location}</td>
                <td>{stock.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockPrintView;
