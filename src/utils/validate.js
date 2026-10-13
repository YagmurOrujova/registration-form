export const validate = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Enter your name";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email.trim() || !emailRegex.test(values.email)) {
    errors.email = "Enter a valid email";
  }

  if (!values.password || values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!values.gender) {
    errors.gender = "Select a gender";
  }

  if (values.interests.length === 0) {
    errors.interests = "Select at least one option";
  }

  if (!values.city) {
    errors.city = "Select a city";
  }

  return errors;
};