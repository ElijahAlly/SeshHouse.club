import { UserType } from "@/types/User";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { FunctionComponent } from "react";

interface FooterProps {
    user: UserType | null;
}

const Footer: FunctionComponent<FooterProps> = ({ user }) => {

    return (
        <footer className="bg-black text-white mt-80 py-9">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold">About Us</h3>
                        <p className="mt-4 text-gray-400">
                            We are a passionate team dedicated to bringing you the best content and experiences.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="/" className="text-gray-400 hover:text-white">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/events" className="text-gray-400 hover:text-white">
                                    Book Event
                                </a>
                            </li>
                            <li>
                                <a href={user ? '/my-profile' : '/login'} className="text-gray-400 hover:text-white">
                                    Your Profile
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Follow Us</h3>
                        <div className="mt-4 flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <InstagramLogoIcon />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-4 text-center text-sm text-gray-500">
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;