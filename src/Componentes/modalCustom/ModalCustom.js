
import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react'
const RegisterModal = ({ children,
    titleModal,
    open,
    fechar = false,
    acaoDoButton,
    tamanhoModal,
    fecharModal,
    alturaModal,
    messageTime
}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: tamanhoModal ? tamanhoModal : '50%',
        height: alturaModal ? alturaModal : 'auto',
        bgcolor: 'background.paper',
        p: 4,
    };
    return (
        <>
            <Modal
                open={open}
                onClose={() => fechar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box>
                        <Typography id="modal-modal-title" variant="h5" component="h2"
                            sx={{ color: '', fontSize: '22px', display: 'flex', justifyContent: 'space-between' }}>
                            {titleModal}
                        </Typography>

                    </Box>
                    {children}
                    <Box disabled={messageTime ? true : false}  sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-start', marginTop: '30px', gap: '10px' }}>
                        <Button  disabled={messageTime ? true : false} onClick={acaoDoButton} variant='contained' >
                            Salvar
                        </Button>
                        <Button  variant='contained'
                            onClick={fechar} disabled={messageTime ? true : false} style={{ backgroundColor: 'rgb(118, 118, 118)', hover: '' }}>
                            {fecharModal ? fecharModal : 'Cancelar'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default RegisterModal