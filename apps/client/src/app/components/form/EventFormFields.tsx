import { FC, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { Control, ControllerRenderProps } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@pps-easy/ui/form';
import { Input } from '@pps-easy/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@pps-easy/ui/select';
import { EventFormValues } from '../../schema/event-form-schema';

interface InputFieldProps {
  control: Control<EventFormValues>;
  type?: HTMLInputTypeAttribute;
  label: string;
  max?: InputHTMLAttributes<HTMLInputElement>['max'];
  min?: InputHTMLAttributes<HTMLInputElement>['min'];
  name: keyof EventFormValues;
  placeholder: string;
}

interface SelectFieldProps {
  control: Control<EventFormValues>;
  label: string;
  name: keyof EventFormValues;
  options: { value: string; label: string }[];
  placeholder: string;
}

export const EventFormInputField: FC<InputFieldProps> = ({
  control,
  type = 'text',
  label,
  max,
  min,
  name,
  placeholder,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }: { field: ControllerRenderProps<EventFormValues, keyof EventFormValues> }) => (
      <FormItem>
        <FormLabel className="text-sm font-medium text-foreground">{label}</FormLabel>
        <FormControl>
          <Input
            className="py-2 px-3 border border-border rounded-md focus:outline-none focus:ring focus:ring-primary transition duration-150 ease-in-out"
            placeholder={placeholder}
            type={type}
            max={max}
            min={min}
            {...field}
          />
        </FormControl>
        <FormMessage className="text-red-500 text-xs mt-1" />
      </FormItem>
    )}
  />
);

export const EventFormSelectField: FC<SelectFieldProps> = ({
  control,
  label,
  name,
  options,
  placeholder,
}) => (
  <FormField
    control={control}
    name={name}
    render={({
      field,
    }: {
      field: ControllerRenderProps<EventFormValues, keyof EventFormValues>;
    }) => (
      <FormItem>
        <FormLabel className="text-sm font-medium text-foreground">
          {label}
        </FormLabel>
        <Select onValueChange={field.onChange} value={field.value?.toString()}>
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
