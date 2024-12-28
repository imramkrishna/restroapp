"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function page() {
  // Modal state
  const [showModal, setShowModal] = useState(false);

  // New item form data
  const [formData, setFormData] = useState({
    itemName: '',
    itemImage: '',
    itemPrice: ''
  });

  // Menu items
  const [menuItems, setMenuItems] = useState([]);

  // Fetch items on mount
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('/api/menu');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/menu', {
        itemName: formData.itemName,
        itemImage: formData.itemImage,
        itemPrice: parseFloat(formData.itemPrice)
      });
      alert('Menu item added successfully!');
      setShowModal(false);
      setFormData({ itemName: '', itemImage: '', itemPrice: '' });
      fetchMenuItems();
    } catch (error) {
      console.error('Error adding menu item:', error);
      alert('Failed to add menu item');
    }
  };

  const handleRemoveItem = async (id) => {
    if (!window.confirm('Are you sure you want to remove this item?')) return;
    try {
      await axios.delete(`/api/menu/${id}`);
      fetchMenuItems();
    } catch (error) {
      console.error('Error removing menu item:', error);
      alert('Failed to remove menu item');
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-xl font-bold">Menu Items</h1>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => setShowModal(true)}
        >
          +Add
        </button>
      </div>

      {/* Modal for adding new menu item */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4">Add Menu Item</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block mb-1">Item Name</label>
                <input
                  type="text"
                  className="border w-full p-2 rounded"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block mb-1">Item Image (URL)</label>
                <input
                  type="text"
                  className="border w-full p-2 rounded"
                  value={formData.itemImage}
                  onChange={(e) => setFormData({ ...formData, itemImage: e.target.value })}
                  placeholder="https://example.com/image.png"
                />
              </div>

              <div className="mb-3">
                <label className="block mb-1">Item Price</label>
                <input
                  type="number"
                  step="0.01"
                  className="border w-full p-2 rounded"
                  value={formData.itemPrice}
                  onChange={(e) => setFormData({ ...formData, itemPrice: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Existing menu items */}
      <div className="mt-4 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <div key={item._id} className="border rounded p-4 flex flex-col items-center">
              {item.itemImage ? (
                <img
                  src={item.itemImage}
                  alt={item.itemName}
                  className="w-32 h-32 object-cover mb-3"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 mb-3 flex items-center justify-center">
                  No Image
                </div>
              )}
              <h3 className="font-bold text-lg">{item.itemName}</h3>
              <p className="text-gray-600 mb-2">${item.itemPrice.toFixed(2)}</p>
              <button
                onClick={() => handleRemoveItem(item._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
