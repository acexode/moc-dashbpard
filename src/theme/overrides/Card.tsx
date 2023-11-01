// ----------------------------------------------------------------------

export default function Card(theme:any) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          // boxShadow: theme.customShadows.z8,
          background:"#FFF",
          borderRadius: theme.shape.borderRadius,
          position: 'relative',
          zIndex: 0, // Fix Safari overflow: hidden with border radius
          paddingBottom:theme.spacing(3),
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: {
          variant: 'body2',
          // marginBottom: theme.spacing(0.5)
        }
      },
      styleOverrides: {
        root: {
          // padding: theme.spacing(3, 3, 3)
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        }
      }
    }
  };
}
