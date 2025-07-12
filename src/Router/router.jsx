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
import ManageBlogs from "../Pages/ManageBlogPage/ManageBlogs";
import AgentAssignedCustomers from "../Components/Agents/AgentAssignedCustomers/AgentAssignedCustomers";
import CustomerDashboardLayout from "../Layout/CustomerLayout/CustomerDashboard/CustomerDashboardLayout";
import MyPoliciesPage from "../Pages/MypoliciesPage/MyPoliciesPage";
import PaymentStatus from "../Layout/CustomerLayout/CustomerPaymentStatus/PaymentStatus";
import LifeInsuranceFAQ from "../Components/LifeInsuranceFAQ/LifeInsuranceFAQ";
import MakePaymentPage from "../Pages/Payment/CheckoutForm/CheckoutForm";
import PaymentPage from "../Pages/Payment/Payment";
import AdminTransactions from "../Components/ManageApplication/ManageTransactions/mt";
import ClaimRequestForm from "../Pages/CustomerCliam/ClaimRequestForm";
import PoliciesPage from "../Pages/AllPolicy/PoliciesPage";
import BlogDetailsPage from "../Pages/BlogDetailsPage/BlogDetailsPage";
import BlogPage from "../Pages/BlogPage/BlogPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";



const router=createBrowserRouter([
    {
        path: "/",
        Component:Root,
        children: [{
            index: true,
            Component:Home
        },
        {
            path:"/all-policies",
            Component:PoliciesPage

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
        path:'/faqs',
        Component:LifeInsuranceFAQ
    },
    {
        path: '/blog',
        Component: BlogPage
    },
    {
        path:"/profile",
        Component:ProfilePage
    },
    {
        path: '/blog/:id',
        Component:BlogDetailsPage

    },
    {
        path:"/claimRequest",
        Component:ClaimRequestForm
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
   },
   {
    path: "/admin/dashboard/transactions",
    Component:AdminTransactions
   }
   ] 
},
{
    path:"/agent/dashboard",
    Component:AgentDashboardLayout,
    children:[{
        path:"/agent/dashboard/blog-posts",
        Component:BlogPosts,
    },
    {
        path:"/agent/dashboard/manage-blogs",
        Component:ManageBlogs
    },
    {
        path:"/agent/dashboard/assigned-customers",
        Component:AgentAssignedCustomers
    }
]
},
 {
       path:'/customer/dashboard',
       Component:CustomerDashboardLayout,
         children:[
          { path: '/customer/dashboard/my-policies', 
            Component: MyPoliciesPage 
          },
          {
            path: '/customer/dashboard/payment-status',
            Component:PaymentStatus
          },
           {
        path: "/customer/dashboard/make-payment/:id",
        Component:PaymentPage,
    },
        ]
        },
]
)

export default router