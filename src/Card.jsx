import React, { useState } from 'react';
import img1 from "./assets/icon-arrow.svg";
import "./Card.css";

const Card = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({ days: '- -', months: '- -', years: '- -' });
  const [errors, setErrors] = useState({ day: "", month: "", year: "" });

  const validateFields = () => {
    validateDay(day);
    validateMonth(month);
    validateYear(year);
  };

  const validateDay = (value) => {
    setErrors((prevState) => ({
      ...prevState,
      day: !value ? "This field is required" : value > 31 ? "Enter a valid day" : "",
    }));
  };

  const handleDayChange = (event) => {
    const value = event.target.value;
    setDay(value);
    validateDay(value);
  };

  const validateMonth = (value) => {
    setErrors((prevState) => ({
      ...prevState,
      month: !value ? "This field is required" : value > 12 ? "Enter a valid month" : "",
    }));
  };

  const handleMonthChange = (event) => {
    const value = event.target.value;
    setMonth(value);
    validateMonth(value);
  };

  const validateYear = (value) => {
    setErrors((prevState) => ({
      ...prevState,
      year: !value ? "This field is required" : !/^\d{4}$/.test(value) ? "Enter a valid year" : parseInt(value, 10) > new Date().getFullYear() ? "Enter a past year" : "",
    }));
  };

  const handleYearChange = (event) => {
    const value = event.target.value;
    setYear(value);
    validateYear(value);
  };

  const handleCalculateAge = () => {
    validateFields();

    // Check if there are any errors before calculating age
    if (!errors.day && !errors.month && !errors.year && day && month && year) {
      const birthDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      const ageResult = calculateAge(birthDate);
      setAge(ageResult);
    } else {
      console.error('Please fix form errors before calculating age.');
    }
  };

  const calculateAge = (birthDateStr) => {
    const birthDateObj = new Date(birthDateStr);
    if (isNaN(birthDateObj.getTime())) {
      return { days: '- -', months: '- -', years: '- -' };
    }

    const currentDate = new Date();
    const totalDays = (currentDate - birthDateObj) / (1000 * 60 * 60 * 24);

    const years = Math.floor(totalDays / 365);
    const remainingDaysAfterYears = totalDays - (years * 365);
    const months = Math.floor(remainingDaysAfterYears / 30);
    const remainingDays = Math.floor(remainingDaysAfterYears % 30);

    return { days: remainingDays, months: months, years: years };
  };

  const handleErrorClass = (fieldName) => errors[fieldName] ? `i-c-i ${fieldName} error` : `i-c-i ${fieldName}`;

  const displayFieldErrorMessage = (fieldName) => errors[fieldName] ? <p className="error-m">{errors[fieldName]}</p> : null;

  return (
    <>
      <div className="container flex">
        <div className="card">
          <div className="input-content">
            <div className={handleErrorClass("day")}>
              <h3>DAY</h3>
              <input
                value={day}
                type="text"
                id="Dayi"
                placeholder="DD"
                maxLength={2}
                onChange={handleDayChange}
                autoComplete="off"
              />
              {displayFieldErrorMessage("day")}
            </div>
            <div className={handleErrorClass("month")}>
              <h3>MONTH</h3>
              <input
                value={month}
                type="text"
                id="Month-i"
                placeholder="MM"
                maxLength={2}
                onChange={handleMonthChange}
                autoComplete="off"
              />
              {displayFieldErrorMessage("month")}
            </div>
            <div className={handleErrorClass("year")}>
              <h3>YEAR</h3>
              <input
                value={year}
                type="text"
                id="Year-i"
                placeholder="YYYY"
                maxLength={4}
                onChange={handleYearChange}
                autoComplete="off"
              />
              {displayFieldErrorMessage("year")}
            </div>
          </div>
          <div className="button-c">
            <div className="border"></div>
            <button onClick={handleCalculateAge}>
              <img src={img1} alt="Calc-Button" />
            </button>
          </div>
          <div className="Output-content">
            <div className="Output-years">
              <span>{age.years}</span>
              <h3>years</h3>
            </div>
            <div className="Output-months">
              <span>{age.months}</span>
              <h3>months</h3>
            </div>
            <div className="Output-days">
              <span>{age.days}</span>
              <h3>day</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
