import { makeStyles } from '@material-ui/core/styles';
import {
  colorPrimary,
  colorSecondary,
  colorTertiary,
} from '../../styles/style-common';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    '& .MuiAppBar-colorPrimary': {
      color: colorTertiary,
      backgroundColor: colorPrimary,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  header: {
    minHeight: 50,
  },
  iconHome: {
    borderRight: '1px solid #f5f5f5',
  },
  userName: {
    fontSize: 16,
    marginLeft: 5,
    color: 'white',
  },
  iconUserName: {
    marginRight: 10,
    marginLeft: 10,
  },
  drawer: {
    top: '50px !important',
    '& .MuiDrawer-paper': {
      top: 50,
      color: colorTertiary,
      backgroundColor: colorSecondary,
    },
  },
}));

export { useStyles };
