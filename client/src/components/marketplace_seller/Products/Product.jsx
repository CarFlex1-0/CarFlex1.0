import { useState } from "react";

export function Product({ type }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products] = useState([
    {
      category: "Engine",
      name: "Product 1",
      price: 99.99,
      stock: 50,
      status: "In Stock",
    },
    {
      category: "Engine",
      name: "Product 2",
      price: 149.99,
      stock: 30,
      status: "Low Stock",
    },
    {
      category: "Engine",
      name: "Product 3",
      price: 199.99,
      stock: 0,
      status: "Out of Stock",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    brand: "",
    image: null,
    description: "",
  });

  const categories = [
    "Engine",
    "Transmission",
    "Brakes",
    "Suspension",
    "Electrical",
    "Body Parts",
    "Interior",
    "Accessories",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(newProduct);
    setIsModalOpen(false);
    // Reset form
    setNewProduct({
      name: "",
      price: "",
      category: "",
      stock: "",
      brand: "",
      image: null,
      description: "",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        {type == "analytics" ? (
          <></>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Add New Product
          </button>
        )}
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Status</th>
              {type == "analytics" ? <></> : <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>
                  <span
                    className={`badge ${
                      product.status === "In Stock"
                        ? "badge-success"
                        : product.status === "Low Stock"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                {type == "analytics" ? (
                  <></>
                ) : (
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-info">Edit</button>
                      <button className="btn btn-sm btn-error">Delete</button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      <dialog
        id="add_product_modal"
        className={`modal ${isModalOpen ? "modal-open" : ""}`}
      >
        <div className="modal-box w-11/12 max-w-3xl">
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg mb-4">Add New Product</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Price Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  className="input input-bordered"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Category Dropdown */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="select select-bordered"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stock Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Stock</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  placeholder="Enter stock quantity"
                  className="input input-bordered"
                  required
                  min="0"
                />
              </div>

              {/* Brand Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Brand</span>
                </label>
                <input
                  type="text"
                  name="brand"
                  value={newProduct.brand}
                  onChange={handleInputChange}
                  placeholder="Enter brand name"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Image</span>
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full"
                  accept="image/*"
                  required
                />
              </div>

              {/* Description Textarea - Full Width */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  className="textarea textarea-bordered h-24"
                  required
                ></textarea>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setIsModalOpen(false)}>close</button>
        </form>
      </dialog>
    </div>
  );
}
