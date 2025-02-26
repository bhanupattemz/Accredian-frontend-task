import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from "react-toastify"
import { backendUrl } from "../utils"
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Paper,
    Divider,
    useTheme,
    useMediaQuery
} from '@mui/material';

const validationSchema = Yup.object().shape({
    referrerName: Yup.string().required('Referrer Name is required'),
    referrerEmail: Yup.string().email('Invalid email').required('Referrer Email is required'),
    otp: Yup.string().length(6, 'OTP must be 6 digits')
});

const ReferralForm = ({ setVerify, setDetails }) => {
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    const initialValues = {
        referrerName: '',
        referrerEmail: '',
        otp: ''
    };

    const handleSendOTP = async (email, name) => {
        try {
            setLoading(true);
            await axios.post(`${backendUrl()}/verify/generate`, { mail: email, name });
            setOtpSent(true);
            toast.success('OTP sent to your email');
        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error('Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (email, otp) => {
        try {
            setLoading(true);
            const response = await axios.post(`${backendUrl()}/verify/otp`, { mail: email, otp });
            setOtpVerified(true);
            setVerify(true);
            setDetails({ ...response.data.data });
            toast.success('OTP Verified Successfully');
        } catch (error) {
            console.error('OTP Verification Failed:', error);
            toast.error('Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                py: { xs: 3, sm: 4, md: 5, lg: 6 },
                px: { xs: 1, sm: 1.5, md: 2, lg: 2 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Container maxWidth="sm" sx={{ width: '100%' }}>
                <Paper 
                    elevation={12} 
                    sx={{ 
                        borderRadius: { xs: 2, sm: 3, md: 4 }, 
                        overflow: 'hidden',
                        width: '100%',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
                    }}
                >
                    <Box 
                        sx={{ 
                            bgcolor: '#6366F1', 
                            py: { xs: 2, sm: 2.5, md: 3 }, 
                            px: { xs: 2, sm: 3, md: 4 }
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: {
                                    xs: '1.75rem',
                                    sm: '2.25rem',
                                    md: '2.75rem',
                                    lg: '3rem',
                                },
                                lineHeight: 1.2
                            }}
                        >
                            Refer & Earn
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: 'white',
                                textAlign: 'center',
                                mt: { xs: 0.5, sm: 0.75, md: 1 },
                                fontSize: {
                                    xs: '0.9rem',
                                    sm: '1rem',
                                    md: '1.1rem',
                                    lg: '1.2rem',
                                },
                                px: { xs: 1, sm: 2, md: 3 }
                            }}
                        >
                            Verify your email to proceed with the referral.
                        </Typography>
                    </Box>

                    <Box 
                        sx={{
                            p: {
                                xs: 2,
                                sm: 3,
                                md: 4,
                                lg: 4,
                            }
                        }}
                    >
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                        >
                            {({ values, handleChange }) => (
                                <Form>
                                    <TextField
                                        fullWidth
                                        label="Referrer Name"
                                        name="referrerName"
                                        value={values.referrerName}
                                        onChange={handleChange}
                                        margin="normal"
                                        variant="outlined"
                                        sx={{
                                            mt: { xs: 1, sm: 1.5, md: 2 },
                                            '& .MuiInputLabel-root': {
                                                fontSize: { xs: '0.875rem', sm: '1rem' }
                                            },
                                            '& .MuiInputBase-input': {
                                                py: { xs: 1.25, sm: 1.5, md: 1.75 },
                                                fontSize: { xs: '0.875rem', sm: '1rem' }
                                            }
                                        }}
                                    />
                                    <ErrorMessage 
                                        name="referrerName" 
                                        component="div" 
                                        style={{ 
                                            color: '#EF4444', 
                                            marginTop: 4, 
                                            fontSize: isXs ? '0.75rem' : isSm ? '0.8rem' : '0.875rem' 
                                        }} 
                                    />

                                    <TextField
                                        fullWidth
                                        label="Referrer Email"
                                        name="referrerEmail"
                                        value={values.referrerEmail}
                                        onChange={handleChange}
                                        margin="normal"
                                        variant="outlined"
                                        disabled={otpVerified}
                                        sx={{
                                            mt: { xs: 1.5, sm: 2, md: 2.5 },
                                            '& .MuiInputLabel-root': {
                                                fontSize: { xs: '0.875rem', sm: '1rem' }
                                            },
                                            '& .MuiInputBase-input': {
                                                py: { xs: 1.25, sm: 1.5, md: 1.75 },
                                                fontSize: { xs: '0.875rem', sm: '1rem' }
                                            }
                                        }}
                                    />
                                    <ErrorMessage 
                                        name="referrerEmail" 
                                        component="div" 
                                        style={{ 
                                            color: '#EF4444', 
                                            marginTop: 4, 
                                            fontSize: isXs ? '0.75rem' : isSm ? '0.8rem' : '0.875rem' 
                                        }} 
                                    />

                                    {!otpSent && (
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            size={isXs ? "medium" : "large"}
                                            onClick={() => handleSendOTP(values.referrerEmail, values.referrerName)}
                                            disabled={!values.referrerEmail || loading || !values.referrerName}
                                            sx={{
                                                mt: { xs: 2, sm: 2.5, md: 3 },
                                                py: { xs: 1, sm: 1.25, md: 1.5 },
                                                background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)',
                                                '&:hover': {
                                                    background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
                                                },
                                                borderRadius: { xs: 1, sm: 1.5, md: 2 },
                                                textTransform: 'none',
                                                fontSize: {
                                                    xs: '0.9rem',
                                                    sm: '1rem',
                                                    md: '1.1rem',
                                                },
                                                fontWeight: 500
                                            }}
                                        >
                                            {loading ? <CircularProgress size={isXs ? 20 : 24} sx={{ color: 'white' }} /> : 'Send OTP'}
                                        </Button>
                                    )}

                                    {otpSent && !otpVerified && (
                                        <>
                                            <TextField
                                                fullWidth
                                                label="Enter OTP"
                                                name="otp"
                                                value={values.otp}
                                                onChange={handleChange}
                                                margin="normal"
                                                variant="outlined"
                                                sx={{
                                                    mt: { xs: 1.5, sm: 2, md: 2.5 },
                                                    '& .MuiInputLabel-root': {
                                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        py: { xs: 1.25, sm: 1.5, md: 1.75 },
                                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                                    }
                                                }}
                                            />
                                            <ErrorMessage 
                                                name="otp" 
                                                component="div" 
                                                style={{ 
                                                    color: '#EF4444', 
                                                    marginTop: 4, 
                                                    fontSize: isXs ? '0.75rem' : isSm ? '0.8rem' : '0.875rem' 
                                                }} 
                                            />

                                            <Button
                                                variant="contained"
                                                fullWidth
                                                size={isXs ? "medium" : "large"}
                                                onClick={() => handleVerifyOTP(values.referrerEmail, values.otp)}
                                                disabled={!values.otp || loading}
                                                sx={{
                                                    mt: { xs: 2, sm: 2.5, md: 3 },
                                                    py: { xs: 1, sm: 1.25, md: 1.5 },
                                                    background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)',
                                                    '&:hover': {
                                                        background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
                                                    },
                                                    borderRadius: { xs: 1, sm: 1.5, md: 2 },
                                                    textTransform: 'none',
                                                    fontSize: {
                                                        xs: '0.9rem',
                                                        sm: '1rem',
                                                        md: '1.1rem',
                                                    },
                                                    fontWeight: 500
                                                }}
                                            >
                                                {loading ? <CircularProgress size={isXs ? 20 : 24} sx={{ color: 'white' }} /> : 'Verify OTP'}
                                            </Button>
                                        </>
                                    )}

                                    {otpVerified && (
                                        <Typography 
                                            color="green" 
                                            sx={{ 
                                                mt: { xs: 2, sm: 2.5, md: 3 }, 
                                                textAlign: 'center',
                                                fontSize: {
                                                    xs: '0.9rem',
                                                    sm: '1rem',
                                                    md: '1.1rem',
                                                },
                                                fontWeight: 500
                                            }}
                                        >
                                            OTP Verified Successfully!
                                        </Typography>
                                    )}
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default ReferralForm;