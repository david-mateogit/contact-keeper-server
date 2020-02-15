import React, { useState, useEffect } from "react";
import { Rifm } from "rifm";
import { AsYouType } from "libphonenumber-js";

const PhoneFormat = ({ phoneNumber, clearInput }) => {
  const [phone, setPhone] = useState("");

  useEffect(() => {
    phoneNumber(phone);
    if (clearInput) {
      setPhone("");
    }
    // eslint-disable-next-line
  }, [ clearInput, phone]);

  const parseDigits = string => {
    return (string.match(/\d+/g) || []).join("");
  };
  const formatPhone = string => {
    const digits = parseDigits(string).substr(0, 10);
    return new AsYouType("US").input(digits);
  };

  return (
    <Rifm
      accept={/\d+/g}
      mask={phone.length < 6 && /[^\d]+/.test(phone[3]) ? undefined : phone.length >= 14}
      format={formatPhone}
      value={phone}
      onChange={setPhone}
    >
      {renderInput}
    </Rifm>
  );
};

const renderInput = ({ value, onChange }) => {
  return (
    <input
      type="tel"
      name="phone"
      placeholder="Phone"
      value={value}
      onChange={onChange}
    />
  );
};
export default PhoneFormat;
