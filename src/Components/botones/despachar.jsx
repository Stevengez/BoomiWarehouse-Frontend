import React from 'react';
import Button from '@mui/material/Button';


const DispatchButton = ({ hasName, row, onDelete }) => {

    if (!hasName) return null;

    const removeHero = async (e) => {
       //Pendiente a definir que acción se toma con la ruta necesaria
      }

    return (
        <Button variant="outlined" color='secondary' disableElevation onClick={removeHero}>
            Despachar
        </Button>
    );
};

export default DispatchButton;
