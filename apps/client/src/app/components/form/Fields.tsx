import React from 'react';
import { Control, ControllerRenderProps } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@pps-easy/ui/form';
import { Input } from '@pps-easy/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@pps-easy/ui/select';
import { formatDate } from '../../utils/validators';
import { FormValues } from '../../schema/event-form-schema';

interface InputFieldProps {
  control: Control<FormValues>;
  isDateField?: boolean;
  label: string;
  name: keyof FormValues;
  placeholder: string;
}

interface SelectFieldProps {
  control: Control<FormValues>;
  label: string;
  name: keyof FormValues;
  options: { value: string; label: string }[];
  placeholder: string;
}

const DATE_FIELD_MAX_LENGTH = 10;

export const InputField: React.FC<InputFieldProps> = ({
  control,
  isDateField = false,
  label,
  name,
  placeholder,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }: { field: ControllerRenderProps<FormValues, keyof FormValues> }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            {...field}
            value={field.value || ""}
            onChange={(event) => {
              const newValue = event.target.value;
              field.onChange(isDateField ? formatDate(newValue) : newValue);
            }}
            maxLength={isDateField ? DATE_FIELD_MAX_LENGTH : undefined}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const SelectField: React.FC<SelectFieldProps> = ({
  control,
  label,
  name,
  options,
  placeholder,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }: { field: ControllerRenderProps<FormValues, keyof FormValues> }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);
