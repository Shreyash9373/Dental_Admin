import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

const EditAppointment = ({ appointment, onSave, onCancel }) => {
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      name: appointment?.name || "",
      time: appointment?.time || "",
    },
  });

  // Reset form values whenever the appointment prop changes
  useEffect(() => {
    if (appointment) {
      setValue("name", appointment.name);
      setValue("time", appointment.time);
    }
  }, [appointment, setValue]);

  const onSubmit = (data) => {
    onSave(data);  // Pass edited data back to parent
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Edit Appointment</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Patient Name
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                />
              )}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="time"
                  className="w-full px-3 py-2 border rounded"
                />
              )}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointment;
