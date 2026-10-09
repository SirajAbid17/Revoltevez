import {
  FiShield,
  FiUser,
  FiDatabase,
  FiCheckCircle,
} from "react-icons/fi";


export const SECTIONS = [
  {
    id: "introduction",
    Icon: FiShield,
    title: "Introduction",
    body: [
      `Revoltevez (Private) Limited ("we", "our", "us") respects your privacy and is committed to protecting the personal information you share with us.`,
      `This Privacy Policy explains what data we collect, how we use it, who we share it with, and the choices you have about your information. By using our website and services, you agree to this policy.`,
    ],
  },
  {
    id: "collect",
    Icon: FiDatabase,
    title: "Information We Collect",
    body: [`We collect only the information necessary to provide our services:`],
    list: [
      {
        label: "Account Information",
        text: "Name, email address, and profile photo (provided when you sign in via Google or email through Clerk).",
      },
      {
        label: "Contact Information",
        text: "Phone number and WhatsApp number — only when you submit a booking request.",
      },
      {
        label: "Location Data",
        text: "City and delivery address — only when you request home delivery or a booking.",
      },
      {
        label: "Feedback & Reviews",
        text: "Rating, message, and role — submitted voluntarily through our feedback form.",
      },
      {
        label: "Usage Data",
        text: "Product views, page visits, and AI chat interactions (session-based, tied to your account).",
      },
    ],
  },
  {
    id: "usage",
    Icon: FiUser,
    title: "How We Use Your Information",
    body: [`We use your information strictly to serve you better:`],
    list: [
      { text: "Process and confirm your product bookings." },
      { text: "Provide personalized AI chat support." },
      { text: "Display your feedback publicly (only after approval)." },
      { text: "Improve our products, services, and user experience." },
      { text: "Communicate important updates about your orders." },
      { text: "Prevent fraud, abuse, and unauthorized access." },
    ],
  },
  {
    id: "security",
    Icon: FiShield,
    title: "Data Security",
    body: [`We take security seriously. Your data is protected through:`],
    list: [
      { text: "HTTPS/TLS encryption for all data transfer." },
      { text: "HTTP-only cookies to prevent XSS attacks." },
      { text: "Role-based access control — only admins access admin data." },
      { text: "Encrypted database storage via MongoDB." },
      { text: "Regular security audits and updates." },
    ],
  },
  {
    id: "rights",
    Icon: FiCheckCircle,
    title: "Your Rights",
    body: [`You have full control over your data. You can:`],
    list: [
      { text: "Access, update, or delete your profile at any time from your account." },
      { text: "Request deletion of your account and all associated data." },
      { text: "Opt out of non-essential communications." },
      { text: "Withdraw consent for data processing (may affect service availability)." },
    ],
  },
  {
    id: "changes",
    Icon: FiShield,
    title: "Policy Updates",
    body: [
      `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Material changes will be posted on this page with an updated "Last Updated" date.`,
    ],
  },
];