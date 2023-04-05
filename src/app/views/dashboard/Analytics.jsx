import { Box, Button, styled, useTheme } from '@mui/material';
import { getRoutePath } from 'app/utils/utils';
import { Fragment } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ComparisonChart from './ColumnChart';
import LineChart from './LineChart';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' }
}));

const CTAButton = ['Subscription', 'Revenue'];

const Analytics = ({ chart }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleCTAButton = (path) => {
    navigate(`/xipat-testing/dashboard/${path.toLowerCase()}`);
  };

  const location = useLocation();
  const params = useParams();
  const path = getRoutePath(location, params);

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Box display={'flex'}>
          {CTAButton.map((button) => (
            <Button
              variant="outlined"
              key={button}
              color={chart.toLowerCase().includes(button.toLowerCase()) ? 'primary' : 'inherit'}
              sx={{ mr: 2 }}
              onClick={() => handleCTAButton(button)}
            >
              {button}
            </Button>
          ))}
        </Box>
        {path === '/xipat-testings/dashboard/subscription' ? (
          <LineChart
            height="350px"
            color={[theme.palette.primary.main, theme.palette.primary.light]}
          />
        ) : (
          <ComparisonChart
            height="350px"
            color={[theme.palette.primary.dark, theme.palette.primary.light]}
          />
        )}
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
