import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const styles = theme =>({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
  drawerTop:{
    height:88,
    backgroundColor: theme.palette.primary.main,
    borderBottom:'2px solid #272723 '
  },
});

class SideDrawer extends React.Component {
    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button onClick={this.props.toggleShow} key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button onClick={this.props.toggleShow} key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        return (
            <div>
                <Drawer open={this.props.show} onClose={this.props.toggleShow}>
                  <div className={classes.drawerTop}>

                  </div>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleShow}
                        onKeyDown={this.toggleShow}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }
}

SideDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideDrawer);
