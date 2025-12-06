import { information } from "../../data/Information";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <ul className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-8 border-gray-200 py-12 md:py-24 px-4 sm:px-8 md:px-14 lg:px-20 xl:px-32">
        {information.map((info, i) => (
          <li
            key={i}
            className={`relative flex flex-col items-center justify-center text-center text-gray-600 ${
              i !== information.length - 1
                ? "sm:after:content-[''] sm:after:absolute sm:after:top-1/2 sm:after:-translate-y-1/2 sm:after:right-0 sm:after:w-px sm:after:h-14 sm:after:bg-gray-400"
                : ""
            }`}
          >
            <img
              src={info.image}
              alt="info image"
              className="w-12 sm:w-14 mb-4"
            />
            <h3 className="text-base sm:text-lg mb-2">{info.name}</h3>
            <p className="text-sm sm:text-base">{info.description}</p>
          </li>
        ))}
      </ul>

      <footer className="py-5 md:py-10 border-t border-gray-200">
        <div className="px-4 sm:px-8 md:px-14 lg:px-20 xl:px-32">
          <ul className="flex flex-wrap justify-center sm:justify-start gap-3 text-center">
            <li>
              <Link to="/contact" className="text-xs capitalize">
                work with us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-xs capitalize">
                terms and conditions
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-xs capitalize">
                offers
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-xs capitalize">
                accessibility
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-xs capitalize">
                learn with us
              </Link>
            </li>
            <li>
              <Link
                to="https://github.com/DeveroCode"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs capitalize"
              >
                ❤️ DeveroCode - Carlos Martinez
              </Link>
            </li>
          </ul>
          <p className="text-[10px] sm:text-xs text-gray-600 mt-5 text-center sm:text-left leading-relaxed">
            This page has been created for educational purposes only. DeveroCode
            is not responsible for any unofficial copies or versions that may
            arise, nor for the misuse or theft of information in such cases. The
            simulated payments in this demonstration are not real; no charges
            will be made and no discounts will be applied to credit cards, debit
            cards, or any other payment method used during the exercise. &copy;
            2025 Latin Shop. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
