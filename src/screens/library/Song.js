import { Pdfs } from '../../components/Pdfs';
import Button from '@material-ui/core/Button';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  centerPosition: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
}));
const melody = process.env.PUBLIC_URL + '/public/media/lillimarlene.mp3';

export const Song = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.centerPosition}>
        <Button
          variant="contained"
          size="large"
          className={classes.button}
          startIcon={<MusicNoteIcon />}
          href={melody}
          download
        >
          Hent Melodi
        </Button>
      </div>
      <Pdfs
        titleText="Opdateret 2019"
        pdfSource={'/pdf/song/IQ_sangen.pdf'}
        saveButtonText="Gem sangtekst"
      />
      <div>
        <Typography variant="h6">Sangskrivere:</Typography>
        <Typography variant="body1">IQ96, 2003, 2012, 2013 – Nestor</Typography>
        <Typography variant="body1">2004 – Poppe</Typography>
        <Typography variant="body1">
          2000, 2001, 2002, 2005, 2006, 2007, 2015, 2016, 2017 – Redacteur
        </Typography>
        <Typography variant="body1">
          1997, 1998, 1999, 2008, 2009, 2018 – Benjamin, Redacteur
        </Typography>
        <Typography variant="body1">
          2014 – Kasseur, Redacteur, Søsterkysser og Æselridder
        </Typography>
      </div>
    </div>
  );
};
