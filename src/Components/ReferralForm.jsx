import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { toast } from "react-toastify";
import axios from 'axios';
import * as Yup from 'yup';
import { backendUrl } from "../utils"
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Paper,
  Grid,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';

const validationSchema = Yup.object().shape({
  referrerName: Yup.string()
    .max(100, 'Name must be 100 characters or less')
    .required('Your name is required'),
  referrerEmail: Yup.string()
    .email('Invalid email format')
    .max(100, 'Email must be 100 characters or less')
    .required('Your email is required'),
  referrerPhone: Yup.string()
    .max(15, 'Phone number must be 15 characters or less')
    .nullable(),
  referralMessage: Yup.string().nullable(),
  howDidYouHear: Yup.string()
    .max(100, 'Must be 100 characters or less')
    .nullable(),

  refereeName: Yup.string()
    .max(100, 'Name must be 100 characters or less')
    .required('Friend\'s name is required'),
  refereeEmail: Yup.string()
    .email('Invalid email format')
    .max(100, 'Email must be 100 characters or less')
    .required('Friend\'s email is required'),
  refereePhone: Yup.string()
    .max(15, 'Phone number must be 15 characters or less')
    .nullable(),
  course: Yup.string()
    .oneOf([
      'WEB_DEVELOPMENT',
      'DATA_SCIENCE',
      'MACHINE_LEARNING',
      'MOBILE_APP_DEVELOPMENT',
      'CYBER_SECURITY',
      'CLOUD_COMPUTING',
      'DIGITAL_MARKETING',
      'UI_UX_DESIGN',
      'SOFTWARE_TESTING',
      'ARTIFICIAL_INTELLIGENCE'
    ], 'Please select a valid course')
    .required('Course selection is required'),
  startDate: Yup.date().nullable(),
  relationship: Yup.string()
    .max(50, 'Relationship must be 50 characters or less')
    .required('Relationship to friend is required'),

  termsAccepted: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
});

const ReferralForm = ({ details, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  
  const [initialValues, setInitialValues] = useState({
    referrerName: '',
    referrerEmail: '',
    referrerPhone: '',
    referralMessage: '',
    refereeName: '',
    refereeEmail: '',
    refereePhone: '',
    course: '',
    startDate: '',
    relationship: '',
    howDidYouHear: '',
    termsAccepted: false
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);
    try {
      await axios.post(`${backendUrl()}/refer`, values);
      toast.success('Referral Submitted Successfully');
      setOpen(false)
    } catch (error) {
      console.error('Failed to Submit Referral:', error);
      toast.error('Failed to Submit Referral');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setInitialValues(prev => ({ ...prev, ...details, termsAccepted: false }));
  }, [details]);

  // Responsive typography styles
  const headerStyles = {
    fontSize: isXs ? '1.6rem' : isSm ? '1.8rem' : '2rem',
    fontWeight: 'bold',
    textAlign: 'center'
  };

  const subtitleStyles = {
    fontSize: isXs ? '0.875rem' : '1rem',
    textAlign: 'center',
    mt: 1
  };

  const sectionTitleStyles = {
    fontSize: isXs ? '1.2rem' : isSm ? '1.35rem' : '1.5rem',
    fontWeight: 'bold',
    mb: 2,
    color: '#6366F1'
  };

  const buttonTextStyles = {
    fontSize: isXs ? '0.95rem' : isSm ? '1rem' : '1.1rem'
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
        minHeight: '100vh',
        py: { xs: 3, sm: 4, md: 6 },
        px: { xs: 1, sm: 2 }
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={12} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Box sx={{ bgcolor: '#6366F1', py: { xs: 2, sm: 2.5, md: 3 }, px: { xs: 2, sm: 3, md: 4 } }}>
            <Typography variant="h4" component="h1" sx={{ color: 'white', ...headerStyles }}>
              Refer a Friend & Earn Rewards
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'white', ...subtitleStyles }}>
              Share the benefits! Both you and your friend will receive rewards when they join.
            </Typography>
          </Box>

          <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                <Box component="div" noValidate>
                  <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                    <Grid item xs={12}>
                      <Typography variant="h5" component="h2" sx={sectionTitleStyles}>
                        Your Information
                      </Typography>
                      <Divider sx={{ mb: { xs: 1.5, sm: 2, md: 3 } }} />

                      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            required
                            label="Your Name"
                            name="referrerName"
                            value={values.referrerName}
                            onChange={handleChange}
                            variant="outlined"
                            error={touched.referrerName && Boolean(errors.referrerName)}
                            helperText={touched.referrerName && errors.referrerName}
                            inputProps={{ maxLength: 100 }}
                            InputLabelProps={{ style: { fontSize: isXs ? '0.875rem' : '1rem' } }}
                            inputProps={{ 
                              maxLength: 100,
                              style: { fontSize: isXs ? '0.875rem' : '1rem' } 
                            }}
                            FormHelperTextProps={{ style: { fontSize: isXs ? '0.7rem' : '0.75rem' } }}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            required
                            label="Your Email"
                            name="referrerEmail"
                            value={values.referrerEmail}
                            onChange={handleChange}
                            variant="outlined"
                            error={touched.referrerEmail && Boolean(errors.referrerEmail)}
                            helperText={touched.referrerEmail && errors.referrerEmail}
                            InputLabelProps={{ style: { fontSize: isXs ? '0.875rem' : '1rem' } }}
                            inputProps={{ 
                              maxLength: 100,
                              style: { fontSize: isXs ? '0.875rem' : '1rem' } 
                            }}
                            FormHelperTextProps={{ style: { fontSize: isXs ? '0.7rem' : '0.75rem' } }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Your Phone Number"
                            name="referrerPhone"
                            value={values.referrerPhone}
                            onChange={handleChange}
                            variant="outlined"
                            error={touched.referrerPhone && Boolean(errors.referrerPhone)}
                            helperText={touched.referrerPhone && errors.referrerPhone}
                            InputLabelProps={{ style: { fontSize: isXs ? '0.875rem' : '1rem' } }}
                            inputProps={{ 
                              maxLength: 15,
                              style: { fontSize: isXs ? '0.875rem' : '1rem' } 
                            }}
                            FormHelperTextProps={{ style: { fontSize: isXs ? '0.7rem' : '0.75rem' } }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Personal Message to Your Friend (Optional)"
                            name="referralMessage"
                            value={values.referralMessage}
                            onChange={handleChange}
                            multiline
                            rows={isXs ? 2 : 3}
                            variant="outlined"
                            placeholder="Hey! I thought you might be interested in this course. We can both earn rewards if you sign up!"
                            error={touched.referralMessage && Boolean(errors.referralMessage)}
                            helperText={touched.referralMessage && errors.referralMessage}
                            InputLabelProps={{ style: { fontSize: isXs ? '0.875rem' : '1rem' } }}
                            inputProps={{ 
                              style: { fontSize: isXs ? '0.875rem' : '1rem' } 
                            }}
                            FormHelperTextProps={{ style: { fontSize: isXs ? '0.7rem' : '0.75rem' } }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="h5" component="h2" sx={sectionTitleStyles}>
                        Friend's Information
                      </Typography>
                      <Divider sx={{ mb: { xs: 1.5, sm: 2, md: 3 } }} />

                      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            required
                            label="Friend's Name"
                            name="refereeName"
                            value={values.refereeName}
                            onChange={handleChange}
                            variant="outlined"
                            error={touched.refereeName && Boolean(errors.refereeName)}
                            helperText={touched.refereeName && errors.refereeName}
                            InputLabelProps={{ style: { fontSize: isXs ? '0.875rem' : '1rem' } }}
                            inputProps={{ 
                              maxLength: 100,
                              style: { fontSize: isXs ? '0.875rem' : '1rem' } 
                            }}
                            FormHelperTextProps={{ style: { fontSize: isXs ? '0.7rem' : '0.75rem' } }}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            required
                            label="Friend's Email"
                            name="refereeEmail"
                            value={values.refereeEmail}
                            onChange={handleChange}
                            variant="outlined"
                            error={touched.refereeEmail && Boolean(errors.refereeEmail)}
                            helperText={touched.refereeEmail && errors.refereeEmail}
                            InputLabelProps={{ style: { fontSize: isXs ? '0.875rem' : '1rem' } }}
                            inputProps={{ 
                              maxLength: 100,
                              style: { fontSize: isXs ? '0.875rem' : '1rem' } 
                            }}
                            FormHelperTextProps={{ style: { fontSize: isXs ? '0.7rem' : '0.75rem' } }}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Friend's Phone"
                            name="refereePhone"
                            value={values.refereePhone}
                            onChange={handleChange}
                            variant="outlined"
                            error={touched.refereePhone && Boolean(errors.refereePhone)}
                            helperText={touched.refereePhone && errors.refereePhone}
                            InputLabelProps={{ style: { fontSize: isXs ? '0.875rem' : '1rem' } }}
                            inputProps={{ 
                              maxLength: 15,
                              style: { fontSize: isXs ? '0.875rem' : '1rem' } 
                            }}
                            FormHelperTextProps={{ style: { fontSize: isXs ? '0.7rem' : '0.75rem' } }}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            required
                            label="Course Interested In"
                            name="course"
                            value={values.course}
                            onChange={handleChange}
                            select
                            variant="outlined"
                            error={touched.course && Boolean(errors.course)}
                            helperText={touched.course && errors.course}
                            SelectProps={{
                              MenuProps: {
                                PaperProps: {
                                  style: {
                                    maxHeight: 300
                                  }
                                }
                              }
                            }}
                            InputLabelProps={{ style: { fontSize: isXs ? '0.875rem' : '1rem' } }}
                            inputProps={{ 
                              style: { fontSize: isXs ? '0.875rem' : '1rem' } 
                            }}
                            FormHelperTextProps={{ style: { fontSize: isXs ? '0.7rem' : '0.75rem' } }}
                          >
                            <MenuItem value="" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              Select a Course
                            </MenuItem>
                            <MenuItem value="WEB_DEVELOPMENT" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              WEB_DEVELOPMENT
                            </MenuItem>
                            <MenuItem value="DATA_SCIENCE" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              DATA_SCIENCE
                            </MenuItem>
                            <MenuItem value="MACHINE_LEARNING" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              MACHINE_LEARNING
                            </MenuItem>
                            <MenuItem value="MOBILE_APP_DEVELOPMENT" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              MOBILE_APP_DEVELOPMENT
                            </MenuItem>
                            <MenuItem value="CYBER_SECURITY" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              CYBER_SECURITY
                            </MenuItem>
                            <MenuItem value="CLOUD_COMPUTING" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              CLOUD_COMPUTING
                            </MenuItem>
                            <MenuItem value="DIGITAL_MARKETING" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              DIGITAL_MARKETING
                            </MenuItem>
                            <MenuItem value="UI_UX_DESIGN" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              UI_UX_DESIGN
                            </MenuItem>
                            <MenuItem value="SOFTWARE_TESTING" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              SOFTWARE_TESTING
                            </MenuItem>
                            <MenuItem value="ARTIFICIAL_INTELLIGENCE" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              ARTIFICIAL_INTELLIGENCE
                            </MenuItem>
                          </TextField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Preferred Start Date"
                            name="startDate"
                            type="date"
                            value={values.startDate}
                            onChange={handleChange}
                            variant="outlined"
                            InputLabelProps={{
                              shrink: true,
                              style: { fontSize: isXs ? '0.875rem' : '1rem' }
                            }}
                            inputProps={{ 
                              style: { fontSize: isXs ? '0.875rem' : '1rem' } 
                            }}
                            error={touched.startDate && Boolean(errors.startDate)}
                            helperText={touched.startDate && errors.startDate}
                            FormHelperTextProps={{ style: { fontSize: isXs ? '0.7rem' : '0.75rem' } }}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            required
                            label="Relationship to Friend"
                            name="relationship"
                            value={values.relationship}
                            onChange={handleChange}
                            select
                            variant="outlined"
                            error={touched.relationship && Boolean(errors.relationship)}
                            helperText={touched.relationship && errors.relationship}
                            SelectProps={{
                              MenuProps: {
                                PaperProps: {
                                  style: {
                                    maxHeight: 300
                                  }
                                }
                              }
                            }}
                            InputLabelProps={{ style: { fontSize: isXs ? '0.875rem' : '1rem' } }}
                            inputProps={{ 
                              style: { fontSize: isXs ? '0.875rem' : '1rem' } 
                            }}
                            FormHelperTextProps={{ style: { fontSize: isXs ? '0.7rem' : '0.75rem' } }}
                          >
                            <MenuItem value="" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              Select Relationship
                            </MenuItem>
                            <MenuItem value="Friend" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              Friend
                            </MenuItem>
                            <MenuItem value="Colleague" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              Colleague
                            </MenuItem>
                            <MenuItem value="Family" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              Family
                            </MenuItem>
                            <MenuItem value="Classmate" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              Classmate
                            </MenuItem>
                            <MenuItem value="Neighbor" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              Neighbor
                            </MenuItem>
                            <MenuItem value="Other" style={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              Other
                            </MenuItem>
                          </TextField>
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="How Did You Hear About Us?"
                            name="howDidYouHear"
                            value={values.howDidYouHear}
                            onChange={handleChange}
                            variant="outlined"
                            error={touched.howDidYouHear && Boolean(errors.howDidYouHear)}
                            helperText={touched.howDidYouHear && errors.howDidYouHear}
                            InputLabelProps={{ style: { fontSize: isXs ? '0.875rem' : '1rem' } }}
                            inputProps={{ 
                              maxLength: 100,
                              style: { fontSize: isXs ? '0.875rem' : '1rem' } 
                            }}
                            FormHelperTextProps={{ style: { fontSize: isXs ? '0.7rem' : '0.75rem' } }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ mt: { xs: 1, sm: 1.5, md: 2 }, mb: { xs: 2, sm: 3, md: 4 } }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="termsAccepted"
                              checked={values.termsAccepted}
                              onChange={handleChange}
                              sx={{
                                color: '#6366F1',
                                '&.Mui-checked': {
                                  color: '#6366F1',
                                }
                              }}
                            />
                          }
                          label={
                            <Typography sx={{ fontSize: isXs ? '0.875rem' : '1rem' }}>
                              I agree to the terms and conditions
                            </Typography>
                          }
                        />
                        {touched.termsAccepted && errors.termsAccepted && (
                          <Typography variant="caption" sx={{ 
                            color: '#EF4444', 
                            display: 'block', 
                            mt: 1,
                            fontSize: isXs ? '0.7rem' : '0.75rem'
                          }}>
                            {errors.termsAccepted}
                          </Typography>
                        )}
                      </Box>

                      <Button
                        type="button"
                        onClick={handleSubmit}
                        variant="contained"
                        fullWidth
                        size={isXs ? "medium" : "large"}
                        disabled={loading || isSubmitting}
                        sx={{
                          py: { xs: 1, sm: 1.25, md: 1.5 },
                          background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)',
                          '&:hover': {
                            background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
                          },
                          borderRadius: 2,
                          textTransform: 'none',
                          ...buttonTextStyles
                        }}
                      >
                        {loading || isSubmitting ? 'Submitting...' : 'Submit Referral'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Formik>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ReferralForm;