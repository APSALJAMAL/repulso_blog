import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { FaRegCalendarAlt } from "react-icons/fa";
import usericon from "@/assets/images/user.png";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";

const BlogCard = ({ props }) => {
  // Safeguard checks
  if (!props || !props.slug || !props.category?.slug) return null;

  return (
    <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
      <Card className="pt-5 h-full flex flex-col justify-between">
        <CardContent className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            <Avatar className="border border-black">
  <AvatarImage 
    src={props.author?.avatar || usericon} 
    className="w-full h-full object-cover" 
  />
</Avatar>

              <span>{props.author?.name || "Unknown"}</span>
            </div>

            {/* Optional Admin Badge */}
            {/* {props.author?.role === 'admin' && <Badge className="bg-violet-500">Admin</Badge>} */}
          </div>

          {/* Image */}
          <div className="my-2 aspect-[3/2] w-full overflow-hidden rounded">
            <img
              src={props.featuredImage}
              alt={props.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Meta & Title */}
          <div className="mt-auto">
            <p className="flex items-center gap-2 mb-2 text-sm text-gray-500">
              <FaRegCalendarAlt />
              <span>
                {props.createdAt
                  ? moment(props.createdAt).format("DD-MM-YYYY")
                  : "N/A"}
              </span>
            </p>
            <h2 className="text-lg font-semibold line-clamp-2">
              {props.title || "Untitled"}
            </h2>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
