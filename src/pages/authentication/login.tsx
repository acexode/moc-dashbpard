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
import logiIcon from "../../assets/loginImage.png";
import { app_title } from "../../constants";
import Logo from "../../components/Logo";
import LoginBG1 from "../../assets/loginBG1.png";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  // flexDirection:'row'
  background: "#252730",
  // '&::before': {
  //   content: '""',
  //   position: 'absolute',
  //   top: '0',
  //   right: 0,
  //   width: '100%',
  //   height: '100%',
  //   background: `url(${LoginBG1})`,
  //   // backgroundPosition: '2px 49px',
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'repeat',
  // },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  // maxWidth: '50vw',
  display: "flex",
  // backgroundColor: "hsl(142,63%,91%)",
  // boxShadow: theme.customShadows.z8,
  borderRadius: 0,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  // margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  // maxWidth: '50vw',

  // margin: "auto",
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
      {/* <div style={{background: `url(${LoginBG1})`, width: '300px', height: '300px', color: 'red'}}>lorem</div> */}

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
          <Stack
            direction="row"
            alignItems="center"
            textAlign={"center"}
            sx={{ mb: 5 }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ color: "#fff" }} variant="h4" gutterBottom>
                Sign in to Ministerial Oversight Committee Dashboard
              </Typography>
              <Typography sx={{ color: "#fff" }}>
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
