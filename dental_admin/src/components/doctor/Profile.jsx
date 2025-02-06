import React, { useState, useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { CiCamera } from "react-icons/ci";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    qualification: "",
    experience: "",
    description: "",
    image: "",
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useLayoutEffect(() => {
    // fetches current details
    (async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/doctors/details`,
          { withCredentials: true }
        );
        if (res) {
          setFormData({ ...res.data.doctor, password: "" });
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch account details"
        );
      }
    })();
  }, []);

  const handleFormSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/doctors/update`,
        data,
        { withCredentials: true }
      );
      if (response) {
        toast.success(
          response.data.message || "Password Updated successfully!"
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to book appointment. Please try again."
      );
    }
  };

  /* 
  <div className='p-4 max-w-md mx-auto'>
    //    Form 
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white p-4 rounded-xl shadow-md'>
        <h1 className='text-2xl font-bold mb-4'>Update Password</h1>

        // Role Selection
        <div className='mb-4'>
          <label
            htmlFor='role'
            className='block text-sm font-medium text-gray-700'>
            Role
          </label>
          <select
            id='role'
            defaultValue='doctor'
            {...register("role", {
              required: "Role is required",
              onChange: (e) => setRole(e.target.value),
            })}
            className={`mt-1 block w-full border ${
              errors.role ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}>
            <option value=''>Select Role</option>
            <option value='doctor'>Doctor</option>
            <option value='receptionist'>Receptionist</option>
          </select>
          {errors.role && (
            <p className='text-red-500 text-sm mt-1'>{errors.role.message}</p>
          )}
        </div>

        // {User Name}
        <div className='mb-4'>
          <label
            htmlFor='receptionistName'
            className='block text-sm font-medium text-gray-700'>
            {role == "receptionist" ? "Receptionist name" : "Doctor Name"}
          </label>
          <input
            id='receptionistName'
            type='text'
            {...register("receptionistName", {
              required: "Receptionist's name is required",
            })}
            className={`mt-1 block w-full border ${
              errors.receptionistName ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder={`Enter ${role} name`}
          />
          {errors.receptionistName && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.receptionistName.message}
            </p>
          )}
        </div>

        // {New Password}
        <div className='mb-4'>
          <label
            htmlFor='Password'
            className='block text-sm font-medium text-gray-700'>
            New Password
          </label>
          <div className='relative'>
            <input
              id='newPassword'
              type={showPassword ? "text" : "password"}
              {...register("Password", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full border ${
                errors.Password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder='Enter new password'
            />
            {password.length > 0 && (
              <button
                type='button'
                onClick={() => setShowPassword((prev) => !prev)}
                className='absolute top-1/2 -translate-y-1/2 right-2'>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            )}
          </div>
          {errors.Password && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.Password.message}
            </p>
          )}
        </div>

        // {Confirm Password}
        <div className='mb-4'>
          <label
            htmlFor='confirmPassword'
            className='block text-sm font-medium text-gray-700'>
            Confirm Password
          </label>
          <div className='relative'>
            <input
              id='confirmPassword'
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) => {
                  const password = watch("Password"); // Retrieve the value of the Password field
                  return value === password || "Passwords do not match";
                },
              })}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`mt-1 block w-full border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder='Confirm new password'
            />
            {confirmpassword.length > 0 && (
              <button
                type='button'
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className='absolute top-1/2 -translate-y-1/2 right-2'>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            )}
          </div>

          {errors.confirmPassword && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        // {Submit Button}
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
          Update Password
        </button>
      </form>
    </div>
  */

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className='p-4 flex flex-col gap-20 mx-auto w-full lg:w-11/12 '>
        {/* Section 1 */}
        <div className='flex flex-col gap-6 justify-center items-center md:flex-row md:gap-60'>
          {/* image */}
          <div className='relative'>
            {/* <div className='bg-gray-400 w-40 h-40 rounded-full'></div> */}
            <img
              className='mx-auto bg-gray-400 w-40 h-40 rounded-full object-cover'
              src={formData.preview}
              alt=''
            />
            <div className='absolute bottom-0 right-0 z-10'>
              <label htmlFor='image'>
                <CiCamera className='text-5xl bg-white rounded-full p-2 cursor-pointer' />
              </label>
              <input
                type='file'
                id='image'
                accept='image/*'
                {...register("image", {
                  onChange: (e) => {
                    const file = e.target.files[0];
                    const fileReader = new FileReader();
                    fileReader.onload = function (e) {
                      setFormData((prev) => ({
                        ...prev,
                        preview: e.target.result,
                      }));
                    };
                    fileReader.readAsDataURL(file);
                    setFormData((prev) => ({
                      ...prev,
                      image: file,
                    }));
                  },
                })}
                className='hidden'
              />
            </div>
          </div>
          {/* details */}
          <div className='basis-1/2 flex flex-col gap-3'>
            <div className='text-2xl md:text-4xl'>Dr. Pakhre</div>
            <textarea
              className='resize-none w-[90vw] mx-auto h-40 border outline-none border-gray-400 px-3 py-1 rounded-md focus:border-blue-800 md:px-5 md:py-2 md:mx-0 md:w-auto'
              name='description'
              id='description'
              value={formData.description}
              {...register("description", {
                onChange: (e) => {
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                },
              })}
            />
          </div>
        </div>
        {/* Section 2 */}
        <div className='flex flex-col gap-6'>
          {/* Name */}
          <div className='flex flex-col gap-4 justify-center items-center md:flex-row'>
            <label
              className='w-full items-center grid text-lg md:w-1/3'
              htmlFor='name'>
              Name
            </label>
            <input
              className='w-full border outline-none border-gray-400 px-3 py-1 rounded-md focus:border-blue-800 md:px-5 md:py-2 md:w-2/3'
              type='text'
              name='name'
              id='name'
              value={formData.name}
              {...register("name", {
                onChange: (e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }));
                },
              })}
            />
          </div>
          {/* Email */}
          <div className='flex flex-col gap-4 justify-center items-center md:flex-row'>
            <label
              className='w-full items-center grid text-lg md:w-1/3'
              htmlFor='email'>
              Email
            </label>
            <input
              className='w-full border outline-none border-gray-400 px-3 py-1 rounded-md focus:border-blue-800 md:px-5 md:py-2 md:w-2/3'
              type='text'
              name='email'
              id='email'
              value={formData.email}
              {...register("email", {
                onChange: (e) => {
                  setFormData((prev) => ({ ...prev, email: e.target.value }));
                },
              })}
            />
          </div>
          {/* Password */}
          <div className='flex flex-col gap-4 justify-center items-center md:flex-row'>
            <label
              className='w-full items-center grid text-lg md:w-1/3'
              htmlFor='password'>
              Password
            </label>
            <input
              className='w-full border outline-none border-gray-400 px-3 py-1 rounded-md focus:border-blue-800 md:px-5 md:py-2 md:w-2/3'
              type='text'
              name='password'
              id='password'
              placeholder='Enter new password'
              value={formData.password}
              {...register("password", {
                onChange: (e) => {
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                },
              })}
            />
          </div>
          {/* Qualification */}
          <div className='flex flex-col gap-4 justify-center items-center md:flex-row'>
            <label
              className='w-full items-center grid text-lg md:w-1/3'
              htmlFor='qualification'>
              Qualification
            </label>
            <input
              className='w-full border outline-none border-gray-400 px-3 py-1 rounded-md focus:border-blue-800 md:px-5 md:py-2 md:w-2/3'
              type='text'
              name='qualification'
              id='qualification'
              value={formData.qualification}
              {...register("qualification", {
                onChange: (e) => {
                  setFormData((prev) => ({
                    ...prev,
                    qualification: e.target.value,
                  }));
                },
              })}
            />
          </div>
          {/* Experience */}
          <div className='flex flex-col gap-4 justify-center items-center md:flex-row'>
            <label
              className='w-full items-center grid text-lg md:w-1/3'
              htmlFor='experience'>
              Experience
            </label>
            <input
              className='w-full border outline-none border-gray-400 px-3 py-1 rounded-md focus:border-blue-800 md:px-5 md:py-2 md:w-2/3'
              type='text'
              name='experience'
              id='experience'
              value={formData.experience}
              {...register("experience", {
                onChange: (e) => {
                  setFormData((prev) => ({
                    ...prev,
                    experience: e.target.value,
                  }));
                },
              })}
            />
          </div>
          {/* Description */}
          {/* <div className='flex flex-col gap-4 items-center md:flex-row'>
              <label
                className='w-1/3 items-center grid text-lg'
                htmlFor='description'>
                Description
              </label>
              <input
                className='w-1/3 border outline-none border-gray-400 px-3 py-1 rounded-md focus:border-blue-800 md:px-5 md:py-2'
                type='text'
                name='description'
                id='description'
                value={formData.description}
                {...register("description", {
                  onChange: (e) => {
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  },
                })}
              />
            </div> */}
          {/* TODO */}
          <button
            className='w-fit mx-auto mt-3 text-white bg-blue-800 outline-none rounded-md px-3 py-1 focus:outline-blue-800 hover:bg-blue-700 md:px-5 md:py-2'
            type='submit'>
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Profile;
