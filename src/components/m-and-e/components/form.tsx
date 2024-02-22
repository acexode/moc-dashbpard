// @ts-nocheck

import React, { FC, useEffect,useState } from "react";
import {
  Card,
  Grid,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  Checkbox,
  Box,
  TextField,
  MenuItem,
  FormControl,
  FormControlLabel,
  Skeleton
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface IForm {
  questions: any[];
  quarter?: any;
  selectedYear?: any;
  loading?:boolean;
  type?:string
}
function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const Form: FC<IForm> = ({ questions,type}) => {
  const [newQuestions,setNewQuestions] = useState({...questions})
  const [mainQuestions,setMainQuestions] = useState({...questions})
  useEffect(()=>{
      if(questions){
        setNewQuestions(questions)
        setMainQuestions(questions)
      }
  },[questions])
  let questionCount = 0;
  let sections = [];
  for (const key in newQuestions) {
    if (Object.hasOwnProperty.call(newQuestions, key)) {
      const id = newQuestions[key][0].section;
      let title = newQuestions[key][0].sectionTitle;
      sections.push({ id, title });
    }
  }
  const [checkBBB, setCheckBBB] = useState(false);
  const [checkBoxVals, setCheckBoxVals] = useState([]);

  let newValueBoxes:any = [];
  useEffect(()=>{
    if (questions) {
      // Check if the questions array has enough elements and the nested response exists
      if (questions[4] && questions[4][1]?.response) {
        // Check if the response is an array and includes "Others"
        if (Array.isArray(questions[4][1]?.response) && questions[4][1]?.response.includes("Others")) {
          // If "Others" is included, set the checkbox value to ["Others"]
          let val = ["Others"];
          setCheckBoxVals(val);
        } else if (typeof questions[4][1]?.response === "string") {
          // If the response is a string, split it by comma and check if "Others" is included
          if (questions[4][1]?.response.split(",").includes("Others")) {
            // If "Others" is included, set the checkbox value to ["Others"]
            let val = ["Others"];
            setCheckBoxVals(val);
          }
        }
      }
    }
  },[questions])
  const handleCheckboxChange = (event: { target: { value: any; }; }) => {
    if (checkBoxVals.includes(event.target.value)) {
      let theVal = newValueBoxes.indexOf(event.target.value);
      let newVal = [...checkBoxVals];
      newVal.splice(theVal, 1);
      setCheckBoxVals(newVal);
    } else {
      let val = [...checkBoxVals, event.target.value];
      setCheckBoxVals(val);
    }
  };
  useEffect(() => {
    if (checkBoxVals.includes("Others")) {
      setCheckBBB(true);
    } else {
      setCheckBBB(false);
    }
  }, [checkBoxVals,questions]);

  const handleFilterOutNextQuestion = (val: string, id: number, section: number) => {
    if (type === "state" && id === 2 && section === 1) {
      if (val === "No") {
        const filteredObj = { ...newQuestions };
        if (filteredObj["1"]) {
          // Filter out the question with id === 5
          filteredObj["1"] = filteredObj["1"].filter(obj => obj.id !== 3);
        }
        setNewQuestions(filteredObj);
      } else {
        const filteredObj = { ...newQuestions };
        if (mainQuestions["1"]) {
          const removedObj = mainQuestions["1"].find(obj => obj.id === 3);
          if (removedObj) {
            // Find the index of the removedObj in the original array
            const index = mainQuestions["1"].indexOf(removedObj);
    
            // Insert the removedObj back into the newQuestions array at the same index
            if (!filteredObj["1"].some(obj => obj.id === removedObj.id)) {
              filteredObj["1"].splice(index, 0, removedObj);
            }
          }
        }
        setNewQuestions(filteredObj);
      }
    }
    if (type === "state" && id === 4 && section === 1) {
      if (val === "No") {
        const filteredObj = { ...newQuestions };
        if (filteredObj["1"]) {
          // Filter out the question with id === 5
          filteredObj["1"] = filteredObj["1"].filter(obj => obj.id !== 5);
        }
        setNewQuestions(filteredObj);
      } else {
        const filteredObj = { ...newQuestions };
        if (mainQuestions["1"]) {
          const removedObj = mainQuestions["1"].find(obj => obj.id === 5);
          if (removedObj) {
            // Find the index of the removedObj in the original array
            const index = mainQuestions["1"].indexOf(removedObj);
    
            // Check if the object already exists in the array before inserting
            if (!filteredObj["1"].some(obj => obj.id === removedObj.id)) {
              filteredObj["1"].splice(index, 0, removedObj);
            }
          }
        }
        setNewQuestions(filteredObj);
      }
    }

    if (type === "state" && id === 6 && section === 1) {
      if (val === "No") {
        const filteredObj = { ...newQuestions };
        if (filteredObj["1"]) {
          // Filter out the questions with id equal to 7 or 8
          filteredObj["1"] = filteredObj["1"].filter(obj => obj.id !== 7 && obj.id !== 8);
        }
        setNewQuestions(filteredObj);
      } else {
        const filteredObj = { ...newQuestions };
        if (mainQuestions["1"]) {
          const removedObjs = mainQuestions["1"].filter(obj => obj.id === 7 || obj.id === 8);
          if (removedObjs.length > 0) {
            // Find the indices of the removedObjs in the original array
            const indices = removedObjs.map(obj => mainQuestions["1"].indexOf(obj));
    
            // Sort the indices in ascending order to insert back in the same order
            indices.sort((a, b) => a - b);
    
            // Insert the removedObjs back into the newQuestions array at the corresponding indices
            indices.forEach((index, idx) => {
              if (!filteredObj["1"].some(obj => obj.id === removedObjs[idx].id)) {
                filteredObj["1"].splice(index + idx, 0, removedObjs[idx]);
              }
            });
          }
        }
        setNewQuestions(filteredObj);
      }
    }
  
    if (type === "state" && id === 14 && section === 3) {
      if (val === "No") {
        const filteredObj = { ...newQuestions };
        if (filteredObj["3"]) {
          // Filter out the questions with id equal to 16 or 17
          filteredObj["3"] = filteredObj["3"].filter(obj => obj.id !== 16 && obj.id !== 17);
        }
        setNewQuestions(filteredObj);
      } else {
        const filteredObj = { ...newQuestions };
        if (mainQuestions["3"]) {
          const removedObjs = mainQuestions["3"].filter(obj => obj.id === 16 || obj.id === 17);
          if (removedObjs.length > 0) {
            // Find the indices of the removedObjs in the original array
            const indices = removedObjs.map(obj => mainQuestions["3"].indexOf(obj));
    
            // Sort the indices in ascending order to insert back in the same order
            indices.sort((a, b) => a - b);
    
            // Insert the removedObjs back into the newQuestions array at the corresponding indices
            indices.forEach((index, idx) => {
              if (!filteredObj["3"].some(obj => obj.id === removedObjs[idx].id)) {
                filteredObj["3"].splice(index + idx, 0, removedObjs[idx]);
              }
            });
          }
        }
        setNewQuestions(filteredObj);
      }
    }
    if (type === "state" && id === 15 && section === 3) {
      if (val === "No") {
        const filteredObj = { ...newQuestions };
        if (filteredObj["3"]) {
          // Filter out the questions with id equal to 16 or 17
          filteredObj["3"] = filteredObj["3"].filter(obj => obj.id !== 16 && obj.id !== 17);
        }
        setNewQuestions(filteredObj);
      } else {
        const filteredObj = { ...newQuestions };
        if (mainQuestions["3"]) {
          const removedObjs = mainQuestions["3"].filter(obj => obj.id === 16 || obj.id === 17);
          if (removedObjs.length > 0) {
            // Find the indices of the removedObjs in the original array
            const indices = removedObjs.map(obj => mainQuestions["3"].indexOf(obj));
    
            // Sort the indices in ascending order to insert back in the same order
            indices.sort((a, b) => a - b);
    
            // Insert the removedObjs back into the newQuestions array at the corresponding indices
            indices.forEach((index, idx) => {
              if (!filteredObj["3"].some(obj => obj.id === removedObjs[idx].id)) {
                filteredObj["3"].splice(index + idx, 0, removedObjs[idx]);
              }
            });
          }
        }
        setNewQuestions(filteredObj);
      }
    }
    
  };
  const questionSection = sections?.map((section, index) => {
    let sectionQuestions = newQuestions[section.id];
    return (
      <div key={index}>
        <Card sx={{ padding: 5, marginBottom: 5 }}>
          <Box>Section {section.id}</Box>
          <Box sx={{ pb: 3 }}>{section.title}</Box>
          <Grid container spacing={3}>
            {sectionQuestions.map(
              (
                question: {
                  responseInputType: any;
                  responseOptions: string;
                  id:number,
                  question:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined;
                  serial: string | undefined;
                  maximumDigits:any
                },
                index: React.Key | null | undefined
              ) => {
                questionCount += 1;
                let responsetype = question.responseInputType;
                let options: any;
                let isOptions = responsetype == "select";
                let isRadio = responsetype == "radio";
                let isTextArea = responsetype == "textarea";
                let isCheckbox = responsetype == "checkbox";
                let isNumber =responsetype === "number"
                let isDate =responsetype === "date"
                if (isOptions || isRadio || isCheckbox) {
                  options = JSON.parse(question.responseOptions);
                }
                return (
                  <>
                    <Grid item key={index} sm={12}>
                      <FormLabel sx={{ mb: 4 }}>
                        {questionCount}. {question.question}
                      </FormLabel>
                      <div>
                        {isOptions ? (
                          <div>
                            <TextField
                              id={question.serial}
                              variant="outlined"
                              fullWidth
                              select
                              defaultValue={question?.response}
                              type="text"
                              name={question.serial}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {options?.map((option: any, index: any) => (
                                <MenuItem key={index} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                        ) : isRadio ? (
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              defaultValue={question?.response}
                            >
                              {options?.map((option: any, index: any) => (
                                <FormControlLabel
                                  key={index}
                                  value={option}
                                  name={question.serial}
                                  id={question.serial}
                                 
                                  control={<Radio color="success" />}
                                  label={option}
                                  onChange={(e)=> handleFilterOutNextQuestion(e.target.value,question?.id,question?.section)}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        ) : isTextArea ? (
                          <TextField
                            multiline
                            id={question.serial}
                            variant="outlined"
                            fullWidth
                            defaultValue={question?.response}
                            name={question.serial}
                            type={responsetype}
                          />
                        ) : isCheckbox ? (
                          <div>
                            <Stack direction="row" sx={{
                              display:"flex",
                              flexWrap:"wrap"
                            }}>
                              {options?.map((option: any, index: any) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      color="success"
                                      defaultChecked={question?.response?.includes(option)}
                                      name={question.serial}
                                      onChange={handleCheckboxChange}
                                      value={option}
                                    />
                                  }
                                  label={option}
                                />
                              ))}
                            </Stack>

                            <>
                             {checkBBB && <TextField
                                type={"text"}
                                placeholder="Enter others here"
                                name="otherValues"
                                id="otherValues"
                              />}
                            </>
                          </div>
                        ) : isNumber ? (
                          question?.maximumDigits ?
                          <TextField
                            id={question.serial}
                            name={question.serial}
                            variant="outlined"
                            defaultValue={question?.response}
                            onInput={(e:any) => {
                              const inputValue = e.target.value;
                              const sanitizedValue = inputValue.replace(/e/gi, ''); // Remove 'e' from the input value
                              e.target.value = Math.max(0, parseInt(sanitizedValue)).toString().slice(0, parseInt(question?.maximumDigits));
                            }}
                            fullWidth
                            type={responsetype}
                          />: <TextField
                            id={question.serial}
                            name={question.serial}
                            variant="outlined"
                            fullWidth
                            defaultValue={question?.response}
                            onKeyDown={(e) => {
                              if (e.key === "e") {
                                e.preventDefault();
                              }
                            }}
                            type={responsetype}
                          />
                        ) : isDate ? <TextField
                        id={question.serial}
                        name={question.serial}
                        // defaultValue={options[0]}
                        variant="outlined"
                        defaultValue={question?.response}
                        inputProps={{
                          max: getCurrentDate(), // Set the maximum date
                        }}
                        fullWidth
                        type="date"
                      /> :
                      <TextField
                        id={question.serial}
                        name={question.serial}
                        variant="outlined"
                        defaultValue={question?.response}
                        fullWidth
                        type={responsetype}
                      />
                        }
                      </div>
                    </Grid>
                  </>
                );
              }
            )}
          </Grid>
        </Card>
      </div>
    );
  });


  return (
    <div>
      {questionSection}
      <LoadingButton
        size="large"
        type="submit"
        variant="contained"
      >
        Submit
      </LoadingButton>
    </div>
  );
};

export default Form;
