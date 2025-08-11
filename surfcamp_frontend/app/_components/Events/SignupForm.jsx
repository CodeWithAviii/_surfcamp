"use client";
import { useState } from "react";
import TextInputs from "../TextInput";
import axios from "axios";
import { allDataFilledIn } from "@/utils/validation.utils";
import { generateSignupPayload } from "@/utils/strapi.utils";

const SignupForm = ({
  infoText,
  headline,
  buttonLabel,
  pricing,
  eventId = null,
}) => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false);


  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = generateSignupPayload(formData, eventId);

    if (allDataFilledIn(formData)) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/participants`,
          payload
        );
        console.log(response);
        setShowConfirmation(true);
      } catch (error) {
        // console.log(error.response?.data?.error?.message);
        setShowError(
          error.response?.data?.error?.message || "Something went wrong"
        );
      }
    } else {
      setShowError("Please fill in all fields.");
    }
  };
  return (
    <section className="signup-form">
      <div className="signup-form__info">
        <h3 className="signup-form__headline">{headline}</h3>
        {infoText}
      </div>
      {showConfirmation ? (
        <div className="signup-form__form">
          <h4>Thank you for signing up. We will get in touch soon!</h4>
        </div>
      ) : (
        <form className="signup-form__form" onSubmit={onSubmit}>
          <div className="signup-form__name-container">
            <TextInputs
              inputName="firstName"
              value={formData.firstName}
              onChange={onChange}
              label="First Name"
            />
            <TextInputs
              inputName="lastName"
              value={formData.lastName}
              onChange={onChange}
              label="Last Name"
            />
          </div>
          <TextInputs
            inputName="email"
            value={formData.email}
            onChange={onChange}
            label="Your e-mail address"
          />
          <TextInputs
            inputName="phone"
            value={formData.phone}
            onChange={onChange}
            label="Your telephone number"
          />

          {showError && <p className="copy signup-form__error">{showError}</p>}
          <button className="btn btn--medium btn--turquoise" type="submit">
            {buttonLabel || "Stay in touch!"}
          </button>

          {pricing && (
            <div className="signup-form__pricing">
              <h3>Pricing Information</h3>
              <p className="copy">
                Single Price:{" "}
                <span className="bold">{pricing.singlePrice}$ per person</span>
              </p>
              <p className="copy">
                Shared Price:{" "}
                <span className="bold">{pricing.sharedPrice}$ per person</span>
              </p>
            </div>
          )}
        </form>
      )}
    </section>
  );
};

export default SignupForm;
