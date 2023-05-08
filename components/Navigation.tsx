import { ImStatsBars } from 'react-icons/im';
import { useContext } from 'react';
import { authContext } from '@/lib/store/auth-context';

const Navigation = () => {
  const { user, loading, logout } = useContext(authContext);

  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User Information */}
        {user && !loading && (
          <div className="flex items-center gap-2">
            {/* Profile Picture */}
            <div className="rounded-full overflow-hidden h-[40px] w-[40px]">
              <img
                src={user.photoURL}
                alt={user.displayName}
                referrerPolicy="no-referrer"
                className="object-cover w-full h-full"
              />
            </div>

            {/* User Greeting */}
            <small>Hello, {user.displayName}</small>
          </div>
        )}

        {/* Navigation */}
        {user && !loading && (
          <nav className="flex items-center gap-4">
            <div>
              <ImStatsBars className="text-2xl" />
            </div>
            <div>
              <button
                className="btn btn-danger"
                onClick={logout}
              >
                Sign Out
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;
