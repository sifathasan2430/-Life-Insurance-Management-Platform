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
import AgentStatusSection from "../Components/AgentStatusDashboard/AgentStatusSection";
import UserPolicyStatus from "../UserPolicyStatus/UserPolicyStatus";
import MultiStepForm from "../Components/MultiStepForm/MultiStepForm";
import AgentClaimsManagement from "../Layout/AgentLayout/AgentDashboard/AgentClaimsManagement/AgentClaimsManagement";
import PrivateRouter from "./PrivateRoute/PrivateRouter";
import RoleRoute from "./RoleRouter/RoleRoute";
import AboutUs from "../Pages/AboutUs/AboutUs";
import EditPolices from "../Components/ManagePolicies/editPolices/EditPolices";
import AdminOverview from "../Pages/AdminOverview";




const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-policies",
        Component: PoliciesPage,
      },
      {
        path: "/policy/:id",
        Component: PolicyDetailsPage,
      },
      {
        path: "/multipageform",
        Component: MultiStepForm,
      },
      {
        path: "/quote/:id",
      element: (
      <PrivateRouter>
        <QuotePage />
      </PrivateRouter>
    ),
      },
      {
        path: "/application",
        element: (
          <PrivateRouter>
            <ApplicationForm />
          </PrivateRouter>
        ),
      },
      {
        path: "/agent-form",
      element: (
      <PrivateRouter>
        <AgentApplicationForm />
      </PrivateRouter>
    ),

      },
      {
        path: "/faqs",
        Component: LifeInsuranceFAQ,
      },
      {
        path:"edit-policy",
        Component:EditPolices
      },
      {
        path: "/blog",
        Component: BlogPage,
      },
      {
        path: "/profile",
        Component: ProfilePage,
      },
      {
        path: "/blog/:id",
        Component: BlogDetailsPage,
      },
      {
        path: "/claimRequest",
        element: (
          <PrivateRouter>
            <RoleRoute allowedRole="customer">
              <ClaimRequestForm />
            </RoleRoute>
          </PrivateRouter>
        ),

       
      },

      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path:'/about',
        Component:AboutUs
      }
    ],
  },
  {
    path: "/admin/dashboard",
    element: (
      <PrivateRouter>
       <RoleRoute allowedRole='admin' >
        <AdminDashboardLayout />
        </RoleRoute>
      </PrivateRouter>
    ),
    children: [
      {
    path:'/admin/dashboard/overview',
    element:<AdminOverview/>
      },
      {
        path: "/admin/dashboard/applications",
        element: <ManageApplications />,
      },

      {
        path: "/admin/dashboard/manage-users",
        Component: ManageUsers,
      },
      {
        path: "/admin/dashboard/policies",
        Component: ManagePolicies,
      },
      {
        path: "/admin/dashboard/active-agents",
        Component: ActiveAgents,
      },
      {
        path: "/admin/dashboard/agents/pending",
        Component: PendingAgentApplications,
      },
      {
        path: "/admin/dashboard/transactions",
        Component: AdminTransactions,
      },
      {
        path: "/admin/dashboard/profile",
        Component: ProfilePage,
      },
    ],
  },
  {
    path: "/agent/dashboard",
    element: (
      <PrivateRouter>
       <RoleRoute allowedRole={["admin", "agent"]} >
        <AgentDashboardLayout />
        </RoleRoute>
      </PrivateRouter>
    ),
   
    children: [
      {
        path: "/agent/dashboard/blog-posts",
        Component: BlogPosts,
      },
      {
        path: "/agent/dashboard/manage-blogs",
        Component: ManageBlogs,
      },
      {
        path: "/agent/dashboard/assigned-customers",
        Component: AgentAssignedCustomers,
      },
      {
        path: "/agent/dashboard/agent-claims-management",
        Component: AgentClaimsManagement,
      },
      {
        path: "/agent/dashboard",
        Component: AgentStatusSection,
      },
      {
        path: "/agent/dashboard/profile",
        Component: ProfilePage,
      },
    ],
  },
  {
    path: "/customer/dashboard",
    element: (
      <PrivateRouter>
        <RoleRoute  allowedRole="customer" >
        <CustomerDashboardLayout />
    </RoleRoute>
      </PrivateRouter>
    ),
    children: [
      {
        path: "/customer/dashboard/my-policies",
        Component: MyPoliciesPage,
      },
      {
        path: "/customer/dashboard/payment-status",
        Component: PaymentStatus,
      },
      {
        path: "/customer/dashboard/make-payment/:id",
        Component: PaymentPage,
      },
      {
        path: "/customer/dashboard/claim-request",
        Component: ClaimRequestForm,
      },
      {
        path: "/customer/dashboard/reject-policies",
        Component: UserPolicyStatus,
      },
      {
        path: "/customer/dashboard/profile",
        Component: ProfilePage,
      },
    ],
  },

  
]);

export default router;
