import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography, IconButton } from "@mui/material"
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatchOrder } from "../../store/app/extra";
import { Archive, Downloading, Unarchive, ViewInAr } from "@mui/icons-material";
import Eye from '@mui/icons-material/Visibility';
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
        color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <Archive />,
        2: <Downloading sx={{transform: 'rotate(180deg)'}} />,
        3: <Unarchive />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};


const ActionsCell = ({ row }) => {

    const [showReviewDialog, toggleReview] = useState(false)
    const [showDispatchDialog, toggleDispatch] = useState(false)

    const [submitting, toggleSubmit] = useState(false)

    const order = useSelector((state) => state.app.orders[row.id])
    const status = useMemo(() => order.status.toLowerCase(), [order.status])
    const reviewMode = ["dispatched", "acknowledged"].includes(status)
    const dispatch = useDispatch()

    const onDispatch = () => {
        toggleSubmit(true)
        dispatch(dispatchOrder(row)).then(() => {
            toggleSubmit(false)
        })
        toggleDispatch(false)
        toggleReview(true)
    }

    const closeDialog = () => {
        toggleDispatch(false)
        toggleReview(false)
    }

    const steps = useMemo(() => {
        const receivedDate = row.createdAt ? new Date(row.createdAt) : undefined
        const dispatchDate = row.dispatchedAt ? new Date(row.dispatchedAt) : undefined
        const ackDate = row.acknowledgedAt ? new Date(row.acknowledgedAt) : undefined
        return [
            <Box>
                <Typography>
                    Received
                </Typography>
                <Typography>
                    {receivedDate?.toLocaleDateString()} {receivedDate?.toLocaleTimeString()}
                </Typography>
            </Box>,
            <Box>
                <Typography>
                    Dispatch Requested
                </Typography>
                <Typography>
                    {dispatchDate?.toLocaleDateString()} {dispatchDate?.toLocaleTimeString()}
                </Typography>
            </Box>,
            <Box>
                <Typography>
                    Dispatched
                </Typography>
                <Typography>
                    {ackDate?.toLocaleDateString()} {ackDate?.toLocaleTimeString()}
                </Typography>
            </Box>
        ]
    }, [row])

    const activeStep = useMemo(() => {
        if (status === "created") return 0
        if (status === "dispatched") return 1
        return 2
    }, [status])

    const dispatchDialog = <Dialog open={showDispatchDialog} onClose={closeDialog}>
        <DialogTitle>
            Dispatch Order
        </DialogTitle>
        <DialogContent>
            <Typography align="left">
                You're about to dispatch the order <strong>{row.id}</strong>. This will send a dispatch request to the Logistics team. Do you want to proceed?
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button color="primary" disabled={submitting}>
                <Box display='flex' alignItems='center' onClick={onDispatch} disabled={submitting}>
                    {submitting && <CircularProgress size={12} sx={{ mr: 1 }} />}
                    Confirm
                </Box>
            </Button>
            <Button color="error" onClick={closeDialog} disabled={submitting}>Cancel</Button>
        </DialogActions>
    </Dialog>

    const reviewDialog = <Dialog open={showReviewDialog} onClose={closeDialog} maxWidth='md'>
        <DialogTitle>
            Order {row.id} Detail
        </DialogTitle>
        <DialogContent>
            <Grid container sx={{mb: 2}}>
                <Grid xs={4}>
                    <strong>Destination: </strong>
                </Grid>
                <Grid xs={8}>
                    {row.country}
                </Grid>
                <Grid xs={4}>
                    <strong>Description:</strong>
                </Grid>
                <Grid xs={8}>
                    {row.description}
                </Grid>
                <Grid xs={4}>
                    <strong>Total:</strong>
                </Grid>
                <Grid xs={8}>
                    $ {row.totalAmount}
                </Grid>
            </Grid>
            <br/>
            <Stack sx={{ width: '100%' }} spacing={5}>
                <Stepper 
                    alternativeLabel 
                    activeStep={activeStep} 
                    connector={<ColorlibConnector />}
                >
                    {steps.map((label, index) => {
                        const isActivePhase = (activeStep+1 === index)
                        return <Step 
                            key={index} 
                            active={activeStep===index}
                            sx={{
                                '& .MuiStepConnector-root.MuiStepConnector-horizontal.Mui-disabled': {
                                    backgroundColor: 'rgb(5, 114, 206)',
                                    animation: isActivePhase && order.dispatchStarted ? 'indeterminateAnimation 1s infinite linear': undefined,
                                    transformOrigin: '0% 50%'
                                }
                            }}
                        >
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    })}
                </Stepper>
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button color="primary" variant="contained" onClick={closeDialog}>
                Close
            </Button>
        </DialogActions>
    </Dialog>

    return <Box>
        {reviewDialog}
        {dispatchDialog}
        <IconButton onClick={() => { toggleReview(true) }}>
            <Eye />
        </IconButton>
        {!reviewMode &&
        <IconButton onClick={() => { toggleDispatch(true) }} disabled={submitting}>
            <Unarchive />
        </IconButton>
        }
        
    </Box>
}

export default ActionsCell