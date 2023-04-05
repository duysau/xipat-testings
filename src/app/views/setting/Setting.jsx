import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { SketchPicker } from 'react-color';
import { useRef, useState } from 'react';
import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Popover,
  TextField,
  Typography,
  styled
} from '@mui/material';
import { Fragment } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateRange } from '@mui/lab';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import moment from 'moment/moment';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' }
}));

export default function SettingPage() {
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [valueDateTimeRage, setValueDateTimeRage] = useState([null, null]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleChangeComplete = (color) => {
    setBackgroundColor(color.hex);
  };

  const handleClickPopOver = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopOver = () => {
    setAnchorEl(null);
  };

  const SettingSchema = Yup.object().shape({
    title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    backgroundColor: Yup.string().required('Required')
  });
  return (
    <Fragment>
      <ContentBox className="analytics">
        <Formik
          initialValues={{
            title: '',
            email: ''
          }}
          validationSchema={SettingSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              console.log('title', values.title);
              console.log('email', values.email);
              console.log('background color', backgroundColor);
              console.log(
                'active date',
                valueDateTimeRage.map((item) => moment(item.$d).format('MM/DD/YYYY'))
              );
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {({ errors, touched, isSubmitting, setFieldValue, values }) => (
            <Form>
              <Box
                display={'flex'}
                flexDirection={['column', 'row']}
                width={'100%'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                  <Field name="title">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.title && form.touched.title}
                        mb={4}
                        sx={{ mb: 2 }}
                      >
                        <TextField
                          {...field}
                          label="Title"
                          placeholder="Title"
                          borderColor={errors.title && 'red'}
                          sx={{ width: '100%' }}
                        />
                        {/* <FormErrorMessage>{form.errors.title}</FormErrorMessage> */}
                      </FormControl>
                    )}
                  </Field>
                  {errors.title && touched.title ? (
                    <Typography color={'red'}>{errors.title}</Typography>
                  ) : null}
                  <Box position={'relative'}>
                    <Field name="backgroundColor" id="backgroundColor">
                      {({ field }) => (
                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                          <InputLabel htmlFor="backgroundColor">Background Color</InputLabel>
                          <OutlinedInput
                            {...field}
                            id="backgroundColor"
                            type={'text'}
                            value={backgroundColor}
                            inputProps={{ style: { color: backgroundColor } }}
                            onChange={(e) => {
                              setFieldValue('backgroundColor', e.target.value);
                              setBackgroundColor(e.target.value);
                            }}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" edge="end">
                                  <Box
                                    bgcolor={backgroundColor}
                                    onClick={handleClickPopOver}
                                    width={'20px'}
                                    height={'20px'}
                                  />
                                </IconButton>
                              </InputAdornment>
                            }
                            label="backgroundColor"
                          />
                        </FormControl>
                      )}
                    </Field>
                    {errors.backgroundColor && touched.backgroundColor ? (
                      <Typography color={'red'}>{errors.backgroundColor}</Typography>
                    ) : null}
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClosePopOver}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                      }}
                    >
                      <SketchPicker
                        color={backgroundColor}
                        onChangeComplete={(color) => {
                          handleChangeComplete(color);
                        }}
                      />
                    </Popover>
                  </Box>
                </Box>
                <Box display={'flex'} flexDirection={'column'} width={'100%'} ml={4}>
                  <Field name="email" type="email">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.email && form.touched.email} mb={4}>
                        <TextField
                          autoComplete={false}
                          {...field}
                          id="email"
                          label="Email"
                          placeholder="Email"
                          borderColor={errors.email && 'red'}
                        />
                      </FormControl>
                    )}
                  </Field>
                  {errors.email && touched.email ? (
                    <Typography color={'red'}>{errors.email}</Typography>
                  ) : null}
                  <Field name="activeDate">
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel>Active Date</FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateRangePicker
                            slots={{ field: SingleInputDateRangeField }}
                            value={valueDateTimeRage}
                            onChange={(newValue) => setValueDateTimeRage(newValue)}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    )}
                  </Field>
                </Box>
              </Box>

              <Button mt={4} variant="contained" isLoading={isSubmitting} type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </ContentBox>
    </Fragment>
  );
}
