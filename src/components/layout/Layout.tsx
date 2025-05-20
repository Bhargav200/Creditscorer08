
import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { CreditCard, Mail, Phone, ShieldCheck } from "lucide-react"; // Icons for footer

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-border/40 bg-secondary/30 py-12 md:px-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <CreditCard className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">CreditScorer</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Advanced, real-time credit assessment for a secure financial future.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-3">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><Link to="/apply" className="text-muted-foreground hover:text-primary">Apply Now</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link to="/#faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li> {/* Assuming FAQ section on home */}
                <li><Link to="/#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-3">Contact</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2 text-primary" /> contact@creditscorer.com
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2 text-primary" /> +1 (234) 567-8900
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-3">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {new Date().getFullYear()} CreditScorer Inc. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0 text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span>Secure & Confidential</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
