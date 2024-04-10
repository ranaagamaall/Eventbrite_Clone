import {HiOutlineHome} from 'react-icons/hi'
import {BsCalendarDate} from 'react-icons/bs'
import {BiReceipt} from 'react-icons/bi'
import {TbSpeakerphone} from 'react-icons/tb'
import {BiBarChartAlt2} from 'react-icons/bi'
import {BsBank} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import {AiOutlineAppstore} from 'react-icons/ai'
import {BiHelpCircle} from 'react-icons/bi'
import classes from "../../layouts/sideBar/sidebar.module.css"

const sideBarCreator = {
    list: [
        {
          key: "0",  
          title: "Home",
          icon: <HiOutlineHome className={classes.icon}/>,
          route: "/create",
        },
        {
          key: "1",
          title: "Events",
          icon: <BsCalendarDate className={classes.icon}/>,
          route: "/events",
        },
        {
          key: "2",
          title: "Orders",
          icon: <BiReceipt className={classes.icon}/>,
          route: "/create/orders",
        },
        {
          key: "3",
          title: "Marketing",
          icon: <TbSpeakerphone className={classes.icon}/>,
          route: "/create/marketing",
        },
        {
          key: "4",
          title: "Reports",
          icon: <BiBarChartAlt2 className={classes.icon}/>,
          route: "/attendeeSummary",
        },
        {
          key: "5",  
          title: "Finance",
          icon: <BsBank className={classes.icon}/>,
          route: "/create/finance",
        },
        {
          key: "6",
          title: "Organizations Settings",
          icon: <FiSettings className={classes.icon}/>,
          route: "/create/settings",
        },
        {
          key: "7",
          title: "App Marketplace",
          icon: <AiOutlineAppstore className={classes.icon}/>,
          route: "/create/app",
        },
        {
          key: "8",
          title: "Help Center",
          icon: <BiHelpCircle className={classes.icon}/>,
          route: "/create/help",
        }

      ],
}

export default sideBarCreator;