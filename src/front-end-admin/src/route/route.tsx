import { lazy } from "react";
import NotFoundPage from "../Validator/NotFoundPage";
const Login = lazy(() => import("../ComponentsAdmin/Login"));
const Register = lazy(() => import("../ComponentsAdmin/CreateEmployee"));
const EditableTable = lazy(() =>
  import("../ComponentsAdmin/Manager/ComponentManager/User")
);
const ManagerImage = lazy(() =>
  import("../ComponentsAdmin/Manager/ComponentManager/Image")
);
const ManagerEmployee = lazy(() =>
  import("../ComponentsAdmin/Manager/ComponentManager/Employee")
);
const ManagerOrder = lazy(() =>
  import("../ComponentsAdmin/Manager/ComponentManager/Order")
);
const routes = [
  {
    path: "/LoginAdmin",
    component: Login
  },
  {
    path: "/RegisterEmployee",
    component: Register
  },
  {
    path: "/ManagerUser",
    component: EditableTable
  },
  {
    path: "/404",
    component: NotFoundPage
  },
  {
    path: "/ManagerImage",
    component: ManagerImage
  },
  {
    path: "/ManagerEmployee",
    component: ManagerEmployee
  },
  {
    path: "/ManagerOrder",
    component: ManagerOrder
  }
];

export default routes;
