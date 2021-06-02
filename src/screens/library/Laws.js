import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 700,
  },
  paper: { padding: 15 },
});

/**
 * todo: make page PDF'able
 */
export const Laws = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h4" gutterBottom>
          Love og Vedtægter
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          1. Foreningens navn:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Foreningens navn er IQ96.
        </Typography>

        <Typography variant="h1" gutterBottom></Typography>
        <Typography variant="subtitle2" gutterBottom>
          2. Foreningens hjemkommune:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Foreningen hører hjemme i Fredensborg Kommune.
        </Typography>

        <Typography variant="h1" gutterBottom></Typography>
        <Typography variant="subtitle2" gutterBottom>
          3. Foreningens formål:
        </Typography>
        <Typography variant="body1" gutterBottom>
          At afholde kulturelle udflugter. Hovedvægten lægges på en tredages
          udflugt på et fast givent tidspunkt hvert år. Kontingentet skal
          hovedsageligt dække denne tur.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Foreningen kan højst have 25 medlemmer.
        </Typography>

        <Typography variant="h1" gutterBottom></Typography>
        <Typography variant="subtitle2" gutterBottom>
          4. Antallet af bestyrelsesmedlemmer og hvordan de vælges:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Ledelsen af foreningen består af følgende personer der vælges på den
          årlige generalforsamling:
        </Typography>
        <ul>
          <li>Formand og kasserer er på valg i lige år.</li>
          <li>Næstformand og menigt bestyrelsesmedlem vælges i ulige år.</li>
        </ul>
        <Typography variant="body1" gutterBottom>
          For at besætte en bestyrelsespost skal man have stemmeret.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Næstformanden fører protokol over foreningens aktiviteter.
        </Typography>

        <Typography variant="h1" gutterBottom></Typography>
        <Typography variant="subtitle2" gutterBottom>
          5. Medlemmernes indbyrdes forhold, herunder ind- og udtræden af
          foreningen:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Medlemmerne er indbyrdes ligestillede, dog er bestyrelsen ansvarlige
          for arrangering af udflugterne.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Indtræden i foreningen kan ske i perioden mellem den årlige tur i
          april og frem til generalforsamlingen i september. Et nyt medlem
          betragtes først som indtrådt i foreningen, når ¼ af kontingentet for
          selve turen er betalt (se §12 ang. kontingent). Betaling skal ske
          senest på generalforsamlingen.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Udtræden af foreningen betragtes som et afbud til den årlige tur og
          kan ske når man ønsker det.
        </Typography>

        <Typography variant="h1" gutterBottom></Typography>
        <Typography variant="subtitle2" gutterBottom>
          6. Medlemmernes hæftelse for foreningens forpligtelser: ind- og
          udtræden af foreningen:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Medlemmerne hæfter socialt for evt. tab der påføres foreningen.
        </Typography>

        <Typography variant="h1" gutterBottom></Typography>
        <Typography variant="subtitle2" gutterBottom>
          7. Regnskabsaflæggelse, herunder regnskabsåret:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Regnskab aflægges af kassereren ved den ordinære generalforsamling.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Regnskabsåret løber fra 1/5 til 30/4.
        </Typography>

        <Typography variant="h1" gutterBottom></Typography>
        <Typography variant="subtitle2" gutterBottom>
          8. Foreningens ophør:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Der kræves et flertal på min. ¾ af alle medlemmer for at nedlægge
          foreningen.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Foreningens evt. indestående går til et velgørende formål.
        </Typography>

        <Typography variant="h1" gutterBottom></Typography>
        <Typography variant="subtitle2" gutterBottom>
          9. Den årlige udflugt:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Der kræves et flertal på min. ¾ af alle medlemmer for at nedlægge
          foreningen. Foreningens evt. indestående går til et velgørende formål.
        </Typography>

        <Typography variant="h1" gutterBottom></Typography>
        <Typography variant="subtitle2" gutterBottom>
          9. Den årlige udflugt:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Den årlige udflugt foregår i den første hele weekend af april med
          start fredag morgen (tidligst) og hjemkomst søndag aften (senest).
          Skulle påsken falde i den første weekend af april rykkes turen til den
          første weekend efter påske.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Afbud til den årlige tur skal ske min. 4 uger før afrejse, med mindre
          rejseselskab kræver mere end de 4 uger. Ved en afbudsfrist på mere end
          4 uger, skal dette oplyses sammen med den endelige indkaldelse til
          turen.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Ved afbud får man så meget som muligt tilbage, men beløbet er
          afhængigt af, hvor meget foreningen kan spare ved et afbud.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Bestyrelsen er berettiget til at afhænde en evt. afbudsrejse til anden
          side, dog fortrinsvist til evt. kommende medlemmer af foreningen.
        </Typography>

        <Typography variant="h1" gutterBottom></Typography>
        <Typography variant="subtitle2" gutterBottom>
          10. Udelukkelse af foreningen:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Man kan udelukkes fra næste års arrangement, hvis man opfører sig på
          en måde, som bestyrelsen eller generalforsamlingen ikke kan acceptere.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Ved udeblivelse fra to forenings-toure i træk sættes ens medlemskab
          under skærpet opsyn af bestyrelsen. Hvis medlemmet fortsat ikke viser
          interesse for foreningen, vil det være op til den næstkommende
          generalforsamling at tage stilling til, hvorvidt vedkommende bør
          forblive medlem.
        </Typography>

        <Typography variant="h1" gutterBottom></Typography>
        <Typography variant="subtitle2" gutterBottom>
          11. Generalforsamlingen:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Generalforsamlingen afholdes den sidste lørdag i september.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Indkaldelse til generalforsamlingen skal ske 2 uger før
          generalforsamlingen afholdes.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Evt. forslag/emner man ønsker behandlet på generalforsamlingen skal
          være bestyrelsen i hænde senest 3 uger før generalforsamlingen.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Er man forhindret i at deltage i generalforsamlingen kan man afgive
          sin stemme skriftligt til bestyrelsen inden generalforsamlingen.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Man skal være tilstede ved generalforsamlingen, for at kunne stemme
          til personvalg.
        </Typography>

        <Typography variant="h1" gutterBottom></Typography>
        <Typography variant="subtitle2" gutterBottom>
          12. Kontingent:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Kontingentet i foreningen lyder på i alt kr. 2.400,00 om året, hvoraf
          de kr. 200,- bruges til den årlige t-shirt og de kr. 100,- bruges til
          bl.a. internetsiden.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Betalingen af kontingentet forløber således, at man betaler kr. 200,00
          i kontingent hver måned året rundt med første betaling i maj og sidste
          betaling i april.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Man kan også vælge at betale større eller mindre beløb forud, bare man
          minimum har betalt det man skal i følge ovenstående.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Det koster min. kr. 300,- pr. år, at være medlem af foreningen, uanset
          om man deltager i den årlige tur eller ej. Deltager man i den årlige
          tur, indgår de kr. 300,- i det samlede kontingent.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Man opnår stemmeret til rejseforslag, ved at have betalt kontingent
          fra maj til september (begge måneder incl.). Stemmeret til øvrige
          afstemninger (vedtægter, bestyrelsesposter, generelle forslag m.m.)
          ved at have betalt min. kr. 300,- i kontingent.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Har man betalt sit kontingent fra maj til bestillingsmåneden (kan
          variere) vil man få bestilt en billet til den årlige tur, men
          deltagelse på den årlige tur kræver selvfølgelig, at man har betalt
          det fulde kontingent.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Der betales (frivilligt) kr. 20 i ekstrakontingent for hver måneds
          kontingent der betales for sent. Disse penge vil naturligvis gå til
          fælles bedste.
        </Typography>

        <Typography variant="h1" gutterBottom></Typography>
        <Typography variant="subtitle2" gutterBottom>
          13. Ændring af tidspunkter:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Ændring af faste tidspunkter der er nævnt i vedtægterne kræver 100%
          tilslutning fra medlemmerne.
        </Typography>

        <Typography variant="h1" gutterBottom></Typography>
        <Typography variant="subtitle2" gutterBottom>
          14. Optagelse af nye medlemmer:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Kun kandidater, der er registreret på foreningens officielle
          venteliste, kan komme i betragtning som medlemmer af foreningen.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Den officielle venteliste administreres af bestyrelsen, og optagelse
          på ventelisten kan kun ske gennem skriftlig henvendelse til
          bestyrelsen.
        </Typography>
      </Paper>
    </div>
  );
};
