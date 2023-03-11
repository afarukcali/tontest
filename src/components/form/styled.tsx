import { Box, styled, Typography } from "@mui/material";

const StyledTxLoaderContent = styled(Box)({
  textAlign: "center",
  "& p": {
    fontSize: 18,
    fontWeight: 500,
  },
});

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "stretch",
  gap: 30,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: 30,
  },
}));

const StyledDescription = styled(Box)(({ theme }) => ({
  position: "relative",
  background: "#fff",
  borderRadius: 16,
  border: "0.5px solid rgba(114, 138, 150, 0.24)",
  boxShadow: "0px 2px 16px rgb(114 138 150 / 8%)",

  "& p": {
    fontSize: 16,
    lineHeight: "24px",
  },
  [theme.breakpoints.down("md")]: {
    "& p": {
      fontSize: 14,
      lineHeight: "20px",
    },
  },
}));

const ScreenHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: "#161C28",
  fontSize: 44,
  [theme.breakpoints.down("md")]: {
    fontSize: 28,
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(8),
  },
}));

const FormWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "stretch",
  gap: theme.spacing(5),
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));

const SubHeadingWrapper = styled(Box)(({ theme }) => ({
  flex: 5,
  background: "#FFFFFF",
  border: "0.5px solid rgba(114, 138, 150, 0.24)",
  boxShadow: "0px 2px 16px rgba(114, 138, 150, 0.08)",
  borderRadius: "24px",
  padding: theme.spacing(3),
}));

const FormHeading = styled(Typography)(({ theme }) => ({
  color: "#161C28",
  fontSize: 20,
  fontWeight: 800,
  marginBottom: theme.spacing(3),
}));

export { StyledDescription, StyledContainer, StyledTxLoaderContent, ScreenHeading, FormWrapper, SubHeadingWrapper, FormHeading };

const StyledForm = styled("form")({
  overflow: "hidden",
});

const StyledFormInputs = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 17,
});

const StyledActionBtn = styled(Box)({
  marginTop: 30,
  marginBottom: 10,
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
  "& .base-button": {
    maxWidth: 400,
    width: "100%",
  },
});

const JettonFormTitle = styled(Typography)({
  color: "#161C28",
  fontSize: 20,
  fontWeight: 800,
  marginBottom: 0.5,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: 300,
});

const CenteringWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export { CenteringWrapper, StyledForm, StyledFormInputs, StyledActionBtn, JettonFormTitle };
