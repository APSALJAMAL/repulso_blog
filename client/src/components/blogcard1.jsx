import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from "@/components/ui/badge"
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { FaRegCalendarAlt } from "react-icons/fa"
import usericon from '@/assets/images/user.png'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/RouteName'

const BlogCard1 = ({ blog }) => {
  // Destructure necessary properties from the blog object with fallback values
  const {
    category = {},
    featuredImage = '/path/to/default/image.jpg', // Fallback image
    title = 'No Title Available',
    createdAt,
    author = {},
    slug
  } = blog;

  // Handle category and slug in case they're missing
  const categorySlug = category.slug || 'default-category';
  const authorAvatar = author.avatar || usericon;
  const authorName = author.name || 'Unknown Author';

  return (
    <Link to={RouteBlogDetails(categorySlug, slug)}>
      <Card className="pt-5">
        <CardContent>
          <div className='flex items-center justify-between'>
            <div className='flex justify-between items-center gap-2'>
              <Avatar className="border border-black">
                <AvatarImage src={authorAvatar} alt={authorName} />
              </Avatar>
              <span>{authorName}</span>
            </div>
            {/* Optional: Show a badge for authors with specific roles */}
            {/* {author.role === 'admin' && <Badge variant="outline" className="bg-violet-500">Admin</Badge>} */}
          </div>

          <div className="my-2 aspect-[3/2] w-full overflow-hidden rounded">
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <p className='flex items-center gap-2 mb-2'>
              <FaRegCalendarAlt />
              <span>{createdAt ? moment(createdAt).format('DD-MM-YYYY') : 'Unknown Date'}</span>
            </p>
            <h2 className='text-2xl font-bold line-clamp-2'>{title}</h2>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default BlogCard1;
