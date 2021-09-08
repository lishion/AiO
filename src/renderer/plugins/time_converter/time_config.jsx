import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField  from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Select, MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

function SelectItme(props) {
  return (
    <FormControl style={{ width: '100%' }} disabled={!props.enable}>
      <InputLabel>{props.selectName}</InputLabel>
      <Select multiple={props.multiple} value={props.selected} onChange={e => props.onChange(props.selectName, e.target.value)}>
        {props.selectValues.map(v => (<MenuItem key={v} value={v}>{v}</MenuItem>))}
      </Select>
    </FormControl>
  )
}

const useStyles = makeStyles((theme) => ({
  timeFormat: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      marginRight: theme.spacing(0.5),
    },
  },
}));

export default function TimeConfig(props) {
  const {sourceTz, targetTz, timeFormat} = props;
  const timeformats = props.timeFormat.map(format => {
    return <Chip label={format} onDelete={() => props.onTimeFormatDelete(format)}/>
  })
  const classes = useStyles()
  return (
    <div>
        <Grid container justifyContent="space-between">
          <Grid item xs={3}>
            <SelectItme {...sourceTz} onChange={props.onChange}></SelectItme>
          </Grid>
          <Grid item xs={3}>
            <SelectItme {...targetTz} onChange={props.onChange}></SelectItme>
          </Grid>
          <Grid item xs={3}>
            <TextField label="time format" onBlur={(e)=>props.onTimeFormatAdd(e.target.value)}></TextField>
          </Grid>
        </Grid>
        {/* <br/>
        <div className={classes.timeFormat}>
          {timeformats}
        </div> */}
    </div>
  );
}
