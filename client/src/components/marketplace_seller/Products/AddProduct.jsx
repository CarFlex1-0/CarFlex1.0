import { FaUpload } from "react-icons/fa";
export default function AddProduct({
  handleSubmit,
  newProduct,
  handleInputChange,
  categories,
  brands,
  handleImageChange,
  setIsModalOpen,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="custom-backdrop rounded-xl shadow-xl w-full max-w-3xl">
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4">Add Car Part</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xl font-normal text-white mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-gray-500 border-gray-600 outline-none bg-gray-800 rounded-lg shadow-xl text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-normal text-white mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-gray-500 border-gray-600 outline-none bg-gray-800 rounded-lg shadow-xl text-white"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-xl font-normal text-white mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-gray-500 border-gray-600 outline-none bg-gray-800 rounded-lg shadow-xl text-white"
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

              <div>
                <label className="block text-xl font-normal text-white mb-1">
                  Brand
                </label>
                <select
                  name="brand"
                  value={newProduct.brand}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-gray-500 border-gray-600 outline-none bg-gray-800 rounded-lg shadow-xl text-white"
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

              <div>
                <label className="block text-xl font-normal text-white mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  placeholder="Enter stock quantity"
                  className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-gray-500 border-gray-600 outline-none bg-gray-800 rounded-lg shadow-xl text-white"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-xl font-normal text-white mb-1">
                  Car Part Image
                </label>
                <div className="relative">
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    required
                  />
                  {/* Custom-styled button with React Icon */}
                  <button
                    type="button"
                    className="flex items-center justify-center w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <FaUpload className="mr-2 text-white" /> Choose File
                  </button>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xl font-normal text-white mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-gray-500 border-gray-600 outline-none bg-gray-800 rounded-lg shadow-xl text-white h-24"
                  required
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounde bg-blue-600 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
