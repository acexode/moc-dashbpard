// @ts-nocheck

import { useState } from "react";
import { Icon } from "@iconify/react";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import arrowIosDownwardFill from "@iconify/icons-eva/arrow-ios-downward-fill";
// material
import { useTheme } from "@mui/styles";
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
} from "@mui/material";
import { useAuthUserContext } from "../context/authUser.context";
import { levels } from "../constants";

// ----------------------------------------------------------------------

const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(5),
  color: theme.palette.text.primary,
}));

const ListItemStyle = styled((props) => (
  <ListItemButton  {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 43,
  position: "relative",
  textTransform: "capitalize",
  // paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 25,
  height: 25,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// ----------------------------------------------------------------------

function NavItem({ item, active, isShow }: any) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children ,isExternal} = item;
  const [open, setOpen] = useState(isActiveRoot);
  const {
    userState: { userProfile },
  } = useAuthUserContext();
  const handleOpen = () => {
    setOpen((prev: any) => !prev);
  };
  let stateName = userProfile?.firstName
 
  //
  const activeRootStyle = {
    color: "hsl(150, 100%, 34%)",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha("hsl(148, 37%, 59%)", theme.palette.action.selectedOpacity),
    "&:before": { display: "block" },
  };

  const activeSubStyle = {
    color: "hsl(150, 100%, 34%)",
    fontWeight: "fontWeightMedium",
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
            maxWidth: '170px'
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>

          {isShow && (
            <>
              <ListItemText disableTypography primary={title} />
              {info && info}
            </>
          )}
        </ListItemStyle>

        {isShow && (
          <Collapse in={open} timeout="auto" unmountOnExit sx={{position: 'relative'}}>
            <List component="div" disablePadding sx={{
                position: 'absolute',
                width: 'auto',
                background: '#212B36',
                display: 'flex',
                zIndex: '100',
                flexDirection: 'column',
                padding: '10px',
                top: '3.5rem',
                right: '0rem'
            }}>
              {children.map((item) => {
                const { title, path } = item;
            
                let newPath = title === "Progress Report" && userProfile?.level === levels.state ? `${path}/${stateName}` : path
                const isActiveSub = active(path);
                return (
                  <ListItemStyle
                    key={title}
                    component={RouterLink}
                    to={newPath}
                    onClick={() => handleOpen()}
                    sx={{
                      ...(isActiveSub && activeSubStyle),
                      padding: '16px 16px',
                     
                    }}
                  >
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: "flex",
                          borderRadius: "50%",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "text.disabled",
                          transition: (theme) =>
                            theme.transitions.create("transform"),
                          ...(isActiveSub && {
                            transform: "scale(2)",
                            bgcolor: "hsl(150, 100%, 34%)",
                          }),
                        }}
                      />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={title} />
                  </ListItemStyle>
                );
              })}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      target={isExternal ? '_blank' : '_self'}
      sx={{
        ...(isActiveRoot && activeRootStyle),
        maxWidth: '150px',
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      {isShow && (
        <>
          <ListItemText disableTypography primary={title} />
          {info && info}
        </>
      )}
    </ListItemStyle>
  );
}

export default function NavBarSection({ navConfig, isShow = true, ...other }) {
  const { pathname } = useLocation();
  const match = (path) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;
  return (
    <Box {...other}>
      {navConfig?.map((list) => {
        const { subheader, items } = list;
        return (
          <List style={{ display: "flex", justifyContent: 'left' }} key={subheader} disablePadding>
            {isShow && (
              <ListSubheaderStyle sx={{ color: "#fff" }}>
                {/* {subheader} */}
              </ListSubheaderStyle>
            )}
            {items.map((item) => (
              <NavItem
                key={item.title}
                item={item}
                active={match}
                isShow={isShow}
              />
            ))}
          </List>
        );
      })}
    </Box>
  );
}
