import React, {useState} from 'react'
import {Accordion, AccordionSummary, AccordionDetails, Typography, FormGroup, FormControlLabel, Checkbox} from '@mui/material'
import FeatherIcon from 'feather-icons-react'

export default function FilterAccordion({handleFilters, categories}) {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = React.useState(true);

  const handleChange = (panel) => {
    setExpanded(!expanded);
  };

  const handleToggle = (value) =>{
    const currentIndex = checked.indexOf(value)
    const newChecked = [ ...checked]

    if(currentIndex === -1)
      newChecked.push(value)
    else
      newChecked.splice(currentIndex, 1)

    setChecked(newChecked)
    handleFilters(newChecked)
  }

  return (
    <Accordion expanded={expanded} onChange={() => handleChange()}>
        <AccordionSummary
          expandIcon={<FeatherIcon icon='chevron-down' size="16"/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant='subtitle1'>{categories[0]}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{maxHeight: "200px", overflow: "scroll"}}>
        <FormGroup>
          {categories[1].map(value =>{
            return(
              <FormControlLabel
              control={<Checkbox defaultChecked/>}
              label={<Typography variant='subtitle2'>{value.name}</Typography>}
              onChange={(e)=>{handleToggle(value.id)}}
              checked={checked.indexOf(value.id)===-1 ? false : true}
              />
            )
          })}
        </FormGroup>
        </AccordionDetails>
      </Accordion>
  )
}
