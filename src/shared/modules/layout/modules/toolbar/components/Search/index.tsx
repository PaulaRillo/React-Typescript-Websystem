//material-ui
import { Box, SvgIcon, Typography } from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
//core-components
import { KeyboardKey } from 'shared/components/KeyboardKey';
//translate
import { tr } from 'shared/translate';
//styles
import * as styles from './styles';

export const Search = () => {
  return (
    <Box component="button" sx={styles.button}>
      <SvgIcon id="search-icon" sx={styles.icon}>
        <SearchTwoToneIcon />
      </SvgIcon>
      <Typography variant="body2" sx={styles.label}>
        {tr('app.toolbar.search.label')}
      </Typography>
      <KeyboardKey shortcut="⌘K" />
    </Box>
  );
};
