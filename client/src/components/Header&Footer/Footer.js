import React, {Component} from 'react';
import classes from "./footer.module.css";

import {LocalPhoneOutlined, Explore, ScheduleOutlined, LocalPostOfficeOutlined} from '@material-ui/icons';


class Footer extends Component {
    render() {
        return (
            <footer className="bck_b_dark">
                <div className="container">
                    <div className={classes.logo}>
                        Musical World
                    </div>
                    <div className={classes.wrapper}>
                        <div className={classes.left}>
                            <h2>Contact information</h2>
                            <div className={classes.business_nfo}>
                                <div className={classes.tag}>
                                    <Explore
                                        className={classes.icon}
                                    />
                                    <div className={classes.nfo}>
                                        <div>Address</div>
                                        <div>New Delhi, India</div>
                                        {/*<div>{data.siteData[0].address}</div>*/}
                                    </div>
                                </div>
                                <div className={classes.tag}>
                                    <LocalPhoneOutlined className={classes.icon}/>
                                    <div className={classes.nfo}>
                                        <div>Phone</div>
                                        <div>+91 9996051456</div>
                                        {/*<div>{data.siteData[0].phone}</div>*/}
                                    </div>
                                </div>
                                <div className={classes.tag}>
                                    <ScheduleOutlined
                                        className={classes.icon}
                                    />
                                    <div className={classes.nfo}>
                                        <div>Working hours</div>
                                        <div>Mon-Sat 9am-6pm</div>
                                        {/*<div>{data.siteData[0].hours}</div>*/}
                                    </div>
                                </div>
                                <div className={classes.tag}>
                                    <LocalPostOfficeOutlined
                                        className={classes.icon}
                                    />
                                    <div className={classes.nfo}>
                                        <div>Email</div>
                                        <div>info@musicalworld.com</div>
                                        {/*<div>{data.siteData[0].email}</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.right}>
                            <h2>Be the first to know</h2>
                            <div>
                                <div>
                                    Get all the latest information on events, sales and offers.You can miss out.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;