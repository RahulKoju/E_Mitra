import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

// Define the type for FAQ data
interface FaqItem {
  question: string;
  answer: string;
}

function RestaurantFaq() {
  const faqData: FaqItem[] = [
    {
      question: "How do I place an order?",
      answer:
        "You can place an order directly through our website or mobile app. Simply browse the menu, select your items, and proceed to checkout.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and cash on delivery. You can choose your preferred payment method during checkout.",
    },
    {
      question: "Is there a minimum order amount for delivery?",
      answer:
        "Yes, the minimum order amount for delivery is $10. This helps us cover delivery costs and ensure a great experience for our customers.",
    },
    {
      question: "Do you offer vegetarian or vegan options?",
      answer:
        "Yes, we have a wide range of vegetarian and vegan dishes. You can filter the menu to view these options.",
    },
    {
      question: "What if I have food allergies or dietary restrictions?",
      answer:
        "Please mention any allergies or dietary restrictions in the 'Special Instructions' section when placing your order. Our chefs will take extra care to accommodate your needs.",
    },
    {
      question: "Can I schedule an order for later?",
      answer:
        "Yes, you can schedule an order for a specific date and time during checkout. This is perfect for planning meals in advance.",
    },
    {
      question: "Do you offer discounts or loyalty programs?",
      answer:
        "Yes, we have a loyalty program where you earn points for every order. You can also check our website for ongoing discounts and promotions.",
    },
    {
      question: "Can I leave a review for my order?",
      answer:
        "Yes, we encourage customers to leave reviews! After your order is delivered, you'll receive a link to rate your experience and provide feedback.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Frequently Asked Questions
      </h2>
      <Accordion type="multiple" className="w-full space-y-2">
        {faqData.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-gray-200 rounded-lg overflow-hidden transition-colors duration-300 data-[state=open]:bg-gradient-to-r data-[state=open]:from-blue-50 data-[state=open]:to-purple-50"
          >
            <AccordionTrigger className="flex w-full items-center justify-between px-6 py-4 hover:no-underline">
              <div className="flex-1 text-left font-semibold text-gray-900 text-lg">
                {faq.question}
              </div>
            </AccordionTrigger>
            <AccordionContent className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="px-6 pb-4 text-gray-600 text-base">
                {faq.answer}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default RestaurantFaq;
