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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileManagement, setShowProfileManagement] = useState(false);
  const { profiles, currentProfile, isAuthenticated, logout, selectProfile } = useAuth();
  const navigate = useNavigate();
  
  const defaultAvatar = "https://occ-0-4558-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABeuqjuQsRgqEDlibtJTI5BMf8IxhLlLOeIT6xI4TL57mqv7XHja43gx02S8pZVe8JNGRQXjnrUk1VcsTXqi83tFKPI6OR3k.png?r=bd7";

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
                {/* Profili */}
                <div className="pt-[10px] pb-[5px]">
                  {profiles.map((profile) => (
                    <div
                      key={profile.id}
                      onClick={() => selectProfile(profile)}
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
                </div>
                
                {/* Settings */}
                <div className="pb-[10px]">
                  <div
                    onClick={() => setShowProfileManagement(true)}
                    className="flex items-center w-[198.4px] h-[24px] py-[5px] px-[10px] box-content cursor-pointer hover:bg-gray-800"
                  >
                    <svg
                      className="text-gray-400 w-[42px] h-[24px] ml-[-4px] mr-[-6px]"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M19.121 1.707a3 3 0 0 0-4.242 0l-1.586 1.586-.707.707-11 11A2 2 0 0 0 1 16.414V21a2 2 0 0 0 2 2h4.586A2 2 0 0 0 9 22.414l11-11 .707-.707 1.586-1.586a3 3 0 0 0 0-4.242zM15.586 7 14 5.414l-11 11V19a2 2 0 0 1 2 2h2.586l11-11L17 8.414 6.707 18.707l-1.414-1.414zm.707-3.879a1 1 0 0 1 1.414 0l3.172 3.172a1 1 0 0 1 0 1.414L20 8.586 15.414 4z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-[10px]">Gestisci i profili</span>
                  </div>
                </div>
                
                {/* Logout */}
                <div 
                  onClick={logout}
                  className="flex items-center justify-center w-[198.4px] h-[24px] py-[10px] px-[10px] box-content cursor-pointer border-t border-gray-800 mt-[2px] hover:underline"
                >
                  Esci da Netflix
                </div>
              </div>
            </div>
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
