import React, { useState } from "react";

interface Product {
  name: string;
  price: string;
  category: string;
  desc: string;
  image?: string;
}

const AdminDashboard: React.FC = () => {
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = () => {
    if (!productName || !productPrice || !productDesc || !category) {
      alert("Please fill all fields!");
      return;
    }
    const newProduct: Product = {
      name: productName,
      price: productPrice,
      category,
      desc: productDesc,
      image: productImage?.name,
    };
    setProducts([newProduct, ...products]);
    setProductName("");
    setProductPrice("");
    setProductDesc("");
    setCategory("");
    setProductImage(null);
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-800 to-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
        <ul>
          <li className="mb-4 cursor-pointer hover:text-yellow-300 transition">Home</li>
          <li className="mb-4 cursor-pointer hover:text-yellow-300 transition">Settings</li>
          <li className="mb-4 cursor-pointer hover:text-yellow-300 transition">Add Product</li>
          <li className="mb-4 cursor-pointer hover:text-yellow-300 transition">Reports</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-gray-700 font-semibold mb-2">Total Products</h3>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-gray-700 font-semibold mb-2">Total Sales</h3>
            <p className="text-2xl font-bold">$0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-gray-700 font-semibold mb-2">Notifications</h3>
            <p className="text-2xl font-bold">3</p>
          </div>
        </div>

        {/* Add Product Form */}
        <div className="bg-white p-8 rounded-lg shadow mb-10">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-gray-700">Select Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">-- Select --</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="books">Books</option>
                <option value="sports">Sports</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Product Price</label>
              <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Enter product price"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Product Image</label>
              <input
                type="file"
                onChange={(e) => setProductImage(e.target.files ? e.target.files[0] : null)}
                className="w-full"
              />
              {productImage && <p className="text-sm mt-1">{productImage.name}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-gray-700">Product Description</label>
              <textarea
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                placeholder="Enter description"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-gray-700">Additional Information</label>
              <textarea
                placeholder="Enter additional info"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>

          <button
            onClick={handleAddProduct}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </div>

        {/* Recent Products Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Products</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Name</th>
                <th className="border-b p-2">Category</th>
                <th className="border-b p-2">Price</th>
                <th className="border-b p-2">Image</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-2 text-center text-gray-500">
                    No products added yet
                  </td>
                </tr>
              )}
              {products.map((p, idx) => (
                <tr key={idx} className="hover:bg-gray-100 transition">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.category}</td>
                  <td className="p-2">${p.price}</td>
                  <td className="p-2">{p.image || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
