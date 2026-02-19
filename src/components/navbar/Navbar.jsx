import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";import { useNavigate } from "react-router-dom";import AuthModal from "../auth/AuthModal";
import ProfileManagementModal from "../profiles/ProfileManagementModal";

const NavbarLogo = () => {
  return (
    <img className="h-[25px] mr-[45px]" src="/Netflix_logo.svg" alt="Netflix" />
  );
};

const NavbarLinks = () => {
  const navigate = useNavigate();
  const links = [
    { name: "Home", active: true, path: "/" },
    { name: "Serie", active: false, path: null },
    { name: "Film", active: false, path: null },
    { name: "Giochi", active: false, path: null },
    { name: "Nuovi e popolari", active: false, path: null },
    { name: "La mia lista", active: false, path: "/watchlist" },
  ];

  return (
    <>
      {links.map((link) => (
        <span
          key={link.name}
          onClick={() => link.path && navigate(link.path)}
          className={
            link.active
              ? "sp font-medium text-white shadow-2xl shadow-white cursor-pointer"
              : link.path
              ? "sp cursor-pointer hover:text-gray-300"
              : "sp"
          }
        >
          {link.name}
        </span>
      ))}
    </>
  );
};

const NavbarSearch = () => {
  return (
    <svg
      className="cursor-pointer mx-[6px] mb-0.5"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      data-icon="MagnifyingGlassMedium"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-1.38 7.03a9 9 0 1 1 1.41-1.41l5.68 5.67-1.42 1.42z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const NavbarNotifications = () => {
  return (
    <svg
      className="cursor-pointer mx-[21px]"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      data-icon="BellMedium"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M13 4.07A7 7 0 0 1 19 11v4.25q1.58.12 3.1.28l-.2 2a93 93 0 0 0-19.8 0l-.2-2q1.52-.15 3.1-.28V11a7 7 0 0 1 6-6.93V2h2zm4 11.06V11a5 5 0 0 0-10 0v4.13a97 97 0 0 1 10 0m-8.37 4.24C8.66 20.52 10.15 22 12 22s3.34-1.48 3.37-2.63c.01-.22-.2-.37-.42-.37h-5.9c-.23 0-.43.15-.42.37"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const ProfilesList = ({ profiles, currentProfile, onSelectProfile }) => {
  const defaultAvatar = "https://occ-0-4558-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABeuqjuQsRgqEDlibtJTI5BMf8IxhLlLOeIT6xI4TL57mqv7XHja43gx02S8pZVe8JNGRQXjnrUk1VcsTXqi83tFKPI6OR3k.png?r=bd7";

  return (
    <>
      {profiles.map((profile) => (
        <div
          key={profile.id}
          onClick={() => onSelectProfile(profile)}
          className={`flex items-center w-[198.4px] h-[33.48px] py-[5px] px-[10px] box-content cursor-pointer hover:bg-gray-800 ${
            currentProfile?.id === profile.id ? 'bg-gray-700' : ''
          }`}
        >
          <img
            className="rounded-[4px] w-[32px] h-[32px] object-cover"
            src={profile.avatar_url || defaultAvatar}
            alt={profile.name}
          />
          <span className="ml-[10px]">{profile.name}</span>
        </div>
      ))}
    </>
  );
};

const SettingsList = ({ onManageProfiles }) => {
  const settings = [
    {
      name: "Gestisci i profili",
      icon: (
        <svg
          className="text-gray-400 w-[42px] h-[24px] ml-[-4px] mr-[-6px]"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          data-icon="PencilMedium"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          role="img"
        >
          <path
            className="text-gray-400 w-[22.17px] h-[22.17px] "
            fill="currentColor"
            fillRule="evenodd"
            d="M19.121 1.707a3 3 0 0 0-4.242 0l-1.586 1.586-.707.707-11 11A2 2 0 0 0 1 16.414V21a2 2 0 0 0 2 2h4.586A2 2 0 0 0 9 22.414l11-11 .707-.707 1.586-1.586a3 3 0 0 0 0-4.242zM15.586 7 14 5.414l-11 11V19a2 2 0 0 1 2 2h2.586l11-11L17 8.414 6.707 18.707l-1.414-1.414zm.707-3.879a1 1 0 0 1 1.414 0l3.172 3.172a1 1 0 0 1 0 1.414L20 8.586 15.414 4z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      onClick: onManageProfiles,
    },
    {
      name: "Account",
      icon: (
        <svg
          className="text-gray-400 w-[42px] h-[24px] ml-[-4px] mr-[-6px]"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          data-icon="UserMedium"
          data-icon-id=":ru1:"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          role="img"
        >
          <path
            className="text-gray-400 w-[20px] h-[23.99px]"
            fill="currentColor"
            fillRule="evenodd"
            d="M15 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m2 0A5 5 0 1 1 7 5a5 5 0 0 1 10 0M4 21a8 8 0 1 1 16 0v.51q-.66.09-1.72.19a68 68 0 0 1-12.56 0q-1.06-.1-1.72-.2zm17.15 2.38-.15-1za1 1 0 0 0 .85-1V21a10 10 0 0 0-20 0v1.39c0 .5.36.91.85.99l.15-1-.15 1h.05l.14.03a41 41 0 0 0 2.5.28 70 70 0 0 0 12.93 0 62 62 0 0 0 2.49-.28l.14-.02z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      onClick: null,
    },
    {
      name: "Centro assistenza",
      icon: (
        <svg
          className="text-gray-400 w-[42px] h-[24px] ml-[-4px] mr-[-6px]"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          data-icon="CircleQuestionMarkMedium"
          data-icon-id=":r14a:"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          role="img"
        >
          <path
            className="text-gray-400 w-[24px] h-[24px]"
            fill="currentColor"
            fillRule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 8c-1.317 0-2 .743-2 1.5H8C8 7.257 10.003 6 12 6s4 1.257 4 3.5c0 1.349-1.08 2.268-2.178 2.68-.265.1-.49.25-.636.411-.14.156-.186.292-.186.409v1h-2v-1c0-1.435 1.168-2.335 2.119-2.692.729-.274.881-.66.881-.808 0-.757-.683-1.5-2-1.5m1.5 8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      onClick: null,
    },
  ];

  return (
    <>
      {settings.map((setting) => (
        <div
          key={setting.name}
          onClick={setting.onClick}
          className="flex items-center w-[198.4px] h-[24px] py-[5px] px-[10px] box-content cursor-pointer hover:bg-gray-800"
        >
          {setting.icon}
          <span className="ml-[10px]">{setting.name}</span>
        </div>
      ))}
    </>
  );
};

const ExitButton = ({ onLogout }) => {
  return (
    <div 
      onClick={onLogout}
      className="flex items-center justify-center w-[198.4px] h-[24px] py-[10px] px-[10px] box-content cursor-pointer border-t border-gray-800 mt-[2px] hover:underline"
    >
      Esci da Netflix
    </div>
  );
};

const ProfileMenuLinks = ({ profiles, currentProfile, onSelectProfile, onManageProfiles, onLogout }) => {
  return (
    <>
      <div className="pt-[10px] pb-[5px]">
        <ProfilesList 
          profiles={profiles} 
          currentProfile={currentProfile}
          onSelectProfile={onSelectProfile}
        />
      </div>
      <div className=" pb-[10px]">
        <SettingsList onManageProfiles={onManageProfiles} />
      </div>
    </>
  );
};

const NavbarProfile = ({ currentProfile, profiles, onSelectProfile, onManageProfiles, onLogout }) => {
  const defaultAvatar = "https://occ-0-4558-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABeuqjuQsRgqEDlibtJTI5BMf8IxhLlLOeIT6xI4TL57mqv7XHja43gx02S8pZVe8JNGRQXjnrUk1VcsTXqi83tFKPI6OR3k.png?r=bd7";
  
  return (
    <>
      <div className="group relative flex">
        <img
          className="h-[32px] w-[32px] rounded-[4px] mr-[0.5px] object-cover cursor-pointer"
          src={currentProfile?.avatar_url || defaultAvatar}
          alt={currentProfile?.name || 'Profile'}
        />
        <ArrowDropDown 
          className="mx-[3px] cursor-pointer mt-1 shadow-none group-hover:rotate-180" 
          style={{ transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
        <ArrowDropUp
          className="invisible absolute bottom-[-31px] group-hover:visible"
          sx={{ fontSize: 31 }}
        />
        <div className="hidden text-[13px] bg-[var(--main-color)] border-[1px] border-gray-800 opacity-95 group-hover:flex flex-col absolute whitespace-nowrap right-3 top-[52px]">
          <ProfileMenuLinks 
            profiles={profiles}
            currentProfile={currentProfile}
            onSelectProfile={onSelectProfile}
            onManageProfiles={onManageProfiles}
            onLogout={onLogout}
          />
          <ExitButton onLogout={onLogout} />
        </div>
      </div>
    </>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileManagement, setShowProfileManagement] = useState(false);
  const { profiles, currentProfile, isAuthenticated, logout, selectProfile } = useAuth();
  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div
      className={
        isScrolled
          ? "text-sm text-white fixed top-0 w-full z-[999] bg-[var(--main-color)]"
          : "text-sm text-white fixed top-0 w-full z-[999] bg-[linear-gradient(to_top,transparent_0%,rgba(0,0,0,0.3)_50%)]"
      }
    >
      <div className="px-[59px] flex items-center justify-between h-[68px]">
        <div className="left flex items-center text-gray-200">
          <NavbarLogo />
          <NavbarLinks />
        </div>
        
        <div className="right flex items-center gap-4">
          <NavbarSearch />
          <NavbarNotifications />
          
          {isAuthenticated ? (
            <>
              <NavbarProfile 
                currentProfile={currentProfile}
                profiles={profiles}
                onSelectProfile={selectProfile}
                onManageProfiles={() => setShowProfileManagement(true)}
                onLogout={logout}
              />
            </>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-red-600 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-red-700 transition"
            >
              Accedi
            </button>
          )}
        </div>
      </div>
      
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showProfileManagement && <ProfileManagementModal onClose={() => setShowProfileManagement(false)} />}
    </div>
  );
};

export default Navbar;
