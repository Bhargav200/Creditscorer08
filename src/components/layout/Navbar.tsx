
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, CreditCard, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Apply", href: "/apply" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? "text-primary text-glow" : "text-muted-foreground hover:text-foreground"
    }`;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <CreditCard className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl sm:inline-block text-foreground">CreditScorer</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} className={navLinkClass} end>
              {item.label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink to="/dashboard" className={navLinkClass} end>
              Dashboard
            </NavLink>
          )}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                  <User className="h-4 w-4 mr-2" />
                  {user?.user_metadata?.full_name || user?.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>
              <Button 
                size="sm" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 drop-shadow-primary"
                onClick={() => navigate('/login')}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
        <div className="md:hidden ml-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-l border-border/60 bg-background/95 backdrop-blur-lg sm:w-[400px]">
              <nav className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({isActive}) => `text-lg font-medium transition-colors ${isActive ? "text-primary text-glow" : "text-muted-foreground hover:text-foreground"} hover:text-primary`}
                    end
                  >
                    {item.label}
                  </NavLink>
                ))}
                {isAuthenticated && (
                  <NavLink
                    to="/dashboard"
                    className={({isActive}) => `text-lg font-medium transition-colors ${isActive ? "text-primary text-glow" : "text-muted-foreground hover:text-foreground"} hover:text-primary`}
                    end
                  >
                    Dashboard
                  </NavLink>
                )}
                <div className="border-t border-border/40 pt-6 space-y-4">
                  {isAuthenticated ? (
                    <Button 
                      variant="outline" 
                      className="w-full border-primary text-primary hover:bg-primary/10"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full border-primary text-primary hover:bg-primary/10"
                        onClick={() => navigate('/login')}
                      >
                        Log In
                      </Button>
                      <Button 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 drop-shadow-primary"
                        onClick={() => navigate('/login')}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
