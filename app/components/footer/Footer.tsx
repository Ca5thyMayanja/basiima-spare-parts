import React from "react"
import { ContainerStyles } from "../ContainerStyles"
import FooterList from "./FooterList"
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-slate-600 text-slate-50 text-sm mt-5">
      <ContainerStyles>
        {/* <div className='flex justify-between pt-5 pb-5  flex-col md:flex-row '> */}
        <div className="flex justify-between pt-5 pb-5  flex-col md:flex-row ">
          <div className=" flex md: flex-row justify-between items-stretch">
            <FooterList>
              <h3 className=" text-base font-bold mt-4 text-nowrap">
                Shop Categories
              </h3>
              <Link href={"#"}>Batteries</Link>
              <Link href={"#"}>Oil</Link>
              <Link href={"#"} className="text-nowrap">
                {" "}
                Tyres
              </Link>
              <Link href={"#"} className="text-nowrap">
                Spare Parts
              </Link>
            </FooterList>

            <FooterList>
              <h3 className=" text-base font-bold mt-4 text-nowrap">
                Customer Service
              </h3>
              <h3 className="text-nowrap">Contact Us</h3>
              <h3 className="text-nowrap">Shopping Policy</h3>
              <h3 className="text-nowrap">Returns and Technologies</h3>
              <h3>FAQs</h3>
            </FooterList>
          </div>

          <FooterList>
            <h3 className=" text-base font-bold mt-4">About Us</h3>
            <p className="text-pretty text-center">
              Welcome to Basiima Spare Parts, your trusted partner for
              high-quality motorcycle spare parts. Established with a passion
              and commitment to keeping you on the road, we provide a wide range
              of reliable and affordable parts to ensure your bike performs at
              its best. Whether you&rsquo;re looking for engine components,
              brakes, tires, or accessories, we&rsquo;ve got you covered. BEERA
              N&rsquo;EKISA!
            </p>
          </FooterList>
          <FooterList>
            <h3 className=" text-base font-bold mt-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-black"
              >
                <FaXTwitter size={30} />
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-700"
              >
                <FaFacebook size={30} />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-700"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-rose-600"
              >
                <FaYoutube size={30} />
              </a>
            </div>
          </FooterList>
        </div>
        <div className="text-center text-xs mt-4">
          Icons sourced from{" "}
          <a
            href="https://flaticon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Flaticon
          </a>
          .
        </div>
      </ContainerStyles>
    </footer>
  )
}
