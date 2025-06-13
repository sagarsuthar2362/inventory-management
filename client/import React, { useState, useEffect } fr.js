import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    category: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = ["Wires", "Tools", "Switches", "Bulbs"]; // Yeh backend se bhi fetch ho sakta hai

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const url = selectedCategory
          ? `http://localhost:3000/items?category=${selectedCategory}`
          : "http://localhost:3000/items";
        const res = await axios.get(url);
        setItems(res.data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, [selectedCategory]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/add", formData);
      setFormData({ name: "", quantity: "", price: "", category: "" }); // Reset form
      const res = await axios.get("http://localhost:3000/items"); // Refresh items
      setItems(res.data.items);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`);
      const res = await axios.get("http://localhost:3000/items"); // Refresh items
      setItems(res.data.items);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Inventory App - Electric & Hardware Shop</h1>

      {/* Add Item Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item Name"
          style={{ margin: "5px" }}
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          style={{ margin: "5px" }}
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          style={{ margin: "5px" }}
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{ margin: "5px" }}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button type="submit" style={{ margin: "5px" }}>
          Add Item
        </button>
      </form>

      {/* Category Filter */}
      <div style={{ marginBottom: "20px" }}>
        <label>Filter by Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Items Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Quantity
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Price</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Category
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.name}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.quantity}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.price}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.category}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
