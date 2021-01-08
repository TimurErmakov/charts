import {
  Button,
  Container,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { ChangeEvent, FC, useMemo } from 'react';
import { chartOptions, fieldNameOptions } from '../../constants/options';

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
  const [currentFieldName, setCurrentFieldName] = React.useState('');
  const [chart, setChart] = React.useState('');

  const onChangeFieldName = (
    e: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    setCurrentFieldName(e.target.value as string);
  };

  const onChangeChart = (
    e: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    setChart(e.target.value as string);
  };

  const fieldNameLabel = useMemo(() => <InputLabel>OutlinedInput</InputLabel>, []);
  const chartTypeLabel = useMemo(() => <InputLabel>OutlinedInput</InputLabel>, []);

  return (
    <Container className={classes.container} maxWidth="md">
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
    </Container>
  );
};

export default ControlPanel;
