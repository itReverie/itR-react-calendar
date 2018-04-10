/* eslint react/no-multi-comp:0, no-console:0 */


import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import 'rc-calendar/assets/index.css';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import enUS from './locale/en_US';
import 'rc-time-picker/assets/index.css';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import moment from 'moment';

// 'YYYY-MM-DD HH:mm:ss';
const format = 'DD-MMMM-YYYY HH:mm:ss';
const now = moment();
function getFormat(time) {
  return time ? format : 'DD-MMMM-YYYY';
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />;

function disabledTime(date) {
  console.log('disabledTime', date);
  if (date && (date.date() === 15)) {
    return {
      disabledHours() {
        return [3, 4];
      },
    };
  }
  return {
    disabledHours() {
      return [1, 2];
    },
  };
}


export default class Demo extends React.Component {

  //If it is date time it shows the time else just the date
  static propTypes = {
    defaultValue: PropTypes.object,
    defaultCalendarValue: PropTypes.object,
    showTime: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      showTime: props.showTime,
      showDateInput: true,
      value: props.defaultValue,
    };
  }

  onChange = (value) => {
    console.log('DatePicker change: ', (value && value.format(format)));
    this.setState({
      value,
    });
  }


  render() {
    const state = this.state;
    const calendar = (<Calendar
      locale={enUS}
      style={{ zIndex: 1000 }}
      dateInputPlaceholder={state.showTime?'select date & time':'select date'}
      formatter={getFormat(state.showTime)}
      disabledTime={state.showTime ? disabledTime : null}
      timePicker={state.showTime ? timePickerElement : null}
      defaultValue={this.props.defaultCalendarValue}
      showDateInput={state.showDateInput}
    />);
    return (<div style={{ width: 400, margin: 20 }}>
        <DatePicker
          animation="slide-up"
          disabled={state.disabled}
          calendar={calendar}
          value={state.value}
          onChange={this.onChange}
        >
          {
            ({ value }) => {
              return (
                <span tabIndex="0">
                <input
                  placeholder={state.showTime?'select date & time':'select date'}
                  style={{ width: 150 }}
                  disabled={state.disabled}
                  readOnly
                  tabIndex="-1"
                  className="ant-calendar-picker-input ant-input"
                  value={value && value.format(getFormat(state.showTime)) || ''}
                />
                </span>
              );
            }
          }
        </DatePicker>
    </div>);
  }
}
