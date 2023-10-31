import { BsFillGridFill } from 'react-icons/bs'
import {  FaListAlt, FaUsers } from 'react-icons/fa'
import {MdOutlineProductionQuantityLimits } from 'react-icons/md'
import {RiLogoutCircleLine} from 'react-icons/ri'
import {PiUsersFourBold} from 'react-icons/pi'
import { Toaster } from 'react-hot-toast'
import { FcAbout } from "react-icons/fc";
import { FcDonate } from "react-icons/fc";
import { NavLink } from 'react-router-dom'

function AdminSidebar({children}) {
    const sideLinks = [
        {
            name:"Dashboard",
            link:"/admin",
            icon:BsFillGridFill
        },
        {
            name:"Mentors Lists",
            link:"/admin/mentors",
            icon:FaListAlt
        },
        {
            name:"Users",
            link:"/admin/users",
            icon:FaUsers    
        },
        
        {
            name:'Mentor Request',
            link:'/admin/mentor-management',
            icon:FcAbout

        },
        {
            name:'subscription plan Management',
            link:'/admin/subscription-management',
            icon:FcDonate
        },
       
    ]
    const active = 'bg-dryGray text-subMain'
    const hover = 'hover:text-white hover:bg-main'
    const inActive = 'rounded font-medium text-sm transitions flex gap-3 items-centere p-4'
    const Hover = ({isActive}) => 
      isActive ? `${active} ${inActive}` : `${inActive} ${hover} `
    
  const handleLogout = () => {
    localStorage.removeItem('authToken');
   
  };
  return (
   <>
         <div className='min-h-screen container mx-auto px-2  '>
            <div className='xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6 ' >
                <div className='col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md bg-blue-600'>
                    {
                     sideLinks.map((link,index)=>(
                       <NavLink to={link.link} key={index} className={Hover}>
                        <link.icon/><p>{link.name}</p>
                       </NavLink>
                     ))   
                    }
                     <NavLink to='/'  onClick={handleLogout} className={Hover}>
                        <RiLogoutCircleLine/><p>logout</p>
                       </NavLink>

                </div>
                <div 
                data-aos="fade-up"
                data-aos-duration = "1000"
                data-aos-delay = '10'
                data-aos-offset='200'

                className='col-span-6 rounded-md bg-dry border-gray-800 p-6'>
                    <Toaster toastOptions={3000} />
                    {children}
                </div>
            </div>
         </div>

   </>
  )
}

export default AdminSidebar