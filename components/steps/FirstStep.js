import React, { useState } from "react";
import validator from "validator";
import toast, { Toaster } from "react-hot-toast";

export default function FirstStep({ nextStep, handleFormData, values }) {
  const [error, setError] = useState(false);

  console.log(values);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(values.product) ||
      validator.isEmpty(values.satisfaction) ||
      validator.isEmpty(values.datePurchased) ||
      validator.isEmpty(values.seven_days_use)
    ) {
      toast.error("Fill all required fields.");
    } else {
      window.localStorage.setItem("values", JSON.stringify(values));
      nextStep();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <form className="max-w-md w-full space-y-8" onSubmit={submitFormData}>
        <div>
          <p className="uppercase text-sm tracking-widest font-bold text-gray-500 pb-4">
            Step 1 of 4
          </p>
          <p className="text-gray-700 font-bold text-2xl uppercase">
            Please Fill in the form.
          </p>
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Which product have you purchased?
          </label>
          <select
            name="product"
            onChange={handleFormData("product")}
            className="border-2 border-gray-300 sm:w-3/4 w-full bg-white h-12 px-5 pr-16 rounded text-md focus:outline-none"
          >
            <option></option>
            <option value="Vegan D3 drops for babies">
              Vegan D3 drops for babies
            </option>
          </select>
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Date purchased
          </label>
          <input
            type="date"
            id="datePurchased"
            name="datePurchased"
            max={new Date().toISOString().split("T")[0]}
            value={values.datePurchased}
            onChange={handleFormData("datePurchased")}
            className="border-2 border-gray-300 sm:w-3/4 w-full bg-white h-12 px-5 rounded text-md focus:outline-none"
            placeholder="Date purchased"
            required
          />
        </div>
        <div className="mb-2">
          <fieldset>
            <div className="flex items-center mb-2">
              <input
                name="satisfaction"
                type="radio"
                value="very satisfied"
                // value={values.satisfaction}
                onChange={handleFormData("satisfaction")}
                className="form-radio h-4 w-4 text-gray-600"
              />
              <label className="block ml-2 font-medium text-sm text-gray-700">
                Very Satisfied
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="satisfaction"
                // value={values.satisfaction}
                value="somewhat satisfied"
                onChange={handleFormData("satisfaction")}
                className="form-radio h-4 w-4 text-gray-600"
              />
              <label className="block ml-2 font-medium text-sm text-gray-700">
                Somewhat Satisfied
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="satisfaction"
                value="somewhat or neither satisfied"
                onChange={handleFormData("satisfaction")}
                className="form-radio h-4 w-4 text-gray-600"
              />
              <label className="block ml-2 font-medium text-sm text-gray-700">
                Neither Satisified or Somewhat Satisfied
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="satisfaction"
                value="somewhat dissatisfied"
                onChange={handleFormData("satisfaction")}
                className="form-radio h-4 w-4 text-gray-600"
              />
              <label className="block ml-2 font-medium text-sm text-gray-700">
                Somewhat Disatisfied
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="satisfaction"
                value="Very dissatisfied"
                onChange={handleFormData("satisfaction")}
                className="form-radio h-4 w-4 text-gray-600"
              />
              <label className="block ml-2 font-medium text-sm text-gray-700">
                Very Dissatisfied
              </label>
            </div>
          </fieldset>
        </div>
        <div className="mb-2">
          <fieldset>
            <p className="mb-2 text-gray-700">
              Have you been using this product for at least 7 days?
            </p>
            <div className="flex items-center mb-1">
              <input
                name="seven_days_use"
                type="radio"
                value="yes"
                onChange={handleFormData("seven_days_use")}
                className="form-radio h-4 w-4 text-gray-600"
              />
              <label className="block ml-2 font-medium text-sm text-gray-700">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                name="seven_days_use"
                type="radio"
                value="No"
                onChange={handleFormData("seven_days_use")}
                className="form-radio h-4 w-4 text-gray-600"
              />
              <label className="block ml-2 font-medium text-sm text-gray-700">
                No
              </label>
            </div>
          </fieldset>
        </div>
        <button
          type="submit"
          className="bg-gray-800 text-white py-2 rounded uppercase font-semibold px-4"
        >
          continue
        </button>
      </form>
    </div>
  );
}
