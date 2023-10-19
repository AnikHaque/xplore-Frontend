import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  UsergroupAddOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
  SwitcherOutlined,
} from "@ant-design/icons";
import QuizIcon from "@mui/icons-material/Quiz";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
  const isRole = role?.toUpperCase();
  //!
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/profile`}>{isRole} Profile</Link>,
          key: `/profile`,
        },
      ],
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,

    {
      label: <Link href={`/${role}/user-analytics`}>User Analytics</Link>,
      key: `/${role}/user-analytics`,
      icon: <TbBrandGoogleAnalytics />,
    },
    {
      label: <Link href={`/${role}/service-analytics`}>Service Analytics</Link>,
      key: `/${role}/service-analytics`,
      icon: <TbBrandGoogleAnalytics />,
    },
    {
      label: <Link href={`/${role}/booking-analytics`}>Booking Analytics</Link>,
      key: `/${role}/booking-analytics`,
      icon: <TbBrandGoogleAnalytics />,
    },

    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/user`}>User</Link>,
          key: `/${role}/user`,
          icon: <UsergroupAddOutlined />,
        },
        {
          label: <Link href={`/${role}/category`}>Category</Link>,
          key: `/${role}/category`,
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link href={`/${role}/service`}>Service</Link>,
          key: `/${role}/service`,
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link href={`/${role}/bookings`}>Bookings</Link>,
          key: `/${role}/bookings`,
          icon: <ShoppingCartOutlined />,
        },

        {
          label: <Link href={`/${role}/faq`}>Faq</Link>,
          key: `/${role}/faq`,
          icon: <QuizIcon />,
        },
        {
          label: <Link href={`/${role}/hero`}>Hero Sections</Link>,
          key: `/${role}/hero`,
          icon: <SwitcherOutlined />,
        },
        {
          label: <Link href={`/${role}/blog`}>Blog Post</Link>,
          key: `/${role}/blog`,
          icon: <PostAddIcon />,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,

    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
  ];

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/cart`}>Cart</Link>,
      icon: <TableOutlined />,
      key: `/${role}/cart`,
    },
    {
      label: <Link href={`/${role}/booking-list`}>Booking List</Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/booking-list`,
    },
    {
      label: <Link href={`/${role}/notification`}>Notification</Link>,
      icon: <ThunderboltOutlined />,
      key: `/${role}/notification`,
    },
    {
      label: <Link href={`/${role}/payment`}>Payment</Link>,
      icon: <CreditCardOutlined />,
      key: `/${role}/payment`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
