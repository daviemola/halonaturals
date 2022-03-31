import React, { useState } from "react";
import validator from "validator";
import toast, { Toaster } from "react-hot-toast";

export default function SecondStep({ nextStep, handleFormData, values }) {
  const [error, setError] = useState(false);

  console.log(values);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(values.firstName) ||
      validator.isEmpty(values.lastName) ||
      validator.isEmpty(values.amazonOrderNo) ||
      validator.isEmpty(values.email) ||
      validator.isEmpty(values.addressLine1) ||
      validator.isEmpty(values.city) ||
      validator.isEmpty(values.town) ||
      validator.isEmpty(values.county) ||
      validator.isEmpty(values.specialOffers)
    ) {
      setError(true);
      toast.error("Fill all required fields.");
      // alert(error);
    } else {
      window.localStorage.setItem("values", JSON.stringify(values));
      nextStep();
    }
  };

  return (
    <div className="flex justify-center pb-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <form className="max-w-md w-full space-y-4" onSubmit={submitFormData}>
        <div>
          <p className="uppercase text-sm tracking-widest font-bold text-gray-500 pb-4  sm:text-left text-center">
            Step 2 of 4
          </p>
          <p className="text-gray-700 font-bold text-2xl uppercase sm:text-left text-center">
            PLEASE ENTER YOUR INFORMATION WITH YOUR AMAZON ORDER NUMBER
          </p>
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            First Name *
          </label>
          <input
            type="text"
            id="text"
            name="firstName"
            value={values.firstName}
            onChange={handleFormData("firstName")}
            className="border-2 border-gray-300 sm:w-3/4 w-full bg-white h-12 px-5 pr-16 rounded text-md focus:outline-none"
            placeholder="First Name"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Last Name *
          </label>
          <input
            type="text"
            id="text"
            name="lastName"
            value={values.lastName}
            onChange={handleFormData("lastName")}
            className="border-2 border-gray-300 sm:w-3/4 w-full bg-white h-12 px-5 pr-16 rounded text-md focus:outline-none"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Amazon Order Number (Include dashes) *
          </label>
          <input
            type="text"
            id="text"
            name="amazonOrderNo"
            value={values.amazonOrderNo}
            onChange={handleFormData("amazonOrderNo")}
            className="border-2 border-gray-300 sm:w-3/4 w-full bg-white h-12 px-5 pr-16 rounded text-md focus:outline-none"
            placeholder="Amazon Order Number"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email Address *
          </label>
          <input
            type="email"
            id="text"
            name="email"
            value={values.email}
            onChange={handleFormData("email")}
            className="border-2 border-gray-300 sm:w-3/4 w-full bg-white h-12 px-5 pr-16 rounded text-md focus:outline-none"
            placeholder="Email Address"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Address Line 1 *
          </label>
          <input
            type="text"
            id="text"
            name="addressLine1"
            value={values.addressLine1}
            onChange={handleFormData("addressLine1")}
            className="border-2 border-gray-300 sm:w-3/4 w-full bg-white h-12 px-5 pr-16 rounded text-md focus:outline-none"
            placeholder="Street Address"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Address Line 2
          </label>
          <input
            type="text"
            id="text"
            name="addressLine2"
            value={values.addressLine2}
            onChange={handleFormData("addressLine2")}
            className="border-2 border-gray-300 sm:w-3/4 w-full bg-white h-12 px-5 pr-16 rounded text-md focus:outline-none"
            placeholder="Street Address"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Town *
          </label>
          <input
            type="text"
            name="town"
            value={values.town}
            onChange={handleFormData("town")}
            className="border-2 border-gray-300 sm:w-3/4 w-full bg-white h-12 px-5 pr-16 rounded text-md focus:outline-none"
            placeholder="Town"
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={values.city}
            onChange={handleFormData("city")}
            className="border-2 border-gray-300 sm:w-3/4 w-full bg-white h-12 px-5 pr-16 rounded text-md focus:outline-none"
            placeholder="City"
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            County *
          </label>
          <input
            type="text"
            name="county"
            value={values.county}
            onChange={handleFormData("county")}
            className="border-2 border-gray-300 sm:w-3/4 w-full bg-white h-12 px-5 pr-16 rounded text-md focus:outline-none"
            placeholder="county"
            required
          />
        </div>
        <div className="mb-2">
          <fieldset>
            <p className="mb-2 text-gray-700">
              Would you love to recieve our offers? *
            </p>
            <div className="flex items-center mb-1">
              <input
                name="specialOffers"
                type="radio"
                value="yes"
                onChange={handleFormData("specialOffers")}
                className="form-radio h-4 w-4 text-gray-600"
              />
              <label className="block ml-2 font-medium text-sm text-gray-700">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                name="specialOffers"
                type="radio"
                value="No"
                onChange={handleFormData("specialOffers")}
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
