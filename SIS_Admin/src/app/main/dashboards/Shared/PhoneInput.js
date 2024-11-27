import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const MainPhoneInput = ({
  id,
  placeholder,
  variant = "outlined",
  data,
  required,
  label,
  fullWidth,
  errorMessage,
  marginBottom,
  setValue,
}) => {
  return (
    <div className="flex flex-col gap-5" style={{ marginBottom }}>
      <PhoneInput
        {...data}
        country="ng"
        // onlyCountries={["lr"]}
        onChange={(value, country) => {
          if (setValue) {
            data.onChange(`+${value}`);
            setValue(`${data.name}_country`, country?.dialCode);
          } else {
            data.onChange(value);
          }
        }}
        placeholder={placeholder}
        inputStyle={{ width: "100%" }}
        // isValid={!errorMessage}
        // (value, country) => {
        //   const InputValue = value.replace(country.dialCode, "");
        //   if (InputValue?.length === 10 && !errorMessage) {
        //     setError(data.name,{type:"custom",message:"Enter valid phone number"})
        //     return true;
        //   }
        //   clearError(data.name)
        //   return false;
        // }
        inputProps={{
          required: true,
        }}
      />
      {errorMessage ? (
        <p style={{ fontSize: "1.2rem", color: "#f44336", marginLeft: "14px" }}>
          {errorMessage}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default MainPhoneInput;
