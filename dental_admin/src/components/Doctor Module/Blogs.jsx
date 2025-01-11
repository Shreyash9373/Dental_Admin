import React, { useState } from "react";
import axios from "axios"; // Import Axios for making API requests

const Blogs = () => {
  const [isFormVisible, setIsFormVisible] = useState(false); // To toggle the blog form
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    image: null,
  });

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  // Handle file input change for image
  const handleFileChange = (e) => {
    setBlogData({ ...blogData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(); // Using FormData for file upload
      formData.append("title", blogData.title);
      formData.append("content", blogData.content);
      formData.append("image", blogData.image);

      // Make a POST request to the API endpoint
      const response = await axios.post("http://localhost:5000/api/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Blog created successfully:", response.data);

      // Clear the form and close it
      setBlogData({ title: "", content: "", image: null });
      setIsFormVisible(false);
      alert("Blog post created successfully!");
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create the blog post.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <p className="mb-4">View the blogs here</p>

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
          onSubmit={handleFormSubmit}
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
              name="title"
              id="title"
              value={blogData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Blog Content
            </label>
            <textarea
              name="content"
              id="content"
              value={blogData.content}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="5"
              placeholder="Enter blog content"
              required
            ></textarea>
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
              name="image"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
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
