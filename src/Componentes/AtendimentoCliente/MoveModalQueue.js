import React, { useState } from 'react'
import { Alert, Box, Typography } from '@mui/material'
import ModalCustom from '../modalCustom/ModalCustom'
import { registeredPatient } from '../../localStorage/LocalStorageInfoPaciente'
import '../style/styleRegisterPatient.css'
const MoveModalQueue = ({
    arrayInfopatient,
    setOpenModalMoveQueue,
    openModalMoveQueue,
    setArrayInfoPatient,
}) => {
    const [messageSuccessTemporary, setMessageSucessTemporary] = useState(false)
    const movequeueanswer = () => {
        const decreaseorder = arrayInfopatient.map(el => {
            el.order -= 1; return el;
        }).filter(el => el.order > 0);
        setArrayInfoPatient(decreaseorder)
        localStorage.setItem(registeredPatient, JSON.stringify(decreaseorder));
        setMessageSucessTemporary(true)
        setTimeout(() => {
            setMessageSucessTemporary(false)
            setOpenModalMoveQueue(false)
        }, [1200])
    }

    return (
        <ModalCustom
            open={openModalMoveQueue}
            messageTime={messageSuccessTemporary}
            fechar={() => setOpenModalMoveQueue(false)}
            acaoDoButton={() => movequeueanswer()}
            tamanhoModal={{ lg: '30%', sm: '40%' }}
            titleModal={'Mover fila'}
        >
            <Box>
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}> Você deseja mover a fila ?  </Typography>
            </Box>
            {messageSuccessTemporary &&
                <Box sx={{ marginTop: '10px' }} className="animated-message">
                    <Alert severity="success">A fila foi modificada com sucesso!</Alert>
                </Box>
            }
        </ModalCustom>


    )
}

export default MoveModalQueue