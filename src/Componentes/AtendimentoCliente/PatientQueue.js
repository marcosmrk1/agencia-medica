import { styleCard, styleTextHeader } from '../../Utils/UtilsStyle';
import { Alert, Avatar, Box, Button, Card, Grid, IconButton, TextField, Typography, debounce } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeAccents } from '../../Utils/UtilsFunc';
const PatientQueue = ({
    arrayInfopatient,
    setArrayInfoPatient,
    patientQueue
}) => {
    const estilosDasLabel = { fontSize: '10px', fontWeight: 'bold', marginTop: '3px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }
    const excluirPatient = (res) => {
        const newArray = arrayInfopatient.filter(el => el.id !== res.id)
        setArrayInfoPatient(newArray);
    }
    const seachr = (e) => {

        const digitado = e.target.value


        let filtrandoBarraPesquisa =arrayInfopatient.filter((el) => {
            if (el.patientname) {

                return removeAccents(el.patientname).toLowerCase().includes(digitado.toLowerCase());
            }
            return el
        });
        filtrandoBarraPesquisa.sort((a, b) => parseInt(a.order) - parseInt(b.order));
        setArrayInfoPatient(filtrandoBarraPesquisa);

    }
    return (
        <Card sx={styleCard}>
            <Box>
                <Typography sx={styleTextHeader} > Fila de pacientes </Typography>
            </Box>
            <Box sx={{ marginTop: '5vh' }}>
                <TextField label='Pesquisar Nome' fullWidth onChange={(e) => seachr(e)} >  </TextField>

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
                                <Card sx={styleCard} >
                                    <Box sx={{ display: 'flex', gap: '10px', }}>
                                        <Avatar alt={patient.patientname} sx={{ marginTop: '10px' }} />
                                        <Box sx={{ marginLeft: '10px' }} >
                                            <Typography>Informação do paciente
                                                <IconButton onClick={() => excluirPatient(patient)} aria-label="delete" color='error'>
                                                    <DeleteIcon />
                                                </IconButton>
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