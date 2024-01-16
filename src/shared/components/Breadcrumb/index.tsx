//material-ui
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Typography } from '@mui/material';
//core-components
import { Link } from 'shared/components/Link';
//styles
import * as styles from './styles';
//resources
import { path } from 'shared/constants/path';

export type Crumb = {
  label: string;
  to: string;
};

type Props = {
  here: string;
  crumbs?: Crumb[];
};

export const Breadcrumb = ({ here, crumbs }: Props) => {
  const hasCrumbs = crumbs && crumbs.length > 0;
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={styles.container}
    >
      <Link to={path.root} sx={styles.home}>
        <HomeTwoToneIcon sx={styles.icon} />
      </Link>
      {hasCrumbs &&
        crumbs.map(({ label, to }, index) => {
          return (
            <Link key={`${label}${index}`} to={to}>
              <Typography variant="button">{label}</Typography>
            </Link>
          );
        })}
      <Typography variant="button">{here}</Typography>
    </Breadcrumbs>
  );
};
