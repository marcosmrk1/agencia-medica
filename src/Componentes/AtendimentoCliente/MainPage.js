import { Box, Button, Card, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { styleCard, styleTextHeader, } from '../../Utils/UtilsStyle';
import RegisterModal from './RegisterModal';
import PatientQueue from './PatientQueue';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MoveModalQueue from './MoveModalQueue';
const MainPage = () => {
    const [openModalRegisterPatient, setOpenModalRegisterPatient] = useState(false)
    const [arrayInfopatient, setArrayInfoPatient] = useState([])
    const [openModaMoveQueue, setOpenModalMoveQueue] = useState(false)
    const handleClickForOpenModal = () => {
        setOpenModalRegisterPatient(true)
    }
    const handleClickForOpenModalMoveQueue = () => {
        setOpenModalMoveQueue(true)
    }
    let patientQueue
    useEffect(() => {
        patientQueue = JSON.parse(localStorage.getItem('registeredPatient'));
        if (patientQueue) {
            setArrayInfoPatient(patientQueue)
        }
    }, [])
    return (
        <div>
            <Container>
                <Card sx={styleCard}>
                    <Box>
                        <Typography sx={styleTextHeader}>
                            Bem-vindo(a)
                        </Typography>

                    </Box>
                </Card>

                <Card sx={styleCard}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                        <Typography sx={{ fontFamily: 'Segoe UI', fontSize: '14' }}>
                            Listagem de pacientes
                        </Typography>

                        <Box sx={{ gap: '10px', display: 'flex' }}>

                            <Button variant="contained" onClick={() => handleClickForOpenModal()}>
                                Cadastrar paciente
                            </Button>
                            {arrayInfopatient?.length !== 0 && arrayInfopatient !== '' &&
                                <Button variant="contained" endIcon={<PersonAddAltIcon />} onClick={handleClickForOpenModalMoveQueue}>
                                    Próximo da fila
                                </Button>
                            }


                        </Box>
                    </Box >

                </Card>
                {openModalRegisterPatient &&
                    <RegisterModal
                        arrayInfopatient={arrayInfopatient}
                        setOpenModalRegisterPatient={setOpenModalRegisterPatient}
                        openModalRegisterPatient={openModalRegisterPatient}
                    />
                }
                {openModaMoveQueue &&
                    <MoveModalQueue
                        setArrayInfoPatient={setArrayInfoPatient}
                        arrayInfopatient={arrayInfopatient}
                        setOpenModalMoveQueue={setOpenModalMoveQueue}
                        openModalMoveQueue={openModaMoveQueue}
                    />
                }
                <PatientQueue
                    arrayInfopatient={arrayInfopatient}
                    setArrayInfoPatient={setArrayInfoPatient}
                />
            </Container>
        </div>
    );
}

export default MainPage;