import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import { chartOptions, fieldNameOptions } from '../../constants/options';
import { Charts, FieldNames } from '../../enums/dataset';
import { setChartType, setFieldName } from '../../store/actions';
import { useStyles } from './ControlPanel.styles';

const ControlPanel: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({
    fieldName: '',
    chart: '',
  });

  const onChange = useCallback(
    ({ target }: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
      const { name = '', value } = target;
      setChartData(prevState => ({ ...prevState, [name]: value }));
    },
    [],
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { chart, fieldName } = chartData;

      batch(() => {
        dispatch(setChartType(chart as Charts));
        dispatch(setFieldName(fieldName as FieldNames));
      });
    },
    [chartData, dispatch],
  );

  return (
    <form className={classes.selectContainer} onSubmit={onSubmit}>
      <FormControl required>
        <InputLabel>Field Name</InputLabel>
        <Select
          value={chartData.fieldName}
          name="fieldName"
          onChange={onChange}
          className={classes.select}
          displayEmpty
        >
          {fieldNameOptions.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required>
        <InputLabel>Chart Type</InputLabel>
        <Select
          value={chartData.chart}
          name="chart"
          onChange={onChange}
          className={classes.select}
          displayEmpty
        >
          {chartOptions.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        construct chart
      </Button>
    </form>
  );
};

export default ControlPanel;
