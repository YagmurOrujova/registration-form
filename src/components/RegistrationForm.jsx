import { useState } from "react";
import { INTERESTS, CITIES, GENDERS } from "../data/options";
import { validate } from "../utils/validate";
import "./RegistrationForm.css";



const initialValues = {
  name: "",
  email: "",
  password: "",
  gender: "",
  interests: [],
  city: "",
  note: "",
};


export default function RegistrationForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setSuccess(false);
  };


  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter((item) => item !== value),
    }));
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccess(true);
      setValues(initialValues);
    } else {
      setSuccess(false);
    }
  };



  return (
    <div className="page">
      <form onSubmit={handleSubmit} className="form" noValidate>
        <h2 className="title">Registration Form</h2>

        {success && <div className="success">Form submitted successfully!</div>}

        <div className="group">
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="input"
            placeholder="Enter your name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="group">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="input"
            placeholder="example@mail.com"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="group">
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className="input"
            placeholder="At least 6 characters"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="group">
          <label className="label">Gender</label>
          <div className="row">
            {GENDERS.map((g) => (
              <label key={g} className="inline">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={values.gender === g}
                  onChange={handleChange}
                />
                {g}
              </label>
            ))}
          </div>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>

        <div className="group">
          <label className="label">Interests</label>
          <div className="row">
            {INTERESTS.map((item) => (
              <label key={item} className="inline">
                <input
                  type="checkbox"
                  value={item}
                  checked={values.interests.includes(item)}
                  onChange={handleCheckbox}
                />
                {item}
              </label>
            ))}
          </div>
          {errors.interests && <span className="error">{errors.interests}</span>}
        </div>

        <div className="group">
          <label className="label">City</label>
          <select
            name="city"
            value={values.city}
            onChange={handleChange}
            className="input"
          >
            <option value="">-- Select a city --</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        <div className="group">
          <label className="label">Note</label>
          <textarea
            name="note"
            value={values.note}
            onChange={handleChange}
            rows={4}
            className="input"
            placeholder="Your additional note..."
          />
        </div>

        <button type="submit" className="button">
          Submit
        </button>
        
      </form>


    </div>
  );
}