import React, { useEffect, useState } from "react";
import SimpleLoader from "../SimpleLoader";
import axios from "axios";
import { IoClose, IoStarOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { toast } from "react-toastify";

const Reviews = () => {
  const [filterRating, setFilterRating] = useState(5);
  const [reviews, setReviews] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState("");

  // useEffect to fetch reviews
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/visits/reviews`,
          { params: { rating: filterRating }, withCredentials: true }
        );
        setReviews(response.data.reviews);
      } catch (error) {
        console.log(error);
        setReviews(null);
      }
    })();
  }, [filterRating]);

  const handleReviewChange = (visitId, checked) => {
    (async () => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URI}/api/visits/${visitId}/review`,
          { shown: checked },
          { params: { rating: filterRating }, withCredentials: true }
        );
        toast.success(response.data.message);
        setReviews((prev) => {
          const newReviews = [...prev].map((r) =>
            r.visitId === visitId ? { ...r, shown: checked } : r
          );
          return newReviews;
        });
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    })();
  };

  if (reviews === undefined)
    return (
      <div className='text-5xl w-full h-1/2 flex justify-center items-center'>
        <SimpleLoader />
      </div>
    );

  if (reviews === null)
    return (
      <div className='font-light text-gray-400 text-5xl w-full h-1/2 flex justify-center items-center'>
        Something went wrong
      </div>
    );

  return (
    <div className='flex flex-col gap-10 py-6 md:py-10'>
      {/* Filter options */}
      <div className='flex gap-5 ml-auto mr-4'>
        <select
          name='rating'
          id='rating'
          className='rounded-md border border-gray-400 divide-y divide-gray-400 outline-none focus:border-blue-500 px-3 py-1 md:px-5 md:py-2'
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              Rating ({rating})
            </option>
          ))}
        </select>
        <button className='border border-gray-400 text-blue-500 px-3 py-1 bg-white rounded-md md:px-5 md:py-2'>
          Reset
        </button>
      </div>
      {/* Review list */}
      <div className='flex flex-col gap-4 divide-y divide-gray-400 [&>*]:py-4'>
        {reviews.length === 0 ? (
          <div className='h-[50vh] font-light text-center text-xl md:text-2xl lg:text-3xl'>
            No reviews
          </div>
        ) : (
          reviews.map((review, index) => (
            <div
              key={index}
              className='px-1 py-1 flex justify-between items-center md:py-2'>
              <div
                onClick={(e) => {
                  setModalDescription(review.description);
                  setIsModalOpen(true);
                }}
                className='cursor-pointer flex items-center gap-4'>
                <span
                  className={`text-lg ${
                    review.shown ? "font-medium" : "text-gray-600"
                  } md:text-xl`}>
                  {review.name}
                </span>
                {/* rating stars */}
                <div className='flex gap-1 items-center'>
                  {new Array(review.rating).fill(null).map((r, index) => (
                    <IoStar key={index} className='text-xl text-yellow-500' />
                  ))}
                  {new Array(5 - review.rating).fill(null).map((r, index) => (
                    <IoStarOutline
                      key={index}
                      className='text-xl text-yellow-500'
                    />
                  ))}
                </div>
              </div>
              <input
                className='accent-blue-800 w-4 h-4'
                type='checkbox'
                name='shown'
                id='shown'
                checked={review.shown}
                onChange={(e) =>
                  handleReviewChange(review.visitId, e.target.checked)
                }
              />
            </div>
          ))
        )}

        {/* selected review */}
        {/* <div className='px-1 py-1 flex justify-between items-center md:py-2'>
          <span className='text-lg font-medium md:text-xl'>Patient name</span>
          <input
            className='accent-blue-800 w-4 h-4'
            type='checkbox'
            name='shown'
            id='shown'
            checked={true}
          />
        </div> */}

        {/* not selected review */}
        {/* <div className='px-1 py-1 flex justify-between items-center md:py-2'>
          <span className='text-lg text-gray-600 md:text-xl'>Patient name</span>
          <input
            className='accent-blue-800 w-4 h-4'
            type='checkbox'
            name='shown'
            id='shown'
            checked={false}
          />
        </div> */}
      </div>
      {isModalOpen && (
        <div
          onBlur={(e) => setIsModalOpen(false)}
          className='absolute inset-0 z-50 flex justify-center items-center'>
          {/* overlay */}
          <div className='absolute inset-0 z-10 bg-black/60'></div>
          {/* form */}
          <div className='absolute z-20 w-11/12 h-1/2 rounded-md flex justify-center items-center bg-white lg:w-9/12 lg:h-4/5'>
            {/* close button */}
            <button
              onClick={(e) => {
                setModalDescription("");
                setIsModalOpen(false);
              }}
              className='absolute top-1 right-1'>
              <IoClose className='text-gray-600 text-xl lg:text-3xl' />
            </button>
            {/* description field */}
            <textarea
              autoFocus={true}
              className='resize-none w-10/12 h-1/2 mx-auto px-3 py-1 rounded-md border outline-none border-gray-400 disabled:bg-gray-200 focus:border-blue-500 md:px-5 md:py-2 '
              name='description'
              id='description'
              placeholder='No Description'
              value={modalDescription}
              disabled={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
