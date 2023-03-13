import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
interface ICheckboxesTagsProps {
  onChange: any;
}

export default function CheckboxesTags({ onChange }: ICheckboxesTagsProps) {
  return (
    <Autocomplete
      onChange={onChange}
      fullWidth
      multiple
      options={top100Skills}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Skills" placeholder="Skills" />
      )}
    />
  );
}

const top100Skills = [
  "Node.js",
  "React.js",
  "Angular.js",
  "Vue.js",
  "Express.js",
  "Django",
  "Flask",
  "Laravel",
  "Ruby on Rails",
  "Spring",
  "ASP.NET",
  "java",
  "C#",
  "C++",
  "Python",
  "Embedded C",
  "Frontend",
  "Backend",
];
