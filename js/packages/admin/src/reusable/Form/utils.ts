import * as React from "react";
import _ from "lodash";
import { useForm } from "src/reusable/Form";
import usePrevious from "src/reusable/hooks/usePrevious";

/**
 * Hook to be used within a Form component.
 * Can be passed a variable number of string arguments that are the names
 * of other fields in the form.
 * If the values of any of those fields is falsy the hook returns false,
 * and otherwise true.
 *
 * @param fieldNames An array of strings that are field names in the form
 */
export const useAwaitFields = <T extends {}>(
  ...fieldNames: Array<keyof T>
): boolean => {
  const {
    values: { ...fields },
  } = useForm<T>();

  return fieldNames.reduce((prev, curr): boolean => {
    return prev && fields[curr] ? true : false;
  }, true);
};

/**
 * Hook to be used within a Form component.
 * Since FormValidator functions shouldn't be performing/dispatching async actions,
 * this hook can be used to run actions after validation has been run succesfully.
 * It makes use of validationActionReady and setValidationActionReady, two fields we
 * have added to the form context, as Formik's built in isValidating is only toggled
 * on the validation run immediately prior to submission
 * https://github.com/jaredpalmer/formik/issues/1624
 *
 * @param action A function that takes form values as a parameter
 * @param runOnSubmit Boolean value that specifies whether to run the action on
 * validation prior to submission
 */
export const useValidationAction = <T extends {}>({
  action,
  runOnSubmit,
}: {
  action: (values: T) => void;
  runOnSubmit: boolean;
}): void => {
  const {
    values,
    isSubmitting,
    validationActionReady,
    setValidationActionReady,
  } = useForm<T>();
  const oldValues = usePrevious(values);

  React.useEffect(() => {
    if (
      !_.isEqual(values, oldValues) &&
      validationActionReady &&
      (!isSubmitting || runOnSubmit)
    ) {
      setValidationActionReady(false);
      action(values);
    }
  });
};

/**
 * Pure function.
 * Used to generate fieldNames for nested objects and arrays using Formik's notations
 * @param path Variadic arguments used to indicate path to desired object from top level form state
 */
export const generateFieldName = (...path: (string | number)[]): string => {
  return (
    (_.reduce(path, (prev, curr) => {
      if (typeof curr === "number") {
        return `${prev}[${curr}]`;
      } else {
        return `${prev}.${curr}`;
      }
    }) as string) || ""
  );
};

export type StrictNullCheck<T> = { [K in keyof T]-?: NonNullable<T[K]> };
