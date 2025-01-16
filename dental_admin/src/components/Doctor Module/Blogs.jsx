import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const Blogs = () => {
  const [isFormVisible, setIsFormVisible] = useState(false); // To toggle the blog form

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const formData = new FormData(); // Using FormData for file upload
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("image", data.image[0]); // File input is an array

      // Make a POST request to the API endpoint
      const response = await axios.post(
        "http://localhost:4000/api/doctor/add-blog",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true, // Include cookies in the request
        }
    );

    if (response && response.status === 200) {
      toast.success("Blog added successfully");
  }

      console.log("Blog created successfully:", response.data);

      // Reset the form and close it
      reset();
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create the blog post.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Blogs</h1>

      {/* Button to open the form */}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isFormVisible ? "Cancel" : "Create Blog Post"}
      </button>

      {/* Blog Post Form */}
      {isFormVisible && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 bg-gray-100 p-4 rounded shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Blog title is required" })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter blog title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Blog Content
            </label>
            <textarea
              id="description"
              {...register("description", { required: "Blog content is required" })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="5"
              placeholder="Enter blog content"
            ></textarea>
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Blog Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image", { required: "Blog image is required" })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Post Blog
          </button>
        </form>
      )}
    </div>
  );
};

export default Blogs;