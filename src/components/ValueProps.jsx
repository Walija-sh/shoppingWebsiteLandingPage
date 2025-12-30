import { CiDeliveryTruck, CiHeadphones } from "react-icons/ci";
import { FiRotateCcw } from "react-icons/fi";

const valueProps = [
  {
    icon: CiDeliveryTruck,
    title: "Free Shipping",
    description: "On all orders over $199",
  },
  {
    icon: CiHeadphones,
    title: "24/7 Support",
    description: "Contact us anytime",
  },
  {
    icon: FiRotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
];

export default function ValueProps() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* The Card Container: Rounded and subtle border */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 bg-[#F5F5F7] rounded-[32px]">
          {valueProps.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-5 p-6 bg-white rounded-[24px] shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Icon Container with soft rounding */}
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#F5F5F7] flex items-center justify-center">
                  <Icon className="w-7 h-7 text-black" />
                </div>

                <div className="flex flex-col">
                  <h3 className="font-bold text-[15px] text-black tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}