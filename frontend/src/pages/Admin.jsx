import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiPackage,
  FiGrid,
  FiUserCheck,
  FiTrendingUp,
  FiMessageSquare,
  FiBookOpen,
  FiBookmark,
} from "react-icons/fi";

import { useAuth, useClerk } from "@clerk/clerk-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../store/slices/productsSlice";
import {
  fetchAllUsers,
  changeUserRole,
  deleteUser,
} from "../store/slices/usersSlice";

import Sidebar from "../components/Admin/Sidebar";
import MobileNav from "../components/Admin/MobileNav";
import OverviewSection from "../components/Admin/OverviewSection";
import ProductsSection from "../components/Admin/ProductsSection";
import UsersSection from "../components/Admin/UsersSection";
import FeedbackSection from "../components/Admin/FeedbackSection";
import StoriesAdmin from "../components/Admin/StoriesAdmin";
import BookingsSection from "../components/Admin/BookingsSection";
import AddProductModal from "../components/Admin/AddProductModal";
import Loader from "../components/common/Loader";
import { toastError, toastSuccess, getErrMsg } from "../utils/toast";

export default function Admin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { signOut } = useClerk();
  const { isLoaded, isSignedIn } = useAuth();

  const { user } = useAppSelector((s) => s.auth);

  const {
    adminProducts: products,
    adminLoading: productsLoading,
    adminError: productsError,
  } = useAppSelector((s) => s.products);

  const {
    list: users,
    loading: usersLoading,
    error: usersError,
  } = useAppSelector((s) => s.users);

  const [activeSection, setActiveSection] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) return navigate("/");
    if (user && user.role !== "admin") navigate("/");
  }, [isLoaded, isSignedIn, user, navigate]);

  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(fetchAdminProducts());
      dispatch(fetchAllUsers());
    }
  }, [user, dispatch]);

  if (!isLoaded || !user || user.role !== "admin") {
    return <Loader fullPage size="lg" text="Loading dashboard..." />;
  }

  const initials = (name) =>
    (name || "U")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  
  const handleAddProduct = async ({ formData }) => {
    const result = await dispatch(createProduct(formData)).unwrap();
    setAddProductOpen(false);
    setEditingProduct(null);
    return result;
  };

  const handleUpdateProduct = async ({ formData }) => {
    const result = await dispatch(
      updateProduct({ id: editingProduct._id, formData })
    ).unwrap();
    setAddProductOpen(false);
    setEditingProduct(null);
    return result;
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await dispatch(deleteProduct(id)).unwrap();
      toastSuccess("Product deleted successfully");
    } catch (err) {
      toastError(getErrMsg(err, "Delete failed"));
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setAddProductOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setAddProductOpen(true);
  };

  const handleCloseModal = () => {
    setAddProductOpen(false);
    setEditingProduct(null);
  };

  
  const handleDeleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await dispatch(deleteUser(id)).unwrap();
      toastSuccess("User deleted successfully");
    } catch (err) {
      toastError(getErrMsg(err, "Delete failed"));
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await dispatch(changeUserRole({ userId, role: newRole })).unwrap();
      toastSuccess(`Role changed to ${newRole}`);
    } catch (err) {
      toastError(getErrMsg(err, "Role change failed"));
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirectUrl: "/" });
  };

 
  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const totalProducts = products.length;
  const totalPublished = products.filter((p) => p.status === "published").length;

  const stats = [
    {
      label: "Total Users",
      value: totalUsers.toString(),
      icon: <FiUsers />,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Total Admins",
      value: totalAdmins.toString(),
      icon: <FiUserCheck />,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Products",
      value: totalProducts.toString(),
      icon: <FiPackage />,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Published",
      value: totalPublished.toString(),
      icon: <FiTrendingUp />,
      color: "from-amber-500 to-amber-600",
    },
  ];

  const navItems = [
    { id: "overview", label: "Overview", icon: <FiGrid /> },
    { id: "products", label: "Products", icon: <FiPackage /> },
    { id: "users", label: "Users", icon: <FiUsers /> },
    { id: "feedback", label: "Feedback", icon: <FiMessageSquare /> },
    { id: "stories", label: "Stories", icon: <FiBookOpen /> },
    { id: "bookings", label: "Bookings", icon: <FiBookmark /> },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      <MobileNav
        navItems={navItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        <Sidebar
          user={user}
          initials={initials}
          navItems={navItems}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onSignOut={handleSignOut}
        />

        <main className="flex-1 min-w-0">
          {productsError && (
            <div className="mb-4 bg-red-50 border border-red-100 rounded-2xl p-4 text-red-600 text-[13px]">
              {productsError}
            </div>
          )}
          {usersError && (
            <div className="mb-4 bg-red-50 border border-red-100 rounded-2xl p-4 text-red-600 text-[13px]">
              {usersError}
            </div>
          )}

          {activeSection === "overview" && (
            <OverviewSection
              user={user}
              stats={stats}
              users={users}
              loading={usersLoading}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              initials={initials}
              onChangeRole={handleChangeRole}
            />
          )}

          {activeSection === "products" && (
            <ProductsSection
              products={products}
              loading={productsLoading}
              onAddProduct={handleOpenAdd}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}

          {activeSection === "users" && (
            <UsersSection
              users={users}
              loading={usersLoading}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              initials={initials}
              onChangeRole={handleChangeRole}
              onDeleteUser={handleDeleteUser}
            />
          )}

          {activeSection === "feedback" && <FeedbackSection />}
          {activeSection === "stories" && <StoriesAdmin />}
          {activeSection === "bookings" && <BookingsSection />}
        </main>
      </div>

      <AddProductModal
        isOpen={addProductOpen}
        onClose={handleCloseModal}
        onAdd={handleAddProduct}
        onUpdate={handleUpdateProduct}
        editingProduct={editingProduct}
      />
    </div>
  );
}