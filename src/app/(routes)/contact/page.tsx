"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MapPin, Phone, Mail, User, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type ContactInfo = {
  address: string;
  phoneNumbers: {
    reservations: string;
    orders: string;
  };
  email: string;
  openingHours: {
    weekdays: string;
    weekends: string;
    deliveryHours: string;
  };
};

const Contact: React.FC = () => {
  const contactInfo: ContactInfo = {
    address: "Garud Kunda Road, Kamalbinayak, Bhaktapur",
    phoneNumbers: {
      reservations: "+977 9800000001",
      orders: "+977 9800000002",
    },
    email: "mitra@gmail.com",
    openingHours: {
      weekdays: "Mon-Fri: 08:00 AM - 11:00 PM",
      weekends: "Sat-Sun: 10:00 AM - 11:00 PM",
      deliveryHours: "11:00 AM - 6:30 PM",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    console.log(data);
    toast.success("Message sent successfully! We will get back to you soon.");
    reset();
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Contact Mitra Khaja Ghar
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're here to help! Whether you have a question about our menu, want
          to make a reservation, or provide feedback, don't hesitate to reach
          out.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="bg-green-50 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Contact Details
          </h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <MapPin className="text-green-600" size={36} />
              <div>
                <h3 className="font-bold text-gray-800">Address</h3>
                <p className="text-gray-600">{contactInfo.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-green-600" size={36} />
              <div>
                <h3 className="font-bold text-gray-800">Phone Numbers</h3>
                <p className="text-gray-600">
                  Reservations: {contactInfo.phoneNumbers.reservations}
                </p>
                <p className="text-gray-600">
                  Orders: {contactInfo.phoneNumbers.orders}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-green-600" size={36} />
              <div>
                <h3 className="font-bold text-gray-800">Email</h3>
                <p className="text-gray-600">{contactInfo.email}</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-bold text-gray-800 mb-4">Opening Hours</h3>
              <div className="text-gray-600">
                <p>{contactInfo.openingHours.weekdays}</p>
                <p>{contactInfo.openingHours.weekends}</p>
                <p className="mt-2 text-sm text-green-600">
                  Delivery Hours: {contactInfo.openingHours.deliveryHours}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <User className="text-green-600 mr-2" size={20} />
                <label htmlFor="name" className="font-medium text-gray-700">
                  Full Name
                </label>
              </div>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center mb-2">
                <Mail className="text-green-600 mr-2" size={20} />
                <label htmlFor="email" className="font-medium text-gray-700">
                  Email Address
                </label>
              </div>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center mb-2">
                <Phone className="text-green-600 mr-2" size={20} />
                <label htmlFor="phone" className="font-medium text-gray-700">
                  Phone Number
                </label>
              </div>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center mb-2">
                <MessageSquare className="text-green-600 mr-2" size={20} />
                <label htmlFor="message" className="font-medium text-gray-700">
                  Your Message
                </label>
              </div>
              <textarea
                id="message"
                placeholder="Write your message here"
                rows={5}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                })}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center py-5"
            >
              <Send className="mr-2" size={20} />
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
