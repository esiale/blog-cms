import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const Header = () => {
  const activePrimaryClass = 'text-ship-cove-700';
  const activeSecondaryClass =
    'text-ship-cove-700 border-b-2 pb-1 border-ship-cove-700';

  const CustomLink = ({ children, to, activeClass, end, ...props }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: end });

    return (
      <div>
        <Link className={match ? activeClass : undefined} to={to} {...props}>
          {children}
        </Link>
      </div>
    );
  };

  return (
    <header className="flex flex-col gap-5">
      <div className="grid grid-cols-3 items-center">
        <span className="col-start-1 text-xl text-ship-cove-600">BlogCMS</span>
        <nav
          className="col-start-2 text-lg text-ship-cove-400"
          aria-label="primary"
        >
          <ul className="flex gap-5">
            <li>
              <CustomLink
                to="posts"
                activeClass={activePrimaryClass}
                end={false}
              >
                Posts
              </CustomLink>
            </li>
            <li>
              <CustomLink
                to="users"
                activeClass={activePrimaryClass}
                end={false}
              >
                Users
              </CustomLink>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <nav className="text-lg text-ship-cove-400" aria-label="secondary">
          <ul className="flex gap-5">
            {useMatch('posts/*') ? (
              <>
                <li>
                  <CustomLink
                    to="posts"
                    activeClass={activeSecondaryClass}
                    end={true}
                  >
                    View Posts
                  </CustomLink>
                </li>
                <li>
                  <CustomLink
                    to="posts/new"
                    activeClass={activeSecondaryClass}
                    end={true}
                  >
                    Add a new Post
                  </CustomLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <CustomLink
                    to="users"
                    activeClass={activeSecondaryClass}
                    end={true}
                  >
                    View Users
                  </CustomLink>
                </li>
                <li>
                  <CustomLink
                    to="users/new"
                    activeClass={activeSecondaryClass}
                    end={true}
                  >
                    Add a new User
                  </CustomLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
