import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { Typography, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  centerPosition: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export function Pdfs(props) {
  const { titleText, pdfSource, saveButtonText } = props;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const classes = useStyles();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const pdf = process.env.PUBLIC_URL + pdfSource;

  return (
    <div>
      <div className={classes.centerPosition}>
        <Button
          variant="contained"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          href={pdf}
          download
        >
          {saveButtonText ? saveButtonText : 'Gem'}
        </Button>
      </div>
      <div>
        <Paper elevation={3}>
          <div className={classes.centerPosition}>
            <Typography>{titleText}</Typography>
          </div>
          <div className={classes.centerPosition}>
            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.apply(null, Array(numPages))
                .map((x, i) => i + 1)
                .map(page => (
                  <Page pageNumber={page} />
                ))}
            </Document>
          </div>
        </Paper>
      </div>
    </div>
  );
}
