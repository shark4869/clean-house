import { FormControl, styled} from "@mui/material";
const StyleFormControl = styled(FormControl)`
  .MuiOutlinedInput-root {
    transition: 0.5s;
    height: 50px;
  }
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: #cf881d;
    transition: 0.5s;
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #cf881d;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiInputAdornment-root {
    color: #cf881d;
  }
`;
export default StyleFormControl;