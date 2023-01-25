import styles from "@/styles/CustomComponent.module.css";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRef, useState } from "react";
import { inputStyle } from "./CustomInput";
import moment from "moment/moment";

const useStyles = {
  paper: {
    borderRadius: "20px",
    "& .MuiCalendarPicker-root *": {
      fontFamily: "MontserratAlt",
      color: "#222",
    },
    "& .MuiDayPicker-weekDayLabel": {
      fontWeight: 700,
    },
    "& .MuiPickersDay-today": {
      border: "1px solid #7C8993",
      backgroundColor: "#F5F5F5",
    },
    "& .Mui-selected": {
      color: "#FFF  !important",
      backgroundColor: "#FFB7B7 !important",
      fontWeight: 700,
    },
  },
  input: {
    "& .MuiIconButton-root": {
      marginRight: "4px",
      "&:hover": {
        background: "transparent",
        color: "var(--primary-color-dark)",
      },
    },
  },
  error: {
    "& fieldset": {
      borderColor: "#FD5B5B !important",
    },
  },
};

export default function CustomDatePicker({
  date = null,
  onChangeDate,
  style,
  required = false,
}) {
  const [value, setValue] = useState(date);
  const [error, setError] = useState(false);

  const selectedDate = useRef(null);

  const verifyDate = () => {
    if (required && selectedDate.current === null) {
      setError(true);
    } else if (error) {
      setError(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        className={styles.calendar}
        inputFormat="yyyy-MM-DD"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          selectedDate.current = newValue;
          onChangeDate && onChangeDate(moment(newValue).format("yyyy-MM-DD"));
        }}
        onClose={verifyDate}
        PaperProps={{ sx: useStyles.paper }}
        renderInput={(params) => (
          <TextField
            error={true}
            autoComplete="off"
            sx={[
              inputStyle.textField,
              useStyles.input,
              error ? useStyles.error : null,
              style ?? null,
            ]}
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
}
