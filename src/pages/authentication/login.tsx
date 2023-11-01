// @ts-nocheck

import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Card, Stack, Link, Container, Typography } from "@mui/material";
// routes
import { PATH_AUTH } from "../../routes/paths";

// layouts
// components
import Page from "../../components/Page";
import { MHidden } from "../../components/@material-extend";
import LoginForm from "../../components/authentication/login";
import logiIcon from "../../assets/login.png";
import { app_title } from "../../constants";
import Logo from "../../components/Logo";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    // flexDirection:'row'
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  backgroundColor: "#212B36",
  color: "#fff",
  boxShadow: theme.customShadows.z8,
  flexDirection: "column",
  justifyContent: "center",
  // margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title={`Login | ${app_title}`}>
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 2 }}>
            Welcome!
          </Typography>
          <Typography textAlign="justify" variant="span" sx={{ px: 5, mt: 1, mb: 5 }}>
          This Platform will enable you have real time access to vital information on  M&E Activities of the BHCPF Program in Nigeria. You can track the utilisation of funds for the provision of basic healthcare services and generate reports to share with stakeholders.
          </Typography>
          <img src={logiIcon} alt="login" width={320} height={250} />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 5,
              alignItems: "center",
            }}
          >
            <Logo />
          </Stack>
          <Stack direction="row" alignItems="center" textAlign={"center"} sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Sign in to {app_title} Dashboard
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Enter your details below
              </Typography>
            </Box>
          </Stack>

          <LoginForm />

          {/* <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link
                variant="subtitle2"
                component={RouterLink}
                to={PATH_AUTH.register}
              >
                Get started
              </Link>
            </Typography>
          </MHidden> */}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
