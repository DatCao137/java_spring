import * as React from 'react'

function CalendarPickerCss() {
  return (
    <>
      {`
.jpcalendar {
  display: inline-block;
  position: relative;
  width: auto;
  vertical-align: top;
  z-index: 1; /* Ensure jpcalendar is not overridden */
}

.jpcalendar input {
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  box-sizing: border-box;
  z-index: 10;
  width: 100%;
}

.jpcalendar-popup {
  position: absolute;
  top: calc(100% + 8px); /* Display right below the input */
  left: 0;
  width: 320px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 999999; /* Place popup on top of everything */
  animation: fadeIn 0.3s ease-in-out;
  box-shadow: -2px -2px 15px -15px rgba(24, 50, 98, 0.8), 5px 5px 15px 7px rgba(156, 156, 156, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header */
.jpcalendar-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: #ee887a; /* Light red color */
  color: #fff;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  border-radius: 10px 10px 0 0;
}

.jpcalendar-header h2 {
  margin: 6px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  width: 100%;
}

.jpcalendar-header select,
.jpcalendar-header button {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.jpcalendar-header select {
  background-color: #fff;
  color: #333;
  margin: 0 4px;
}

.jpcalendar-header button {
  background-color: #28a745;
  color: #fff;
}

.jpcalendar-header button:hover {
  background-color: #218838;
}

/* Body */
.jpcalendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 columns for days of the week */
  font-size: 12px; /* Small font size */
}

/* Day names (days of the week) */
.jpcalendar-body.day-names div {
  font-weight: bold;
  background-color: #f8f8f8;
  padding: 4px;
  text-align: center;
  color: #333; /* Default text color */
}

/* Weekend */
.jpcalendar-body.day-names div:nth-child(1),
.jpcalendar-body.day-names div:nth-child(7) {
  color: #d9534f; /* Red color for weekends */
}

/* Days */
.jpcalendar-month,
.jpcalendar-day {
  padding: 6px;
  text-align: center;
  border: 1px solid #f0f0f0;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease-in-out;
  font-weight: 500;
  background-color: #fff; /* Default background */
  color: #333; /* Default text color */
}

.jpcalendar-month.disabled,
.jpcalendar-day.disabled {
  color: #ccc;
  cursor: not-allowed;
  background-color: #f5f5f5;
}

.jpcalendar-month.weekend,
.jpcalendar-day.weekend {
  background-color: #fef1ec; /* Light background for weekends */
  color: #d9534f; /* Light red color */
}

.jpcalendar-month:hover,
.jpcalendar-day:hover {
  background-color: #f5d7d0; /* Background on hover */
}

/* Today */
.jpcalendar-month.today,
.jpcalendar-day.today {
  background-color: #e6f7ff; /* Light blue color */
  color: #007bff; /* Blue text color */
  font-weight: bold;
}

/* Selected day */
.jpcalendar-month.selected,
.jpcalendar-day.selected {
  background-color: #c82333; /* Dark red color */
  color: #ffffff;
}

/* Range (selected range) */
.jpcalendar-month.range-start,
.jpcalendar-day.range-start {
  background-color: #c82333;
  color: #ffffff;
  border-top-left-radius: 50%;
}

.jpcalendar-month.range-hover,
.jpcalendar-day.range-hover {
  background-color: #c82333;
  color: #ffffff;
}

.jpcalendar-month.range-end,
.jpcalendar-day.range-end {
  background-color: #c82333;
  color: #ffffff;
  border-bottom-right-radius: 50%;
}

.jpcalendar-month.in-range,
.jpcalendar-day.in-range {
  background-color: #c82333 !important;
  color: #ffffff !important;
}

.jpcalendar-month.range-hover .jpcalendar-dot,
.jpcalendar-day.range-hover .jpcalendar-dot,
.jpcalendar-month.in-range .jpcalendar-dot,
.jpcalendar-day.in-range .jpcalendar-dot {
  background-color: lawngreen !important;
}

/* Dot (small dot below the day) */
.jpcalendar-month .jpcalendar-dot,
.jpcalendar-day .jpcalendar-dot {
  position: absolute;
  bottom: 2px;
  left: 2px;
  width: 5px;
  height: 5px;
  background-color: red;
  border-radius: 50%;
}

.jpcalendar-month.selected .jpcalendar-dot,
.jpcalendar-day.selected .jpcalendar-dot {
  background-color: #fff;
}

/* Tooltip (display holiday name) */
.jpcalendar-tooltip {
  position: relative;
  top: 4px; /* Align to the top */
  right: 4px; /* Align to the right */
}

.jpcalendar-tooltip .jpcalendar-tooltiptext {
  visibility: hidden;
  width: 150px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px;
  position: absolute;
  z-index: 1000;
  bottom: 125%; /* Place tooltip above */
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}

.jpcalendar-tooltip:hover .jpcalendar-tooltiptext {
  visibility: visible;
  opacity: 1;
}

.jpcalendar-tooltip .jpcalendar-tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%; /* Arrow below the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #333 transparent transparent transparent;
}

/* Months (months of the year) */
.jpcalendar-body.months {
  grid-template-columns: repeat(4, 1fr);
}

.jpcalendar-month {
  margin: 1px;
  padding: 20px;
}

.jpcalendar-month.range-start {
  border-top-left-radius: 70%;
  border-bottom-left-radius: 70%;
}

.jpcalendar-month.range-end {
  border-top-right-radius: 70%;
  border-bottom-right-radius: 70%;
}


/* Footer */
.jpcalendar-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px;
  border-top: 1px solid #ddd;
  background-color: #f8f9fa;
  border-radius: 0 0 10px 10px;
}

.jpcalendar-footer button {
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.jpcalendar-footer .clear-btn {
  background-color:rgb(95, 95, 95);
  color: white;
}

.jpcalendar-footer .clear-btn:hover {
  background-color:rgb(120, 120, 120);
}

.jpcalendar-footer .cancel-btn {
  background-color: #dc3545;
  color: white;
}

.jpcalendar-footer .cancel-btn:hover {
  background-color: #c82333;
}

.jpcalendar-footer .submit-btn {
  background-color: #007bff;
  color: white;
}

.jpcalendar-footer .submit-btn:hover {
  background-color: #0056b3;
}

`}
    </>
  )
}

export { CalendarPickerCss }
