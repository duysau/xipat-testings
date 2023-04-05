import { styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import LineChart from './LineChart';
import ComparisonChart from './ColumnChart';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' }
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize'
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary
}));

const Analytics = () => {
  const theme = useTheme();

  return (
    <Fragment>
      <ContentBox className="analytics">
        <LineChart
          height="350px"
          color={[theme.palette.primary.main, theme.palette.primary.light]}
        />
        <ComparisonChart
          height="350px"
          color={[theme.palette.primary.dark, theme.palette.primary.light]}
        />
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
