//ANIKET
import React, { useState } from "react";
import axios from "axios";

const AddEvent = () => {
  const [isFormVisible, setIsFormVisible] = useState(false); // Toggle form visibility
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: null,
  });

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Handle file input for image upload
  const handleFileChange = (e) => {
    setEventData({ ...eventData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(); // FormData for file upload
      formData.append("title", eventData.title);
      formData.append("date", eventData.date);
      formData.append("time", eventData.time);
      formData.append("location", eventData.location);
      formData.append("description", eventData.description);
      formData.append("image", eventData.image);

      // API POST request
      const response = await axios.post(
        "http://localhost:5000/api/events",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true, // Include cookies in the request
        }
    );

      console.log("Event created successfully:", response.data);

      // Clear the form
      setEventData({ date: "", time: "", location: "", description: "", image: null });
      setIsFormVisible(false);
      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create the event.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Events</h1>

      {/* Button to toggle form */}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isFormVisible ? "Cancel" : "Add New Event"}
      </button>

      {/* Event Form */}
      {isFormVisible && (
        <form
          onSubmit={handleFormSubmit}
          className="mt-4 bg-gray-100 p-4 rounded shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Event Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={eventData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Event Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={eventData.date}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Event Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              value={eventData.time}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Event Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={eventData.location}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter event location"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Event Description
            </label>
            <textarea
              name="description"
              id="description"
              value={eventData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Enter event description"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Event Image
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
            Post Event
          </button>
        </form>
      )}
    </div>
  );
};

export default AddEvent;
