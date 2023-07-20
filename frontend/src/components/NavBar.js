import React from "react";
import {Link} from 'react-router-dom';

const NavBar = () => {
  
  return (
    // <!-- Main navigation container -->
    <nav
      className="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4"
      data-te-navbar-ref
      style={{ height: "80px", backgroundColor: "#1c94e3" }}
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        {/* <!-- Collapsible navigation container --> */}
        <div
          className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
          id="navbarSupportedContent12"
          data-te-collapse-item
        >
          {/* <!-- Logo --> */}
          <a
            className="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
            href="/"
          >
            <img
              src="https://alliancebioversityciat.org/themes/custom/alliance/images/brand/AllianceLogo-en.svg"
              style={{ height: "40px" }}
              alt="Alliance Bioversity International - CIAT"
              loading="lazy"
            />
          </a>
          {/* <!-- Left navigation links --> */}
          <ul
            className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
            data-te-navbar-nav-ref
          >
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              {/* <!-- Home link --> */}
              {/* <a
                className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                href="/"
                data-te-nav-link-ref
              >
                <strong>Home</strong>
              </a> */}
              <Link to="/">
                <strong>Home</strong>
              </Link>
            </li>
            {/* <!-- Map View link --> */}
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              {/* <a
                className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                href="/tracelivestock"
                data-te-nav-link-ref
              >
                <strong>Trace Livestock</strong>
              </a> */}
              <Link to="/tracelivestock">
                <strong>Trace Livestock</strong>
              </Link>
            </li>
            {/* <!-- Campaigns link --> */}
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              {/* <a
                className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                href="/campaigns"
                data-te-nav-link-ref
              >
                <strong>Campaigns</strong>
              </a> */}
              <Link to="/campaigns">
                <strong>Campaigns</strong>
              </Link>
            </li>
          </ul>
        </div>

        <div
          className="relative flex items-center"
          style={{ marginRight: "300px", fontSize: "30px" }}
        >
          <h1>Livestock Tracing System</h1>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
