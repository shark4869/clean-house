import { Button, styled} from "@mui/material";
export const StyledOutlineButton = styled(Button)`
  	border-radius: 50px;
    min-width: 120px;
    color: #cf881d;
    background-color: #fff;
    border: 1px solid #cf881d;
    &:hover {
      background-color: #fff;
    }
`;

export const StyledFillButton = styled(Button)`
  	border-radius: 50px;
    min-width: 120px;
    color: #fff;
    background-color: #cf881d;
    &:hover {
      background-color: #cf881d;
    }
`;