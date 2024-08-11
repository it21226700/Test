import Stock from "../model/stock.js";

export const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.json({ message: err });
  }
};

export const createStock = async (req, res) => {
  const stock = new Stock({
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    supplier: req.body.supplier,
    purchaseDate: req.body.purchaseDate,
    location: req.body.location,
    status: req.body.status,
    image: req.body.image,
  });

  try {
    const savedStock = await stock.save();
    res.json(savedStock);
  } catch (err) {
    res.json({ message: err });
  }
};

export const getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.stockId);
    res.json(stock);
  } catch (err) {
    res.json({ message: err });
  }
};

export const deleteStock = async (req, res) => {
  try {
    const removedStock = await Stock.deleteOne({ _id: req.params.stockId });
    res.json(removedStock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const updateStock = async (req, res) => {
  try {
    const updatedStock = await Stock.updateOne(
      { _id: req.params.stockId },
      {
        $set: {
          name: req.body.name,
          category: req.body.category,
          quantity: req.body.quantity,
          supplier: req.body.supplier,
          purchaseDate: req.body.purchaseDate,
          location: req.body.location,
          status: req.body.status,
          image: req.body.image,
        },
      }
    );
    res.json(updatedStock);
  } catch (err) {
    res.json({ message: err });
  }
};
