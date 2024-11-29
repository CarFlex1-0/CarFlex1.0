import { useState, useEffect } from "react";
import axiosInstance from "@services/axios"; // Replace with your actual axios instance
import { Link } from "react-router-dom";
export function Product({ type }) {
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [products, setProducts] = useState([]);
     const [loading, setLoading] = useState(true);
     const [page, setPage] = useState(1);
     const [totalPages, setTotalPages] = useState(1);
     const [error, setError] = useState(null);
     const [filters, setFilters] = useState({
       keyword: "",
     });
     const [newProduct, setNewProduct] = useState({
       name: "",
       price: "",
       category: "",
       brand: "",
       stock: "",
       description: "",
       image: null,
     });
     const categories = [
       "Engine & Drivetrain",
       "Suspension & Steering",
       "Brakes",
       "Electrical & Lighting",
       "Interior Accessories",
       "Wheels & Tires",
     ];
     const brands = ["Honda", "Toyota", "Hyndai", "Kia", "Suzuki", "Daihatsu"];


     const fetchProducts = async () => {
       setLoading(true);
       try {
         const { data } = await axiosInstance.get("/products", {
           params: {
             page,
             keyword: filters.keyword,
           },
         });
         setProducts(data.products);
         setTotalPages(data.pages);
       } catch (error) {
         console.error("Failed to fetch products:", error);
         setError("Failed to fetch products");
       } finally {
         setLoading(false);
       }
     };

     useEffect(() => {
       fetchProducts();
     }, [page, filters]);

     const handleInputChange = (e) => {
       const { name, value } = e.target;
       setNewProduct((prev) => ({
         ...prev,
         [name]: value,
       }));

       // If this is a keyword search, update filters
       if (name === "keyword") {
         setFilters((prev) => ({
           ...prev,
           keyword: value,
         }));
         setPage(1); // Reset to the first page when filters change
       }
     };

     const handleImageChange = async (e) => {
       const file = e.target.files[0];
       if (file) {
         try {
           // Convert image to base64
           const reader = new FileReader();
           reader.readAsDataURL(file);
           reader.onloadend = () => {
             setNewProduct((prev) => ({
               ...prev,
               image: reader.result, // base64 string
             }));
           };
         } catch (error) {
           console.error("Image conversion error:", error);
           setError("Failed to process image");
         }
       }
     };

   const handleSubmit = async (e) => {
     e.preventDefault();
     setError(null);

     // Validate all required fields
     const { name, price, category, brand, stock, description, image } =
       newProduct;
     if (
       !name ||
       !price ||
       !category ||
       !brand ||
       !stock ||
       !description ||
       !image
     ) {
       setError("Please fill in all fields");
       return;
     }

     try {
       // Log the data being sent to help with debugging
       console.log("Sending product data:", {
         name,
         price: parseFloat(price),
         category,
         brand,
         stock: parseInt(stock),
         description,
         image, // base64 image string
       });

       // Submit product
       const response = await axiosInstance.post("/products/create-product", {
         name,
         price: parseFloat(price),
         category,
         brand,
         stock: parseInt(stock),
         description,
         image, // base64 image string
       });

       // Log the response
       console.log("Product creation response:", response);

       // After successful submission
       fetchProducts(); // Refresh product list
       setIsModalOpen(false); // Close modal

       // Reset form
       setNewProduct({
         name: "",
         price: "",
         category: "",
         brand: "",
         stock: "",
         description: "",
         image: null,
       });

       // Optional: Show success message
       alert("Product created successfully!");
     } catch (error) {
       console.error("Failed to submit product:", error);

       // More detailed error logging
       if (error.response) {
         // The request was made and the server responded with a status code
         console.error("Error response data:", error.response.data);
         console.error("Error response status:", error.response.status);
         console.error("Error response headers:", error.response.headers);

         setError(error.response.data.message || "Failed to create product");
       } else if (error.request) {
         // The request was made but no response was received
         console.error("No response received:", error.request);
         setError("No response from server");
       } else {
         // Something happened in setting up the request
         console.error("Error setting up request:", error.message);
         setError("Error preparing product submission");
       }
     }
   };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        {type !== "analytics" && (
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Add New Product
          </button>
        )}
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          name="keyword"
          value={filters.keyword}
          onChange={handleInputChange}
          placeholder="Search by name"
          className="input input-bordered"
        />
      </div>
      {/* Product Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Status</th>
                {type !== "analytics" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span
                      className={`badge ${
                        product.stock > 20
                          ? "badge-success"
                          : product.stock > 0
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {product.stock > 20
                        ? "In Stock"
                        : product.stock > 0
                        ? "Low Stock"
                        : "Out of Stock"}
                    </span>
                  </td>
                  {type !== "analytics" && (
                    <td>
                      <div className="flex gap-2">
                        <Link className="btn btn-sm btn-info" to={`edit-product/${product._id}`}>Edit</Link>
                        <button className="btn btn-sm btn-error">Delete</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          className="btn btn-primary btn-sm rounded-md disabled:btn-disabled"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          Previous
        </button>

        <div className="join">
          {[...Array(Math.min(totalPages, 5))].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                className={`join-item btn btn-sm ${
                  page === pageNumber ? "btn-primary" : "btn-ghost"
                }`}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <div className="badge badge-primary badge-outline">
          Page {page} of {totalPages}
        </div>

        <button
          className="btn btn-primary btn-sm rounded-md disabled:btn-disabled"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      {/* Add Product Modal */}
      {isModalOpen && (
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

                {/* Brand Dropdown */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Brand</span>
                  </label>
                  <select
                    name="brand"
                    value={newProduct.brand}
                    onChange={handleInputChange}
                    className="select select-bordered"
                    required
                  >
                    <option value="">Select brand</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
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

                {/* Description Textarea */}
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
      )}
    </div>
  );
}
