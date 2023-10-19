import { Breadcrumb } from "antd";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";

const BookingBreadCrumb = ({
  items,
}: {
  items: {
    label: string;
    link: string;
  }[];
}) => {
  const breadCrumbItems = [
    {
      title: (
        <Link href="/">
          <span style={{ color: "white" }}>
            <HomeOutlined />
          </span>
        </Link>
      ),
    },
    ...items.map((item, index) => {
      return {
        title: item.link ? (
          <Link key={index} href={item.link}>
            <span style={{ color: "white" }}>{item.label}</span>
          </Link>
        ) : (
          <span style={{ color: "white" }}>{item.label}</span>
        ),
      };
    }),
  ];

  return <Breadcrumb items={breadCrumbItems} separator=">" />;
};

export default BookingBreadCrumb;
