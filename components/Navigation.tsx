import { ImStatsBars } from 'react-icons/im';

const Navigation = () => {
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User Information */}
        <div className="flex-items-center">
          {/* Profile Picture */}
          <div className="rounded-full overflow-hidden h-[40px] w-[40px]">
            <img
              src="https://placekitten.com/400/400"
              alt="Profile Image"
              className="object-cover w-full h-full"
            />
          </div>

          {/* User Greeting */}
          <small>Hello, USER!</small>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <div>
            <ImStatsBars className="text-2xl" />
          </div>
          <div>
            <button className="btn btn-danger">Sign Out</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
