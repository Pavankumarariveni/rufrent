import React from "react";
import FormInput from "./FormInput";
import ImagePreview from "./ImagePreview";
import tailwindStyles from "../../utils/tailwindStyles";

const PropertyForm = ({
  panels,
  currentStep,
  formData,
  handleInputChange,
  errors,
  loading,
  imagePreviews,
  handleRemoveImage,
  openImageModal,
  handleSubmit,
  handleNext,
  totalSteps,
  setCurrentStep,
}) => {
  const renderInputs = (inputs) => {
    return inputs
      .filter(
        (input) => input.name !== "rental_low" && input.name !== "rental_high"
      ) // Exclude individual "rental_low" and "rental_high"
      .map((input, idx) => {
        if (input.type === "radio") {
          return (
            <div key={idx} className="col-span-1">
              <label className="block text-gray-700 mb-2">{input.label}</label>
              <div className="flex space-x-4">
                {input.options.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      name={input.name}
                      value={option.value}
                      data-id={option.id}
                      checked={formData.maintenance == option.id}
                      onChange={handleInputChange}
                      className="form-radio"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {errors[input.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[input.name]}
                </p>
              )}
            </div>
          );
        }

        if (input.label === "Monthly Rental") {
          return (
            <div key="monthly-rental" className="col-span-1">
              {/* Group Label */}
              <label className="block text-gray-700 mb-2">{input.label}</label>
              {/* Two Input Boxes: Min and Max */}
              <div className="flex space-x-4">
                <input
                  type="number"
                  name="rental_low"
                  value={formData.rental_low || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder={`Min `}
                />
                <input
                  type="number"
                  name="rental_high"
                  value={formData.rental_high || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Max"
                />
              </div>
              {/* Error Messages */}
              {(errors.rental_low || errors.rental_high) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.rental_low || errors.rental_high}
                </p>
              )}
            </div>
          );
        }

        return (
          <div key={idx} className="col-span-1">
            <label className="block text-gray-700 mb-2">{input.label}</label>
            <FormInput
              input={input}
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
              loading={loading}
            />
          </div>
        );
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderInputs(panels[currentStep - 1])}
        {imagePreviews.length > 0 && currentStep === totalSteps && (
          <ImagePreview
            imagePreviews={imagePreviews}
            handleRemoveImage={handleRemoveImage}
            openImageModal={openImageModal}
          />
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          className={`${tailwindStyles.thirdButton} px-6 py-2 rounded-md`}
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          className={`${tailwindStyles.secondaryButton} px-6 py-2 rounded-md`}
          onClick={currentStep === totalSteps ? handleSubmit : handleNext}
        >
          {currentStep === totalSteps ? "Submit" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
