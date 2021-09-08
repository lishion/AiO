import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';

export default function SearchBar(params) {
  const Input = withStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      backgroundColor: theme.palette.common.white,
      border: 'none',
      fontSize: 30,
      width: '100%',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      font: 'bold',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  }))(InputBase);
  return <Input placeholder="All in One" style={{ width: '100%' }} />;
}
