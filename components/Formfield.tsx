"use client";

import { Controller, Control, FieldValues, Path,  PathValue, } from "react-hook-form";
import { TextField } from "@mui/material";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  defaultValue: PathValue<T, Path<T>>; // ✅ Accept defaultValue with correct type
}

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  defaultValue,
}: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue} // ✅ Pass correctly typed defaultValue
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          placeholder={placeholder}
          type={type}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          variant="outlined"
          margin="normal"
        />
      )}
    />
  );
};


export default FormField;
