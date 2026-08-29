import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import AddEntryModal from "../AddEntryModal";
import EntryDetails from "../EntryDetails";

import diagnosisService from "../../services/diagnoses";
import patientService from "../../services/patients";
import { Diagnosis, EntryFormValues, Gender, Patient } from "../../types";

const genderIcon = (gender: Gender) => {
  switch (gender) {
    case Gender.Male:
      return <MaleIcon />;
    case Gender.Female:
      return <FemaleIcon />;
    default:
      return <TransgenderIcon />;
  }
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPatient = async () => {
      setPatient(await patientService.getById(id));
      setDiagnoses(await diagnosisService.getAll());
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <Typography>loading...</Typography>;
  }

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.createEntry(patient.id, values);
      setPatient({ ...patient, entries: patient.entries.concat(entry) });
      setModalOpen(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(JSON.stringify(e.response?.data ?? e.message));
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <Typography variant="h5" sx={{ marginTop: "0.5em" }}>
        {patient.name} {genderIcon(patient.gender)}
      </Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>

      <AddEntryModal
        modalOpen={modalOpen}
        diagnoses={diagnoses}
        onSubmit={values => void submitNewEntry(values)}
        error={error}
        onClose={closeModal}
      />
      <Button
        variant="contained"
        sx={{ marginY: 2 }}
        onClick={() => setModalOpen(true)}
      >
        Add New Entry
      </Button>

      <Typography variant="h6">entries</Typography>
      <Box>
        {patient.entries.map(entry => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}
      </Box>
    </div>
  );
};

export default PatientPage;
