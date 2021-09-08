import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FileCopy from '@material-ui/icons/FileCopy';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { withWidth } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
// import { Alert } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: [theme.spacing(1.2, 1.5)],
    marginBottom: theme.spacing(1.2),
    display: "flex",
    alignItems: "center",
  },
  format: {
    color: theme.palette.text.secondary,
    fontSize: "0.8rem",
    flex: "0 0 14rem"
  },
  time: {
    color: theme.palette.text.primary,
    fontSize: "1.1rem",
    flex: "1 1 auto",
    textAlign: "left"
  },
  action: {
    marginLeft: theme.spacing(4),
    flex: "1 1 auto",
    textAlign: "right"
  }
}));

export default function TimeItem(props){
  const style = useStyles()
  return (
    <Paper elevation={3} className={style.root}>
      <div className={style.format}>
        <span >{props.format}</span>
      </div>
      <span className={style.time}>{props.time}</span>
      <div className={style.action}>
        <IconButton color="primary" size="small" style={{padding:0}} onClick={()=>{window.electron.clipboard.writeText(props.time)}}>
            <FileCopy />
        </IconButton>
        <IconButton color="primary" size="small" style={{padding:0}} onClick={() => props.onDelete(props.format)}>
            <Delete />
        </IconButton>
      </div>
    </Paper>
  )
}
