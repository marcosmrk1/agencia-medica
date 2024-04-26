import { styleCard, styleTextHeader } from '../../Utils/UtilsStyle';
import { Alert, Avatar, Box, Card, Grid, TextField, Typography } from '@mui/material';
const PatientQueue = ({
    arrayInfopatient,
    setArrayInfoPatient,
}) => {
    const estilosDasLabel = { fontSize: '10px', fontWeight: 'bold', marginTop: '3px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }
    return (
        <Card sx={styleCard}>
            <Box>
                <Typography sx={styleTextHeader} > Fila de pacientes </Typography>
            </Box>
            <Box sx={{ marginTop: '5vh' }}>
                <TextField label='Pesquisar Nome' fullWidth  >  </TextField>

            </Box>
            <Box>
                <Grid container spacing={2} sx={{ display: 'flex', marginTop: '10px', }}>
                    <Box>

                    </Box>
                    {arrayInfopatient === null || arrayInfopatient?.length === 0 ?
                        <Alert severity="info" sx={{ width: '100%' }}>Não existe pacientes na fila de espera </Alert>
                        :
                        arrayInfopatient.map((patient, index) => (
                            <Grid key={index + 'List of patients'} item lg={4}  >
                                <Card  sx={styleCard} >
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
                        ))}

                </Grid>


            </Box>
        </Card>
    )
}

export default PatientQueue