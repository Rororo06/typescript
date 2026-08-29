import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";

import { assertNever, Diagnosis, Entry, HealthCheckRating } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const ratingColors: Record<HealthCheckRating, string> = {
  [HealthCheckRating.Healthy]: "green",
  [HealthCheckRating["Low risk"]]: "gold",
  [HealthCheckRating["High risk"]]: "orange",
  [HealthCheckRating["Critical risk"]]: "red"
};

const EntrySpecifics = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Box>
          <Typography variant="body2">
            <LocalHospitalIcon fontSize="inherit" /> discharged{" "}
            {entry.discharge.date}
          </Typography>
          <Typography variant="body2">{entry.discharge.criteria}</Typography>
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box>
          <Typography variant="body2">
            <WorkIcon fontSize="inherit" /> {entry.employerName}
          </Typography>
          {entry.sickLeave && (
            <Typography variant="body2">
              sick leave {entry.sickLeave.startDate} – {entry.sickLeave.endDate}
            </Typography>
          )}
        </Box>
      );
    case "HealthCheck":
      return (
        <FavoriteIcon sx={{ color: ratingColors[entry.healthCheckRating] }} />
      );
    default:
      return assertNever(entry);
  }
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const nameOf = (code: string) =>
    diagnoses.find(diagnosis => diagnosis.code === code)?.name;

  return (
    <Box
      sx={{ border: 1, borderRadius: 2, padding: 1.5, marginBottom: 1.5 }}
    >
      <Typography>
        {entry.date} <MedicalServicesIcon fontSize="inherit" />
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li key={code}>
            {code} {nameOf(code)}
          </li>
        ))}
      </ul>
      <EntrySpecifics entry={entry} />
      <Typography variant="body2">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default EntryDetails;
