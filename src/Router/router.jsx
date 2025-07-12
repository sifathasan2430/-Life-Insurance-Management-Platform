import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Login from "../Login/Login";
import Register from "../Register/Register";
import AdminDashboardLayout from "../Layout/Root/AdminDashBoardLayout/AdminDashboardLayout";
import ManageUsers from "../Components/ManageUsers/ManageUsers";
import ManagePolicies from "../Components/ManagePolicies/ManagePolicies";
import Home from "../Pages/Home/Home";
import PolicyDetailsPage from "../Pages/PolicyDetailsPage/PolicyDetailsPage";
import QuotePage from "../Pages/QuotePage/QuotePage";
import ApplicationForm from "../Pages/ApplicationForm/ApplicationForm";
import ManageApplications from "../Components/ManageApplication/ManageApplications";
import AgentApplicationForm from "../Components/AgentsApplicationForm/AgentApplicationForm";
import ActiveAgents from "../Components/ManageAgents/ActiveAgents";
import PendingAgentApplications from "../Components/PendingAgentApplication/PendingAgentApplications";
import AgentDashboardLayout from "../Layout/AgentLayout/AgentDashboard/AgentDashboardLayout";
import BlogPosts from "../Components/Agents/AgnetBlogs/BlogPosts";



const router=createBrowserRouter([
    {
        path: "/",
        Component:Root,
        children: [{
            index: true,
            Component:Home
        },
        {
            path: "/policy/:id",
            Component:PolicyDetailsPage
        },
        {
            path:"/quote/:id",
            Component:QuotePage
        },   
        {
            path:"/application",
            Component:ApplicationForm

        },
        {
            path:"/agent-form",
            Component:AgentApplicationForm
        },
       
            {
            
                path: "/login",
                Component:Login
 },
 {
    path: "/register",
    Component:Register
 }
]
},
{
   path: "/admin/dashboard",
   Component:AdminDashboardLayout,
   children:[
    {
    path: "/admin/dashboard/applications",
    element: <ManageApplications />
   },

   {
    path:"/admin/dashboard/manage-users",
    Component:ManageUsers
   },
   {
    path: "/admin/dashboard/policies",
    Component:ManagePolicies
   },
   {
    path: "/admin/dashboard/active-agents",
    Component:ActiveAgents
   },
   {
    path:"/admin/dashboard/agents/pending",
    Component:PendingAgentApplications
   }
   ] 
},
{
    path:"/agent/dashboard",
    Component:AgentDashboardLayout,
    children:[{
        path:"/agent/dashboard/blog-posts",
        Component:BlogPosts,
    }]
}
]
)

export default router