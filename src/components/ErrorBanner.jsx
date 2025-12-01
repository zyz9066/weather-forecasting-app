import { Alert } from "@mui/material";

const ErrorBanner = ({ message }) => {
  return (
    <Alert severity="error" sx={{ mt: 2 }}>
      {message}
    </Alert>
  );
}

export default ErrorBanner;