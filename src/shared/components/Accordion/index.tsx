import {
  Accordion as MuiAccordion,
  AccordionProps,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as styles from './styles';

type Props = AccordionProps & {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export const Accordion = ({ title, children, ...props }: Props) => {
  return (
    <MuiAccordion disableGutters sx={{ boxShadow: 'none' }} {...props}>
      <AccordionSummary
        id="session-header"
        aria-controls="session-content"
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="body2" color="text.primary" sx={styles.title}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={styles.content}>{children}</AccordionDetails>
    </MuiAccordion>
  );
};
