
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
  Divider
} from '@mui/material';

const validationSchema = Yup.object().shape({

  referrer_name: Yup.string()
    .max(100, 'Name must be 100 characters or less')
    .required('Your name is required'),
  referrer_email: Yup.string()
    .email('Invalid email format')
    .max(100, 'Email must be 100 characters or less')
    .required('Your email is required'),
  referrer_phone: Yup.string()
    .max(15, 'Phone number must be 15 characters or less')
    .nullable(),
  referral_message: Yup.string().nullable(),
  how_did_you_hear: Yup.string()
    .max(100, 'Must be 100 characters or less')
    .nullable(),

  referee_name: Yup.string()
    .max(100, 'Name must be 100 characters or less')
    .required('Friend\'s name is required'),
  referee_email: Yup.string()
    .email('Invalid email format')
    .max(100, 'Email must be 100 characters or less')
    .required('Friend\'s email is required'),
  referee_phone: Yup.string()
    .max(15, 'Phone number must be 15 characters or less')
    .nullable(),
  course: Yup.string()
    .oneOf([
      'Web Development',
      'Data Science',
      'Machine Learning',
      'Mobile App Development',
      'Cyber Security',
      'Cloud Computing',
      'Digital Marketing',
      'UI/UX Design',
      'Software Testing',
      'Artificial Intelligence'
    ], 'Please select a valid course')
    .required('Course selection is required'),
  start_date: Yup.date().nullable(),
  relationship: Yup.string()
    .max(50, 'Relationship must be 50 characters or less')
    .required('Relationship to friend is required'),

  terms_accepted: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
});

const ReferralForm = ({ details, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    referrer_name: '',
    referrer_email: '',
    referrer_phone: '',
    referral_message: '',
    referee_name: '',
    referee_email: '',
    referee_phone: '',
    course: '',
    start_date: '',
    relationship: '',
    how_did_you_hear: '',
    terms_accepted: false
  });

  // const handleSubmit = async (values, { setSubmitting }) => {
  //   console.log('Submitting form:', values); 
  //   setSubmitting(false);
  // };


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
    setInitialValues(prev => ({ ...prev, ...details, terms_accepted: false }));
  }, [details]);

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
        minHeight: '100vh',
        py: 6,
        px: 2
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={12} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Box sx={{ bgcolor: '#6366F1', py: 3, px: 4 }}>
            <Typography variant="h4" component="h1" sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
              Refer a Friend & Earn Rewards
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'white', textAlign: 'center', mt: 1 }}>
              Share the benefits! Both you and your friend will receive rewards when they join.
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                <Box component="div" noValidate>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Typography variant="h5" component="h2" sx={{ color: '#6366F1', fontWeight: 'bold', mb: 2 }}>
                        Your Information
                      </Typography>
                      <Divider sx={{ mb: 3 }} />

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            required
                            label="Your Name"
                            name="referrer_name"
                            value={values.referrer_name}
                            onChange={handleChange}
                            variant="outlined"
                            error={touched.referrer_name && Boolean(errors.referrer_name)}
                            helperText={touched.referrer_name && errors.referrer_name}
                            inputProps={{ maxLength: 100 }}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            required
                            label="Your Email"
                            name="referrer_email"
                            value={values.referrer_email}
                            onChange={handleChange}
                            variant="outlined"
                            error={touched.referrer_email && Boolean(errors.referrer_email)}
                            helperText={touched.referrer_email && errors.referrer_email}
                            inputProps={{ maxLength: 100 }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Your Phone Number"
                            name="referrer_phone"
                            value={values.referrer_phone}
                            onChange={handleChange}
                            variant="outlined"
                            error={touched.referrer_phone && Boolean(errors.referrer_phone)}
                            helperText={touched.referrer_phone && errors.referrer_phone}
                            inputProps={{ maxLength: 15 }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Personal Message to Your Friend (Optional)"
                            name="referral_message"
                            value={values.referral_message}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            variant="outlined"
                            placeholder="Hey! I thought you might be interested in this course. We can both earn rewards if you sign up!"
                            error={touched.referral_message && Boolean(errors.referral_message)}
                            helperText={touched.referral_message && errors.referral_message}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="h5" component="h2" sx={{ color: '#6366F1', fontWeight: 'bold', mb: 2 }}>
                        Friend's Information
                      </Typography>
                      <Divider sx={{ mb: 3 }} />

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            required
                            label="Friend's Name"
                            name="referee_name"
                            value={values.referee_name}
                            onChange={handleChange}
                            variant="outlined"
                            error={touched.referee_name && Boolean(errors.referee_name)}
                            helperText={touched.referee_name && errors.referee_name}
                            inputProps={{ maxLength: 100 }}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            required
                            label="Friend's Email"
                            name="referee_email"
                            value={values.referee_email}
                            onChange={handleChange}
                            variant="outlined"
                            error={touched.referee_email && Boolean(errors.referee_email)}
                            helperText={touched.referee_email && errors.referee_email}
                            inputProps={{ maxLength: 100 }}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Friend's Phone"
                            name="referee_phone"
                            value={values.referee_phone}
                            onChange={handleChange}
                            variant="outlined"
                            error={touched.referee_phone && Boolean(errors.referee_phone)}
                            helperText={touched.referee_phone && errors.referee_phone}
                            inputProps={{ maxLength: 15 }}
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
                          >
                            <MenuItem value="">Select a Course</MenuItem>
                            <MenuItem value="Web Development">Web Development</MenuItem>
                            <MenuItem value="Data Science">Data Science</MenuItem>
                            <MenuItem value="Machine Learning">Machine Learning</MenuItem>
                            <MenuItem value="Mobile App Development">Mobile App Development</MenuItem>
                            <MenuItem value="Cyber Security">Cyber Security</MenuItem>
                            <MenuItem value="Cloud Computing">Cloud Computing</MenuItem>
                            <MenuItem value="Digital Marketing">Digital Marketing</MenuItem>
                            <MenuItem value="UI/UX Design">UI/UX Design</MenuItem>
                            <MenuItem value="Software Testing">Software Testing</MenuItem>
                            <MenuItem value="Artificial Intelligence">Artificial Intelligence</MenuItem>
                          </TextField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Preferred Start Date"
                            name="start_date"
                            type="date"
                            value={values.start_date}
                            onChange={handleChange}
                            variant="outlined"
                            InputLabelProps={{
                              shrink: true
                            }}
                            error={touched.start_date && Boolean(errors.start_date)}
                            helperText={touched.start_date && errors.start_date}
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
                            inputProps={{ maxLength: 50 }}
                          >
                            <MenuItem value="">Select Relationship</MenuItem>
                            <MenuItem value="Friend">Friend</MenuItem>
                            <MenuItem value="Colleague">Colleague</MenuItem>
                            <MenuItem value="Family">Family</MenuItem>
                            <MenuItem value="Classmate">Classmate</MenuItem>
                            <MenuItem value="Neighbor">Neighbor</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </TextField>
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="How Did You Hear About Us?"
                            name="how_did_you_hear"
                            value={values.how_did_you_hear}
                            onChange={handleChange}
                            variant="outlined"
                            error={touched.how_did_you_hear && Boolean(errors.how_did_you_hear)}
                            helperText={touched.how_did_you_hear && errors.how_did_you_hear}
                            inputProps={{ maxLength: 100 }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ mt: 2, mb: 4 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="terms_accepted"
                              checked={values.terms_accepted}
                              onChange={handleChange}
                              sx={{
                                color: '#6366F1',
                                '&.Mui-checked': {
                                  color: '#6366F1',
                                }
                              }}
                            />
                          }
                          label="I agree to the terms and conditions"
                        />
                        {touched.terms_accepted && errors.terms_accepted && (
                          <Typography variant="caption" sx={{ color: '#EF4444', display: 'block', mt: 1 }}>
                            {errors.terms_accepted}
                          </Typography>
                        )}
                      </Box>

                      <Button
                        type="button"
                        onClick={handleSubmit}
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={loading || isSubmitting}
                        sx={{
                          py: 1.5,
                          background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)',
                          '&:hover': {
                            background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
                          },
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1.1rem'
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