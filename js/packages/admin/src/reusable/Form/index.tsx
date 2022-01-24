import * as React from 'react';
import _ from 'lodash';
import {
  Formik,
  FormikValues,
  FormikConfig,
  FormikHelpers,
  FieldHookConfig,
  FieldConfig as FormikFieldConfig,
  FieldValidator as FormikFieldValidator,
  useFormikContext,
  useField as useFormikField,
  FormikContextType,
  FieldMetaProps as FormikMetaProps,
  FieldHelperProps as FormikFieldHelperProps,
  FormikState,
} from 'formik';
import * as Yup from 'yup';

export type FormContextType<T> = FormikContextType<T>;
export type FormValues = FormikValues;
export type FormHelpers<T> = FormikHelpers<T>;
export type FieldValidator = FormikFieldValidator;
export type FieldHelpersProps<T> = FormikFieldHelperProps<T>;
export type FieldMetaProps<T> = FormikMetaProps<T>;
export type FieldHookProps<T> = FieldHookConfig<T> | string;
export type FieldConfig<T> = FormikFieldConfig<T>;
export type FormState<T> = FormikState<T>;

export type FormSubmitter<T> = (values: T, helpers: FormHelpers<T>) => void;
export type FormValidator<T> = (validate: T, errors: FormErrors<T>) => void;
export type FormConfig<T> = Omit<
  FormikConfig<T>,
  'onSubmit' | 'validate' | 'validationSchema'
> & {
  onSubmit: FormSubmitter<T>;
  validate?: FormValidator<T>;
  validationSchema?: Yup.ObjectSchema<T>;
};
export type FormErrors<T> = { [K in keyof T]?: string };

// Trailing comma added to fix parser confusion aroudn generic type parameter
// declarations and JSX grammar
// https://github.com/microsoft/TypeScript/issues/15713
export const useField = <V,>(
  arg: FieldHookProps<V>
): {
  value: V;
  setValue: (value: V) => void;
} & FieldMetaProps<V> &
  FieldHelpersProps<V> => {
  const [, { value, ...meta }, { setValue, ...fieldHelpers }] = useFormikField<
    V
  >(arg);
  return {
    value,
    setValue,
    ...meta,
    ...fieldHelpers,
  };
};

interface CustomFormContext {
  validationActionReady: boolean;
  setValidationActionReady: (boolean) => void;
}
const defaultCustomFormContext = {
  validationActionReady: false,
  setValidationActionReady: (): void => {},
};

const CustomContext = React.createContext<CustomFormContext>(
  defaultCustomFormContext
);

interface ExtendedFormHelpers<T extends FormValues> {
  setFormFieldValues: (fields: Partial<T>, shouldValidate?: boolean) => void;
}

export const useForm = <T extends FormValues>(): FormContextType<T> &
  CustomFormContext &
  ExtendedFormHelpers<T> => {
  const formikContext = useFormikContext<T>();
  const customFormContext = React.useContext(CustomContext);

  const { setFieldValue } = formikContext;

  const setFormFieldValues = React.useCallback(
    (fields: Partial<T>, shouldValidate?: boolean): void => {
      for (const f in fields) {
        setFieldValue(f, fields[f], shouldValidate);
      }
    },
    [setFieldValue]
  );

  return { ...formikContext, ...customFormContext, setFormFieldValues };
};

/**
 * Hook that simply sets up the two fields,
 * validationActionReady and setValidationActionReady,
 * that we supply to the context
 */
const useValidationActionReady = (): CustomFormContext => {
  const [validationActionReady, setValidationAction] = React.useState(false);

  const setValidationActionReady = React.useCallback((b) => {
    setValidationAction(b);
  }, []);

  return {
    validationActionReady,
    setValidationActionReady,
  };
};

export const validateUsingSchema = <T extends FormValues>(
  validationSchema: Yup.ObjectSchema<T>,
  values,
  errors
): void => {
  validationSchema
    .validate(values, {
      strict: true,
      abortEarly: false,
      sync: true,
    })
    .catch((err) => {
      for (const fieldError of err.inner) {
        _.set(errors, fieldError.path, fieldError.errors.join(','));
      }
    });
};

export const mergeValidationSchema = <T extends FormValues>(
  ...schemas: Yup.ObjectSchema<T>
): Yup.ObjectSchema<T> => {
  const [first, ...rest] = schemas;

  const merged = rest.reduce(
    (mergedSchemas, schema) => mergedSchemas.concat(schema),
    first
  );

  return merged;
};

const ReusableForm = <T extends FormValues>({
  initialValues,
  validate,
  validationSchema,
  onSubmit,
  children,
  validateOnMount,
}: FormConfig<T>): React.ReactElement => {
  const {
    validationActionReady,
    setValidationActionReady,
  } = useValidationActionReady();

  return (
    <Formik
      initialValues={initialValues}
      validate={(values: T): FormErrors<T> => {
        const errors: FormErrors<T> = {};
        validationSchema
          ? validateUsingSchema(validationSchema, values, errors)
          : validate(values, errors);
        if (_.isEmpty(errors)) {
          setValidationActionReady(true);
        }
        return errors;
      }}
      validateOnMount={validateOnMount}
      validateOnBlur={false}
      onSubmit={(values: T, formikHelpers: FormHelpers<T>): void => {
        const { setSubmitting, resetForm } = formikHelpers;
        // resetForm to empty
        const resetToInitial = ({ values }): void =>
          resetForm({ values: { ...values }, isSubmitting: true });
        // adding formik helpers
        onSubmit(values, {
          ...formikHelpers,
          setSubmitting,
          resetForm: resetToInitial,
        });
        // needed to stop validation from being called
        setValidationActionReady(false);
        setSubmitting(false);
      }}
    >
      <CustomContext.Provider
        value={{ validationActionReady, setValidationActionReady }}
      >
        {children}
      </CustomContext.Provider>
    </Formik>
  );
};

export default ReusableForm;
