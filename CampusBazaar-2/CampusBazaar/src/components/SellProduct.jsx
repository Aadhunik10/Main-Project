import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const SellProduct = ({ onProductAdded }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");

    const token = localStorage.getItem("campusBazaarToken");
    if (!token) {
      setError("You must be logged in to list a product.");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.itemName);
    formData.append("category", data.category);
    formData.append("condition", data.condition || "Used");
    formData.append("price", data.price);
    formData.append("location", data.location);
    formData.append("description", data.description);
    formData.append("phone", data.phone);
    formData.append("image", data.image[0]);

    try {
      const response = await fetch(`${API_BASE_URL}/api/products/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.detail || JSON.stringify(result));
        return;
      }

      setSuccess("Product listed successfully.");
      reset();
      setPreview(null);
      if (onProductAdded) {
        onProductAdded(result);
      }
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError("Unable to connect to the backend. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9F1] py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-[#DDEBDC]">

        <h1 className="text-3xl font-bold text-center text-[#39542C] mb-8">
          Sell Your Product
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Seller Name */}
          <div>
            <label className="block font-semibold mb-2">
              Seller Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              {...register("sellerName", {
                required: "Seller name is required",
              })}
              className="w-full border rounded-lg p-3"
            />

            <p className="text-red-500 text-sm">
              {errors.sellerName?.message}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-2">
              Seller Email
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full border rounded-lg p-3"
            />

            <p className="text-red-500 text-sm">
              {errors.email?.message}
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="block font-semibold mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="98XXXXXXXX"
              {...register("phone", {
                required: "Phone number is required",
              })}
              className="w-full border rounded-lg p-3"
            />

            <p className="text-red-500 text-sm">
              {errors.phone?.message}
            </p>
          </div>

          {/* Item Name */}
          <div>
            <label className="block font-semibold mb-2">
              Item Name
            </label>

            <input
              type="text"
              placeholder="Enter item name"
              {...register("itemName", {
                required: "Item name is required",
              })}
              className="w-full border rounded-lg p-3"
            />

            <p className="text-red-500 text-sm">
              {errors.itemName?.message}
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-2">
              Category
            </label>

            <select
              {...register("category", {
                required: "Select a category",
              })}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Category</option>
              <option>Books</option>
              <option>Electronics</option>
              <option>Calculator</option>
              <option>Furniture</option>
              <option>Notes</option>
              <option>Sports</option>
              <option>Others</option>
            </select>

            <p className="text-red-500 text-sm">
              {errors.category?.message}
            </p>
          </div>

          {/* Condition */}
          <div>
            <label className="block font-semibold mb-2">
              Item Condition
            </label>

            <select
              {...register("condition")}
              className="w-full border rounded-lg p-3"
            >
              <option>New</option>
              <option>Like New</option>
              <option>Good</option>
              <option>Used</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold mb-2">
              Price (Rs.)
            </label>

            <input
              type="number"
              placeholder="Enter price"
              {...register("price", {
                required: "Price is required",
              })}
              className="w-full border rounded-lg p-3"
            />

            <p className="text-red-500 text-sm">
              {errors.price?.message}
            </p>
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-2">
              Pickup Location
            </label>

            <input
              type="text"
              placeholder="Example: Pokhara, Lamachaur"
              {...register("location", {
                required: "Location is required",
              })}
              className="w-full border rounded-lg p-3"
            />

            <p className="text-red-500 text-sm">
              {errors.location?.message}
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-2">
              Item Description
            </label>

            <textarea
              rows="5"
              placeholder="Describe your product..."
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border rounded-lg p-3 resize-none"
            ></textarea>

            <p className="text-red-500 text-sm">
              {errors.description?.message}
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-semibold mb-2">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Please upload an image",
              })}
              onChange={(e) => {
                if (e.target.files[0]) {
                  setPreview(
                    URL.createObjectURL(e.target.files[0])
                  );
                }
              }}
              className="w-full border rounded-lg p-2"
            />

            <p className="text-red-500 text-sm">
              {errors.image?.message}
            </p>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-5 w-56 h-56 object-cover rounded-lg border shadow"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#4CBB17] hover:bg-[#48872B] text-white font-semibold py-3 rounded-lg transition"
          >
            List Product
          </button>

        </form>

      </div>
    </div>
  );
};

export default SellProduct;