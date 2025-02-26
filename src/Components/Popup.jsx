import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import ReferralForm from "./ReferralForm"
import VerifyForm from "./VerifyMail"

export default function Popup() {
    const [open, setOpen] = React.useState(false);
    const [verifymail, setVerify] = React.useState(false);
    const [details, setDetails] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const email = formJson.email;
        handleClose();
    };

    return (
        <React.Fragment>
            <Button variant="contained" color='secondary' size='large' onClick={handleClickOpen}>
                Refer Now
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'div',
                    },
                }}
            >
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        {verifymail ? (
                            <VerifyForm setVerify={setVerify} setDetails={setDetails} />
                        ) : (
                            <ReferralForm details={details} setOpen={setOpen} />
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}