import { useState, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent
} from "@mui/material";

import { Diagnosis, EntryFormValues, HealthCheckRating } from "../../types";

interface Props {
  diagnoses: Diagnosis[];
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

type EntryType = EntryFormValues["type"];

const entryTypes: EntryType[] = [
  "HealthCheck",
  "OccupationalHealthcare",
  "Hospital"
];

const ratingOptions = [0, 1, 2, 3] as HealthCheckRating[];

const AddEntryForm = ({ diagnoses, onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    const selected = entryTypes.find(option => option === event.target.value);
    if (selected) {
      setType(selected);
    }
  };

  const valuesFor = (entryType: EntryType): EntryFormValues => {
    const base = {
      description,
      date,
      specialist,
      ...(diagnosisCodes.length > 0 ? { diagnosisCodes } : {})
    };

    switch (entryType) {
      case "HealthCheck":
        return { ...base, type: "HealthCheck", healthCheckRating };
      case "OccupationalHealthcare":
        return {
          ...base,
          type: "OccupationalHealthcare",
          employerName,
          ...(sickLeaveStart && sickLeaveEnd
            ? { sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd } }
            : {})
        };
      case "Hospital":
        return {
          ...base,
          type: "Hospital",
          discharge: { date: dischargeDate, criteria: dischargeCriteria }
        };
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit(valuesFor(type));
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel id="entry-type-label">Entry type</InputLabel>
        <Select
          labelId="entry-type-label"
          fullWidth
          value={type}
          onChange={onTypeChange}
        >
          {entryTypes.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Description"
          fullWidth
          sx={{ marginTop: 2 }}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          type="date"
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
          sx={{ marginTop: 2 }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          sx={{ marginTop: 2 }}
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel id="diagnosis-codes-label" sx={{ marginTop: 2.5 }}>
          Diagnosis codes
        </InputLabel>
        <Select
          labelId="diagnosis-codes-label"
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) =>
            setDiagnosisCodes(
              typeof target.value === "string"
                ? target.value.split(",")
                : target.value
            )
          }
        >
          {diagnoses.map(diagnosis => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}
            </MenuItem>
          ))}
        </Select>

        {type === "HealthCheck" && (
          <div>
            <InputLabel id="health-rating-label" sx={{ marginTop: 2.5 }}>
              Healthcheck rating
            </InputLabel>
            <Select
              labelId="health-rating-label"
              fullWidth
              value={String(healthCheckRating)}
              onChange={({ target }) =>
                setHealthCheckRating(Number(target.value) as HealthCheckRating)
              }
            >
              {ratingOptions.map(rating => (
                <MenuItem key={rating} value={String(rating)}>
                  {HealthCheckRating[rating]}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}

        {type === "OccupationalHealthcare" && (
          <div>
            <TextField
              label="Employer"
              fullWidth
              sx={{ marginTop: 2 }}
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick leave start"
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
              sx={{ marginTop: 2 }}
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <TextField
              label="Sick leave end"
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
              sx={{ marginTop: 2 }}
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </div>
        )}

        {type === "Hospital" && (
          <div>
            <TextField
              label="Discharge date"
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
              sx={{ marginTop: 2 }}
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge criteria"
              fullWidth
              sx={{ marginTop: 2 }}
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </div>
        )}

        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
