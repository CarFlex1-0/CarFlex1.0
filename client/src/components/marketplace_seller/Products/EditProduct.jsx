import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@services/axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    description: "",
    image: null,
  });
  const [error, setError] = useState(null);

  const categories = [
    "Engine & Drivetrain",
    "Suspension & Steering",
    "Brakes",
    "Electrical & Lighting",
    "Interior Accessories",
    "Wheels & Tires",
  ];

  const brands = ["Honda", "Toyota", "Hyndai", "Kia", "Suzuki", "Daihatsu"];

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/products/seller-specific-product/${id}`
        );
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        setError("Failed to fetch product details");
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Convert image to base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setProduct((prev) => ({
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
    const { name, price, category, brand, stock, description, image } = product;
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
      // Update product
      await axiosInstance.put(`/products/${id}`, {
        name,
        price: parseFloat(price),
        category,
        brand,
        stock: parseInt(stock),
        description,
        image, // base64 image string
      });

      // Redirect to products page
    //   navigate.push("/products");
    } catch (error) {
      console.error("Failed to update product:", error);
      setError("Failed to update product");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      {error && <div className="alert alert-error shadow-lg mb-6">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              className="input input-bordered"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              name="category"
              value={product.category}
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

          <div className="form-control">
            <label className="label">
              <span className="label-text">Brand</span>
            </label>
            <select
              name="brand"
              value={product.brand}
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

          <div className="form-control">
            <label className="label">
              <span className="label-text">Stock</span>
            </label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              placeholder="Enter stock quantity"
              className="input input-bordered"
              required
              min="0"
            />
          </div>

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

          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              className="textarea textarea-bordered h-24"
              required
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" className="btn btn-primary">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
