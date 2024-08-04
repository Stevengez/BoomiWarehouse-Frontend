import { Box, Container, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Logo from '../assets/logo.png'


const BannerComponent = () => {
    return <Box sx={{display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center'}}>
      <img src={Logo} width={80} height={80} />
      <Box>
        <Typography variant="h4" fontWeight={600} sx={{mb: -1}}>
          WAREHOUSE
        </Typography>
        <Typography variant='body2' align='left' sx={{mb: -0.8}}>
          Powered by Spring, Boomi and Solace
        </Typography>
        <Typography variant='caption' align='left'>
          Developed by Group#2
        </Typography>
      </Box>
    </Box>
}

export default BannerComponent