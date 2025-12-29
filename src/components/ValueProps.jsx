import { CiDeliveryTruck, CiHeadphones } from "react-icons/ci";
import { FiRotateCcw } from "react-icons/fi";

const valueProps = [
  {
    icon: CiDeliveryTruck,
    title: "Free Shipping Worldwide",
    description: "On all orders over $199",
  },
  {
    icon: CiHeadphones,
    title: "24/7 Support Services",
    description: "Contact us anytime, anywhere",
  },
  {
    icon: FiRotateCcw,
    title: "Money Back Guarantee",
    description: "30-day return policy",
  },
];

export default function ValueProps() {
  return (
    <section className="py-10  border-b border-[#E5E5E5] bg-[#F2F2F2]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-4 justify-center md:justify-start "
               
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <Icon className="w-5 h-5 text-[#8B2C34]" />
                </div>

                <div>
                  <h3 className="font-medium text-sm text-black">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#666]">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
