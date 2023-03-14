import { PhotoCamera } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  styled,
  Switch,
} from "@mui/material";
import CheckboxesTags from "components/common/CheckboxesTags";
import LightTextField from "components/LightTextField";
import { Small } from "components/Typography";
import { useFormik } from "formik";
import useTitle from "hooks/useTitle";
import { FC } from "react";
import * as Yup from "yup";
const experienceOptions = [
  { value: 0, label: "No experience" },
  { value: 1, label: "1 year" },
  { value: 2, label: "2 years" },
  { value: 3, label: "3 years" },
  { value: 4, label: "4 years" },
  { value: 5, label: "5 years" },
  { value: 6, label: "6 years" },
  { value: 7, label: "7 years" },
  { value: 8, label: "8 years" },
  { value: 9, label: "9 years" },
  { value: 10, label: "10 years" },
];
// styled components
const ButtonWrapper = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[200]
      : alpha(theme.palette.primary[100], 0.1),
}));

const UploadButton = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  border: "2px solid",
  alignItems: "center",
  justifyContent: "center",
  borderColor: theme.palette.background.paper,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[400]
      : alpha(theme.palette.background.paper, 0.9),
}));

const SwitchWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: 10,
}));

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "8px",
    border: "2px solid",
    borderColor:
      theme.palette.mode === "light"
        ? theme.palette.secondary[300]
        : theme.palette.divider,
  },
  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.secondary[300],
  },
}));

const AddNewUser: FC = () => {
  // change navbar title
  useTitle("Add New Job");
  //[companyName,city, state, country, yearsOfExperience, jobType, technologies, , ]//
  const initialValues = {
    jobTitle: "",
    jobDescription: "",
    jobType: "",
    yearsOfExperienceMin: 0,
    yearsOfExperienceMax: 0,
    Skills: [],
    city: "",
    address: "",
  };

  const validationSchema = Yup.object().shape({
    jobTitle: Yup.string().required("Name is Required!"),
    jobType: Yup.string().required("jobType is Required!"),
    yearsOfExperienceMin: Yup.number().required(
      "Minimum years of experience is required"
    ),
    yearsOfExperienceMax: Yup.number().when("yearsOfExperienceMin", {
      is: (val: number) => val > 0,
      then: Yup.number().min(
        Yup.ref("yearsOfExperienceMin"),
        "Maximum years of experience must be greater than or equal to minimum"
      ),
    }),
    Skills: Yup.array().required("Skills is Required!"),

    city: Yup.string().required("City is Required!"),
    address: Yup.string().required("Address is Required!"),

    jobDescription: Yup.string().required("job Description is Required!"),
  });

  const { values, errors, handleChange, handleSubmit, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: () => {
        console.log("submit", values);
      },
    });

  return (
    <Box pt={2} pb={4}>
      <Card sx={{ padding: 4 }}>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Card
              sx={{
                padding: 3,
                boxShadow: 2,
                minHeight: 400,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ButtonWrapper>
                <UploadButton>
                  <label htmlFor="upload-btn">
                    <input
                      accept="image/*"
                      id="upload-btn"
                      type="file"
                      style={{ display: "none" }}
                    />
                    <IconButton component="span">
                      <PhotoCamera sx={{ fontSize: 26, color: "white" }} />
                    </IconButton>
                  </label>
                </UploadButton>
              </ButtonWrapper>

              <Small
                marginTop={2}
                maxWidth={200}
                lineHeight={1.9}
                display="block"
                textAlign="center"
                color="text.disabled"
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
              </Small>

              <Box maxWidth={250} marginTop={5} marginBottom={1}>
                <SwitchWrapper>
                  <Small display="block" fontWeight={600}>
                    Show Company Name
                  </Small>
                  <Switch defaultChecked />
                </SwitchWrapper>
              </Box>
            </Card>
          </Grid>
          <Grid item md={8} xs={12}>
            <Card sx={{ padding: 3, boxShadow: 2 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      label="job Title"
                      name="jobTitle"
                      placeholder="job Title"
                      value={values.jobTitle}
                      onChange={handleChange}
                      error={Boolean(touched.jobTitle && errors.jobTitle)}
                      helperText={touched.jobTitle && errors.jobTitle}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{ color: "#1d2438" }}
                      >
                        job Type
                      </InputLabel>
                      <StyledSelect
                        fullWidth
                        name="jobType"
                        label="job Type"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.jobType}
                        onChange={handleChange}
                        error={Boolean(touched.jobType && errors.jobType)}
                      >
                        <MenuItem value={30}>full-time</MenuItem>
                        <MenuItem value={20}>part-time</MenuItem>
                        <MenuItem value={10}>Temporary</MenuItem>
                      </StyledSelect>
                    </FormControl>
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel
                        id="years-of-experience-min-label"
                        sx={{ color: "#1d2438" }}
                      >
                        Minimum Years of Experience
                      </InputLabel>
                      <StyledSelect
                        fullWidth
                        label="years-of-experience-min-label"
                        labelId="years-of-experience-min-label"
                        id="years-of-experience-min-label"
                        name="yearsOfExperienceMin"
                        value={values.yearsOfExperienceMin}
                        onChange={handleChange}

                        // error={Boolean(
                        //   touched.yearsOfExperienceMin &&
                        //     errors.yearsOfExperienceMin
                        // )}
                      >
                        {experienceOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </StyledSelect>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel
                        id="years-of-experience-max-label"
                        sx={{ color: "#1d2438" }}
                      >
                        Maximum Years of Experience
                      </InputLabel>
                      <StyledSelect
                        fullWidth
                        label="years-of-experience-max-label"
                        labelId="years-of-experience-max-label"
                        id="years-of-experience-max-label"
                        name="yearsOfExperienceMax"
                        value={values.yearsOfExperienceMax}
                        onChange={handleChange}
                        disabled={values.yearsOfExperienceMin === 0}
                        // error={Boolean(
                        //   touched.yearsOfExperienceMin &&
                        //     errors.yearsOfExperienceMin
                        // )}
                      >
                        {experienceOptions
                          .filter(
                            (option: any) =>
                              option.value >= values.yearsOfExperienceMin
                          )
                          .map((option: any, index: number) => (
                            <MenuItem key={option.value} value={option.value}>
                              {index === 0 ? "+" : option.label}
                            </MenuItem>
                          ))}
                        {values.yearsOfExperienceMin === 0 && (
                          <MenuItem value={0}>0</MenuItem>
                        )}
                      </StyledSelect>
                    </FormControl>
                  </Grid>

                  <Grid item sm={12} xs={12}>
                    <CheckboxesTags
                      onChange={(event: any, value: any) => {
                        setFieldValue("Skills", value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <LightTextField
                      multiline
                      fullWidth
                      rows={10}
                      name="jobDescription"
                      label="job Description"
                      placeholder="job Description"
                      value={values.jobDescription}
                      onChange={handleChange}
                      error={Boolean(
                        touched.jobDescription && errors.jobDescription
                      )}
                      helperText={
                        touched.jobDescription && errors.jobDescription
                      }
                      sx={{
                        "& .MuiOutlinedInput-root textarea": { padding: 0 },
                      }}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="city"
                      placeholder="City"
                      value={values.city}
                      onChange={handleChange}
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="address"
                      placeholder="Address"
                      value={values.address}
                      onChange={handleChange}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>

                  {/* <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="zip"
                      placeholder="Zip/Code"
                      value={values.zip}
                      onChange={handleChange}
                      error={Boolean(touched.zip && errors.zip)}
                      helperText={touched.zip && errors.zip}
                    />
                  </Grid> */}

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained">
                      Create Job
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default AddNewUser;
