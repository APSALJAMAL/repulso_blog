import Comment from "@/components/Comment";
import CommentCount from "@/components/CommentCount";
import CommentList from "@/components/CommentList";
import LikeCount from "@/components/LikeCount";
import Loading from "@/components/Loading";
import RelatedBlog from "@/components/RelatedBlog";
import { Avatar } from "@/components/ui/avatar";
import { getEvn } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import { AvatarImage } from "@radix-ui/react-avatar";
import { decode } from "entities";
import moment from "moment";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  TelegramIcon,
} from "react-share";
import { FaRegCopy } from "react-icons/fa";
import { FaCheck, FaXTwitter } from "react-icons/fa6";
import unknownUser from "@/assets/images/R.png";
const SingleBlogDetails = () => {
  const { blog, category } = useParams();

  const { data, loading, error } = useFetch(
    `${getEvn("VITE_API_BASE_URL")}/blog/get-blog/${blog}`,
    {
      method: "get",
      credentials: "include",
    },
    [blog, category]
  );

  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    });
  };

  if (loading) return <Loading />;
  return (
    <div className="md:flex-nowrap flex-wrap flex justify-between gap-20">
      {data && data.blog && (
        <>
          <div className="border rounded md:w-[70%] w-full p-5">
            <h1 className="text-2xl font-bold mb-5">{data.blog.title}</h1>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center gap-5">
                <Avatar>
                <AvatarImage
  src={data.blog?.author?.avatar || unknownUser}
  className="w-full h-full object-cover"
/>
                </Avatar>
                <div>
                  <p className="font-bold">{data.blog?.author?.name ?? "Unknown"}</p>
                  <p>
                    Date: {moment(data.blog.createdAt).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center gap-5">
                <LikeCount props={{ blogid: data.blog._id }} />
                <CommentCount props={{ blogid: data.blog._id }} />
              </div>
            </div>
            <div className="my-5">
              <img
                src={data.blog.featuredImage}
                className="w-full h-auto max-h-[500px] object-contain rounded"
                alt="Featured"
              />
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: decode(data.blog.blogContent) || "",
              }}
            ></div>

            <div className="border-t mt-8 pt-5">
              <h2 className="text-lg font-semibold mb-2">Share this blog</h2>

              <div className="flex items-center gap-4 flex-wrap">
                {/* Social Buttons */}
                {/* Copy Link */}
                <button
                  onClick={() => copyToClipboard(window.location.href)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                  {copied ? (
                    <FaCheck className="text-green-600" />
                  ) : (
                    <FaRegCopy />
                  )}
                </button>
                <FacebookShareButton url={window.location.href}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={window.location.href}>
                  <FaXTwitter size={20} round />
                </TwitterShareButton>
                <WhatsappShareButton url={window.location.href}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <LinkedinShareButton url={window.location.href}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <TelegramShareButton url={window.location.href}>
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </div>
            </div>

            <div className="border-t mt-5 pt-5">
              <Comment props={{ blogid: data.blog._id }} />
            </div>
          </div>
        </>
      )}
      <div className="border rounded md:w-[30%] w-full p-5">
        <RelatedBlog props={{ category: category, currentBlog: blog }} />
      </div>
    </div>
  );
};

export default SingleBlogDetails;
