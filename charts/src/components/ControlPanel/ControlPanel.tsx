import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { ChangeEvent, FC, FormEvent, useCallback, useMemo, useState } from 'react';
import { batch, useDispatch } from 'react-redux';
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

  const fieldNameLabel = useMemo(() => <InputLabel>OutlinedInput</InputLabel>, []);
  const chartTypeLabel = useMemo(() => <InputLabel>OutlinedInput</InputLabel>, []);

  const onChangeFieldName = useCallback(
    (
      e: ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>,
    ) => {
      setCurrentFieldName(e.target.value as FieldNames);
    },
    [],
  );

  const onChangeChart = useCallback(
    (
      e: ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>,
    ) => {
      setChart(e.target.value as Charts);
    },
    [],
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      batch(() => {
        dispatch(setChartType(chart as Charts));
        dispatch(setFieldName(currentFieldName as FieldNames));
      });
    },
    [chart, currentFieldName, dispatch],
  );

  return (
    <form className={classes.selectContainer} onSubmit={onSubmit}>
      <FormControl required>
        <InputLabel>Field Name</InputLabel>
        <Select
          value={currentFieldName}
          name="fieldName"
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
      <FormControl required>
        <InputLabel>Chart Type</InputLabel>
        <Select
          label={chartTypeLabel}
          value={chart}
          name="chart"
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

      <Button type="submit" variant="contained" color="primary">
        construct chart
      </Button>
    </form>
  );
};

export default ControlPanel;
