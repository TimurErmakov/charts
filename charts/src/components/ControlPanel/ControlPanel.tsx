import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { chartOptions, fieldNameOptions } from '../../constants/options';
import { Charts, FieldNames } from '../../enums/dataset';
import { setChartType, setFieldName } from '../../store/actions';

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 80,
  },
  selectContainer: {
    display: 'flex',
  },
  select: {
    width: 300,
    marginRight: 30,
  },
}));

const ControlPanel: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentFieldName, setCurrentFieldName] = useState('');
  const [chart, setChart] = useState('');

  const onChangeFieldName = (
    e: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    setCurrentFieldName(e.target.value as FieldNames);
    dispatch(setFieldName(e.target.value as FieldNames));
  };

  const onChangeChart = (
    e: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    setChart(e.target.value as Charts);
    dispatch(setChartType(e.target.value as Charts));
  };

  const fieldNameLabel = useMemo(() => <InputLabel>OutlinedInput</InputLabel>, []);
  const chartTypeLabel = useMemo(() => <InputLabel>OutlinedInput</InputLabel>, []);

  return (
    <div className={classes.selectContainer}>
      <FormControl>
        <InputLabel>Field Name</InputLabel>
        <Select
          value={currentFieldName}
          onChange={onChangeFieldName}
          className={classes.select}
          label={fieldNameLabel}
          displayEmpty
        >
          {fieldNameOptions.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Chart Type</InputLabel>
        <Select
          label={chartTypeLabel}
          value={chart}
          onChange={onChangeChart}
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

      <Button variant="contained" color="primary">
        construct chart
      </Button>
    </div>
  );
};

export default ControlPanel;
