import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
const app = express();

import Item from "./models/itemSchema.js";

app.use(express.json());
app.use(cors());

// mongodb connection
connectDB();

// routes
app.post("/add", async (req, res) => {
  try {
    const { name, quantity, price, category } = req.body;

    if (!name || !quantity || !price) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const createdItem = await Item.create({
      name,
      price,
      quantity,
      category,
    });
    return res
      .status(201)
      .json({ message: "Item added successfully", createdItem });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error while adding items try again", error });
  }
});

app.get("/items", async (req, res) => {
  const items = await Item.find({});
  res.status(200).json({ items });
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedItem)
      return res.status(404).json({ message: "Item not found" });
    return res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("server running on port 5000");
});
