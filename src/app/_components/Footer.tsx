import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Clock,
  UtensilsCrossed,
  Truck,
  Star,
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t mt-16">
      {/* Special Offers Banner */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-green-50 rounded-xl p-6 mb-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Get Special Offers & Discounts
            </h3>
            <p className="text-gray-600 mb-4">
              Subscribe to receive updates about new dishes and exclusive offers
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Restaurant */}
          <div>
            <h4 className="font-bold text-lg text-gray-800 mb-4">
              Our Restaurant
            </h4>
            <p className="text-gray-600 mb-4">
              Experience the finest culinary delights with our authentic dishes,
              prepared by expert chefs using the freshest ingredients. Dine-in
              or order online for a convenient experience.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg text-gray-800 mb-4">
              Menu & Orders
            </h4>
            <ul className="space-y-2">
              {[
                "Today's Special",
                "Full Menu",
                "Order Online",
                "Reservations",
                "Group Bookings",
                "Gift Cards",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours & Delivery */}
          <div>
            <h4 className="font-bold text-lg text-gray-800 mb-4">
              Hours & Delivery
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-600">
                <Clock
                  className="mt-1 flex-shrink-0 text-green-600"
                  size={18}
                />
                <div>
                  <p className="font-semibold">Opening Hours</p>
                  <p>Mon-Fri: 08:00 AM - 11:00 PM</p>
                  <p>Sat-Sun: 10:00 AM - 11:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <Truck
                  className="mt-1 flex-shrink-0 text-green-600"
                  size={18}
                />
                <div>
                  <p className="font-semibold">Delivery Hours</p>
                  <p>Daily: 11:00 AM - 6:30 PM</p>
                  <p className="text-sm">*Delivery radius: 10 KM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <UtensilsCrossed
                  className="mt-1 flex-shrink-0 text-green-600"
                  size={18}
                />
                <div>
                  <p className="font-semibold">Special Services</p>
                  <p>Catering & Private Events</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg text-gray-800 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-600">
                <MapPin
                  className="mt-1 flex-shrink-0 text-green-600"
                  size={18}
                />
                <span>
                  <Link
                    href="https://maps.app.goo.gl/Asdoo5bHQC3f3cvd9"
                    target="_blank"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Garud Kunda Road, Kamalbinayak, Bhaktapur
                  </Link>
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Phone className="flex-shrink-0 text-green-600" size={18} />
                <div>
                  <p>Reservations: +977 9800000001</p>
                  <p>Orders: +977 9800000002</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Mail className="flex-shrink-0 text-green-600" size={18} />
                <span>mitra@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 mt-4">
                <Star
                  className="text-yellow-400"
                  size={18}
                  fill="currentColor"
                />
                <Star
                  className="text-yellow-400"
                  size={18}
                  fill="currentColor"
                />
                <Star
                  className="text-yellow-400"
                  size={18}
                  fill="currentColor"
                />
                <Star
                  className="text-yellow-400"
                  size={18}
                  fill="currentColor"
                />
                <Star className="text-gray-300" size={18} fill="currentColor" />
                <span className="ml-2 text-gray-600">
                  4.0 on Google Reviews
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-center md:text-left">
              © {currentYear} Mitra Khaja Ghar. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Food Safety
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
