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
        <FormLabel className="text-sm font-medium text-foreground">{label}</FormLabel>
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
            className="py-2 px-3 border border-border rounded-md focus:outline-none focus:ring focus:ring-primary transition duration-150 ease-in-out"
          />
        </FormControl>
        <FormMessage className="text-red-500 text-xs mt-1" />
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
        <FormLabel className="text-sm font-medium text-foreground">{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
          <FormControl>
            <SelectTrigger className="py-2 px-3 border border-border rounded-md focus:outline-none focus:ring focus:ring-primary transition duration-150 ease-in-out">
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
        <FormMessage className="text-red-500 text-xs mt-1" />
      </FormItem>
    )}
  />
);
