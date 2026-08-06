import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type CommonFieldProps = {
  label: string;
  id: string;
  description?: string;
  inputClassName?: string;
  textareaClassName?: string;
};

type InputFieldProps = CommonFieldProps &
  InputHTMLAttributes<HTMLInputElement> & {
    textarea?: false;
  };

type TextAreaFieldProps = CommonFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    textarea: true;
  };

type FormFieldProps = InputFieldProps | TextAreaFieldProps;

export function FormField(props: FormFieldProps) {
  const { label, id, description, textarea, inputClassName, textareaClassName, ...rest } = props;

  if (textarea) {
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        {description ? <p className="text-sm text-slate-500">{description}</p> : null}
        <textarea
          id={id}
          className={textareaClassName ?? "min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      {description ? <p className="text-sm text-slate-500">{description}</p> : null}
      <input
        id={id}
        className={inputClassName ?? "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"}
        {...(rest as InputHTMLAttributes<HTMLInputElement>)}
      />
    </div>
  );
}
