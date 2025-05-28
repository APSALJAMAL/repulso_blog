import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import logo from '@/assets/images/Repulsow.png'
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments, FaRegUser } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import { TfiWrite } from "react-icons/tfi";
import {
    RouteBlog,
    RouteBlogByCategory,
    RouteCategoryDetails,
    RouteCommentDetails,
    RouteIndex,
    RouteUser,
    RouteUserProfile
} from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEvn } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
    const user = useSelector(state => state.user);
    const { data: categoryData } = useFetch(`${getEvn('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        credentials: 'include'
    });

    return (
        <Sidebar>
            <SidebarHeader className="bg-white">
                <div className="pt-20"></div>
            </SidebarHeader>

            <SidebarContent className="bg-white font-bold ">
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <IoHomeOutline />
                                <Link to={RouteIndex}>Home</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {user && user.isLoggedIn && (
                            <>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <FaRegComments />
                                        <Link to={RouteCommentDetails}>Comments</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <FaRegUser />
                                        <Link to={RouteUserProfile}>User Profiles</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                        )}

                        {user && user.isLoggedIn && (user.user.role === 'admin' || user.user.role === 'owner') && (
                            <>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <GrBlog />
                                        <Link to={RouteBlog}>Blogs</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                {(user.user.role === 'owner') && (
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <BiCategoryAlt />
                                        <Link to='/categories'>Category</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                )}

                                
                                {/* {user.user.role === 'admin' && (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <LuUsers />
                                            <Link to={RouteUser}>Users</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )} */}

                                {/* Only show "Owner" if role is owner */}
                                {user.user.role === 'owner' && (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <LuUsers />
                                            <Link to="/owner">Owner</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )}
                                {user.user.role === 'owner' && (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                        <TfiWrite />
                                            <Link to="/publish">Publish</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )}
                            </>
                        )}
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-extrabold text-sm">
                        Categories
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {categoryData && categoryData.category.length > 0 &&
                            categoryData.category.map(category => (
                                <SidebarMenuItem key={category._id}>
                                    <SidebarMenuButton>
                                        <GoDot />
                                        <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar;
