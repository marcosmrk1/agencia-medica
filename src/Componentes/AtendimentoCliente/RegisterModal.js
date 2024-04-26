import React, { useEffect, useState } from 'react'
import ModalCustom from '../modalCustom/ModalCustom'
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { registeredPatient } from '../../localStorage/LocalStorageInfoPaciente'
import { messageError } from '../../Utils/Utils'
import Alert from '@mui/material/Alert';
import '../style/styleRegisterPatient.css'
const RegisterModal = ({
    setOpenModalRegisterPatient,
    openModalRegisterPatient,
    arrayInfopatient,
}) => {
    const valuesStart = {
        patientname: '',
        medicalSpecialty: '0',
    }
    const [patientregistrationfield, setpatientregistrationfield] = useState(valuesStart);
    const [erroMessage, setErrorMessage] = useState({ ...messageError })
    const [messageSuccessTemporary, setMessageSucessTemporary] = useState(false)


    const handleChange = (event) => {
        const { name, value } = event.target
        setpatientregistrationfield({
            ...patientregistrationfield, [name]: value
        })
    };
    const validationFields = () => {
        let handlingError = false;
        Object.keys(patientregistrationfield).forEach(campo => {
            const mensagemError = patientregistrationfield[campo]?.length === 0 || patientregistrationfield[campo] === '0' ? messageError[campo].msg : '';
            setErrorMessage(prev => ({ ...prev, [campo]: { msg: mensagemError, error: mensagemError !== '' } }));
            if (mensagemError !== '') {
                handlingError = true;
            }
        });
        return handlingError;
    }


    const sendData = () => {
        if (!validationFields()) {

            let params =
            {
                patientname: patientregistrationfield.patientname,
                medicalSpecialty: patientregistrationfield.medicalSpecialty,
                order: arrayInfopatient.length + 1,
                id: arrayInfopatient.length + 1
            };
            arrayInfopatient.push(params)
            localStorage.setItem(registeredPatient, JSON.stringify(arrayInfopatient));
            setMessageSucessTemporary(true)
            setpatientregistrationfield(valuesStart)
        }
    };

    useEffect(() => {
        if (messageSuccessTemporary) {
            setTimeout(() => {
                setMessageSucessTemporary(false)
            }, [1000])
        }

    }, [messageSuccessTemporary])
    return (
        <ModalCustom
            messageTime={messageSuccessTemporary}
            open={openModalRegisterPatient}
            fechar={() => setOpenModalRegisterPatient(false)}
            acaoDoButton={() => sendData()}
            titleModal={'Cadastrar paciente'}
        >
            <Box sx={{ display: 'flex', gap: '10px', flexDirection: 'column', marginTop: '20px' }}>
                <TextField label='Nome do paciente ' name='patientname' onChange={handleChange} fullWidth
                    value={patientregistrationfield.patientname}
                    helperText={erroMessage['patientname'].error && erroMessage['patientname'].msg} error={erroMessage['patientname'].error}
                >
                </TextField>
                <FormControl fullWidth error={erroMessage['medicalSpecialty'].error}>
                    <InputLabel id="demo-simple-select-label">Selecione especialidade médica </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name='medicalSpecialty'
                        value={patientregistrationfield.medicalSpecialty}
                        label="Selecione especialidade médica"
                        onChange={handleChange}
                    >
                        <MenuItem value={'0'}>Não selecionado</MenuItem>
                        <MenuItem value={'Ortopedia'}>Ortopedia</MenuItem>
                        <MenuItem value={'Cardiologia'}>Cardiologia </MenuItem>
                        <MenuItem value={'Psiquiatria'}>Psiquiatria</MenuItem>
                    </Select>
                    <FormHelperText>{erroMessage['medicalSpecialty'].error && erroMessage['medicalSpecialty'].msg}</FormHelperText>

                </FormControl>
            </Box>
            {messageSuccessTemporary &&
                <Box sx={{ marginTop: '10px' }} className="animated-message">
                    <Alert severity="success">Paciente foi adicionado na lista de espera!</Alert>
                </Box>
            }
        </ModalCustom>
    )
}

export default RegisterModal