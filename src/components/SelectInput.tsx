import { FC } from "react";
import { styled } from "@mui/system";
import close from "@iconify/icons-eva/close-outline";
import { Icon } from '@iconify/react';
import { MIconButton } from "./@material-extend";
const Label = styled("label")({
  display: "block",
});

const Input = styled("input")(({ theme }) => ({
  width: 200,
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  color: theme.palette.mode === "light" ? "#000" : "#fff",
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: 200,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  overflow: "auto",
  maxHeight: 200,
  border: "1px solid rgba(0,0,0,.25)",
  "& li.Mui-focused": {
    backgroundColor: "#4a8df6",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
}));

const SelectInput: FC<{
  options: any;
  handleChange: any;
  setState: any;
  defaultValue: string;
  disabled: boolean;
  isObject: boolean;
  name: string;
}> = ({ options, defaultValue, disabled, isObject, handleChange, name }) => {
  // console.log(name, defaultValue);
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      {/* {name === "state" && 
            <Icon  style={{position: 'absolute', right: '0px', top: '-3px', zIndex: '100', background: 'red', height: '100%'}} onClick={() => handleChange('', name)}  icon={close} width={50} height={20} />
    //  <MIconButton>
    //   </MIconButton>
} */}
      <select
        defaultValue={defaultValue || ''}
        onChange={(ev) => handleChange(ev.target.value, name)}
        disabled={disabled}
        style={{
          padding: "4px",
          borderColor: "#ddd",
          border: "none",
          color: "#222",
          fontSize: "12px",
          width: "100%",
        }}
      >
        {name === "state" && <option value="">State {defaultValue} </option>}
        {options.map((e: any, i: any) => (
          <>
            {isObject ? (
              <>
                <option value={e.label} key={i}>
                  {e.label}{" "}
                </option>
              </>
            ) : (
              <option value={e} key={i}>
                {e}{" "}
              </option>
            )}
          </>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
