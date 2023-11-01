// ----------------------------------------------------------------------

export default function Autocomplete(theme:any) {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline  ": {
             borderColor: "hsl(150, 100%, 34%)",
           

             
          },
          "&.MuiAutocomplete-inputFocused":{
            color: "hsl(150, 100%, 34%)",
          }
        },
         
      }
    }
  };
}
