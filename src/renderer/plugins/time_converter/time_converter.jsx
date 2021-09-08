import React, { Component } from 'react';
import TimeConfig from './time_config';
import TimeItem from './time_item';
import Paper from '@material-ui/core/Paper';
import moment from 'moment-timezone'
import TextField from '@material-ui/core/TextField';


export default class TimeConverter extends Component{
  constructor(props){
    super(props)
    this.state = {
      sourceTz: {
        selectName: 'sourceTz',
        enable: !this.isEpoch(this.props.time),
        selectValues: ['Asia/ShangHai', 'America/Los_Angeles', 'GMT'],
        selected: 'GMT',
      },
      targetTz: {
        selectName: 'targetTz',
        enable: true,
        selectValues: ['Asia/ShangHai', 'America/Los_Angeles', 'GMT'],
        selected: 'GMT',
      },
      timeFormat: ['YYYYMMDDhhmmss', 'YYYY-MM-DD hh:mm:ss.SSS', 'epoch', 'epoch_ms'],
      time: this.getNow()
    }
  }
  getNow(){
    return moment().tz('GMT').format('YYYY-MM-DD hh:mm:ss.SSS')
  }
  onChange = (selectType, selected) => {
    console.info(selectType, selected)
    console.info(this.state)
    const newStates = {...this.state}
    newStates[selectType] = {...newStates[selectType], selected: selected}
    this.setState({...newStates})
  }
  onTimeFormatAdd = (text)=>{
    if(text.length != 0 && !this.state.timeFormat.includes(text)){
      this.setState({timeFormat: [...this.state.timeFormat, text]})
    }
  }
  onDelete = (text)=>{
    this.setState({timeFormat: this.state.timeFormat.filter(t => t != text)})
  }
  formatTime(time, format){
    if(format === 'epoch'){
      return parseInt(time.valueOf() / 1000)
    }else if (format === 'epoch_ms'){
      return time.valueOf()
    }
    return time.format(format)
  }
  isNumber(timeString){
    return /^\d+$/.test(timeString)
  }
  isEpoch(timeString){
    return this.isNumber(timeString) && (timeString.length === 10 || timeString.length === 13)
  }
  formatEpoch(time){
    if(time.length < 13){
      return parseInt(time) * 1000
    }
    return parseInt(time)
  }
  isTimestamp(timeString){
    return this.isNumber(this.state.time) && this.state.time.length == 14 && this.state.time.startsWith("202")
  }
  getTime(formats){
    let time
    if(this.isTimestamp(this.state.time)){
      time = moment.tz(this.state.time, 'YYYYMMDDhhmmss', this.state.sourceTz.selected)
      console.info(time)
    }else if(this.isEpoch(this.state.time)){
      time = moment(this.formatEpoch(this.state.time))
    }else{
      time = moment.tz(this.state.time, this.state.sourceTz.selected)
    }
    return formats.map(format => {
      const formatedTime = this.formatTime(time.tz(this.state.targetTz.selected), format).toString()
      return (
        <TimeItem
            time={formatedTime}
            format={format}
            key={format}
            onDelete={this.onDelete}
        ></TimeItem>
      )
    })
  }
  setTime = (e) => {
    const timeString = e.target.value.trim(' ')
    if(timeString.length != 0){
      const isTimestamp = this.isEpoch(timeString)
      this.setState({time: timeString, sourceTz: {...this.state.sourceTz, enable: !isTimestamp}})
    }else{
      this.setState({time: this.getNow(), sourceTz: {...this.state.sourceTz, enable: true}})
    }
  }
  render() {
    const times = this.getTime(this.state.timeFormat)
    return (
      <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
        <TextField label="time" variant="filled" style={{width:"100%", marginTop:'20px',  marginBottom: '20px'}} onBlur={this.setTime}/>
        <br/>
        <TimeConfig {...this.state}
          onChange={this.onChange}
          onTimeFormatAdd={this.onTimeFormatAdd}
        />
        <br/>
        {times}
      </div>
    )
  }
}
