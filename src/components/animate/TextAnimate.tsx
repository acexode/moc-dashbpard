import { motion } from 'framer-motion';
 // material
import { Typography } from '@mui/material';
//
import { varFadeInUp } from './variants';

// ----------------------------------------------------------------------
 

export default function TextAnimate({ text, variants, sx, ...other }:any) {
  return (
    <Typography
      component={motion.h1}
      sx={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx
      }}
      {...other}
    >
      {text.split('').map((letter:any, index:number) => (
        <motion.span key={index} variants={variants || varFadeInUp}>
          {letter}
        </motion.span>
      ))}
    </Typography>
  );
}
