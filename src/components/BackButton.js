import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

export const BackButton = () => {
  const history = useHistory();
  return (
    <Button
      variant="contained"
      startIcon={<ArrowBackIcon />}
      onClick={() => history.goBack()}
    >
      Tilbage
    </Button>
  );
};
