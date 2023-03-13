import { Field } from "formik";
import CheckboxesTags from "./CheckboxesTags";

const CheckboxesTagsField = ({ name, label, ...rest }: any) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <CheckboxesTags
          {...field}
          {...rest}
          label={label}
          onChange={(event: any, value: any) => {
            form.setFieldValue(name, value);
          }}
        />
      )}
    </Field>
  );
};

export default CheckboxesTagsField;
