import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const categories = [
    "Wires",
    "Tools",
    "Switches",
    "Bulbs",
    "plumbing",
    "hardware ",
  ];

  const [itemDetails, setItemDetails] = useState({
    name: "",
    quantity: "",
    price: "",
    category: "",
  });

  const handleChange = (e) => {
    setItemDetails({ ...itemDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:3000/update/${editId}`, itemDetails);
        setEditId(null);
      } else {
        await axios.post("http://localhost:3000/add", itemDetails);
      }

      const res = await axios.get("http://localhost:3000/items");
      setItems(res.data.items);
      setItemDetails({ name: "", quantity: "", price: "", category: "" });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/delete/${id}`);
    const res = await axios.get("http://localhost:3000/items");
    setItems(res.data.items);
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:3000/items")
        .then((res) => setItems(res.data.items))
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  const handleEdit = (item) => {
    setItemDetails({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      category: item.category,
    });
    setEditId(item._id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold  bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4 rounded-t-lg shadow-sm">
          Inventory Management
        </h1>
        <form
          className="flex flex-col sm:flex-row gap-4 bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Item Name"
            className="w-full sm:w-auto p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            name="name"
            onChange={(e) => handleChange(e)}
            value={itemDetails.name}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="w-full sm:w-auto p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            name="quantity"
            onChange={(e) => handleChange(e)}
            value={itemDetails.quantity}
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full sm:w-auto p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            name="price"
            onChange={(e) => handleChange(e)}
            value={itemDetails.price}
          />
          <select
            name="category"
            className="w-full sm:w-auto p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => handleChange(e)}
            value={itemDetails.category}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200 font-medium">
            {editId ? "Update Item" : "Add Item"}
          </button>
        </form>
      </div>

      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden overflow-x-auto">
          <table className="w-full border-collapse text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold tracking-wide ">
              <tr>
                <th className="py-4 px-6 border-b">Sr. No.</th>
                <th className="py-4 px-6 border-b">Item Name</th>
                <th className="py-4 px-6 border-b">Quantity</th>
                <th className="py-4 px-6 border-b">Price</th>
                <th className="py-4 px-6 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  className="hover:bg-gray-50 transition duration-150 text-center"
                  key={index}
                >
                  <td className="py-4 px-6 border-b">{index + 1}</td>
                  <td className="py-4 px-6 border-b">{item.name}</td>
                  <td className="py-4 px-6 border-b">{item.quantity}</td>
                  <td className="py-4 px-6 border-b">{item.price}</td>
                  <td className="py-4 px-6 border-b flex justify-center gap-3">
                    <button
                      className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition duration-200"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
