import { styleCard, styleTextHeader } from '../../Utils/UtilsStyle';
import { Alert, Avatar, Box, Button, Card, Grid, IconButton, TextField, Typography, debounce } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeAccents } from '../../Utils/UtilsFunc';
import React, { useState } from 'react';

const PatientQueue = ({
    arrayInfopatient,
}) => {
    const [filteredList, setFilteredList] = useState()

    const estilosDasLabel = { fontSize: '10px', fontWeight: 'bold', marginTop: '3px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }
    const search = (e) => {
        const digitado = e.target.value

        if(!digitado){
            setFilteredList(arrayInfopatient)
        }

        let filtrandoBarraPesquisa = arrayInfopatient.filter((el) => 
         removeAccents(el.patientname).toLowerCase().includes(digitado.toLowerCase())
        );

        filtrandoBarraPesquisa.sort((a, b) => parseInt(a.order) - parseInt(b.order));

        setFilteredList(filtrandoBarraPesquisa);
    }
    return (
        <Card sx={styleCard}>
            <Box>
                <Typography sx={styleTextHeader} > Fila de pacientes </Typography>
            </Box>
            <Box sx={{ marginTop: '5vh' }}>
                <TextField label='Pesquisar Nome' fullWidth onChange={(e) => search(e)}/>

            </Box>
            <Box>
                <Grid container spacing={2} sx={{ display: 'flex', marginTop: '10px', }}>
                    <Box>

                    </Box>
                    {!arrayInfopatient && !filteredList?
                        <Alert severity="info" sx={{ width: '100%' }}>Não existe pacientes na fila de espera </Alert>
                        : filteredList ?
                        filteredList.map((patient, index) => (
                            <Grid key={index + 'List of patients'} item lg={4}  >
                                <Card sx={styleCard} >
                                    <Box sx={{ display: 'flex', gap: '10px', }}>
                                        <Avatar alt={patient.patientname} sx={{ marginTop: '10px' }} />
                                        <Box sx={{ marginLeft: '10px' }} >
                                            <Typography>Informação do paciente
                                         
                                            </Typography>
                                            <Typography sx={estilosDasLabel}>Nome: {patient.patientname}</Typography>
                                            <Typography sx={estilosDasLabel}>especialidade medica: {patient.medicalSpecialty} </Typography>
                                            <Typography sx={estilosDasLabel}>Ordem: {patient.order}</Typography>

                                        </Box>

                                    </Box>
                                </Card>
                            </Grid>
                        )): arrayInfopatient.map((patient, index) => (
                            <Grid key={index + 'List of patients'} item lg={4}  >
                                <Card sx={styleCard} >
                                    <Box sx={{ display: 'flex', gap: '10px', }}>
                                        <Avatar alt={patient.patientname} sx={{ marginTop: '10px' }} />
                                        <Box sx={{ marginLeft: '10px' }} >
                                            <Typography>Informação do paciente
                                              
                                            </Typography>
                                            <Typography sx={estilosDasLabel}>Nome: {patient.patientname}</Typography>
                                            <Typography sx={estilosDasLabel}>especialidade medica: {patient.medicalSpecialty} </Typography>
                                            <Typography sx={estilosDasLabel}>Ordem de espera : {patient.order}</Typography>

                                        </Box>

                                    </Box>
                                </Card>
                            </Grid>
                        ))}

                </Grid>


            </Box>
        </Card>
    )
}

export default PatientQueue